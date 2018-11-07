const User = require('../models/user');

exports.getUsers = function(req, res, next) {
  var users = [];
  User.find({}, function(err, existingUser) {
    if(err) { return next(err) }
    users.push(existingUser)
  }).then(function() {
    return res.send({users:users});
  });
}