const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        categoryName: {
            type: String,
            required: true,
            trim: true
        },
        subCategoryName: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
