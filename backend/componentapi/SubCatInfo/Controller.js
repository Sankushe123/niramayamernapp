const slugify = require("slugify");
const mongoose = require("mongoose");
const SubCategoryInfo = require("./Model");
const Blog = require("../BlogsManagement/Model"); // Assuming you have these
const FAQ = require("../FaqManagement/Model");

const normalize = (str) => slugify(str || "", { lower: true, strict: true });

exports.getAllSubCategoryInfo = async (req, res) => {
  try {
    const subCategoryInfos = await SubCategoryInfo.find().lean();
    res.status(200).json(subCategoryInfos);
  } catch (error) {
    console.error("❌ Error fetching SubCategoryInfo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Missing subcategory info ID" });
    }

    const subCategoryInfo = await SubCategoryInfo.findById(id).lean();

    if (!subCategoryInfo) {
      return res.status(404).json({ message: "SubCategoryInfo not found" });
    }

    res.status(200).json(subCategoryInfo);
  } catch (error) {
    console.error("❌ Error fetching SubCategoryInfo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getSingleSubCategoryInfoBySlug = async (req, res) => {
  try {
    const { categorySlug, subcategorySlug } = req.body;

    console.log("req.body",req.body);
    
    if (!categorySlug || !subcategorySlug) {
      return res.status(400).json({ message: "Missing query parameters" });
    }

    const formattedCategory = normalize(categorySlug);
    const formattedSubCategory = normalize(subcategorySlug);

    const allSubCats = await SubCategoryInfo.find().lean();

    const match = allSubCats.find(item => {
      return (
        normalize(item.categoryName) === formattedCategory &&
        normalize(item.subCategoryName) === formattedSubCategory
      );
    });

    if (!match) {
      return res.status(404).json({ message: "SubCategoryInfo not found" });
    }

    // Fetch related blogs and FAQs
    const blogs = await Blog.find({
      blogCatID: match.categoryId,
      blogSubCatID: match.subCategoryId,
    }).lean();

    const faqs = await FAQ.find({
      categoryId: match.categoryId,
      subcategoryId: match.subCategoryId,
    }).lean();

    res.status(200).json({
      ...match,
      blogs: blogs || [],
      faqs: faqs || [],
    });
  } catch (error) {
    console.error("❌ Error fetching SubCategoryInfo by slug:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createSubCategoryInfo = async (req, res) => {
  try {
    const {
      subCategoryTitle,
      subCategoryContent,
      categoryName,
      subCategoryName,
      categoryId,
      subCategoryId,
      imagesArray,
    } = req.body;

    if (!subCategoryTitle || typeof subCategoryTitle !== "string") {
      return res.status(400).json({ message: "subCategoryTitle must be a non-empty string" });
    }

    const slug = slugify(subCategoryTitle, { lower: true, strict: true });

    const newSubCatInfo = new SubCategoryInfo({
      _id: new mongoose.Types.ObjectId(),
      subCategoryTitle,
      subCategoryContent,
      categoryName,
      subCategoryName,
      categoryId,
      subCategoryId,
      slug,
      imagesArray: imagesArray || [],
    });

    const saved = await newSubCatInfo.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating SubCategoryInfo:", error);
    res.status(500).json({ message: error.message || "Failed to create SubCategoryInfo" });
  }
};

exports.updateSubCategoryInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      subCategoryTitle,
      subCategoryContent,
      categoryName,
      subCategoryName,
      categoryId,
      subCategoryId,
      imagesArray,
    } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid SubCategoryInfo ID" });
    }

    const slug = slugify(subCategoryTitle, { lower: true, strict: true });

    const updated = await SubCategoryInfo.findByIdAndUpdate(
      id,
      {
        subCategoryTitle,
        subCategoryContent,
        categoryName,
        subCategoryName,
        categoryId,
        subCategoryId,
        slug,
        imagesArray: imagesArray || [],
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "SubCategoryInfo not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating SubCategoryInfo:", error);
    res.status(500).json({ message: "Failed to update SubCategoryInfo" });
  }
};

exports.deleteSubCategoryInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await SubCategoryInfo.findOneAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "SubCategoryInfo not found" });

    res.status(200).json({ message: "SubCategoryInfo deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting SubCategoryInfo:", error);
    res.status(500).json({ message: "Failed to delete SubCategoryInfo" });
  }
};
