const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: { type: String, required: true },
  answer: { type: String, required: true },
  categoryId: { type: String, required: true },
  categoryName: { type: String, required: true },
  subcategoryId: { type: String, required: true },
  subCategoryName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);
