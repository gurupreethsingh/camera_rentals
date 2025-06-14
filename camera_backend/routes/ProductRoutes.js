const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Multer upload configuration
const { productUpload } = ProductController;

// ========== CREATE ==========
// router.post(
//   "/add-product",
//   productUpload.fields([
//     { name: "product_image", maxCount: 1 },
//     { name: "all_product_images", maxCount: 10 },
//   ]),
//   ProductController.createProduct
// );

router.post(
  "/add-product",
  productUpload.fields([
    { name: "product_image", maxCount: 1 },
    { name: "product_image_1", maxCount: 1 },
    { name: "product_image_2", maxCount: 1 },
    { name: "product_image_3", maxCount: 1 },
    { name: "product_image_4", maxCount: 1 },
    { name: "product_image_5", maxCount: 1 },
    { name: "product_image_6", maxCount: 1 },
    { name: "product_image_7", maxCount: 1 },
    { name: "product_image_8", maxCount: 1 },
    { name: "product_image_9", maxCount: 1 },
    { name: "product_image_10", maxCount: 1 },
  ]),
  ProductController.createProduct
);

// ========== READ ==========
router.get("/all-added-products", ProductController.getAllProducts);

router.get(
  "/get-single-added-product-by-id/:id",
  ProductController.getProductById
);

router.get(
  "/get-products-by-category/:categoryId",
  ProductController.getProductsByCategory
);

router.get(
  "/get-products-by-subcategory/:subCategoryId",
  ProductController.getProductsBySubCategory
);

router.get("/get-products-sorted", ProductController.getProductsSorted);

// ========== UPDATE ==========
router.put(
  "/update-product/:id",
  productUpload.fields([
    { name: "product_image", maxCount: 1 },
    { name: "product_image_1", maxCount: 1 },
    { name: "product_image_2", maxCount: 1 },
    { name: "product_image_3", maxCount: 1 },
    { name: "product_image_4", maxCount: 1 },
    { name: "product_image_5", maxCount: 1 },
    { name: "product_image_6", maxCount: 1 },
    { name: "product_image_7", maxCount: 1 },
    { name: "product_image_8", maxCount: 1 },
    { name: "product_image_9", maxCount: 1 },
    { name: "product_image_10", maxCount: 1 },
  ]),
  ProductController.updateProductById
);

router.put(
  "/delete-product-image/:id",
  ProductController.deleteProductImageByKey
);

// ========== DELETE ==========
router.delete("/delete-product/:id", ProductController.deleteProductById);

router.put("/delete-product-image/:id", ProductController.deleteProductImage);

// ========== COUNTS ==========
router.get("/count-all-products", ProductController.countAllProducts);
router.get(
  "/count-products-by-category",
  ProductController.countProductsByCategory
);
router.get(
  "/count-products-by-subcategory",
  ProductController.countProductsBySubCategory
);
router.get(
  "/count-products-by-vendor",
  ProductController.countProductsByVendor
);
router.get(
  "/count-products-by-status",
  ProductController.countProductsByStatus
);
router.get(
  "/count-products-by-section",
  ProductController.countProductsBySection
);

// === New Search Route ===
router.get("/search-products", ProductController.searchProducts);

module.exports = router;
