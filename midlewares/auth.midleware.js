const Users = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }
  const findUser = await Users.find({id: req.signedCookies.userId}).exec();
  if(!findUser) {
    res.redirect('/auth/login');
    return;
  }
  res.locals.user = findUser[0];
  next();
}