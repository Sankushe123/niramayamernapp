const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    _id : mongoose.Schema.Types.ObjectId,
    bannerEventName: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

module.exports = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
