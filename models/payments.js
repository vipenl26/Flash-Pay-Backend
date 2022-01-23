const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    paymentType: {
        type: String,
        required: true,
        description: "This is the type of payment that can be done"
    },

    paymentUserName: {
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

const Payments = mongoose.model("Payments", paymentSchema);


module.exports = Payments;