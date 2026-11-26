const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  description: String,
  thumbnail: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, default: 0, min: 0 },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  duration: String,
  learningOutcomes: [String],
  requirements: [String],
  isDeleted: { type: Boolean, default: false },
  studentCount: { type: Number, default: 0 }
}, { timestamps: true });

courseSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Course', courseSchema);