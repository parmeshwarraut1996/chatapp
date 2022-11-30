// require('dotenv').config({ path: __dirname + '/.env' });
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const expressValidator = require("express-validator");
const cors = require('cors');
const socketio = require('socket.io');
const routes = require("./routes/route");
const controller = require('./controller/userController');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(expressValidator());
app.use('/', routes);

mongoose.connect("mongodb://localhost:27017/chatApplication", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to the Database Successfully");
    })
    .catch(err => {
        console.log("Not connected to the database ", err);
        process.exit();
    });
let port = process.env.PORT
let server = app.listen(3000, () => {
    console.log(`server is listening on port ${port} `);
});

// const io = socketio.listen(server);
// //importing socket.io to establish a connection between client and server
// io.sockets.on('connection', socket => {
//     console.log("socket is connected ");
//     socket.on('sendMessage', data => {
//         console.log(data)
//         const req = data;
//         controller.saveChat(req, (err, result) => {
//             if (err) {
//                 console.log("error while saving data");
//             }
//             else {
//                 console.log("successfully saved data");
               
//             }
//             io.emit(req.from, result);
//             io.emit(req.to, result);

//         })
//     });
// });

// io.on('disconnect', () => {
//     console.log("socket disconnected!! ");
// });

// //default route.
// app.get('/', (req, res) => {
//     res.json({ "message": "Welcome to Chat-App application." });
// });