//require mongoose to make schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//author schema
const AuthorSchema = new Schema ({
    name: String,
    image: String, //url string
    isAlive: Boolean
});

//author model
const Author = mongoose.model('Author', AuthorSchema);

//export module
module.exports = Author;