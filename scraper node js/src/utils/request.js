// utils/request.js
const axios = require("axios");

// daftar User-Agent browser
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; rv:115.0) Gecko/20100101 Firefox/115.0"
];

// fungsi delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// wrapper axios dengan delay + random UA + retry
async function safeRequest(url, options = {}, retries = 3) {
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  const delay = 1000 + Math.random() * 2000; // 1–3 detik
  console.log(`⏳ Delay ${Math.round(delay)}ms → GET ${url}`);
  await sleep(delay);

  try {
    return await axios.get(url, {
      headers: { "User-Agent": userAgent, ...(options.headers || {}) },
      timeout: 10000, // timeout 10 detik biar gak nge-hang
      ...options,
    });
  } catch (err) {
    if (retries > 0) {
      console.warn(`⚠️ Request gagal (${err.message}), retry... (${retries} sisa)`);
      await sleep(2000); // tunggu 2 detik sebelum coba lagi
      return safeRequest(url, options, retries - 1);
    }
    throw err;
  }
}

module.exports = safeRequest;
