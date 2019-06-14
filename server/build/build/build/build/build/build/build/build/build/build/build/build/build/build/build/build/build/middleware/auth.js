'use strict';

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const { validate } = require('../models/users');

// eslint-disable-next-line consistent-return
function validateUserData(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

function authenticateUser(req, next) {
  const schema = {
    email: _joi2.default.string().min(3).max(255).required().email(),
    password: _joi2.default.string().min(5).max(255).required()
  };
  _joi2.default.validate(req, schema);
  next();
}
exports.validateUserData = validateUserData;
exports.authenticateUser = authenticateUser;