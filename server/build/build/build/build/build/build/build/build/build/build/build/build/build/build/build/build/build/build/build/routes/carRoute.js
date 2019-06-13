'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const { cardb } = require('../models/cars');

const router = _express2.default.Router();

// Return all the cars
router.get('/', (req, res) => {
  res.send(cardb);
});

// return specific car
router.get('/:id', (req, res) => {
  // eslint-disable-next-line radix
  const car = cardb.find(c => c.id === parseInt(req.params.id));
  if (!car) res.status(404).send('The car with the given ID doesnt exist');
  res.status(200).send({
    status: res.statusCode,
    data: car
  });
});

// Creating an AD


module.exports = router;