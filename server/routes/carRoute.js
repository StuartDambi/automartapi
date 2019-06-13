import express from 'express';
import carsControll from '../controllers/carController';

const { cars } = require('../models/carsdb');

const router = express.Router();

// Return all the cars
router
  .get('/', (req, res) => { res.status(200).send({ status: res.statusCode, data: cars }); });

// return specific car
router.get('/:id', carsControll.viewCar);

// Creating an AD
router.post('/car', carsControll.postCar);

// User can Update the Price
router.put('/:id/price', carsControll.updatePrice);

module.exports = router;
