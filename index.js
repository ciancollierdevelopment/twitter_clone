const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const AuthRouter = require('./routes/AuthRouter');

// Connect to MongoDB Database
mongoose.connect(config.mongoDB, (err) => {
  if (err) {
    console.log("MongoDB Connection Error!");
  } else {
    console.log("MongoDB Connection Success!");
  }
});

// Set up middleware and routers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', AuthRouter);

app.listen(5000);
