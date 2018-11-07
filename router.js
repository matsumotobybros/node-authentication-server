// Add mock api end points
const Authentication = require('./controllers/authentication');
const Users = require('./controllers/users');
const passportService = require('./services/passport');
// const initialService = require('./services/initialSetup');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there'});
  });

  app.get('/users', Users.getUsers);

    app.post('/signin', requireSignIn, Authentication.signin);
  app.post('/signup', Authentication.signup);

}
