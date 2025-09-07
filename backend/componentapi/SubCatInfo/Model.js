const mongoose = require("mongoose");


const SubCategoryInfoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  subCategoryTitle: { type: String, required: true },
  subCategoryContent: { type: String, required: true },
  categoryName: { type: String, required: true },
  subCategoryName: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
  slug: { type: String, required: true, unique: true },
  imagesArray: { type: [String], default: [] }, // array of image URLs or paths
}, { timestamps: true });

module.exports = mongoose.models.SubCategoryInfo || mongoose.model("SubCategoryInfo", SubCategoryInfoSchema);
