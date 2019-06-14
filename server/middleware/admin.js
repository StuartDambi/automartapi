module.exports = function admin(req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).send('Access Denied');
  }
  return next();
};
