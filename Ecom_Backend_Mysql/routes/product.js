const express = require("express");
const router = express.Router();

const {
  getSubCategories,
  getCategories,
  getSubCategoriesByCategory,
  CategoryById
} = require("../controllers/product");

router.get("/categories", getCategories); 
router.get("/categories/:categoryId", CategoryById); 
router.get("/subcategories/:categoryId", getSubCategoriesByCategory);
router.get("/subcategories", getSubCategories);
module.exports = router;
