'use strict';

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const cars = [{
  id: 1,
  owner: 2,
  state: 'new',
  price: '$100',
  manufacturer: 'toyota',
  model: 'BMW',
  body_type: 'car',
  created_on: '20/10/09'
}, {
  id: 1,
  owner: 2,
  state: 'new',
  price: '$100',
  manufacturer: 'toyota',
  model: 'BMW',
  body_type: 'car',
  created_on: '20/10/09'
}, {
  state: 'used',
  status: 'sold',
  price: '400',
  manufacturer: 'toyota',
  model: 'range-rover',
  body_type: 'car',
  id: 2,
  date_created: '2019-05-28T19:39:16+03:00'
}, {
  state: 'used',
  status: 'sold',
  price: '300',
  manufacturer: 'toyota',
  model: 'premio',
  body_type: 'car',
  id: 3,
  date_created: '2019-05-28T19:39:22+03:00'
}, {
  state: 'used',
  status: 'sold',
  price: '200',
  manufacturer: 'toyota',
  model: 'premio',
  body_type: 'car',
  id: 4,
  date_created: '2019-05-28T19:39:29+03:00'
}];
// eslint-disable-next-line no-undef
const rawData = _lodash2.default.pick(req.body, ['state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
const schema = _joi2.default.object().keys({
  state: _joi2.default.string().required(),
  status: _joi2.default.string().required(),
  price: _joi2.default.string().alphanum().required(),
  manufacturer: _joi2.default.string().required(),
  model: _joi2.default.string().required(),
  body_type: _joi2.default.string().required()
});

exports.schema = schema;
exports.rawData = rawData;
exports.cars = cars;