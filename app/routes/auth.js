var express = require('express')
var router = express.Router()

var passportConfig = require('../config/passport')

/* GET home page. */

router.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }),
function (req, res) {
  // The request will be redirected to GitHub for authentication, so this
  // function will not be called.
})

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }
),
function (req, res) {
  res.redirect('/')
})

module.exports = router
