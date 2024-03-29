var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Login = require('./routes/Login');
const GetData = require('./routes/GetData');
const AddMoney = require('./routes/AddMoney');
const verifyUser = require('./routes/verifyUser')
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const paymentsRouter = require('./routes/payments')
require("dotenv").config();

var app = express();

const mongoose = require('mongoose');
const { verify } = require('crypto');

url = process.env.database_url || "mongodb://127.0.0.1:27017/flash_pay";

const connect = mongoose.connect(url)

connect
.then((db) => {
  console.log("connected to mongodb connected");
})
.catch((err) => {
  console.log(err)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/payments',paymentsRouter);

app.use("/login", Login);
app.use("/getdata",GetData);
app.use("/AddMoney",AddMoney);
app.use("/verifyUser",verifyUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
