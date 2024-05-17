const express = require("express");
const auth = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");
const {
  addProductController,
  getAllProductController,
  getproductByCatId,
  getproductById,
  updateProductController,
  deleteProductController,
  updateProductStatusController,
} = require("../controllers/productController");

const router = express.Router();

// add new product route
router.post(
  "/addProduct",
  auth.authenticateToken,
  checkRole.checkRole,
  addProductController
);

// Get all product route
router.get("/getAllProduct", auth.authenticateToken, getAllProductController);

// Get product by categoryId route
router.get("/getProductByCatId/:id", auth.authenticateToken, getproductByCatId);

// Get product by Id route
router.get("/getProductById/:id", auth.authenticateToken, getproductById);

// update product route
router.patch(
  "/updateProduct",
  auth.authenticateToken,
  checkRole.checkRole,
  updateProductController
);

// update product route
router.patch(
  "/updateProductStatus",
  auth.authenticateToken,
  checkRole.checkRole,
  updateProductStatusController
);

// delete product route
router.delete(
  "/deleteProduct/:id",
  auth.authenticateToken,
  checkRole.checkRole,
  deleteProductController
);

module.exports = router;
