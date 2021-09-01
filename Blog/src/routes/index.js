const newsRouter = require("./news");
const coursesRouter = require("./courses");
const siteRouter = require("./site");
const meRouter = require("./me");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/", siteRouter);
}

module.exports = route;

// GET : YEU CAU TRA LAI DU LIEU
// POST : GUI DU LIEU VA YEU CAU LUU LAI
// PUT : SUA TAT CA
// PATH : SUA 1 
// DELETE
// OPTIONS: 
// HEAD