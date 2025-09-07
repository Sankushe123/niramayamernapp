const express = require("express");
const router = express.Router();
const subCategoryController = require("./Controller");

router.get("/get", subCategoryController.getSubCategories);
router.post("/post", subCategoryController.createSubCategory);
router.put("/put/:subcatid", subCategoryController.updateSubCategory);
router.delete("/delete/:subcatid", subCategoryController.deleteSubCategory);

router.get("/get/categoryId/:categoryId", subCategoryController.getSubCatByCat);


router.get("/menu", subCategoryController.getMenuStructure);
module.exports = router;
