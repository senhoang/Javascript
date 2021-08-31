const Course = require('../modles/Course')

class SiteController {
  // [GET]/
  index(req, res, next) {
    Course.find({}).lean()
      .then(courses => {
        // courses = courses.map(course => {course: course})
        // console.log(courses)
        res.render('home', { courses })
      })
      .catch( (err) =>console.log(err));
  }

  // [GET]/ search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
