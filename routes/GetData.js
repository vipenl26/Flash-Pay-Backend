const express = require("express");
const Users = require("../models/users");

GetData = express.Router();

GetData.route("/").put(async (req, res, next) => {
    Users.findById(req.body.userid, (err, doc)=>{
        if(err){
            console.log(err)
            return res.status(500).send("error occured");
        }
        
      res.status(200).send(doc) 
    })
});


module.exports = GetData;
