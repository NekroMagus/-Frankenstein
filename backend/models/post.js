const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

let SecondSchema = new Schema({
    userId: Number,
    id_post: Number,
    updated: {type: Date, default: Date.now()},
    title: String,
    body: String
});

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

module.exports = mongoose.model('SecondPost', SecondSchema);
module.exports = mongoose.model('Registration', Users);
