const { User, validate } = require('../models/users');

const usersControll = {
  signUp: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User({
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      address: req.body.address,
      is_admin: req.body.is_admin,
    });
    await user.save();
    return res.send(user);
  },
};
module.exports = usersControll;
