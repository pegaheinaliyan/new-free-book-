
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe("books endpoint", () => {

  it("is getting books", async () => {
    //setup
    //exercise
    const result = await chai.request(app)
      .get('/books/')
      .send();
    //console.log("result",result)
    //assert
    expect(result.body.length > 0).to.equal(true);
  })

  it("can save book", async () => {
    //setup
    let book = { "isbn": 4, "name": "The Goldfinch", "latitude": 35.6916, "longitude": 139.688, "category": "Novel" }

    //exercise
    const result = await chai.request(app)
      .post('/books/')
      .send(book);
    //console.log("result",result)
    //assert
    console.log("result",result)
    console.log('isbn=', book.isbn);
    expect(result.body.hasOwnProperty("isbn")).to.equal(true);
  })
})