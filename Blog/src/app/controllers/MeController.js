const Course = require("../modles/Course");

class CoursesController {
  storedCourses(req, res) {
    Course.find({})
      .lean()
      .then((courses) => {
        res.render("me/stored-courses", { courses });
      })
      .catch((err) => console.log(err));

  }

  // store(req, res) {
  //   const formData = req.body
  //   const course = new Course(formData)
  //   course.save()
  //     .then(() => res.redirect('/'))
  //     .catch(error => console.log(error))

  // }

  // // [GET]/ news/:slug
  // show(req, res, next) {
  //   Course.findOne({ slug: req.params.slug }).lean()
  //     .then((course) => {
  //       res.render('courses/show', {course})
  //     })
  //     .catch(next);
  // }
}

module.exports = new CoursesController();
