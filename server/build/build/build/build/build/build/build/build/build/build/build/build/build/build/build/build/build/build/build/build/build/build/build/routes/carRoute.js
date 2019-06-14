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

// return specific car
router.get('/:id', (req, res) => {
  // eslint-disable-next-line radix
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) res.status(404).send('The car with the given ID doesnt exist');
  res.send(car);
});

module.exports = router;