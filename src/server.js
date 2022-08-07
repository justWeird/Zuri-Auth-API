// Begin by importing all the required modules
const express = require("express");
const connectDB = require("./config/authDB");
const dotenv = require("dotenv").config();
const router = require("./router/authRouter");

//initialise the database
const URI = process.env.CLOUD_MONGODB || process.env.LOCAL_MONGODB;
connectDB(URI);

//initialise express
const app = express();

//initialise bodyparser for JSON objects
app.use(express.json());

//set the routes from the router folder
app.use("/", router);

//set the server to listen at particular ports
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server now running, listening at port ${PORT}`);
});
