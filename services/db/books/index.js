const Book = function (dbBook) {
  this.id = dbBook.id;
  this.isbn = dbBook.isbn;
  this.name = dbBook.name;
  this.latitude = dbBook.latitude;
  this.longitude = dbBook.longitude;
  this.category = dbBook.category;

};

Book.prototype.serialize = function () {
  // use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client
  return {
    id: this.id,
    isbn: this.isbn,
    name: this.name,
    latitude: this.latitude,
    longitude: this.longitude,
    category: this.category,
  };
};

module.exports = (knex) => {
  return {
    create: require('./create')(knex, Book),
    list: require('./list')(knex, Book),
    update: require('./update')(knex, Book),
    // delete: require('./delete')(knex, Book),
  };
};
