const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token
    });
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

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body || {};

    // 1. Kiểm tra đủ dữ liệu
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin" });
    }

    // 2. Mật khẩu mới phải khớp với xác nhận
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });
    }

    // 3. Độ dài tối thiểu
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Mật khẩu mới phải từ 6 ký tự" });
    }

    // 4. Lấy user kèm password (vì schema đang để select: false)
    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }

    // 5. Kiểm tra mật khẩu hiện tại
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    // 6. Mật khẩu mới không được trùng mật khẩu cũ
    if (await user.comparePassword(newPassword)) {
      return res.status(400).json({ message: "Mật khẩu mới phải khác mật khẩu cũ" });
    }

    // 7. Gán và lưu (hook pre("save") sẽ tự hash)
    user.password = newPassword;
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
