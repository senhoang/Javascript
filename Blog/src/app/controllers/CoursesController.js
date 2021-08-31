const Course = require("../modles/Course");

class CoursesController {
  // [GET]/ news
  index(req, res) {
    res.render("Courses index");
  }

  // [GET]/ news/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug }).lean()
      .then((course) => {
        res.render('courses/show', {course})
      })
      .catch(next);
  }
}

module.exports = new CoursesController();
