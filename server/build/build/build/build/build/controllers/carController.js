'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

const carsControll = {
  viewCar: (req, res) => {
    const details = cars.find(car => car.id === parseInt(req.params.id, 10));
    if (!details) {
      return res.status(404).send({
        status: res.statusCode,
        data: 'not found'

      });
    }
    return res.send({
      status: res.statusCode,
      data: details

    });
  },

  postCar: (req, res) => {
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

      cars.push(rawData);
      res.status(201).send({
        status: res.statusCode,
        message: 'Your car has been posted',
        data: rawData
      });
    } else {
      res.status(400).send({
        status: res.statusCode,
        data: results.error

      });
    }
  }, // End of post car

  updatePrice: (req, res) => {
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
  }, // End of Update Price of car
  viewCars: (req, res) => {
    const { status, minPrice, maxPrice } = req.query;
    if (status === 'available') {
      const available = cars.find(car => car.status === 'sold');
      if (!available) {
        return res.send({
          status: 200,
          data: 'There are no car available'
        });
      }
      return res.send({
        status: 200,
        data: [available]
      });
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
      const available = cars.filter(elem => elem.price >= minPrice && elem.price <= maxPrice);

      if (!available) {
        return res.send({
          status: 200,
          data: 'There are no car available'
        });
      }
      res.status(200).send({
        status: res.statusCode,
        data: available
      });
    }
    return res.status(400).send({
      status: res.statusCode,
      data: 'Something went wrong'
    });
  }

};

exports.default = carsControll;