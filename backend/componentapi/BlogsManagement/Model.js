const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  _id	: mongoose.Schema.Types.ObjectId,
  blogTitle: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  blogContent: { type: String, required: true },
  blogCategory: { type: String, required: true },
  blogSubcategory: { type: String, required: true },
  blogCatID: { type: String, required: true },
  blogSubCatID: { type: String, required: true },
  imagesArray: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
