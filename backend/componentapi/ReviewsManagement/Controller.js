const Review = require('./Model');
const mongoose = require('mongoose');
// GET /api/reviews?id=xxx
exports.getReviews = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const review = await Review.findById(id);
      if (!review) return res.status(404).json({ message: "Review not found" });
      return res.status(200).json(review);
    }

    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getReviewsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const review = await Review.findById(id);
      if (!review) return res.status(404).json({ message: "Review not found" });
      return res.status(200).json(review);
    }

    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const {
      reviewType,
      videoUrl = null,
      reviewText = null,
      rating,
      reviewerName,
      createdBy
    } = req.body;

    const newReview = new Review({
      _id: new mongoose.Types.ObjectId(),
      reviewType,
      videoUrl,
      reviewText,
      rating,
      reviewerName,
      createdBy
    });

    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating review:", error);
    res.status(500).json({ message: "Failed to create review" });
  }
};

// PUT /api/reviews/:id
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      reviewType,
      videoUrl = null,
      reviewText = null,
      createdBy,
      rating,
      reviewerName
    } = req.body;

    const updated = await Review.findByIdAndUpdate(
      id,
      { reviewType, videoUrl, reviewText, createdBy, rating, reviewerName },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating review:", error);
    res.status(500).json({ message: "Failed to update review" });
  }
};

// DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Review not found" });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};
