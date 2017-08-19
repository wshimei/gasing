const Project = require('../models/project')
const User = require('../models/user')
const request = require('request')

function create (req, res, next) {
  const githubApi = 'https://api.github.com'
  const savedProjectGh = req.body.project.github
  const rgx = /\/([a-z0-9-_]+)\//
  let projectOwner = savedProjectGh.match(rgx)

  const options = {
    url: `${githubApi}/users/${projectOwner[1]}`,
    headers: {
      'User-Agent': process.env.GITHUB_APP_NAME
    }
  }

  request(options, function (error, response, body) {
    if (error) return next(error)
    // TODO: Check if request is failed
    // console.log('error:', error) // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode) // Print the response status code if a response was received

    let projectOwner = JSON.parse(body)

    User.findOneOrCreate(projectOwner, function (err, dbUser) {
      if (err) return next(err)

      const newProject = new Project({
        name: req.body.project.name,
        github: req.body.project.github,
        public: req.body.project.public,
        category: req.body.project.category,
        user: dbUser.id
      })

      newProject.save(function (err) {
        if (err) {
          req.flash('errors', err.errors)
          return next(err)
        }

        req.flash('success', 'Created new project')
        return res.redirect('/')
      })
    })
  })
}

function remove (req, res, next) {
  Project.findByIdAndRemove(req.params.id, function (err, removedProject) {
    if (err) {
      req.flash('errors', err.errors)
      return next()
    }

    req.flash('warning', 'Deleted a project')
    return res.redirect('/')
  })
}

function show (req, res, next) {
  let projectname = req.params.projectname

  Project
  .findOne({
    name: new RegExp('^' + projectname + '$', 'i')
  })
  .populate('user')
  .exec(function (err, foundProject) {
    if (err) return next(err)

    res.render('projects/show', {
      params: req.params,
      foundProject
    })
  })
}

module.exports = {
  create,
  remove,
  show
}
