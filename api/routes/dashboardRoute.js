const express = require('express');
const auth= require('../middleware/authentication');
const { dashboardDetailsController } = require('../controllers/dashboardController');
const router = express.Router();

router.get('/dashboardDetails', auth.authenticateToken, dashboardDetailsController);

module.exports = router;





