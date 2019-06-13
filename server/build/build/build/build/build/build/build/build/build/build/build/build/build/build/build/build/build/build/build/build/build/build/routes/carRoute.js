'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const router = _express2.default.Router();
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
}];

// Return all the cars
router.get('/', (req, res) => {
  res.send(cars);
});

module.exports = router;