import _ from 'lodash';
import Joi from '@hapi/joi';
import generatePassword from './helpers/generatePassword';


const { users } = require('../models/users');

const usersControll = {
  signUp: async (req, res) => {
    // pick the values from the users
    const rawData = _.pick(req.body, ['email', 'first_name', 'last_name',
      'password', 'address', 'is_admin']);
    const schema = Joi.object().keys({
      email: Joi.string().email(),
      first_name: Joi.string().alphanum().min(3).max(30)
        .required(),
      last_name: Joi.string().alphanum().min(3).max(30)
        .required(),
      password: Joi.string(),
      address: Joi.string().alphanum().min(3).max(30)
        .required(),
      is_admin: Joi.boolean(),
    });
    // validate the data that has been entered
    const results = Joi.validate(rawData, schema);
    if (results.error === null) {
      const details = users.find(user => user.email === rawData.email);
      if (details) {
        return res.status(400).send(
          {
            status: res.statusCode,
            data: 'user already exists',

          },
        );
      }
      // generate a hashed password
      const newPassword = await generatePassword(rawData, users.length);

      // update data
      rawData.id = users.length + 1;
      rawData.password = newPassword;

      // update the list of users
      users.push(rawData);
      return res.status(201).send(
        {
          status: res.statusCode,
          message: 'Account has been created successfully',
          data: _.pick(rawData, ['id', 'first_name', 'last_name', 'email']),
        },
      );
    }
    return res.status(400).send(
      {
        status: res.statusCode,
        data: results.error,

      },
    );
  },
};
module.exports = usersControll;
