'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const { cardb, validate } = require('../models/cars');

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
router.post('/add', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newCar = {
    state: req.body.state,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    body_type: req.body.body_type
  };
  cardb.push(undefined.newCar);
  return res.status(200).send({
    status: res.statusCode,
    data: newCar
  });
});

module.exports = router;