const chakram    = require('chakram');
const { expect } = require('chai');

require('../../../server-public');


describe("HTTP assertions", function () {
  it("should make HTTP assertions easy", async function () {
    const response = await chakram.get("http://127.0.0.1:8888/info");
    
    const statusCode = response.response.statusCode;
    const headers    = response.response.headers;
    const body       = response.body;

    expect(statusCode).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Welcome to the API server!!' });

    return chakram.wait();
  });
}); 