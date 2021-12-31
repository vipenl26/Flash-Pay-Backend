const express = require('express');

Login = express.Router();

Login.route("/")
.get((req, res, next) => {
    res.statusCode = 200;
    res.end("hello, this is login")
});

module.exports = Login;