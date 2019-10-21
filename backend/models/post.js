const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PostSchema = new Schema({
    userId: Number,
    id : Schema.Types.ObjectID,
    updated : {type: Date, default: Date.now()},
    title : String,
    body : String
});

let Post = mongoose.model('Post', PostSchema);
module.exports = Post;