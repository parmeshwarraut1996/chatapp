const nodemailer = require("nodemailer");
//sending the mail to client for reset password
exports.sendMailer = (url, email) => {
    //sets the variables from the env file
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    //setup mail configuration
    const mailOptions = {
        from: process.env.EMAIL, //sender email
        to: email, //receiver email
        subject: "reset password",
        description: "click to reset your password",
        text: url
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};