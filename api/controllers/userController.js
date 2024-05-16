const JWT = require("jsonwebtoken");
const db = require("../config/db");
const nodemailer = require("nodemailer");

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

// forget password with mail controller

var transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
});

const forgotPasswordController = (req, res) => {
  try {
    const user = req.body;
    let query = "SELECT email,password FROM user WHERE email = ?";

    db.query(query, [user.email], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "something went wrong",
          error: err.message,
        });
      } else {
        if (result.length <= 0) {
          res.status(200).json({
            message: "Password sent successfully to your email",
          });
        } else {
          var mailOptions = {
            from: process.env.EMAIL,
            to: result[0].email,
            subject: "Password by Cafe management system ",
            htpm: `<p>
                        <b>Your login details for Cafe management system</b>
                        <br>
                        <b>Email: </b>'+result[0].email+'<br>
                        <b>Password: </b>'+result[0].password+'<br>
                        <a href ="http://localhost:4200/" >Click here to login</a>
                        
                        </p>`,
          };
          transpoter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Email sent:", +info.response);
            }
          });
          res.status(200).json({
            message: "Password sent successfully to your email",
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

// Get user details roles only user controller

const getUserDetailsController = (req, res) => {
  try {
    let query =
      "SELECT id,name,email,contactNumber,status FROM user WHERE role = 'user'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Get User details Successfully!",
          user: result,
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

// Update user status controller
const updateUserController = (req, res) => {
  try {
    const user = req.body;
    let query = "UPDATE user SET status = ? WHERE id=?";
    db.query(query, [user.status, user.id], (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          error: err.message,
        });
      }else{
        if(result.affectedRows == 0){
            res.status(404).json({
                message:"User id doesn't exist"
            })
        }else{
            res.status(200).json({
                message:"user updated successfully!"
            })  
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

//get checkToken controller

const checkTokenController = (req,res)=>{
    res.status(200).json({message:'true'});
}

// Chnage password controller
const changePasswordController = (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({
            message:"Internal server Error",
            error:error.message
        })
    }
}

module.exports = {
  signupController,
  loginController,
  forgotPasswordController,
  getUserDetailsController,
  updateUserController,
  checkTokenController,
  changePasswordController
};
