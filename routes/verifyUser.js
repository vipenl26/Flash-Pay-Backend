const express = require("express");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const Users = require("../models/users");
const { rawListeners } = require("../models/users");


verifyUser = express.Router();

verifyUser.route("/").post(async (req, res, next) => {
  console.log("post" + req.body.username);
  Users.find({ username: req.body.username }, async (err, doc) => {
    if (err) {
      console.log(err);
      return;
    } else {
      if (doc.length > 0) {
        return res.status(200).send({message:"User found!"});
      }
      else {
        return res.status(204).send({message: "User not found"});
      }
    }
    

  })});


module.exports = verifyUser;
