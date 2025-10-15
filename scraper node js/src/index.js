const scrapeAllManga = require("./scrapers/allMangaScraper");
const db = require("./config/db");

const TESTING = false; // set true saat testing lokal

(async () => {
  try {
    const sourceName = "Komikcast";
    const sourceUrl = "https://komikcast.li";

    let [rows] = await db.query("SELECT id FROM sources WHERE name = ?", [sourceName]);
    let sourceId;
    if (rows.length > 0) {
      sourceId = rows[0].id;
    } else {
      const [result] = await db.query(
        "INSERT INTO sources (name, base_url, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
        [sourceName, sourceUrl]
      );
      sourceId = result.insertId;
    }

    await scrapeAllManga("https://komikcast.li/daftar-komik", sourceId, TESTING);

    console.log("Scraping selesai!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
