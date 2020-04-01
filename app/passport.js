const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UserSchema = require('../src/models/UserSchema.js')
const UserRepository = require('../src/models/UserRepository.js')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    _passReqToCallback: true
  },
  (username, password, done) => {
    const User = new UserRepository()

    User.connect(username, password).then((user) => {
      request.session.user = user.email
      return done(null, user)
    }, (error) => {
      if (error) {
        console.error(error)
      }
      return done(
        null,
        false,
        { message: 'L\'authentification a échouée' }
      )
    })
  }))

  passport.serializeUser((user, callback) => {
    callback(null, user.id)
  })

  passport.deserializeUser((id, callback) => {
    UserSchema.findById(id, (error, user) => {
      callback(error, user)
    })
  })
}
