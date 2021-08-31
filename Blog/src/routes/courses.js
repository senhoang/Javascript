var express = require('express');
var router = express.Router();

const coursesController = require('../app/controllers/CoursesController');
//

router.get('/:slug', coursesController.show);
router.get('/', coursesController.index);

module.exports = router;
