/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import config from 'config';

const { validate } = require('../models/users');


module.exports = function auth(req, res, next) {
  const token = req.header('x-auth');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decode = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decode;
    next();
  } catch (e) {
    return res.status(400).send('Invalid token');
  }
};

// eslint-disable-next-line consistent-return
function validateUserData(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
exports.validateUserData = validateUserData;
