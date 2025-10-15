const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const db = require("../config/db");
const { makeSlug } = require("../utils/helpers");
const scrapeChapters = require("./chapterScraper");
const safeRequest = require("../utils/request");

async function upsertGenre(name) {
  const slug = makeSlug(name);
  const [rows] = await db.query("SELECT id FROM genres WHERE slug = ?", [slug]);
  if (rows.length) return rows[0].id;

  const [result] = await db.query(
    "INSERT INTO genres (name, slug, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
    [name, slug]
  );
  return result.insertId;
}

async function upsertTag(name) {
  const slug = makeSlug(name);
  const [rows] = await db.query("SELECT id FROM tags WHERE slug = ?", [slug]);
  if (rows.length) return rows[0].id;

  const [result] = await db.query(
    "INSERT INTO tags (name, slug, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
    [name, slug]
  );
  return result.insertId;
}

async function downloadImage(url, slug) {
  const storagePath = path.join(__dirname, "../storage/storage/covers");
  if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
  }

  const ext = path.extname(url).split("?")[0] || ".jpg";
  const filePath = path.join(storagePath, slug + ext);

  if (!fs.existsSync(filePath)) {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);
  }

  return `storage/storage/covers/${slug}${ext}`;
}

async function scrapeManga(url, sourceId, TESTING = false, pageNumber = 1) {
  try {
    // const { data } = await axios.get(url);
    const { data } = await safeRequest(url);
    const $ = cheerio.load(data);

    const title = $("h1.komik_info-content-body-title").text().trim();
    const coverUrl = $("div.komik_info-content-thumbnail img").attr("src");
    const authorText = $("span.komik_info-content-info b:contains('Author:')").parent().text();
    const author = authorText.replace("Author:", "").trim();
    const type = $("span.komik_info-content-info-type a").text().trim();
    const description = $("div.komik_info-description-sinopsis p")
      .map((i, el) => $(el).text().trim())
      .get()
      .join("\n\n");

    let releaseYearText = $("span.komik_info-content-info-release").text().trim();
    let releaseYear = releaseYearText.replace("Released:", "").trim();
    releaseYear = parseInt(releaseYear) || null;

    const slug = makeSlug(title);

    // cek apakah comic sudah ada
    const [existing] = await db.query("SELECT id FROM comics WHERE slug = ?", [slug]);
    let comicId;
    if (existing.length > 0) {
      comicId = existing[0].id;
      console.log(`Comic sudah ada, skip insert: ${title} (ID: ${comicId})`);
    } else {
      const localCoverPath = await downloadImage(coverUrl, slug);
      const [result] = await db.query(
        `INSERT IGNORE INTO comics (title, slug, cover_url, author, type, description, release_year, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [title, slug, localCoverPath, author, type, description, releaseYear]
      );
      comicId = result.insertId;
      console.log(`Comic baru tersimpan: ${title} (ID: ${comicId})`);
    }

    // --- GENRES ---
    const genreNames = [];
    $("span.komik_info-content-genre a").each((i, el) => {
      genreNames.push($(el).text().trim());
    });

    for (let name of genreNames) {
      const genreId = await upsertGenre(name);
      await db.query(
        `INSERT IGNORE INTO comic_genre (comic_id, genre_id, created_at, updated_at)
         VALUES (?, ?, NOW(), NOW())`,
        [comicId, genreId]
      );
    }

    // --- TAGS ---
    const tagNames = [];
    $("div.tags a").each((i, el) => {
      tagNames.push($(el).text().trim());
    });

    for (let name of tagNames) {
      const tagId = await upsertTag(name);
      await db.query(
        `INSERT IGNORE INTO comic_tags (comic_id, tag_id, created_at, updated_at)
         VALUES (?, ?, NOW(), NOW())`,
        [comicId, tagId]
      );
    }

    // --- CHAPTERS ---
    await scrapeChapters(url, comicId, sourceId, slug, TESTING, pageNumber);

  } catch (err) {
    console.error("Error scraping manga:", err.message);
    await db.query(
      "INSERT INTO scrap_logs (source_id, status, message, created_at, updated_at) VALUES (?, 'failed', ?, NOW(), NOW())",
      [sourceId, err.message]
    );
  }
}

module.exports = scrapeManga;
