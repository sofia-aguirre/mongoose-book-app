//requires mongoose to connect to database
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");

//imports and exports all models as an object
module.exports = { 
    Book: require('./book.js'),
    Author: require('./author.js') 
};
