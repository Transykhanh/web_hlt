const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Lấy token từ header: "Authorization: Bearer <token>"
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }
    const token = header.split(" ")[1];

    // 2. Xác minh token (sai chữ ký hoặc hết hạn sẽ ném lỗi)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Tìm user trong DB
    const user = await User.findById(decoded.id);

    // 4. Kiểm tra user còn tồn tại và còn hoạt động
    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }
    if (user.status !== "active") {
      return res.status(403).json({ message: "Tài khoản không hoạt động" });
    }

    // 5. Gắn user vào req để controller phía sau dùng
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
    }
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = authMiddleware;