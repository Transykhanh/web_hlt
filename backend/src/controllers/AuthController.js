const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Tài khoản không hoạt động" });
    }

    user.lastLoginAt = new Date();
    await user.save();

    res.json({
      message: "Đăng nhập thành công",});
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await User.create({ fullName, email, password });
    res.status(201).json({
      message: "Đăng ký thành công",});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};