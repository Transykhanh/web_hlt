const mongoose = require('mongoose');
const Course = require('../models/Course');
require('../models/Category'); // đăng ký model để populate hoạt động

// GET /api/courses?keyword=&categoryId=&level=&free=&page=&limit=
exports.getCourses = async (req, res) => {
  try {
    const { keyword, categoryId, level, free } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 9, 50);

    // Luôn chỉ lấy khóa đã xuất bản và chưa bị xóa mềm
    const filter = { status: 'published', isDeleted: false };

    if (keyword) {
      // Escape ký tự đặc biệt để tránh lỗi/regex injection
      const safe = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.title = { $regex: safe, $options: 'i' };
    }
    if (categoryId) {
      if (!mongoose.isValidObjectId(categoryId)) {
        return res.status(400).json({ message: 'categoryId không hợp lệ' });
      }
      filter.categoryId = categoryId;
    }
    if (['beginner', 'intermediate', 'advanced'].includes(level)) {
      filter.level = level;
    }
    if (free === 'true') filter.price = 0;
    if (free === 'false') filter.price = { $gt: 0 };

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .select('title slug thumbnail price level duration studentCount categoryId')
        .populate('categoryId', 'name')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Course.countDocuments(filter)
    ]);

    res.json({
      data: courses,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};