const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')

router.post('/', projectController.create)
router.get('/:projectname', projectController.show)

router.delete('/:id', projectController.remove)
router.patch('/:id/update', projectController.update)
router.post('/:id/like', projectController.like)

module.exports = router
