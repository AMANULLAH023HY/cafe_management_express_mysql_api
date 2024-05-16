const express = require('express');
const { signupController, loginController, forgotPasswordController, getUserDetailsController, updateUserController, checkTokenController, changePasswordController } = require('../controllers/userController');

const router = express.Router();

// New user create route
router.post('/signup',signupController);

// user login route
router.post('/login',loginController);

// forgot password route
router.post('/forgotPassword',forgotPasswordController);

// Get user details roles only user route

router.get('/getUser', getUserDetailsController);

// Update user status route
router.patch('/updateUser', updateUserController);

// get check token route
router.get('/checkToken', checkTokenController);

// Change password routes
router.post('/changePassword', changePasswordController)



module.exports = router;