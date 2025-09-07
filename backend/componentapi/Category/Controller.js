
const Category = require("./Model");
const mongoose = require("mongoose");
exports.getCategories = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const category = await Category.findById(id);
      if (!category) return res.status(404).json({ message: "Category not found" });
      return res.status(200).json(category);
    }

    const categories = await Category.find().sort({ created_at: -1 });
    return res.status(200).json(categories);
  } catch (error) {
    console.error("❌ Error fetching category:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      categoryName
    });

    const savedCategory = await category.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    console.error("❌ Error creating category:", error);
    return res.status(500).json({ message: "Failed to create category" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { catid } = req.params;
    const { categoryName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(catid)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const updated = await Category.findByIdAndUpdate(
      catid,
      { categoryName },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Category not found" });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating category:", error);
    return res.status(500).json({ message: "Failed to update category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { catid } = req.params;

    const deleted = await Category.findByIdAndDelete(catid);

    if (!deleted) return res.status(404).json({ message: "Category not found" });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return res.status(500).json({ message: "Failed to delete category" });
  }
};


exports.getMenuStructure = async (req, res) => {
  try {
    // Fetch categories & subcategories
    const categories = await Category.find().sort({ categoryName: 1 });
    const subCategories = await SubCategory.find().sort({ subCategoryName: 1 });

    const menuMap = new Map();

    // Create menu mapping
    for (const category of categories) {
      const categoryTitle = category.categoryName;
      menuMap.set(categoryTitle, []);

      const relatedSubs = subCategories.filter(
        (sub) => sub.categoryId.toString() === category._id.toString()
      );

      for (const sub of relatedSubs) {
        const slug = `/services/${slugify(categoryTitle)}/${slugify(sub.subCategoryName)}`;
        menuMap.get(categoryTitle).push({ name: sub.subCategoryName, slug });
      }
    }

    // Convert Map → Array for frontend
    const menu = [];
    for (const [title, subLinks] of menuMap.entries()) {
      menu.push({ title, subLinks });
    }

    return res.status(200).json(menu);
  } catch (error) {
    console.error("❌ Error generating menu structure:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Helper - Slugify
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}