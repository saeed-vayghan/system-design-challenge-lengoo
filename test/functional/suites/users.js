const chakram    = require('chakram');
const { expect } = require('chai');

require('../../../server-public');


describe('HTTP assertions', function () {
  it('should register a user', async function () {
    const options = {
      headers: {
        'App-Version': '1.0.0',
        'Client': 'webApp'
      }
    };
  
    const reqBody = {
      displayName: 'name',
      email: 'admin@domain.com',
      password: 'md5(123456)'
    };

    const response = await chakram.post('http://127.0.0.1:8888/users/register', reqBody, options);
    
    const statusCode = response.response.statusCode;
    const headers    = response.response.headers;
    const body       = response.body;

    expect(headers['content-type']).to.be.equal('application/json; charset=utf-8');
    // expect(statusCode).to.be.equal(200);
    // expect(body).to.be.deep.equal({
    //   status: 'success',
    //   user: {
    //     displayName: 'name',
    //     roles: [ 'USER' ],
    //     _id: '5f6dac7b772fd902010a9e84',
    //     email: 'user@domain.com',
    //     created: '2020-09-25T08:38:19.178Z',
    //     updated: '2020-09-25T08:38:19.178Z',
    //     __v: 0
    //   }
    // });

    expect(statusCode).to.be.equal(400);
    expect(body).to.be.deep.equal({ status: 'error', statusCode: 400, message: 'Duplicate Email!' });

    return chakram.wait();
  });

  it('should login by email address', async function () {
    const options = {
      headers: {
        'App-Version': '1.0.0',
        'Client': 'webApp'
      }
    };
  
    const reqBody = {
      email: 'admin@domain.com',
      password: 'md5(123456)'
    };

    const response = await chakram.post('http://127.0.0.1:8888/users/login', reqBody, options);
    
    const statusCode = response.response.statusCode;
    const headers    = response.response.headers;
    const body       = response.body;

    expect(headers['content-type']).to.be.equal('application/json; charset=utf-8');
    expect(statusCode).to.be.equal(200);
    expect(body.status).to.be.equal('success');
    expect(body.accessToken).to.not.be.equal(null);
    expect(body.refreshToken).to.not.be.equal(null);

    return chakram.wait();
  });
}); 