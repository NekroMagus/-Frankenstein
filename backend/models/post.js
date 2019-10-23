const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    userId: Number,
    id_post: Number,
    updated: {type: Date, default: Date.now()},
    title: String,
    body: String
});

module.exports = mongoose.model('Post', Post);

