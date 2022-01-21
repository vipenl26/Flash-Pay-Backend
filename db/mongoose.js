const mongoose = require('mongoose')

url = "mongodb://127.0.0.1:27017/db_name";

const connect = mongoose.connect(url)

connect
.then((db) => {
  console.log("connected to mongodb connected");
})
.catch((err) => {
  console.log(err)
})