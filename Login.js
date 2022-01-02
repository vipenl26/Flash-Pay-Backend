const express = require('express');
const bcrypt = require('bcrypt');
const req = require('express/lib/request');

const users = [
    
]

Login = express.Router();

Login.route("/")
.post(async (req, res, next) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword); 
        res.statusCode = 200;
        const user = { username: req.body.username, password: hashedPassword};
        users.push(user);
        console.log(users);
        res.end();
    }
    catch{
        res.status(500).send()
    }
    
});


Login.route("/")
.get( async (req, res, next) => {
    const user = users.find(user => user.username === req.body.username);
    if(user==null){
        return  res.status(400).send("cannot find user");
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success');
        }
        else{
            res.send("Password or Username is wrong");
        }
    }
    catch{
        res.status(500).send();
    }

});

module.exports = Login;