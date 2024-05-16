const JWT = require("jsonwebtoken");
const db = require("../config/db");

// user registration controller
const signupController = (req, res) => {
  try {
    const user = req.body;
    let query = "SELECT email,password,role,status FROM user WHERE email = ?";
    db.query(query, [user.email], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "something went wrong!",
          error: err.message,
        });
      } else {
        if (result.length <= 0) {
          query =
            "INSERT INTO user (name,contactNumber,email,password,status,role)VALUES(?,?,?,?,'false','user')";
          db.query(
            query,
            [user.name, user.contactNumber, user.email, user.password],
            (err, result) => {
              if (err) {
                res.status(500).json({
                  message: "something went wrong!",
                  error: err.message,
                });
              } else {
                res.status(200).json({
                  message: "User Registration successfully!",
                  user: result,
                });
              }
            }
          );
        } else {
          res.status(400).json({ message: "Email already exist" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// user login controller

const loginController = (req, res) => {
  try {
    const user = req.body;
    let query = "SELECT email,password,role,status FROM user WHERE email = ?";

    db.query(query, [user.email], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong!",
          err: err.message,
        });
      } else {
        if (result.length <= 0 || result[0].password != user.password) {
          res.status(401).json({
            message: "Incorrect user or password",
          });
        } else if (result[0].status == "false") {
          res.status(401).json({
            message: "Wait for admin approval!",
          });
          //   Generate JWT TOKEN
        } else if (result[0].password == user.password) {
          const response = { email: result[0].email, role: result[0].role };
          const accessToken = JWT.sign(response, process.env.ACCESS_TOKEN, {
            expiresIn: "8h",
          });
          res.status(200).json({
            message: "Admin login successfully!",
            user: result,
            token: accessToken,
          });
        } else {
          res.status(400).json({
            message: "Something went wrong. Please try again!",
          });
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
    });
  }
};

module.exports = { signupController, loginController };
