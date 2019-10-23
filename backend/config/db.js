const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');
const UsersFromDB = require('../models/users');
const Post = require('../models/post');

// set up default mongoose connection to test database
const mongoDB = 'mongodb://127.0.0.1/test';
// connect to mongoose
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
//get the default connection
const db = mongoose.connection;

//bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = {mongoose, bCrypt, UsersFromDB, Post};