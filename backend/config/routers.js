const express = require('express');
const allUsers = require('../public/json/user');
const fs = require('fs');
const bodyParser = require('body-parser');

const router = express();

module.exports = {fs,allUsers,router, bodyParser};