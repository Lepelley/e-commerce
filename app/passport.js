const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const config = require('../app/config')
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
        _id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
      request.flash('flash', 'Vous êtes maintenant connecté !')
      return done(null, request.session.user)
    })
  }))

  passport.use(new GitHubStrategy({
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callback,
    passReqToCallback: true
  },
  (request, accessToken, refreshToken, profile, done) => {
    request.session.user = {
      connected: true,
      email: profile.email,
      firstname: profile.name,
      lastname: ''
    }
    return done(null, request.session.user)
  }))

  // passport.use(new GoogleStrategy({
  //   clientID: GOOGLE_CLIENT_ID,
  //   clientSecret: GOOGLE_CLIENT_SECRET,
  //   callbackURL: "http://www.example.com/auth/google/callback"
  // }, (accessToken, refreshToken, profile, cb) => {
  //   UserSchema.findOrCreate({ googleId: profile.id }, (err, user) => {
  //     return cb(err, user)
  //   })
  // }))

  passport.serializeUser((user, callback) => {
    callback(null, user)
  })

  passport.deserializeUser((user, callback) => {
    UserSchema.findOne({ email: user.email }, (error, user) => {
      callback(error, user)
    })
  })
}
