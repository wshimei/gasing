var express = require('express')
var router = express.Router()

var Project = require('../models/project')

/* GET home page. */

router.get('/', function (req, res, next) {
  Project.find({})
  .populate('user')
  .exec((err, projects) => {
    if (err) return next(err)
    // return res.send(req.user)
    res.render('index', {
      projects: projects
    })
  })
})

module.exports = router
