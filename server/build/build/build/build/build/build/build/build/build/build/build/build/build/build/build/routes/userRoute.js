'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const router = _express2.default.Router();

// User can signup to the system
router.post('/signup', _userController2.default.signUp);

module.exports = router;