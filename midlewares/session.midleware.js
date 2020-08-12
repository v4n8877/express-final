const Session = require('../models/session.modle');

module.exports = async  (req, res , next) => {
  if(!req.signedCookies.sessionId) {
    const sessionName = "v4n";
    const sessionId = await Session.create({name: "v4n"});
    res.cookie("sessionId", sessionId._id, {
      signed: true
    });
  }
  next();
}