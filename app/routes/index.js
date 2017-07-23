var express = require('express')
var router = express.Router()

var Project = require('../models/project')

/* GET home page. */

router.get('/', function (req, res) {
  let title = 'GA-Sing'

  Project.find({}, (err, projects) => {
    res.render('index', {
      title: title,
      repos: projects,
      loggedin_user: req.user
    })
  })
})

module.exports = router
