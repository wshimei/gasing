const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')

router.post('/', projectController.create)
router.delete('/:id', projectController.remove)

module.exports = router
