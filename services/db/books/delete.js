module.exports = (knex, Book) => {
  return async (params) => {
    const deleteId = params.id
    try {
      console.log(params,"params")
      console.log('deleting book', deleteId)
      await knex('books')
        .where("id",deleteId)
        .del()
        console.log('deleted book:', deleteId)
      return deleteId;
    } catch (err) {
      console.log('error deleting book:', err
    )
      throw err;
    }
  };
};