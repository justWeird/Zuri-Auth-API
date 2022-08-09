//import all required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//create authentication middleware using token to authorize routes
exports.authenticateUser = async (req, res, next) => {
  try {
    //check if token exists. The token is added in the header so obtain data from there
    const reqHead = req.headers.authorization;
    if (!reqHead) {
      return res.status(400).json({
        message: "Authentication is required",
      });
    }
    //since authentication head exists, proceed to obtain token
    const splitReqHead = reqHead.split(" ");
    //validate authorization format
    if (splitReqHead[0] !== "Bearer") {
      return res.status(400).json({
        message: "Authorization format is incorrect",
      });
    }
    let token = splitReqHead[1];
    //use jwt to decode
    const tempToken = jwt.verify(token, process.env.SECRET_KEY);
    //if decoding fails, let user know
    if (!tempToken) {
      return res.status(400).json({
        message: "Invalid authorization token. Login again",
      });
    }
    req.user = tempToken;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create role based authorization.
//user authorization
exports.checkIfUser = (req, res, next) => {
  if (req.user.role !== "User") {
    return res.status(400).json({
      message:
        "This route is user protected only. Login with user account to gain access",
    });
  }
  return next();
};

//staff authorization
exports.checkIfStaff = (req, res, next) => {
  if (req.user.role !== "Staff") {
    return res.status(400).json({
      message:
        "This route is staff protected only. Login with staff account to gain access",
    });
  }
  return next();
};

//manager authorization
exports.checkIfManager = (req, res, next) => {
  if (req.user.role !== "Manager") {
    return res.status(400).json({
      message:
        "This route is manager protected only. Login with manager account to gain access",
    });
  }
  return next();
};

//admin authorization
exports.checkIfAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(400).json({
      message:
        "This route is admin protected only. Login with admin account to gain access",
    });
  }
  return next();
};
