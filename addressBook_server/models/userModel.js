const mongoose=require('mongoose');



//schema for registration of new user
const registration = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "firstName must be provided"]
        },
        lastName: {
            type: String,
            required: [true, "lastName cannot be empty"]
        },
        // email: {
        //     type: String,
        //     required: [true, "Email address cannot be empty"]
        // },
        // country: {
        //     type: String,
        //     required: [true, "country cannot be empty"]
        // }
    },
    {
        timestamps: true
    }
);

exports.registerUser = mongoose.model("users", registration);