module.exports = (knex, Book) => {
  return async (params) => {
    try {
      await knex('books')
        .where({id: params.id})
        .update({
          isbn: params.isbn,
          name: params.name,
          latitude: params.latitude,
          longitude: params.longitude,
          category: params.category,
        });

      const book = await knex('books')
        .where({id: params.id})
        .select();
      return new Book(book[0]);
    } catch (err) {
      throw err;
    }
  };
};



 