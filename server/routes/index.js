// var express = require('express');
// var router = express.Router();
// const app = express();


module.exports = (express, services) => {
  var router = express.Router();
  console.log("here")
  /* GET book lists */
  // router.get("/",function (req, res) {console.log("get")})

  router.get('/books', function (req, res) {

    try {
      let books = services.db.books.list();

      books.then(function (result) {
        books = result.map((book) => book.serialize());
        res.status(200).send(books).json();
     //  console.log("books", books);
      })
    } catch (err) {
      res.status(400).send(err.message);
    }
  })


  router.post('/', function (req, res) {

    try {
      let book = services.db.stickers.create(req.body);

      book.then(function (result) {
        res.status(200).send(sticker).json();
      })
    } catch (err) {
      res.status(400).send(err.message);
    }
  });


  

  return router;
};
