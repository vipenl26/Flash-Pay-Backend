const express = require("express");
const Users = require("../models/users");
router = express.Router();

router.route("/").post(async (req, res, next) => {
    const entry = {
        paymentType: "Debit / Credit Card",
        paymentDestination: req.body.cardName,
        paymentDescription: "added money from card",
        amount: parseFloat(req.body.amount),
      };


  Users.findByIdAndUpdate(req.body.userid,
    {
        $push: { payments: entry },
        $inc: { balance: parseFloat(req.body.amount) },
    },
    (err, doc) => {
        if(err){
            console.log(err)
            return res.status(400).send({message: "error occured"})
        }
        if(doc == null){
            return res.status(400).send({message: "invalid userid"})
        }

        return res.status(200).send({message: "successfully added money"})
    })
});



module.exports = router;
