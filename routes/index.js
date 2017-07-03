var express = require('express')
var router = express.Router()
var repos = require('../repos.json')

/* GET home page. */

router.get('/', function (req, res) {
  let title = 'GA-Sing'
  res.render('index', {
    title: title,
    repos: repos,
    flash: req.flash()
  })
})

module.exports = router
