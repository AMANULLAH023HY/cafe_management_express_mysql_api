const mysql = require("mysql");


const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cafe_db",
});

connectDB.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("DB Connected!");
  }
});

module.exports = connectDB;