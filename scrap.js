const value = "https://kayifamily.com/tv-show/kurulus-osman/";
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

    //fetching links from eplinks array
    for (let index = 0; index < 1; index++) {
      const link = eplinks[index];
      request(link, async (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          const dwlink = await $("video.jw-video");
          console.log(dwlink);
        } else {
          console.log(error, response.status);
        }
      });
    }
  } else {
    console.log(error, response.status);
  }
});
