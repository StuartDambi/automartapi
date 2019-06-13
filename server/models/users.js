import Joi from '@hapi/joi';

const User = [
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
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/).required(),
    address: Joi.string().alphanum().min(3).max(30)
      .required(),
    is_admin: Joi.boolean(),
  });
  return Joi.validate(user, schema);
}


exports.User = User;
exports.validate = validateUser;
