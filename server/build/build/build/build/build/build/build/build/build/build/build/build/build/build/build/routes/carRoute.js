'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const { cars } = require('../models/carsdb');

const router = _express2.default.Router();

// Return all the cars
router.get('/', (req, res) => {
  res.send(cars);
});

// return specific car
router.get('/:id', (req, res) => {
  // eslint-disable-next-line radix
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) res.status(404).send('The car with the given ID doesnt exist');
  res.status(200).send({
    status: res.statusCode,
    data: car
  });
});

// Creating an AD
router.post('/car', async (req, res) => {
  // pick the values from the users
  const rawData = _lodash2.default.pick(req.body, ['state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
  const schema = _joi2.default.object().keys({
    state: _joi2.default.string().required(),
    status: _joi2.default.string().required(),
    price: _joi2.default.string().alphanum().required(),
    manufacturer: _joi2.default.string().required(),
    model: _joi2.default.string().required(),
    body_type: _joi2.default.string().required()
  });
  const results = _joi2.default.validate(rawData, schema);

  if (results.error === null) {
    // update data
    rawData.id = cars.length + 1;
    rawData.owner = req.user.id;
    rawData.date_created = (0, _moment2.default)().format();

    // update the list of users
    cars.push(rawData);
    res.status(201).send({
      status: res.statusCode,
      message: 'Account has been created successfully',
      data: rawData
    });
  } else {
    res.status(400).send({
      status: res.statusCode,
      data: results.error

    });
  }
});

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
      status: res.statusCode,
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