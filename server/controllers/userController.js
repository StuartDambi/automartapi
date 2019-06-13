import _ from 'lodash';
import bcrypt from 'bcryptjs';

const { User } = require('../models/users');
const { authenticateUser } = require('../models/users');

const usersControll = {
  signUp: async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['email', 'first_name', 'last_name', 'password', 'address', 'is_admin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    return res.send(_.pick(user, ['email', 'first_name', 'last_name', 'address']));
  },
  signIn: async (req, res) => {
    const { error } = authenticateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('Invalid Email or Password');

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password');

    return res.send(true);
  },
};
module.exports = usersControll;
