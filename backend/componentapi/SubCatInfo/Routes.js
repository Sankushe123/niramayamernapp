const express = require("express");
const router = express.Router();
const subCategoryInfoController = require("./Controller");

router.get("/get", subCategoryInfoController.getAllSubCategoryInfo);
router.post("/by-slug", subCategoryInfoController.getSingleSubCategoryInfoBySlug);
router.get("/get/:id", subCategoryInfoController.getById);
router.post("/post", subCategoryInfoController.createSubCategoryInfo);
router.put("/put/:id", subCategoryInfoController.updateSubCategoryInfo);
router.delete("/delete/:id", subCategoryInfoController.deleteSubCategoryInfo);

module.exports = router;
