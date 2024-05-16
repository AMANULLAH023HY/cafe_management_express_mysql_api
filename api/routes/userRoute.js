const express = require("express");
const {
  signupController,
  loginController,
  forgotPasswordController,
  getUserDetailsController,
  updateUserController,
  checkTokenController,
  changePasswordController,
} = require("../controllers/userController");

const auth = require("../middleware/authentication");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

// New user create route
router.post("/signup", signupController);

// user login route
router.post("/login", loginController);

// forgot password route
router.post(
  "/forgotPassword",
  auth.authenticateToken,
  checkRole.checkRole,
  forgotPasswordController
);

// Get user details roles only user route

router.get(
  "/getUser",
  auth.authenticateToken,
  checkRole.checkRole,
  getUserDetailsController
);

// Update user status route
router.patch(
  "/updateUser",
  auth.authenticateToken,
  checkRole.checkRole,
  updateUserController
);

// get check token route
router.get(
  "/checkToken",
  auth.authenticateToken,
  checkRole.checkRole,
  checkTokenController
);

// Change password routes
router.post(
  "/changePassword",
  auth.authenticateToken,
 
  changePasswordController
);

module.exports = router;
