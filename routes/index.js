var express = require('express')
var router = express.Router()

/* GET home page. */

router.get('/', function (req, res) {
  let title = 'GA-Sing'
  let repos = req.app.locals.repos
  console.log(repos)
  res.render('index', { title, repos })
})

module.exports = router
