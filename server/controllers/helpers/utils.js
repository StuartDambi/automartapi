/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import config from 'config';

const generateToken = (id, isAdmin, email) => {
  const token = jwt.sign({
    id, isAdmin, email,
  }, config.get('jwtPrivateKey'));
  return token;
};

export default generateToken;
