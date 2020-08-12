require("dotenv").config();
const Users = require('../models/user.model');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: '',
  from: 'vinh.ngoanh@gmail.com', // Use the email address or domain you verified above
  subject: 'Wrong passworng more than',
  html: '<strong>You do enter wrong password more than 4 times, please contact us to change.</strong>',
};

module.exports.login =  (req, res) => {
  res.render('auth/login');
};

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Users.find({email: email}).exec();
  if(!user) {
    res.render('auth/login', {
      errors: ['User does not exist.'],
      values: {email: req.body.email}
    });
    return;
  }
  const hash = bcrypt.hashSync(password, saltRounds);
  const checkPassword = bcrypt.compareSync(user[0].password, hash);
  if(!checkPassword) {
    if(user[0].wrongLoginCount <= 4) {
      const newWrongCount = user.wrongLoginCount++;
      Users.updateOne({email: email}, {wrongLoginCount: newWrongCount})
      res.render('auth/login', {
        errors: ['Wrong password.'],
        values: {email: req.body.email}
      });
    } else {
      res.render('auth/login', {
        errors: ['Wrong password more than 4 times.'],
        values: {email: req.body.email}
      });
      msg.to = req.body.email;
      sgMail.send(msg, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log("That's wassup!");
        }
      });
    }
    return;
  }
  res.cookie('userId', user[0]._id ,{
    signed: true,
  });
  res.redirect('/stores');
};