'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const available = '/api/v1/car?status=available';
const { expect } = _chai2.default;
_chai2.default.use(_chaiHttp2.default);

describe('cars', () => {
  it('should return all in the database', done => {
    _chai2.default.request(_app2.default.get(available).end((_err, res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data[0]).to.have.property('id');
      done();
    }));
  });
});