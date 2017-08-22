exports.up = function (knex, Promise) {
  return knex.schema.createTable('books', (t) => {
    t.increments()
      .index('ISBN');

    t.text('name')

    t.float('latitude')
      .notNullable()

    t.float('longitude')
      .notNullable()

    t.text('category')

  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('books');
};

