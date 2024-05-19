const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");
const {
  generateReport,
  getBillPdfController,
  getAllBillsController,
  deleteBillByIdController,
} = require("../controllers/billController");

// generate bill pdf product details and user details

router.post("/generateReport", auth.authenticateToken, generateReport);

// get pdf bill in body details route
router.post("/getBillPdf", auth.authenticateToken, getBillPdfController);

// get all bill details route
router.get("/getAllBill", auth.authenticateToken, getAllBillsController);

// delete bill details by id route
router.delete(
  "/deleteBillBy/:id",
  auth.authenticateToken,
  deleteBillByIdController
);

module.exports = router;
