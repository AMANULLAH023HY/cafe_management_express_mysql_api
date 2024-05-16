const express =require(  "express");
const dotenv =require ("dotenv");
const bodyParser =require("body-parser");
const db = require('./config/db')



// const cors = require('cors')
dotenv.config();

const app = express();
// Middleware 
app.use(express.json());
app.use(bodyParser.json());

// ROUTES

const userRoute = require('./routes/userRoute');
app.use('/api/user',userRoute);





app.all("*", (req, res) => {
  res.status(404).send("OOPS! 404 page not found");
});

module.exports =  app;