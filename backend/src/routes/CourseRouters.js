const router = require('express').Router();
const Course = require('../models/Course');
const getCourses = require('../controllers/CourseController').getCourses;

router.get('/courses', getCourses);

module.exports = router;