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

//create another database to keep track of invalid tokens
const tokenSchema = mongoose.Schema({
token: {
    type: String
}
})

//this is a command to select which database in a cluster to use
const authDB = mongoose.connection.useDb("Practice")

//auth-api refers to the collection created in a particular db (as specified above)
const authModel = authDB.model("auth-api", authSchema);
const tokenModel = authDB.model("invalid-token", tokenSchema)

module.exports = tokenModel;
module.exports = authModel;
