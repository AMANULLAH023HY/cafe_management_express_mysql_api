const express = require("express");
const {
  addCategoryController,
  getAllCategoryController,
  updateCategotyController,
  deleteCategotyController,
} = require("../controllers/categoryController");
const auth = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

// Add category route
router.post(
  "/addCategory",
  auth.authenticateToken,
  checkRole.checkRole,
  addCategoryController
);

// get all category route
router.get(
  "/getCategory",
  auth.authenticateToken,
  checkRole.checkRole,
  getAllCategoryController
);

// Update category route
router.patch(
  "/updateCategory",
  auth.authenticateToken,
  checkRole.checkRole,
  updateCategotyController
);

// delete category route
router.delete(
  "/deleteCategory",
  auth.authenticateToken,
  checkRole.checkRole,
  deleteCategotyController
);

module.exports = router;
