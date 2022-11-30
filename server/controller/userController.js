const userService = require("../services/userService");

//Regiser a new user
exports.registerUser = (req, res) => {

    //Validating fullname
    req
        .checkBody("name", "Name is invalid")
        .isAlpha()
        .len({ min: 3 })

    //checking password is not empty
    req.checkBody("password", "Password is invalid").notEmpty();

    //Validating Email
    req.checkBody("email", "Email is invalid").isEmail();

    //Validating country name
    req.checkBody("country", "Country is invalid").isAlpha();

    //Getting error while validation
    const error = req.validationErrors();

    //if Validation gets error send response to the user
    if (error)
        res.status(422).send(error);
    else {
        userService.userRegistration(req, (err, data) => {
            if (err) {
                res.status(500).send({ errors: err });
            } else {
                res.status(200).send({ message: "Successfully registered", data: data });
            }
        });
    }
};

//Login a registered user
exports.loginUser = (req, res) => {

    //checking password is not empty
    req.checkBody("password", "Password is invalid").notEmpty();

    //Checking the email is valid or not
    req.checkBody("email", "Email is invalid").isEmail();

    //checking for the Input Validation
    const errors = req.validationErrors();
    //if Validation gets error send response to the user
    if (errors) {
        res.status(422).send(errors);
    } else {
        userService.userLogin(req, (err, data) => {
            if (err) {
                res.status(500).send({ errors: err });
            } else {
                res.send({ message: "Successfully Logged in", data: data });
            }
        });
    }
};
//forgot Password
exports.forgotPassword = (req, res) => {
    //checking email is valid or not[]
    req.checkBody("email", "Email is invalid").isEmail();

    //checking for error while validating input
    const errors = req.validationErrors();
    //if Validation gets error send response to the user
    if (errors) {
        res.status(422).send(errors);
    } else {
        userService.forgotPassword(req, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({ message: "Email successfully send to reset password", data: data });
            }
        });
    }
};

//reset Password
exports.resetPassword = (req, res) => {
    //checking the password is valid or not
    req.checkBody("password", "Password is invalid").notEmpty();
    req.checkBody("confirmPassword", "ConfirmPassword is invalid").notEmpty();
    const error = req.validationErrors();

    //checking for error while validating input data
    if (error) {
        res.status(422).send(error);
    } else {
        userService.resetPassword(req, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({ message: "Password successfully changed", data: data });
            }
        });
    }
};

//Get all User
exports.getUser = (req, res) => {
    try {
        userService.getUser(req, (err, data) => {
            if (err) {
                res.status(500).send({ data: data });
            }
            else {
                res.status(200).send({ data: data });
            }
        })
    }
    catch (err) {
        console.log(err);
    }
};

// Save chat Controller.
exports.saveChat = (req, callback) => {
    try {
        userService.saveChat(req, (err, data) => {
            if (err) {
                console.log(err);
               return callback(err);
            } else {
               return callback(null,data);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

// Get chats constroller.
exports.getChat = (req, res) => {
    try {
        userService.getChat(req, (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        })
    } catch (e) {
        console.log(e);
    }
}