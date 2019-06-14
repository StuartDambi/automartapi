import Joi from '@hapi/joi';
import { compare } from 'bcryptjs';
import express from 'express';
import generateToken from '../controllers/helpers/generatePassword';

const { users } = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  const rawData = _.pick(req.body, ['email', 'password']);
  // validate the user input data
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
  });
  const results = Joi.validate(rawData, schema);
  if (results.error === null) {
    // check if the user exists in the database
    const details = users.find(user => user.email === rawData.email);
    if (!details) {
      res.status(400).send(
        {
          status: res.statusCode,
          data: 'something went wrong',

        },
      );
    }
    // validate the password
    const validPassword = await compare(rawData.password, details.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    // generate a token
    const token = generateToken(details.id, details.is_admin, details.email);
    return res.status(200).header('x-auth', token).send({
      status: res.statusCode,
      message: 'welcome back our esteemed customer',
      data: {
        token,
        id: details.id,
        first_name: details.first_name,
        last_name: details.last_name,
        email: details.email,
      },
    });
  }
  return res.status(400).send(
    {
      status: res.statusCode,
      data: results.error,

    },
  );
});
module.exports = router;
