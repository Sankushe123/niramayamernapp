const FAQ = require('./Model');
const mongoose = require('mongoose');
// GET /api/faqs?id=xxx
exports.getFAQs = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const faq = await FAQ.findById(id);
      if (!faq) return res.status(404).json({ message: "FAQ not found" });
      return res.status(200).json(faq);
    }

    const faqs = await FAQ.find().sort({ createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    console.error("❌ Error fetching FAQs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /api/faqs
exports.createFAQ = async (req, res) => {
  try {
    const {
      question,
      answer,
      categoryId,
      categoryName,
      subcategoryId,
      subCategoryName
    } = req.body;

    const newFAQ = new FAQ({
       _id: new mongoose.Types.ObjectId(),
      question,
      answer,
      categoryId,
      categoryName,
      subcategoryId,
      subCategoryName
    });

    const saved = await newFAQ.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating FAQ:", error);
    res.status(500).json({ message: "Failed to create FAQ" });
  }
};

// PUT /api/faqs/:id
exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      question,
      answer,
      categoryId,
      categoryName,
      subcategoryId,
      subCategoryName
    } = req.body;

    const updated = await FAQ.findByIdAndUpdate(
      id,
      { question, answer, categoryId, categoryName, subcategoryId, subCategoryName },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "FAQ not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating FAQ:", error);
    res.status(500).json({ message: "Failed to update FAQ" });
  }
};

// DELETE /api/faqs/:id
exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await FAQ.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "FAQ not found" });

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting FAQ:", error);
    res.status(500).json({ message: "Failed to delete FAQ" });
  }
};
