const path = require('path')
const handlebar_helpers = require('./helpers')
const rootPath = path.normalize(__dirname + '/..')

module.exports = {
  layoutsDir: rootPath + '/app/views/layouts/',
  defaultLayout: 'main',
  partialsDir: [rootPath + '/app/views/partials/'],
  helpers: handlebar_helpers
}
