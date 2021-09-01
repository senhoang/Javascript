var express = require('express');
var router = express.Router();

const meController = require('../app/controllers/MeController');
//

router.get('/stored/course', meController.storedCourses);
// router.get('/:slug', meController.show);
// router.get('/', meController.index);

module.exports = router;
