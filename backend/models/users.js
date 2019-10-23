const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Users', Users);