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

  // Users.findOne({username:req.body.paymentSource})
  // .then((data2) => {
  //     	data2.payments.push(req.body);
  //         // Users.findOne({username:req.body.paymentDestination})
  //         // .then((data3) => {
  //         //         data3[0].payments.push();
  //         //         console.log(data3[0]);
  //         //         Users.findByIdAndUpdate({_id:req.params.id},{payments:data3[0].payments})
  //         //         .then((datalol) => {

  //         //         })
  //         //         .catch((errlol) => {
  //         //             res.status(500).send(errlol);
  //         //             console.log(errlol);
  //         //         })
  //         // })
  //         // .catch((err2) => {
  //         //     res.status(123).send()
  //         // })
  //         // .catch((err) => {
  //         //     res.status(500).send(err);
  //         // })

  //         console.log(req.body)
  //         Users.findByIdAndUpdate({_id:req.params.id},{payments:data2.payments})
  //         .then((datalol) => {
  //             // console.log(datalol)
  //             console.log("--------------------------")
  //             res.status(200).send(datalol);

  //         })
  //         .catch((errlol) => {
  //             res.status(500).send(errlol);
  //             console.log(errlol);
  //         })
  // })
  // .catch((err2) => {
  //     res.status(123).send()
  // })
  // .catch((err) => {
  //     res.status(500).send(err);
  // })
});
// 61ed2688be6d4060e2a5c48b
// GET : request that shows up by default when user opens up the payments page
// router.get("/:id", async (req, res) => {
//     try {
//         Users.find({ _id: req.params.id })
//             .then((user) => {
//                 res.status(200);
//                 res.send(user);
//             })
//             .catch((er) => {
//                 res.send(er);
//             })

//         // if (!data) {
//         //     return res.status(404).send("Not found!");
//         // }
//         // res.status(200).send(data)
//     } catch (err) {
//         res.status(500).send("Unexpected Error from the server!")
//     }
// });

// // GET/date : request that shows up when you want to retrieve all those transactions that happened on that date
// router.get("/:date", async (req, res) => {
//     try {
//         const data = await Payments.find({ "dateOfTransaction": req.params.date });
//         if (!data) {
//             return res.status(404).send("404 NOT FOUND!")
//         }
//         res.status(200).send(data);
//     } catch (err) {
//         res.status(500).send("Unexpected error from the server!");
//     }
// })

module.exports = router;
