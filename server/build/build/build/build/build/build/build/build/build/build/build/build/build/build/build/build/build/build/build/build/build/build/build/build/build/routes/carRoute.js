'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _carController = require('../controllers/carController');

var _carController2 = _interopRequireDefault(_carController);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const { cars } = require('../models/carsdb');

const router = _express2.default.Router();

// Return all the cars
router.get('/', (req, res) => {
  res.status(200).send({ status: res.statusCode, data: cars });
});

// return specific car
router.get('/:id', _carController2.default.viewCars);

// Creating an AD
router.post('/car', _carController2.default.postCar);

// User can Update the Price
router.put('/:id/price', (req, res) => {
  const rawData = _lodash2.default.pick(req.body, ['price']);
  const details = cars.find(car => car.id === parseInt(req.params.id, 10));
  if (!details) {
    return res.status(404).send({
      status: res.statusCode,
      data: 'not found'

    });
  }
  if (req.user.id !== details.owner) {
    return res.status(400).send({
      status: 400,
      data: 'cannot perform this action'
    });
  }
  details.price = rawData.price;
  return res.send({
    status: res.statusCode,
    data: details

  });
});

module.exports = router;