var express = require('express');
var router = express.Router();
const app = express();


module.exports = (services) => {
  /* GET book lists */
  router.get('/', async function (req, res) {
    try {
      let books = await services.db.books.list();
      books = books.map((book) => book.serialize());
      res.status(200).send(books);
    } catch (err) {
      res.status(400).send(err.message);
    }
  })

    return router;
};
