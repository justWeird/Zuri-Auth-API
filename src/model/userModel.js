// import all important modules
const mongoose = require("mongoose");

//initialize the model schema
const authSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["User", "Staff", "Manager", "Admin"],
        default: "User"
    }

}, { timestamp: true });

//this is a command to select which database in a cluster to use
// const selectDB = mongoose.connection.useDb("Practice")

//auth-api refers to the collection created in a particular db (as specified above)
const authModel = mongoose.model("auth-api", authSchema);

module.exports = authModel;
