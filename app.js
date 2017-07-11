require('dotenv').config({ silent: true })
var config = require('./config/config')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var session = require('express-session')
var flash = require('connect-flash')
// var MongoStore = require('connect-mongo')(express)
var passport = require('passport')
var methodOverride = require('method-override')

var routes = require('./routes/index')
var users = require('./routes/user')
var projects = require('./routes/project')

var app = express()

var env = process.env.NODE_ENV || 'development'
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = env == 'development'

// db setup
const mongoose = require('mongoose')
mongoose.connect(config.db, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

// view engine setup

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  helpers: {
    json: function (context) {
      return JSON.stringify(context)
    }
  }
}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// override method through hyperlink
app.use(methodOverride('_method'))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// setup session & flash
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
  // store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash())
// setup passport and passport session
app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)
app.use('/users', users)
app.use('/projects', projects)

var passportConfig = require('./config/passport')

// TODO: Put this on a separate route file
// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }),
function (req, res) {
  // The request will be redirected to GitHub for authentication, so this
  // function will not be called.
})

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  })

app.delete('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// / catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// / error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  })
})

module.exports = app
