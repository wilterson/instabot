const puppeteer = require("puppeteer");

const BASE_URL = "https://instagram.com/";
const TAG_URL = (tag) => `https://instagram.com/explore/tags/${tag}`;

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false,
    });

    instagram.page = await instagram.browser.newPage();
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    await instagram.page.type('input[name="username"]', username, {
      delay: 100,
    });

    await instagram.page.type('input[name="password"]', password, {
      delay: 100,
    });

    loginBtn = await instagram.page.$('button[type="submit"]');
    await loginBtn.click();

    await instagram.page.waitFor(5000);
  },

  likeTags: async (tags = []) => {
    for (let tag of tags) {
      await instagram.page.goto(TAG_URL(tag));
      await instagram.page.waitFor(2000);

      let posts = await instagram.page.$$("article > div:nth-child(3) img");

      for (let i = 0; i < 3; i++) {
        let post = posts[i];
        await post.click();

        await instagram.page.waitFor('div[role="dialog"]');
        await instagram.page.waitFor(2000);

        let isLikable = await instagram.page.$('svg[aria-label="Like"]');

        if (isLikable) {
          await await instagram.page.click('svg[aria-label="Like"]');
        }

        await instagram.page.waitFor(2000);

        let closeBtn = await instagram.page.$('svg[aria-label="Close"]');
        await closeBtn.click();

        await instagram.page.waitFor(2000);
      }

      await instagram.page.waitFor(1000);
    }
  },
};

module.exports = instagram;
