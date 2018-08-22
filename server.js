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

/////testli


// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));



////////////////////
//  DATA
///////////////////


//hardcoded data has been deleted
//in favor of using the database db.Books

// var newBookUUID = 18;







////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find(function (err, books) {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
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
  // create new book with form data (`req.body`)
  var newBook = req.body;
  //push to the database
  db.Book.create(newBook, function (err, savedBook) {
    if(err){
      return res.status(400).json({err: "error has occured"})
    } 
    res.json(newBook);
  })
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
