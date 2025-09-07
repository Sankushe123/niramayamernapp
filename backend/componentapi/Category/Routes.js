const express = require("express");
const router = express.Router();
const categoryController = require("./Controller");



router.get("/get", categoryController.getCategories);
router.post("/post", categoryController.createCategory);
router.put("/put/:catid", categoryController.updateCategory);
router.delete("/delete/:catid", categoryController.deleteCategory);

module.exports = router;
