import Joi from '@hapi/joi';

const users = [
  {
    id: 1,
    email: 'jonathanaurugai@gmail.com',
    first_name: 'Jonathan',
    last_name: 'Aurugai',
    password: 'Root1234',
    address: '',
    is_admin: true,
  },
  {
    id: 2,
    email: 'johndoe@gmail.com',
    first_name: 'John',
    last_name: 'Doe',
    password: 'Root1234',
    address: '',
    is_admin: true,
  },
];


function validateUser(user) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    first_name: Joi.string().alphanum().min(3).max(20)
      .required(),
    last_name: Joi.string().alphanum().min(3).max(20)
      .required(),
    password: Joi.string().required(),
    address: Joi.string().alphanum().min(3).max(30)
      .required(),
    is_admin: Joi.boolean(),
  });
  return Joi.validate(user, schema);
}
function authenticateUser(req) {
  const schema = {
    email: Joi.string().min(3).max(255).required()
      .email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}


exports.users = users;
exports.validate = validateUser;
exports.authenticateUser = authenticateUser;
