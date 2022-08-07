//import all the required modules
const mongoose = require("mongoose");

//create an async function for handling the db connection
const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`Connected to database...`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
