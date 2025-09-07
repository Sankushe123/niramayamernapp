const express = require("express");
const router = express.Router();
const bannerController = require("./controller");

// Create
router.post("/post", bannerController.createBanner);

// Read all
router.get("/get", bannerController.getAllBanners);

// Read single
router.get("/get/:id", bannerController.getBannerById);

// Update
router.put("/put/:id", bannerController.updateBanner);

// Delete
router.delete("/delete/:id", bannerController.deleteBanner);
router.put("/set-all-inactive", bannerController.updateActivity);
router.get("/check-Active", bannerController.checkActivity);

module.exports = router;
