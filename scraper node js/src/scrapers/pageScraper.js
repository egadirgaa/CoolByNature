const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const db = require("../config/db");
const safeRequest = require("../utils/request");

async function downloadPageImage(url, filename, comicSlug, folderName) {
  const storagePath = path.join(
    __dirname,
    "../storage/komik",
    comicSlug,
    "chapters",
    String(folderName) // contoh: "1-120"
  );
  if (!fs.existsSync(storagePath)) fs.mkdirSync(storagePath, { recursive: true });

  const filePath = path.join(storagePath, filename);
  if (!fs.existsSync(filePath)) {
    // const response = await axios.get(url, { responseType: "arraybuffer" });
    const response = await safeRequest(url, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);
  }

  return `storage/komik/${comicSlug}/chapters/${folderName}/${filename}`;
}

async function scrapePages(chapterUrl, chapterId, comicSlug, folderName) {
  try {
    // const { data } = await axios.get(chapterUrl);
    const { data } = await safeRequest(chapterUrl);
    const $ = cheerio.load(data);

    const pages = [];
    $("div.main-reading-area img").each((i, el) => {
      const imgUrl = $(el).attr("src");
      if (imgUrl) pages.push({ page_number: i + 1, image_url: imgUrl });
    });

    for (let page of pages) {
      const ext = path.extname(page.image_url).split("?")[0] || ".jpg";
      const fileName = `page_${page.page_number}${ext}`;
      const localPath = await downloadPageImage(page.image_url, fileName, comicSlug, folderName);

      await db.query(
        `INSERT IGNORE INTO chapter_pages (chapter_id, page_number, image_url, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
        [chapterId, page.page_number, localPath]
      );
    }

    return { status: "success", message: `Pages scraped: ${pages.length}` };
  } catch (err) {
    console.error("❌ Error scraping pages:", err.message);
    return { status: "failed", message: err.message };
  }
}

module.exports = scrapePages;
