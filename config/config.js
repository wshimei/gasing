var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development',
  admins = process.env.ADMINS.split(':')

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
        },
        isOwner: function (loggedinUser, ownerId, options) {
          // console.log(admins, loggedinUser._id, String(ownerId))
          if (
            admins.includes(loggedinUser._id) ||
            loggedinUser._id === String(ownerId)
          ) {
            return options.fn(this)
          } else {
            return options.inverse(this)
          }
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
        },
        isOwner: function (loggedinUser, ownerId, options) {
          // console.log(admins, loggedinUser._id, String(ownerId))
          if (
            admins.includes(loggedinUser._id) ||
            loggedinUser._id === String(ownerId)
          ) {
            return options.fn(this)
          } else {
            return options.inverse(this)
          }
        }
      }
    }
  }
}

module.exports = config[env]
