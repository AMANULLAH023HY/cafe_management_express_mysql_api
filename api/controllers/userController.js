const { query } = require("express");
const db = require("../config/db");

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

module.exports = { signupController };
