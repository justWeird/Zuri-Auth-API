// import all important modules
const authModel = require("../model/userModel");
const tokenModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const defPass = process.env.DEFAULT_PASS;

//create all controller functions
//create new user
exports.createUser = async (req, res) => {
  try {
    //search if the current user already exists
    const chckUser = await authModel.findOne({ email: req.body.email });
    //if user already exists
    if (chckUser) {
      return res.status(400).json({
        message: "User already Exists",
      });
    }
    //if user does not exist, then create
    else {
      const newUserFName = await req.body.firstName;
      const newUserLName = await req.body.lastName;
      const newUserEmail = await req.body.email;
      const newUserRole = await req.body.role;

      //encrypt password and store in database
      const formSalt = await bcrypt.genSalt(10);
      const formHash = await bcrypt.hash(req.body.password, formSalt);
      const createNewUser = authModel.create({
        firstName: newUserFName,
        lastName: newUserLName,
        email: newUserEmail,
        role: newUserRole,
        password: formHash,
      });

      //   createNewUser.password = formHash;
      //   (await createNewUser).save;

      //finally return the required data
      res.status(200).json({
        message: "User registration successful",
        user: createNewUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create the login function
exports.login = async (req, res) => {
  try {
    //check if the user credential (email) exists
    const chckUser = await authModel.findOne({ email: req.body.email });
    //if user does not exist
    if (!chckUser) {
      return res.status(400).json({
        message: "User does not Exist",
      });
    }

    //compare encrypted password and entered password
    const validPassword = await bcrypt.compare(
      req.body.password,
      chckUser.password
    );
    //validPassword returns a boolean function. If password is wrong, decline login
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    //generate login token for authorization
    const payload = {
      id: (await chckUser)._id,
      firstName: chckUser.firstName,
      lastName: chckUser.lastName,
      role: chckUser.role,
    };

    const tempToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: Number(process.env.EXPIRY),
    });

    //finally return the required data. token is used to navigate othe routes
    res.status(200).json({
      message: "User login successful",
      tempToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create logout function
exports.logout = async (req, res) => {
  try {
    //get the token from the current user
    const reqHead = req.headers.authorization;
    if (!reqHead) {
      return res.status(400).json({
        message: "Authentication absent from logout",
      });
    }
    //since authentication head exists, proceed to obtain token
    const splitReqHead = reqHead.split(" ");
    //validate authorization format
    if (splitReqHead[0] !== "Bearer") {
      return res.status(400).json({
        message: "Authorization format is incorrect for logout",
      });
    }
    
    let invToken = splitReqHead[1];
    //add token to database
    const invTknDB = await tokenModel.create({
      token: invToken
    })
    //finally return the required data
    res.status(200).json({
      message: "Logout User Successful",
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create get user function
exports.getUser = async (req, res) => {
  try {
    //use req.user to obtain currently logged in user
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create get staff function
exports.getStaff = async (req, res) => {
  try {
    //use req.user to obtain currently logged in user
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create get manager function
exports.getManager = async (req, res) => {
  try {
    //use req.user to obtain currently logged in user
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create get admin function
exports.getAdmin = async (req, res) => {
  try {
    //use req.user to obtain currently logged in user
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//create password recovery function
exports.passRecover = async (req, res) => {
  try {
    //use req.user to obtain currently logged in user
    const currUser = await authModel.findOne({ _id: req.user.id });

    console.log(currUser);

    //create new password hash from default password
    //encrypt password and store in database
    const formSalt = await bcrypt.genSalt(10);
    const formHash = await bcrypt.hash(defPass, formSalt);
    currUser.password = formHash;
    currUser.save();
    //output data to user
    res.status(200).json({
      message: "Password successfully reset. Use Default Password",
      Default: process.env.DEFAULT_PASS,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
