//schema and model for books database

//requires mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creates book schema
const BookSchema = new Schema ({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
        },
    image: String,
    releaseDate: String
});

//creates book model
const Book = mongoose.model('Book', BookSchema);

//exports the book model to public
module.exports = Book;