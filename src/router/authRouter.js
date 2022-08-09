//import all the required modules
const express = require("express");
const authController = require("../controller/authController");
const {
  authenticateUser,
  checkIfStaff,
  checkIfUser,
  checkIfManager,
  checkIfAdmin,
} = require("../middleware/authentication");

//initialize router
const router = express.Router();

//put down all router url path and controller functions
//@route    create new user
//@desc
router.post("/signup", authController.createUser);

//@route    login
//@desc
router.post("/login", authController.login);

//@route    logout
//@desc     authentication exists, not role-protected
router.post("/logout", authenticateUser, authController.logout);

//@route    get logged in user
//@desc     authenticaton exists, protected route
router.get("/user", authenticateUser, checkIfUser, authController.getUser);

//@route    get logged in staff
//@desc     authenticaton exists, protected route
router.get("/staff", authenticateUser, checkIfStaff, authController.getStaff);

//@route    get logged in manager
//@desc     authenticaton exists, protected route
router.get(
  "/manager",
  authenticateUser,
  checkIfManager,
  authController.getManager
);

//@route    get logged in admin
//@desc     authenticaton exists, protected route
router.get("/admin", authenticateUser, checkIfAdmin, authController.getAdmin);

//@route    get logged in admin
//@desc     authenticaton exists, protected route
router.get("/recoverPass", authenticateUser, authController.passRecover);

module.exports = router;
