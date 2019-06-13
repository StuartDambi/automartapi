const { validate } = require('../models/users');

// eslint-disable-next-line consistent-return
function validateUserData(req, res, next) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

exports.validateUserData = validateUserData;
