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
        required: false,
        description: "Specifies the source of the transaction"
    },
    paymentDestination:{
        type:String,
        required:true,
        description:"Recieptant",
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
        type:String,
        required:true,
    }
});

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        description: "Gives the full name of the user"
    },
    email:{
        type: String,
        required: true,
        description: "email of the user"
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
    balance:{
        type:Number,
        default:0,
        required:false,
        description:"User balance",
    },
   payments:[paymentSchema]
});

const Users = mongoose.model("Users",userSchema);
module.exports = Users;