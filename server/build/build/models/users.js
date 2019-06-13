'use strict';

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const User = [{
  id: 1,
  email: 'jonathanaurugai@gmail.com',
  first_name: 'Jonathan',
  last_name: 'Aurugai',
  password: 'Root1234',
  address: '',
  is_admin: true
}, {
  id: 2,
  email: 'johndoe@gmail.com',
  first_name: 'John',
  last_name: 'Doe',
  password: 'Root1234',
  address: '',
  is_admin: true
}];

function validateUser(user) {
  const schema = _joi2.default.object().keys({
    email: _joi2.default.string().email().required(),
    first_name: _joi2.default.string().alphanum().min(3).max(20).required(),
    last_name: _joi2.default.string().alphanum().min(3).max(20).required(),
    password: _joi2.default.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).required(),
    address: _joi2.default.string().alphanum().min(3).max(30).required(),
    is_admin: _joi2.default.boolean()
  });
  return _joi2.default.validate(user, schema);
}
function authenticateUser(req) {
  const schema = {
    email: _joi2.default.string().min(3).max(255).required().email(),
    password: _joi2.default.string().min(5).max(255).required()
  };
  return _joi2.default.validate(req, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.authenticateUser = authenticateUser;