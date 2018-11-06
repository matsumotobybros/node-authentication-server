const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their account, id and password
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user )});
}

exports.signup = function(req, res, next) {
  const account = req.body.account;
  const id = req.body.id;
  const password = req.body.password;

  if(!account || !id || !password) {
    return res.status(422).send({ error: 'You must provide account, id and password'});
  }


  // See if a user with the given email exists
  User.findOne({ id: id }, function(err, existingUser) {
    if(err) { return next(err) }

    // If a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Id is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      account: account,
      id: id,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });

}