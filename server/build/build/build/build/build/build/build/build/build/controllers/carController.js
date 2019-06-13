'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const { cars } = require('../models/carsdb');
const { rawData, schema } = require('../models/carsdb');

const carsControll = {
  viewCars: (req, res) => {
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
  }
};

exports.default = carsControll;