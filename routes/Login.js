const express = require("express");
const bcrypt = require("bcrypt");
const req = require("express/lib/request");
const Users = require("../models/users");
const { rawListeners } = require("../models/users");

Login = express.Router();

Login.route("/").post(async (req, res, next) => {
  Users.find({ username: req.body.username }, async (err, doc) => {
    if (err) {
      console.log(err);
      return;
    } else {
      if (doc.length > 0) {
        return res.status(500).send({message:"username already exists"});
      }
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      res.statusCode = 200;
      const user = {
        username: req.body.username,
        password: hashedPassword,
        fullName: req.body.fullName,
        email: req.body.email,
      };

      Users.create(user);
      res.send({message:"user created sucessfully"})
    } catch {
      res.status(500).send();
    }
  });
});

Login.route("/").put(async (req, res, next) => {
  Users.findOne({ username: req.body.username }, async(err, doc) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    const user = doc;

    if (user == null) {
      return res.status(400).send({message:"cannot find user"});
    }
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        // console.log(user._id.toString())
        res.send({message: "Successfully loggedin, Welcome", userid: user._id.toString()});
      } else {
        return res.status(404).send({message:"Password or Username is wrong"});
      }
    } catch {
      res.status(500).send();
    }
  });
});

Login.route("/").get(async (req, res, next) => {

});

module.exports = Login;
