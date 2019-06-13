'use strict';

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const cardb = [{
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
}];

function validateCar(car) {
  const schema = {
    state: _joi2.default.string().min(3).max(20),
    price: _joi2.default.string().min(3).max(20),
    manufacturer: _joi2.default.string().min(3).max(20),
    model: _joi2.default.string().min(3).max(20),
    body_type: _joi2.default.string().min(3).max(20)
  };
  return _joi2.default.validate(car, schema);
}

exports.validate = validateCar;
exports.cardb = cardb;