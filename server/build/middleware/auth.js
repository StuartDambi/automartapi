'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */
const { validate } = require('../models/users');

module.exports = function auth(req, res, next) {
  const token = req.header('x-auth');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decode = _jsonwebtoken2.default.verify(token, _config2.default.get('jwtPrivateKey'));
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