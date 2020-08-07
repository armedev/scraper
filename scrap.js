const value = "";
const request = require("request");
const cheerio = require("cheerio");
const eplinks = [];

console.log("LOADING");
//to load dynamic links and push them to eplinks array
request(value, async (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    await $(".episode__body .episode__link").each((idx, el) => {
      if (idx < 27) {
        const episodeLink = $(el).attr("href");
        eplinks.push(episodeLink);
        // console.log(episodeLink);
      }
    });
  } else {
    console.log(error, response.status);
  }
});
