module.exports = (knex, Book) => {
  return async (params) => {
    const deleteId = params.id
     console.log("knex deleting",deleteId)
    try {
      await knex('books')
        .where("id",deleteId)
        .del()
        console.log("inside deleting")
      // const result = await knex('books')
      //   .where( deleteId)
      //   .select();
      return deleteId;
    } catch (err) {
      throw err;
    }
  };
};