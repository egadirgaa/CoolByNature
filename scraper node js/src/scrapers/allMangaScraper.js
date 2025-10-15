const axios = require("axios");
const cheerio = require("cheerio");
const scrapeManga = require("./mangaScraper");
const safeRequest = require("../utils/request");

async function scrapeAllManga(baseUrl, sourceId, TESTING = false) {
  let currentPage = 1;
  let hasNext = true;

  while (hasNext) {
    const url = `${baseUrl}/page/${currentPage}/?sortby=update`;
    console.log(`\n🔎 Scraping halaman ${currentPage}: ${url}`);

    try {
      // const { data } = await axios.get(url);
      const { data } = await safeRequest(url);
      const $ = cheerio.load(data);

      let mangaLinks = [];
      $("div.list-update_item a").each((i, el) => {
        const link = $(el).attr("href");
        if (link && link.includes("/komik/")) {
          mangaLinks.push(link);
        }
      });

      if (mangaLinks.length === 0) {
        hasNext = false;
        break;
      }

      console.log(`📚 Ditemukan ${mangaLinks.length} komik di halaman ${currentPage}`);

      // kalau TESTING di halaman pertama → limit 2 komik
      if (TESTING && currentPage === 1) {
        mangaLinks = mangaLinks.slice(0, 2);
        console.log("⚡ TEST MODE (hal 1): hanya ambil 2 komik");
      }

      // scrape komik satu2
      for (let mangaUrl of mangaLinks) {
        await scrapeManga(mangaUrl, sourceId, TESTING, currentPage);
      }

      // kalau TESTING, stop setelah 2 halaman biar cepat
      if (TESTING && currentPage >= 2) {
        console.log("⚡ TEST MODE: stop di halaman 2");
        hasNext = false;
        break;
      }

      const nextButton = $("a.next.page-numbers").attr("href");
      if (nextButton) {
        currentPage++;
      } else {
        hasNext = false;
      }
    } catch (err) {
      console.error("❌ Error di halaman", currentPage, ":", err.message);
      hasNext = false;
    }
  }

  console.log("\n✅ Semua halaman selesai discan");
}

module.exports = scrapeAllManga;
