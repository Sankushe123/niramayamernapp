const mongoose = require("mongoose");
const Banner = require("./model");

// CREATE Banner
exports.createBanner = async (req, res) => {
  try {
    const { bannerEventName, imageUrl, eventDate, status } = req.body;

    const newBanner = new Banner({
      _id: new mongoose.Types.ObjectId(),
      bannerEventName,
      imageUrl,
      eventDate,
      status
    });

    await newBanner.save();
    res.status(201).json({ message: "Banner created successfully", banner: newBanner });
  } catch (error) {
    res.status(500).json({ message: "Error creating banner", error: error.message });
  }
};

// READ — Get all banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ created_at: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching banners", error: error.message });
  }
};

// READ — Get single banner by ID
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: "Error fetching banner", error: error.message });
  }
};

// UPDATE Banner
exports.updateBanner = async (req, res) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBanner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (error) {
    res.status(500).json({ message: "Error updating banner", error: error.message });
  }
};

// DELETE Banner
exports.deleteBanner = async (req, res) => {
  try {
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
    if (!deletedBanner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting banner", error: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    await Banner.updateMany({}, { status: "inactive" });
    res.json({ message: "All banners set to inactive" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CHECK if any active banner exists
exports.checkActivity = async (req, res) => {
  try {
    // Find banners with status "active"
    const activeBanner = await Banner.findOne({ status: "active" }).sort({ created_at: -1 });

    if (!activeBanner) {
      return res.status(200).json({ active: false, message: "No active banner found" });
    }

    // Return the active banner info
    res.status(200).json({ active: true, banner: activeBanner });
  } catch (error) {
    res.status(500).json({ message: "Error checking active banner", error: error.message });
  }
};

