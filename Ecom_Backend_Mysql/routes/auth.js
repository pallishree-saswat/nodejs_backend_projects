const express = require("express");
const router = express.Router();

//setting up a destructured object to import all the controller functions
const { register, verifyEmail, login ,resetPassword,forgotPassword,logout,updatePassword} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verifyEmail").post(verifyEmail);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword").post(resetPassword);
router.route("/updatePassword").post(updatePassword);
router.route("/logout").get(logout);

module.exports = router;
