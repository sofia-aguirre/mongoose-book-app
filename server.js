// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');
var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));


// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


////////////////////
//  DATA
///////////////////


//hardcoded data has been deleted
//in favor of using the database db.Books


////////////////////
//  ROUTES
///////////////////


// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // find all books {}
  db.Book.find()
    //before executing, populate all authors
    .populate('author')
    //now we can execute callback
    .exec(function(err, books){
      //if there's an error then print error
      if (err) { 
        console.log("index error: " + err); 
      } //else on success send a JSON file for the books
        res.json(books);
        });
    });

// get one book
//hint: check the books array json object in the browser to 
//take a look at the book ids 
app.get('/api/books/:id', function (req, res) {
  // find one book by its param (id)
  let bookId = req.params.id;
  // look for the id in the database
  db.Book.findById(bookId, function (err, foundBook) {
    if(err){
      return res.status(400).json({err: "error has occured"})
    } 
    res.json(foundBook);
  });
});

// create new book
app.post('/api/books', function (req, res) {
  // creates a new book in the Book database
  var newBook = new db.Book({
    //gets book's info from the form data ('req.body')
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });
  //check to see if the newBook's author is in the database
  if (db.Book.find({name: req.body.author} == 
      db.Author.find({name: req.body.author}))) {
        newBook.author = author;
        newBook.save( function (err, book) {
          if(err){
            return res.status(400).json({err: "error has occured"})
          } res.json(newBook);
      })}
      else {//we want to add the author to the book and create it
    db.Author.create({name: req.body.author}, function (err, author) {
      //save the newBook's author to its property
      newBook.author = author;
      //now save the newBook that we've created into the db
      newBook.save( function (err, book) {
        if(err){
          return res.status(400).json({err: "error has occured"})
        } 
    //on success, send the newBook to the localhost as a JSON object
        res.json(newBook);
      })
    })}
  });

// update book using method findOneAndUpdate
// app.put('/api/books/:id', function(req,res){
// // get book id that I want to update from url params (`req.params`)
//   var bookId = req.params.id;
//   // find the index of the book we want to remove
//   db.Book.findOneAndRemove(bookId, function (err, foundBook) {
//     //if no id by that id exists return error
//     if(err){
//       return res.status(400).json({err: "error has occured"})
//     } 
//     //else if there is an id like that then delete it
//     db.Book.findO
//   });
//   res.json(updatedBook);
// });

app.put('/api/books/:id', function(req,res){
  // get book id from url params (`req.params`)
  var bookId = req.params.id;
  // get update body from req.body
  let updatedBody = req.body;
  // find the selected id and update the books's attributes
  // TAKES CARE OF REMOVING IT SO YOU DONT HAVE TO!
  db.Book.findOneAndUpdate(
      { _id: bookId}, // search for the book's id
      updatedBody, // the body we want to update
      {new:true}, // if there's new info then update it
      (err, updatedBook) => { //if there's an error
      if(err){ 
        return res.status(400).json({err: "error has occured"})
      }
      res.json(updatedBook); //else return the updated book
  });
}); 

// delete book DESTROY one
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  var bookId = req.params.id;
  // find the id in the database and delete it
  db.Book.deleteOne(
    { _id: bookId }, //grabs the book's id
    (err, deletedBook) => { //if there's an error
      if(err){ 
        return res.status(400).json({err: "error has occured"})
      }
      res.json(deletedBook); //else return deleted book (will delete when page is refreshed)
  });
});




///////////SERVER PORT////////////////
app.listen(process.env.PORT || 3000, function () {
  console.log('Book app listening at http://localhost:3000/');
});
