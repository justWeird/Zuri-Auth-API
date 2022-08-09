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

const authModel = mongoose.model("auth-api", authSchema);

module.exports = authModel;
