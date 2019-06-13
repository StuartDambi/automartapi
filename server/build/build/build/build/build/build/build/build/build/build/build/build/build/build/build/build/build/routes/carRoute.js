'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

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
router.put('/:id/price', _carController2.default.updatePrice);

module.exports = router;