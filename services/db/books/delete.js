module.exports = (knex, Book) => {
  return async (params) => {
    const deleteId = {id: params.id}
    try {
      await knex('books')
        .where( deleteId)
        .del()
      const result = await knex('books')
        .where( deleteId)
        .select();
      return deleteId;
    } catch (err) {
      throw err;
    }
  };
};