const express = require('express')
const router = express.Router()
const fs = require('fs')
const Project = require('../app/models/project')

router.post('/', (req, res, next) => {
  const newUser = new Project({
    name: req.body.project.name,
    github: req.body.project.github,
    public: req.body.project.public,
    category: req.body.project.category
  })

  newUser.save((err) => {
    if(err) {
      next(err)
      return
    }

    res.redirect('/');
  })
})

module.exports = router
