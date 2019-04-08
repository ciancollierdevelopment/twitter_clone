const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const AuthRouter = require('./routes/AuthRouter');
const PostRouter = require('./routes/PostRouter');
const path = require('path');

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
app.use('/post', PostRouter);

// Serve the React app
app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use('/*', express.static(path.join(__dirname, 'client/build')));


app.listen(5000);
