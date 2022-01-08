const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getSingleProduct,
  productByCategory,
  getProductsForSubCategory,
  relatedProducts,
  searchProduct,
  totalProducts,
} = require("../controllers/product");

router.get("/products", getAllProducts);
router.get("/products/:productID", getSingleProduct);
router.get("/products/:categoryID", productByCategory);
router.get("/products/:subCatId", getProductsForSubCategory);
router.get("/products/:productID", relatedProducts);
router.get("/products/search", searchProduct);
router.get("/products/totalCount", totalProducts);

module.exports = router;
