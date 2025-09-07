const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  reviewType: {
    type: String,
    enum: ['text', 'video'],
    required: true
  },
  videoUrl: {
    type: String,
    default: null
  },
  reviewText: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  reviewerName: {
    type: String,
    required: true
  },
  createdBy: {
    type: String
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.models.Review || mongoose.model('Review', reviewSchema);
