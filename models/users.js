// requiring all the necessary libraries.
const mongoose = require("mongoose");


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
    middleName: {
        type: String,
        required: true,
        description: "Gives the middle name of the user"
    },
    age: {
        type:Integer,
        required:true,
        description:"Gives the age of the user"
    }
})