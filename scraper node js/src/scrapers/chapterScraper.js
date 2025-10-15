const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../config/db");
const { makeSlug } = require("../utils/helpers");
const scrapePages = require("./pageScraper");
const safeRequest = require("../utils/request");

// fungsi ambil angka dari judul chapter
function extractChapterNumber(title) {
  const match = title.match(/(\d+(\.\d+)?)/); // tangkap angka, bisa desimal (contoh: 12.5)
  return match ? parseFloat(match[1]) : null;
}

async function scrapeChapters(mangaUrl, comicId, sourceId, comicSlug, TESTING = false, pageNumber = 1) {
  try {
    // const { data } = await axios.get(mangaUrl);
    const { data } = await safeRequest(mangaUrl);
    const $ = cheerio.load(data);

    const chapters = [];
    $('div.komik_info-chapters ul#chapter-wrapper li.komik_info-chapters-item').each((i, el) => {
      const title = $(el).find('a.chapter-link-item').text().trim();
      const url = $(el).find('a.chapter-link-item').attr('href');
      const updatedAt = $(el).find('div.chapter-link-time').text().trim();

      const numberParsed = extractChapterNumber(title) || 0;
      console.log(`📖 Parsing chapter → Judul: "${title}", Number parsed: ${numberParsed}`);

      chapters.push({
        title,
        url,
        number: numberParsed,
        updatedAt
      });
    });

    // urutkan dari kecil → besar
    chapters.sort((a, b) => a.number - b.number);

    // pilih chapter sesuai mode
    let selectedChapters = chapters;
    if (TESTING) {
      if (pageNumber === 1) {
        selectedChapters = chapters.slice(0, 2); // halaman pertama → 2 chapter
        console.log("⚡ TEST MODE (page 1): limit 2 chapter");
      } else {
        selectedChapters = chapters.slice(0, 3); // halaman berikutnya → 3 chapter
        console.log("⚡ TEST MODE (page >1): limit 3 chapter");
      }
    }

    for (let chap of selectedChapters) {
      const slug = makeSlug(chap.title);

      // cek apakah chapter sudah ada
      const [exists] = await db.query(
        "SELECT id FROM chapters WHERE comic_id=? AND slug=?",
        [comicId, slug]
      );

      let chapterId;
      if (exists.length > 0) {
        chapterId = exists[0].id;
        console.log(`⏩ Chapter sudah ada, skip: ${chap.title}`);
        continue;
      }

      // insert chapter baru
      const [result] = await db.query(
        `INSERT INTO chapters (comic_id, title, slug, chapter_number, source_url, release_date, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [comicId, chap.title, slug, chap.number, chap.url, chap.updatedAt || null]
      );
      chapterId = result.insertId;

      // gabungkan nomor + id → "1-120"
      const folderName = `${chap.number}-${chapterId}`;

      // scrape halaman chapter
      const pageResult = await scrapePages(chap.url, chapterId, comicSlug, folderName);

      await db.query(
        "INSERT INTO scrap_logs (source_id, comic_id, chapter_id, status, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [sourceId, comicId, chapterId, pageResult.status, pageResult.message]
      );
    }

    console.log(`✅ Chapters selesai diproses: Comic ID ${comicId}`);
    return { status: "success", message: `Chapters: ${selectedChapters.length}` };
  } catch (err) {
    console.error("❌ Error scraping chapters:", err.message);
    await db.query(
      "INSERT INTO scrap_logs (source_id, comic_id, status, message, created_at, updated_at) VALUES (?, ?, 'failed', ?, NOW(), NOW())",
      [sourceId, comicId, err.message]
    );
    return { status: "failed", message: err.message };
  }
}

module.exports = scrapeChapters;
