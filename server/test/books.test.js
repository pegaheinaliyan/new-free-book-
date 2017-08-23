
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe("books endpoint",()=>{

  
  it("is getting books",async()=>{
    //setup


    //exercise

    const result = await chai.request(app)
            .get('/books/')
            .send();
    //console.log("result",result)

    //assert
    expect(result.body.length).to.equal(3);

  })


})