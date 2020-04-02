const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UserSchema = require('../src/models/UserSchema.js')
const UserRepository = require('../src/models/UserRepository.js')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'form_email',
    passwordField: 'form_password',
    passReqToCallback: true
  },
  (request, email, password, done) => {
    ;(new UserRepository()).checkUser(email, password).then((user) => {
      if (user === false) {
        request.flash('error', 'L\'authentification a échouée')
        return done(null, false)
      }
      request.session.user = {
        connected: true,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
      request.flash('flash', 'Vous êtes maintenant connecté !')
      return done(null, user)
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
