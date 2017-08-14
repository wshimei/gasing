var express = require('express')
var router = express.Router()

var Project = require('../models/project')

/* GET home page. */

router.get('/', function (req, res) {
  let title = 'GA-Sing'

  Project.find({}, (err, projects) => {
    // return res.send(req.user)
    console.log(req.user.name)
    res.render('index', {
      title: title,
      projects: projects,
      loggedin_user: req.user
    })
  })
})

module.exports = router
