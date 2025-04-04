const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        reuired: true,
    },
    image: {
        type: String,
        reuired: true,
    }
    

}, {timestamps: true})


const User = mongoose.model('User', userSchema);
module.exports = User;