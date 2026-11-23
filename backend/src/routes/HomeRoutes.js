const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');

// API Home
router.get('/home', HomeController.getHome);

module.exports = router;