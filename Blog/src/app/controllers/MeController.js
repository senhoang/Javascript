const Course = require("../modles/Course");

class CoursesController {
  storedCourses(req, res) {

    Promise.all([
      Course.find({}).lean(),
      Course.countDocumentsDeleted()
    ])
      .then(([courses,deletedCount]) =>
        res.render("me/stored-courses", {
            deletedCount,
            courses,
          })
      )
      .catch((err) => console.log(err));

    // Course.countDocumentsDeleted()
    //   .then((deletedCount) => {
    //     console.log(deletedCount)
    //   })
    //   .catch(() => {})

    // Course.find({})
    //   .lean()
    //   .then((courses) => {
    //     res.render("me/stored-courses", { courses });
    //   })
    //   .catch((err) => console.log(err));

  }

  trashCourses(req, res, next) {
    Course.findDeleted({})
      .lean()
      .then((courses) => {
        res.render("me/trash-courses", { courses });
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
