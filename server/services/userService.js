const model = require("../model/userModel");
const emailExistence = require('email-existence')
const bcrypt = require('bcryptjs');
const jwt = require("../middleware/JWT");
const mailler = require("../middleware/mailer");

//register a new user
exports.userRegistration = (req, callback) => {
    try {
        console.log("Entered Email", req.body.email);
        emailExistence.check(req.body.email, (err, result) => {
            if (result) {
                model.registerUser.findOne({ "email": req.body.email }, (err, user) => {
                    if (user)
                        callback("email already exist");
                    else {
                        let userDetails;
                        bcrypt.hash(req.body.password, 10, (err, encrypted) => {
                            userDetails = new model.registerUser({
                                "name": req.body.name,
                                "email": req.body.email,
                                "country": req.body.country,
                                "password": encrypted
                            })
                            userDetails.save()
                                .then(user => {
                                    callback(null, user);
                                })
                                .catch(err => {
                                    callback(err);
                                });
                        })
                    }
                })
            } else {
                console.log(err);
                callback("email is invalid")
            }
        })
    } catch (err) {
        console.log(err);
    }
};

//login the user
exports.userLogin = (req, callback) => {
    try {
        let response ={};
        model.registerUser.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
                    if (!encrypted) {
                        callback("Password not matched");
                    } else {
                        response.name = user.name;
                        response.email = req.body.email;
                        callback(null, response);
                    }
                });
            } else {
                callback("User Not Found");
            }
        });
    } catch (err) {
        console.log("err in userlogin", err);
    }
};

//forgotPassword
exports.forgotPassword = (req, callback) => {
    //finding the email is persent or not
    model.registerUser.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            let data_id = user._id;
            let obj = jwt.generateToken(data_id)
            let url = "http://localhost:3000/resetPassword";
            let response = {};
            //calling sendMailer()
            mailler.sendMailer(url, req.body.email);
            response.token = obj.token;
            response.sucess = true;
            response.user = user;
            //calling callback()
            callback(null, response)
        } else {
            callback(" invalid user email ");
        }
    });
};

//ResetPassword
exports.resetPassword = (req, callback) => {
    if (req.body.password != req.body.confirmPassword) {
        callback("Password and confirm password is not matched");
    }
    bcrypt.hash(req.body.password, 10, (err, encrypted) => {
        if (err) {
            callback(err);
        } else {
            model.registerUser.updateOne({ _id: req.decoded.data_id }, { password: encrypted }, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            }
            );
        }
    });
};

//Get all user
exports.getUser = (req, callback) => {
    model.registerUser.find({ 'email': { '$ne': req.query.email } }, (err, data) => {
        if (data) {
            callback(null, data);
        }
        else {
            callback("error")
        }
    })
}

//Save The Chat
exports.saveChat = (req, callback) => {
    try {
        if (req.to) {
            let newChat = new model.chats({
                "from": req.from,
                "to": req.to,
                "chat": req.chat
            });
            newChat.save((err, data) => {
                if (err) {
                    console.log("service ERRO : " + err);
                    callback(err);
                } else {
                    callback(null, data)
                }
            });
        } else {
            let newGrpChat = new model.grpChats({
                "from": req.body.from,
                "chat": req.body.chat
            });
            newGrpChat.save((err, data) => {
                if (err) {
                    console.log("service ERRO : " + err);
                    callback(err);
                } else {
                    callback(null, data)
                }
            });
        }
    }
    catch (err) {
        callback(err);
    }
}

//Get The Chat data
exports.getChat = (request, callback) => {
    try {
        if (request.query.to.length>0) {            
            model.chats.find({
                "$or": [{
                    "from": request.query.from, "to": request.query.to
                }, {
                    "from": request.query.to, "to": request.query.from
                }]
            }, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            })
        } else {
            model.grpChats.find(null, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            })
        }
    } catch (err) {
        callback(err);
    }
}

module.exports={
    module1,module2
}