'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const { cars } = require('../models/carsdb');

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
  }
};

exports.default = carsControll;