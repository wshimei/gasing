var passport = require('passport')
var GitHubStrategy = require('passport-github2').Strategy
var User = require('../app/models/user')
var config = require('./config')

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: config.github_callback
},
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.

      User.findOne({ 'github.id': profile.id }, function (err, user) {
        if (err) return done(err)
        if (user) {
          // TODO: refactor this on model
          if (!user.name) {
            user.name = profile.displayName
            user.save(function (err) {
              if (err) return done(err)
              return done(null, user)
            })
          } else {
            return done(null, user)
          }
        } else {
          var newUser = new User()
          newUser.github.id = profile.id
          newUser.github.avatar_url = profile._json.avatar_url

          if (profile.id === '1294303' || profile.id === '25096079') {
            newUser.admin = true
          } else {
            newUser.admin = false
          }

          newUser.save(function (err) {
            if (err) {
              throw err
            }

            return done(null, newUser)
          })
        }
      })
    })
  }
))

module.exports = passport
