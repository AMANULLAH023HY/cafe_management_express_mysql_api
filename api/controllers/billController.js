const db = require("../config/db");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");

// generate bill pdf product details and user details
const generateReport = (req, res) => {
  try {
    const generateUuid = uuid.v1();
    const orderDetails = req.body;

    // Check if productDetails is a string and parse it if necessary
    let productDetailsReport;
    if (typeof orderDetails.productDetails === "string") {
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
          const templatePath = path.join(__dirname, "report.ejs");

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

// get pdf bill details in body controller

const getBillPdfController = (req, res) => {
  try {
    const orderDetails = req.body;
    const pdfPath = path.join(
      __dirname,
      "../generated_pdf/",
      `${orderDetails.uuid}.pdf`
    );
    const templatePath = path.join(__dirname, "report.ejs");

    if (fs.existsSync(pdfPath)) {
      res.contentType("application/pdf");
      fs.createReadStream(pdfPath).pipe(res);
    } else {
      const productDetailsReport = JSON.parse(orderDetails.productDetails);

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
            pdf.create(data).toFile(pdfPath, (err, data) => {
              if (err) {
                res.status(503).json({
                  message: "Something went wrong",
                  error: err.message,
                });
              } else {
                res.contentType("application/pdf");
                fs.createReadStream(pdfPath).pipe(res);
              }
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};


// get All bills controller 
const getAllBillsController  = (req,res)=>{
  try {
let query = "SELECT * FROM bill ORDER BY id DESC";
db.query(query,(err,result)=>{
  if(err){
    res.status(500).json({
      message:"Something went wrong!",
      error:err.message
    })
  }else{
    res.status(200).json({
      message:"Get all bill successfully!",
      bill:result
    })
  }
})

    
  } catch (error) {
    res.status(500).json({
      message:"Internal server Error!",
      error:error.message
    })
  }
}

// Delete bill by id controller 

const deleteBillByIdController = (req,res)=>{
try {
  const id  = req.params.id;
  let query = "DELETE FROM bill WHERE id = ?";
  db.query(query,[id],(err,result)=>{
    if(err){
      res.status(500).json({
        message:"Something went wrong!",
        error:err.message
      })
    }else{
      if(result.affectedRows == 0){
        res.status(404).json({
          message:"Bill id doesn't found!"
        })
      }else{
        res.status(200).json({
          message:"Bill deleted successfully!"
        })
      }
    }
  })
  
} catch (error) {
  res.status(500).json({
    message:"Internal server Error!",
    error:error.message 
  })
}
}



module.exports = { 
  generateReport, 
  getBillPdfController,
  getAllBillsController,
  deleteBillByIdController
 };
