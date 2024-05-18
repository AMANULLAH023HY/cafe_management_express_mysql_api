
const db = require("../config/db");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const uuid = require("uuid");

const generateReport = (req, res) => {
  try {
    const generateUuid = uuid.v1();
    const orderDetails = req.body;

    // Check if productDetails is a string and parse it if necessary
    let productDetailsReport;
    if (typeof orderDetails.productDetails === 'string') {
      try {
        productDetailsReport = JSON.parse(orderDetails.productDetails);
      } catch (parseError) {
        return res.status(400).json({
          message: "Invalid JSON format in productDetails",
          error: parseError.message,
        });
      }
    } else {
      productDetailsReport = orderDetails.productDetails;
    }

    let query =
      "INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createdBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        orderDetails.name,
        generateUuid,
        orderDetails.email,
        orderDetails.contactNumber,
        orderDetails.paymentMethod,
        orderDetails.total,
        JSON.stringify(orderDetails.productDetails), // Ensure productDetails is stored as a string
        res.locals.email,
      ],
      (err, result) => {
        if (err) {
          res.status(501).json({
            message: "Something went wrong",
            error: err.message,
          });
        } else {
          // Correct path to the report.ejs file
          const templatePath = path.join(__dirname, 'report.ejs');

          ejs.renderFile(
            templatePath,
            {
              productDetails: productDetailsReport,
              name: orderDetails.name,
              email: orderDetails.email,
              contactNumber: orderDetails.contactNumber,
              paymentMethod: orderDetails.paymentMethod,
              totalAmount: orderDetails.total,
            },
            (err, data) => {
              if (err) {
                res.status(502).json({
                  message: "Something went wrong",
                  error: err.message,
                });
              } else {
                const filePath = path.join(
                  __dirname,
                  "../generated_pdf/",
                  `${generateUuid}.pdf`
                );
                pdf.create(data).toFile(filePath, (err, data) => {
                  if (err) {
                    res.status(503).json({
                      message: "Something went wrong",
                      error: err.message,
                    });
                  } else {
                    res.status(200).json({
                      message: "Generated the UUID and PDF successfully!",
                      uuid: generateUuid,
                    });
                  }
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { generateReport };

