const Course = require("../modles/Course");

class CoursesController {
  // [GET]/ news
  // index(req, res) {
  //   res.render("Courses index");
  // }

  create(req, res) {
    res.render("courses/create");
  }

  store(req, res) {
    const formData = req.body
    const course = new Course(formData)
    course.save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch(error => console.log(error))

  }

  edit(req, res, next) {
    Course.findById(req.params.id).lean()
    .then((course) => {
      // res.send(course)
      res.render('courses/edit', {course})
      })
      .catch(next);
  }

  update(req, res, next) {
    Course.updateOne({ _id: req.params.id}, req.body)
    .then(() => {
      res.redirect('/me/stored/course')
      })
      .catch(next);
  }


  // [GET]/ news/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug }).lean()
      .then((course) => {
        res.render('courses/show', {course})
      })
      .catch(next);
  }

  // [DELETE] /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }


  // [DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [POST] /courses/handle form actions
  handleFormActions(req, res, next) {
    // res.send(req.body.courseIds)
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: req.body.courseIds })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restore':
        Course.restore({ _id: req.body.courseIds })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'deleteMany':
        Course.deleteMany({ _id: req.body.courseIds })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({message: 'Action is invalid'});
    }
  }
}

module.exports = new CoursesController();
