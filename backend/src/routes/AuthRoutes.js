const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const { login, register, changePassword } = require("../controllers/AuthController");

router.post("/login", login);
router.post("/register", register);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;