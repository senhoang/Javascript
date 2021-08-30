const Course = require('../modles/Course')

class SiteController {
  // [GET]/
  index(req, res) {

    Course.find({}, function (err, courses) {
      if(!err) {
        // console.log('sent')
        res.json(courses);
      } else {
        res.status(400).json({ error: 'ERROR!!!'});
      }
    });

    // res.render('home');
  }

  // [GET]/ search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
