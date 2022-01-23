var express = require('express');
var router = express.Router();
const Users = require("../models/users");

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const data = await Users.find({});

    if (!data) {
      return res.status(404).send("Not found!");
    }
    res.status(200).send(data)
  } catch (err) {
    res.status(500).send("Unexpected Error from the server!")
  }
});

// POST : posting user details into the database when signing up
router.post("/", async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save()
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }

})

module.exports = router;
