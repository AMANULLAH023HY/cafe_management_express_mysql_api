const express = require("express");
const {
  addCategoryController,
  getAllCategoryController,
  updateCategotyController,
  deleteCategotyController,
} = require("../controllers/categoryController");
const auth = require("../middleware/authentication");
const checkToken = require("../middleware/checkRole");

const router = express.Router();

// Add category route
router.post(
  "/addCategory",
  auth.authenticateToken,
  checkToken.checkRole,
  addCategoryController
);

// get all category route
router.get(
  "/getCategory",
  auth.authenticateToken,
  checkToken.checkRole,
  getAllCategoryController
);

// Update category route
router.patch(
  "/updateCategory",
  auth.authenticateToken,
  checkToken.checkRole,
  updateCategotyController
);

// delete category route
router.delete(
  "/deleteCategory",
  auth.authenticateToken,
  checkToken.checkRole,
  deleteCategotyController
);

module.exports = router;
