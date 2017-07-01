var express = require('express')
var router = express.Router()
var fs = require('fs')
var productJson = require('../public/product.json')

/* GET home page. */

router.post('/', function (req, res) {
  var test = fs.readFileSync('../public/product.json')
  console.log(test)

  res.send([
    req.body,
    productJson
  ])
})

module.exports = router
