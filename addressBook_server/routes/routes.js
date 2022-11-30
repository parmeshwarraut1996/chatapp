const express = require("express");
const router = express.Router();


//calling the POST method to register a new user
router.post("/users/register", usercontroller.registerUser);

//calling the POST method for login
router.post("/users/login", usercontroller.loginUser);

