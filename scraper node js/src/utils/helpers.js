const slugify = require("slugify");

function makeSlug(text) {
  return slugify(text, { lower: true, strict: true });
}

module.exports = { makeSlug };
