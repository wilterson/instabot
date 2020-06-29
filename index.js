const ig = require("./instagram");

(async () => {
  await ig.initialize();
  await ig.login("username", "password");
  await ig.likeTags(["javascript", "nodejs"]);
})();
