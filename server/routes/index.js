

module.exports = (express, services) => {
  var router = express.Router();

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
      console.error(err);
      res.status(400).send(err.message);
    }
  })

 /* POST book data */
  router.post('/books', function (req, res) {

    try {
      let book = services.db.books.create(req.body);

      book.then(function (book) {
        res.status(200).send(book).json();
      })
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  });

  router.put('/books', function (req, res) {
    try {
      let book = services.db.books.update(req.body);

      book.then(function (result) {
        res.status(200).send(book);
      })
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  });

/* DELETE book data */
  router.delete('/books', function(req, res) {
    try {
      const isbn = req.query.isbn;
      console.log("req.body",req.body)
      let deletedId = services.db.books.delete(req.body);

      deletedId.then(function(result){
         res.status(200).send(deletedId);
      }).catch(function(err) {
        console.error('error', err);
      });
    } catch(err) {
       console.error('---------error', err);
      res.status(400).send(err.message);
    }
  });


  return router;
};
