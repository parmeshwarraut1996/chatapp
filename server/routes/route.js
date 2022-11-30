const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/userController");
const tokenVerify = require("../middleware/JWT");

//calling the POST method to register a new user
router.post("/users/register", usercontroller.registerUser);

//calling the POST method for login
router.post("/users/login", usercontroller.loginUser);

//forgot password
router.post("/users/forgotpassword", usercontroller.forgotPassword);

//reset Password
router.post("/users/resetpassword", tokenVerify.auth, usercontroller.resetPassword);

//Get all user
router.get("/users/getUser", usercontroller.getUser);

//Save chat
router.put("/users/saveChat", usercontroller.saveChat);

//Get all chat
router.get("/users/getChat",usercontroller.getChat);

module.exports = router;