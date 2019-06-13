'use strict';

const { cars } = require('../models/carsdb');

exports.findCar = (res, req) => {
  // eslint-disable-next-line radix
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) res.status(404).send('The car with the given ID doesnt exist');
  res.status(200).send({
    status: res.statusCode,
    data: car
  });
  res.send(cars);
};