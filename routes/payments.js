// importing required modules
const express = require("express");

const router = express.Router();
const Users = require("../models/users.js");

// POST : request that is used to store any transaction that is happening

router.route("/").post(async (req, res) => {
  // sender's id is passed in req
  // but receiver's username is passed in req
  // thats how things are!!
  Users.findById(req.body.paymentSource)
    .then((doc) => {
      if (doc.balance - req.body.amount < 0) {
        return res
          .status(400)
          .send({ message: "insufficient amount payment failed" });
      }

      Users.findOne({ username: req.body.paymentDestination })
        .then((doc) => {
          if (doc == null) {
            return res
              .status(400)
              .send({ message: "username not found, payment failed" });
          }
          const senderEntry = {
            paymentType: req.body.paymentType,
            paymentDestination: req.body.paymentDestination,
            paymentDescription: req.body.paymentDescription,
            amount: -1 * parseFloat(req.body.amount),
          };
          Users.findByIdAndUpdate(
            req.body.paymentSource,
            {
              $push: { payments: senderEntry },
              $inc: { balance: -1 * parseFloat(req.body.amount) },
            },
            (err, doc) => {
              if (err) {
                console.log(err);
                return res.status(400).send({ message: "error occured" });
              }
              const recevierEntry = {
                paymentType: req.body.paymentType,
                paymentDestination: doc.username,
                paymentDescription: req.body.paymentDescription,
                amount: parseFloat(req.body.amount),
              };
              // console.log(doc);
              Users.findOneAndUpdate(
                { username: req.body.paymentDestination },
                {
                  $push: { payments: recevierEntry },
                  $inc: { balance: parseFloat(req.body.amount) },
                },
                (err, doc) => {
                  if (err) {
                    console.log(err);
                    return res.status(400).send({ message: "error occured" });
                  }
                  // console.log(doc)
                  res.status(200).send({ message: "transaction success" });
                }
              );
            }
          );
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).send({ message: "payment failed" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ message: "payment failed" });
    });

  
});

module.exports = router;
