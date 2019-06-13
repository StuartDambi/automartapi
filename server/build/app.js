'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _carRoute = require('./routes/carRoute');

var _carRoute2 = _interopRequireDefault(_carRoute);

var _userRoute = require('./routes/userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use(_express2.default.json());
app.use('/api/v1/cars', _carRoute2.default);
app.use('/api/v1/users', _userRoute2.default);

// configs
console.log(`Application name: ${_config2.default.get('name')}`);
// The server port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`AutomartAPi listening to port ${port}...`));