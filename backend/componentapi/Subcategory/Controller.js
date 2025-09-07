const mongoose = require("mongoose");
const SubCategory = require("./Model");
const Category = require("../Category/Model");
const slugify = require('slugify');

exports.getSubCategories = async (req, res) => {
  try {
    const { id, categoryId } = req.query;

    if (id) {
      const subCategory = await SubCategory.findById(id).populate("categoryId", "categoryName");
      if (!subCategory) return res.status(404).json({ message: "Subcategory not found" });
      return res.status(200).json(subCategory);
    }

    if (categoryId) {
      const subCategories = await SubCategory.find({ categoryId })
        .populate("categoryId", "categoryName");
      if (!subCategories.length) return res.status(404).json({ message: "No subcategories found" });
      return res.status(200).json(subCategories);
    }

    const allSubs = await SubCategory.find().populate("categoryId", "categoryName");
    return res.status(200).json(allSubs);
  } catch (error) {
    console.error("❌ Error fetching subcategory:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryName } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const newSubCategory = new SubCategory({
      _id: new mongoose.Types.ObjectId(),  // explicit _id creation
      categoryId,
      categoryName: category.categoryName,
      subCategoryName,
    });

    const savedSubCategory = await newSubCategory.save();
    return res.status(201).json(savedSubCategory);
  } catch (error) {
    console.error("❌ Error creating subcategory:", error);
    return res.status(500).json({ message: "Failed to create subcategory" });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { subcatid } = req.params;
    const { categoryId, subCategoryName } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subcatid,
      {
        categoryId,
        categoryName: category.categoryName,
        subCategoryName
      },
      { new: true }
    );

    if (!updatedSubCategory)
      return res.status(404).json({ message: "Subcategory not found" });

    return res.status(200).json(updatedSubCategory);
  } catch (error) {
    console.error("❌ Error updating subcategory:", error);
    return res.status(500).json({ message: "Failed to update subcategory" });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { subcatid } = req.params;

    const deleted = await SubCategory.findByIdAndDelete(subcatid);
    if (!deleted) return res.status(404).json({ message: "Subcategory not found" });

    return res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting subcategory:", error);
    return res.status(500).json({ message: "Failed to delete subcategory" });
  }
};

exports.getSubCatByCat = async (req, res) => {
  try {
    const { categoryId } = req.params; // categoryId comes from URL

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const subCategories = await SubCategory.find({ categoryId: categoryId });

    if (!subCategories || subCategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found for this category" });
    }

    return res.status(200).json(subCategories);
  } catch (error) {
    console.error("❌ Error fetching subcategories by category:", error);
    return res.status(500).json({ message: "Failed to fetch subcategories" });
  }
};

exports.getMenuStructure = async (req, res) => {
  try {
    // Fetch categories with their subcategories
    const categories = await Category.find().lean();
    const subCategories = await SubCategory.find().lean();

    const menuMap = new Map();

    categories.forEach(category => {
      menuMap.set(category.categoryName, []);
    });

    subCategories.forEach(sub => {
      const category = categories.find(c => c._id.toString() === sub.categoryId.toString());
      if (category) {
        const slug = `?category=${slugify(category.categoryName)}?subcategory=${slugify(sub.subCategoryName)}`;
        menuMap.get(category.categoryName).push({
          name: sub.subCategoryName,
          slug
        });
      }
    });

    const menu = [];
    for (const [title, subLinks] of menuMap.entries()) {
      menu.push({ title, subLinks });
    }

    res.status(200).json(menu);
  } catch (error) {
    console.error("❌ Error generating menu structure:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

