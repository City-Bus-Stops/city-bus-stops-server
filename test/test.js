const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai');
const nconf = require('../config');

const expect = chai.expect;
const url = `${nconf.get('host')}:${nconf.get('port')}`;

describe('/GET /route/searchRoute', () => {
  it('should return status 200', (done) => {
    request(url)
      .get('/route/searchRoute')
      .set('Accept', 'application/json')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.status).to.eql(httpStatus.OK);
        done();
      });
  });
  it('should return instance of json', (done) => {
    request(url)
      .get('/route/searchRoute')
      .set('Accept', 'application/json')
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.status).to.eql(httpStatus.OK);
        expect(res.body).to.be.instanceof(Array);
        done();
      });
  });
});
