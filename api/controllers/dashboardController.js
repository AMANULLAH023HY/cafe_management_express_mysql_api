// const db = require("../config/db");

// // get dashboard details controller
// const dashboardDetailsController = (req, res) => {
//   try {
//     var categoryCount;
//     var productCount;
//     var billCount;

//     let query = "SELECT count(id) as categoryCount from category";

//     db.query(query, (err, result) => {
//       if (err) {
//         res.status(500).json({
//           message: "Something went wrong!",
//           error: err.message,
//         });
//       } else {
//         categoryCount = result[0].categoryCount;
//       }
//     });

//     var query = "SELECT count(id) as productCount FROM product";
//     db.query(query, [id], (err, result) => {
//       if (err) {
//         res.status(500).json({
//           message: "Something went wrong!",
//           error: err.message,
//         });
//       } else {
//         productCount = result[0].productCount;
//       }
//     });

//     var query = "SELECT count(id) as billCount FROM bill";
//     db.query(query, (err, result) => {
//       if (err) {
//         res.status(500).json({
//           message: "Something went wrong!",
//           error: err.message,
//         });
//       } else {
//         billCount = result[0].billCount;
//         var data = {
//           category: categoryCount,
//           product: productCount,
//           bill: billCount,
//         };

//         res.status(200).json({
//           message: "get all Data in dashboard successfully!",
//           data: data,
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internla server Error!",
//       error: error.message,
//     });
//   }
// };

// module.exports = { dashboardDetailsController };




const db = require("../config/db");

// get dashboard details controller
const dashboardDetailsController = (req, res) => {
  try {
    var categoryCount;
    var productCount;
    var billCount;

    let query1 = "SELECT count(id) as categoryCount from category";
    let query2 = "SELECT count(id) as productCount FROM product";
    let query3 = "SELECT count(id) as billCount FROM bill";

    db.query(query1, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong!",
          error: err.message,
        });
      } else {
        categoryCount = result[0].categoryCount;

        db.query(query2, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Something went wrong!",
              error: err.message,
            });
          } else {
            productCount = result[0].productCount;

            db.query(query3, (err, result) => {
              if (err) {
                return res.status(500).json({
                  message: "Something went wrong!",
                  error: err.message,
                });
              } else {
                billCount = result[0].billCount;

                var data = {
                  category: categoryCount,
                  product: productCount,
                  bill: billCount,
                };

                return res.status(200).json({
                  message: "get all Data in dashboard successfully!",
                  data: data,
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error!",
      error: error.message,
    });
  }
};

module.exports = { dashboardDetailsController };

