exports.up = function (knex, Promise) {
  return knex.schema.createTable('books', (t) => {
    t.increments()
      .index();

    t.integer('ISBN')

    t.text('name')

    t.float('latitude')

    t.float('longitude')

    t.text('category')

  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('books');
};

