const mongoose = require("mongoose");
const schema = mongoose.Schema;

//schema for registration of new user
const registration = schema(
    {
        name: {
            type: String,
            required: [true, "Name must be provided"]
        },
        password: {
            type: String,
            required: [true, "Password cannot be empty"]
        },
        email: {
            type: String,
            required: [true, "Email address cannot be empty"]
        },
        country: {
            type: String,
            required: [true, "country cannot be empty"]
        }
    },
    {
        timestamps: true
    }
);

exports.registerUser = mongoose.model("users", registration);

const chatData = schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    chat: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

exports.chats = mongoose.model("chats", chatData);

const grpChatData = schema({
    from: {
        type: String,
        required: true
    },
    chat: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

exports.grpChats = mongoose.model("grpChats", grpChatData);
