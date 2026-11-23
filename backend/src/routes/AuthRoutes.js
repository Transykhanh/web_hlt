const express = require("express");
const router = express.Router();
const { login } = require("../controllers/AuthController");
const { register } = require("../controllers/AuthController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;