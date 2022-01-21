"use strict";

// importing required modules
const express = require("express");
const router = express.Router();
const Payments = require("../models/payments.js");

// POST : request that is used to store any transaction that is happening
router.post("/payments", async (req, res) => {
    const payment = new Payments(req.body);
    try {
        await payment.save()
        res.status(201).send(payment);
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET : request that shows up by default when user opens up the payments page
router.get("/payments", async (req, res) => {
    try {
        const data = await Payments.find({}).sort({ "dateOfTransaction": 1 }); 
        // Displays the output on the sorted order of dates

        if (!data) {
            return res.status(404).send("Not found!");
        }
        res.status(200).send()
    } catch (err) {
        res.status(500).send("Unexpected Error from the server!")
    }
});

module.exports = router;