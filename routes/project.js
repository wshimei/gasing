var express = require('express')
var router = express.Router()
var fs = require('fs')

/* GET users listing. */
router.post('/', (req, res, next) => {
  let newProject = req.body.project

  if (!newProject.name || !newProject.github || !newProject.public) {
    req.flash('error', 'Invalid project submission: please try again')
    return res.redirect('/')
  }

  let repos = req.app.locals.repos
  repos.push(newProject)
  console.log('newProject', newProject)
  console.log('repos', repos)
  let newJson = JSON.stringify(repos)

  fs.writeFile('./repos.json', newJson, {flag: 'w+'}, (err) => {
    if (err) res.send(err)
    console.log('The file has been saved!')
    res.redirect('/')
  })
})

module.exports = router
