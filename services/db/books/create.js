module.exports = (knex, Book) => {
  return async (params) => {
    try {
      const id = await knex('books')
        .returning('id')
        .insert({
         isbn : params.isbn,
          name: params.name,
          latitude: params.latitude,
          longitude: params.longitude,
          category: params.category,
        })

      const book = await knex('books')
        .where({'id': id[0]})
        .select();
      return new Book(book[0]);
    } catch (err) {
      throw err;
    }
  };
};