const path = require('path')
const rootPath = path.normalize(__dirname + '/..')
const handlebarsConfig = require('./handlebars')

const env = process.env.NODE_ENV || 'development'
const appname = 'GA-Sing'

// TODO: Merge same configuration, and refactor those that are difference
//       separate env-specific configuration on a different file

var config = {
  development: {
    root: rootPath,
    app: {
      name: appname
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI,
    github_callback: 'http://localhost:3000/auth/github/callback',
    hbs: handlebarsConfig
  },

  test: {
    root: rootPath,
    app: {
      name: 'gasing-mvc'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/gasing-mvc-test'
  },

  production: {
    root: rootPath,
    app: {
      name: appname
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI,
    github_callback: 'https://gasing.herokuapp.com/auth/github/callback',
    hbs: handlebarsConfig
  }
}

module.exports = config[env]
