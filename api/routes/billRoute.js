const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const {
  generateReport,
  getBillPdfController,
} = require("../controllers/billController");

// generate bill pdf product details and user details

router.post("/generateReport", auth.authenticateToken, generateReport);

// get pdf bill in body details controller
router.post("/getBillPdf", auth.authenticateToken, getBillPdfController);

module.exports = router;
