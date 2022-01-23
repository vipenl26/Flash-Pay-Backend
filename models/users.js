// requiring all the necessary libraries.
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    paymentType: {
        type: String,
        required: true,
        description: "This is the type of payment that can be done"
    },

    paymentSource: {
        type: String,
        required: true,
        description: "Specifies the source of the transaction"
    },

    paymentDescription: {
        type: String,
        required: false,
        description: "Specifies the description of the transaction"
    },

    amount: {
        type: Number,
        required: true,
        description: "Specifies the amount of transaction"
    },

    dateOfTransaction: {
        type:String
    }
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        description: "Gives the first name of the user"
    },
    lastName: {
        type: String,
        required: true,
        description: "Gives the last name of the user"
    },
    age: {
        type: Number,
        required: true,
        description: "Gives the age of the user"
    },
    username: {
        type: String,
        required: true,
        description: "Gives the username of the user"
    },
    password: {
        type: String,
        required: true,
        description: "Gives the password of the user"
    },
   payments:[paymentSchema]
});

const Users = mongoose.model("Users",userSchema);
module.exports = Users;