const Project = require('../models/project')

function create (req, res, next) {
  const newUser = new Project({
    name: req.body.project.name,
    github: req.body.project.github,
    public: req.body.project.public,
    category: req.body.project.category
  })

  newUser.save((err) => {
    if (err) {
      // return res.send(err.errors)
      req.flash('errors', err.errors)
      return res.redirect('/')
    }

    res.redirect('/')
  })
}

module.exports = {
  create
}
