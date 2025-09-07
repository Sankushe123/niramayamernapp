// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    _id : mongoose.Schema.Types.ObjectId,
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: false } }
);

module.exports = mongoose.models.Category || mongoose.model("Category", categorySchema);
