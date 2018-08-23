// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var books_list = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/to_kill_a_mockingbird.jpg",
    releaseDate: "July 11, 1960"
  },
  {
    title: "The Great Gatsby",
    author: "F Scott Fitzgerald",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/great_gatsby.jpg",
    releaseDate: "April 10, 1925"
  },
  {
    title: "Les Miserables",
    author: "Victor Hugo",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/les_miserables.jpg",
    releaseDate: "Unknown 1862"
  },
  {
    title: "Around the World in 80 Days",
    author: "Jules Verne",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/around_the_world_in_80_days.jpg",
    releaseDate: "January 30, 1873"
  },
  {
    title: "Lean In",
    author: "Sheryl Sandberg",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/lean_in.jpg",
    releaseDate: "March 11, 2013"
  },
  {
    title: "The Four Hour Workweek",
    author: "Tim Ferriss",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    releaseDate: "April 1, 2007"
  },
  {
    title: "Of Mice and Men",
    author: "John Steinbeck",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    releaseDate: "Unknown 1937"
  },
  {
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    releaseDate: "Unknown 1597"
  }
];
        //commented out for sprint-2
        // // remove all records that match {} -- which means remove ALL records
        // db.Book.remove({}, function(err, books){
        //   if(err) {
        //     console.log('Error occurred in remove', err);
        //   } else {
        //     console.log('removed all books');

        //     // create new records based on the array books_list
        //     db.Book.create(books_list, function(err, books){
        //       if (err) { return console.log('err', err); }
        //       console.log("created", books.length, "books");
        //       process.exit();
        //     });
        //   }
        // });


var authors_list = [
  {
    name: "Harper Lee",
    isAlive: false
  },
  {
    name: "F Scott Fitzgerald",
    isAlive: false
  },
  {
    name: "Victor Hugo",
    isAlive: false
  },
  {
    name: "Jules Verne",
    isAlive: false
  },
  {
    name: "Sheryl Sandberg",
    isAlive: true
  },
  {
    name: "Tim Ferriss",
    isAlive: true
  },
  {
    name: "John Steinbeck",
    isAlive: false
  },
  {
    name: "William Shakespeare",
    isAlive: false
  }
];

//find all the Authors and delete them
db.Author.deleteMany({}, function(err, authors) {
  console.log('removed all authors');
  //create authors from seed.js file's author array
  db.Author.create(authors_list, function(err, authors){
    if (err) {
      console.log(err);
      return;
    }
    //on success, console log 
    console.log('recreated all authors');
    console.log("created", authors.length, "authors");

    //also on success, delete all the books
    db.Book.deleteMany({}, function(err, books){
      console.log('removed all books');
      //upon deleting all books, access each element in the books_list array
      books_list.forEach(function (bookData) {
        //for every book, make the book out of a new book model
        var book = new db.Book({
          title: bookData.title,
          image: bookData.image,
          releaseDate: bookData.releaseDate
        });
        //also for every book, find the author key and value
        db.Author.findOne({name: bookData.author}, function (err, foundAuthor) {
          console.log('found author ' + foundAuthor.name + ' for book ' + book.title);
          if (err) {
            console.log(err);
            return;
          }
          //replace the book's author's value to the foundAuthor
          book.author = foundAuthor;
          //save changes to the book
          book.save(function(err, savedBook){
            if (err) {
              console.log(err);
            }
            //on success, print a save confirmation:
            console.log('saved ' + savedBook.title + ' by ' + foundAuthor.name);
          });
        });
      });
    });

  });
});