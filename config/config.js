var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development'

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'gasing-mvc'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI,
    github_callback: 'http://localhost:3000/auth/github/callback',
    hbs: {
      layoutsDir: rootPath + '/app/views/layouts/',
      defaultLayout: 'main',
      partialsDir: [rootPath + '/app/views/partials/'],
      helpers: {
        json: function (context) {
          return JSON.stringify(context, null, 2)
        }
      }
    }
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
      name: 'gasing-mvc'
    },
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI,
    github_callback: 'https://gasing.herokuapp.com/auth/github/callback',
    hbs: {
      layoutsDir: rootPath + '/app/views/layouts/',
      defaultLayout: 'main',
      partialsDir: [rootPath + '/app/views/partials/'],
      helpers: {
        json: function (context) {
          return JSON.stringify(context, null, 2)
        }
      }
    }
  }
}

module.exports = config[env]
