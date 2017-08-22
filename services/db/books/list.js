module.exports = (knex, Book) => {
  return async () => {
    try {
      const books = await knex('books').select();
      let bookList = [];
      books.forEach((book) => {
        bookList.push(new Book(book));
      });
      return bookList;
    } catch (err) {
      throw err;
    }
  };
};