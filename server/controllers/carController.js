import Joi from '@hapi/joi';
import moment from 'moment';
import _ from 'lodash';

const { cars } = require('../models/carsdb');

const carsControll = {
  viewCar: (req, res) => {
    const details = cars.find(car => car.id === parseInt(req.params.id, 10));
    if (!details) {
      return res.status(404).send(
        {
          status: res.statusCode,
          data: 'not found',

        },
      );
    }
    return res.send(
      {
        status: res.statusCode,
        data: details,

      },
    );
  },

  postCar: (req, res) => {
    const rawData = _.pick(req.body, ['state', 'status', 'price',
      'manufacturer', 'model', 'body_type']);
    const schema = Joi.object().keys({
      state: Joi.string()
        .required(),
      status: Joi.string()
        .required(),
      price: Joi.string().alphanum()
        .required(),
      manufacturer: Joi.string()
        .required(),
      model: Joi.string()
        .required(),
      body_type: Joi.string()
        .required(),
    });
    const results = Joi.validate(rawData, schema);
    if (results.error === null) {
      // update data
      rawData.id = cars.length + 1;
      rawData.owner = req.user.id;
      rawData.date_created = moment().format();

      cars.push(rawData);
      res.status(201).send(
        {
          status: res.statusCode,
          message: 'Your car has been posted',
          data: rawData,
        },
      );
    } else {
      res.status(400).send(
        {
          status: res.statusCode,
          data: results.error,

        },
      );
    }
  }, // End of post car

  updatePrice: (req, res) => {
    const rawData = _.pick(req.body, ['price']);
    const details = cars.find(car => car.id === parseInt(req.params.id, 10));
    if (!details) {
      return res.status(404).send(
        {
          status: res.statusCode,
          data: 'not found',

        },
      );
    }
    if (req.user.id !== details.owner) {
      return res.status(400).send({
        status: 400,
        data: 'cannot perform this action',
      });
    }
    details.price = rawData.price;
    return res.send(
      {
        status: res.statusCode,
        data: details,

      },
    );
  }, // End of Update Price of car
};

export default carsControll;
