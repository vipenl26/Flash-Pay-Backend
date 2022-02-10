"use strict";

// importing required modules
const express = require("express");
const router = express.Router();
const Users = require("../models/users.js");

// POST : request that is used to store any transaction that is happening
router.post("/:id", (req, res) => {
    Users.find({_id:req.params.id})
    .then((data2) => {
        	data2[0].payments.push(req.body);
            console.log(data2[0]);
            Users.findByIdAndUpdate({_id:req.params.id},{payments:data2[0].payments})
            .then((datalol) => {
                res.status(200).send(datalol);
                console.log(datalol);
            })
            .catch((errlol) => {
                res.status(500).send(errlol);
                console.log(errlol);
            })
    })
    .catch((err2) => {
        res.status(123).send()
    })
    .catch((err) => {
        res.status(500).send(err);
    })

});
// 61ed2688be6d4060e2a5c48b
// GET : request that shows up by default when user opens up the payments page
router.get("/:id", async (req, res) => {
    try {
        Users.find({ _id: req.params.id })
            .then((user) => {
                res.status(200);
                res.send(user);
            })
            .catch((er) => {
                res.send(er);
            })


        // if (!data) {
        //     return res.status(404).send("Not found!");
        // }
        // res.status(200).send(data)
    } catch (err) {
        res.status(500).send("Unexpected Error from the server!")
    }
});

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