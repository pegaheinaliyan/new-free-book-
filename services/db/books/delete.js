module.exports = (knex, Book) => {
  return async (params) => {
    const deleteId = params.id
    try {
  
      await knex('books')
        .where("id",deleteId)
        .del()
      
      return deleteId;
    } catch (err) {
   
    )
      throw err;
    }
  };
};