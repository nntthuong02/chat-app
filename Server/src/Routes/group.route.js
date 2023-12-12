const express = require('express')
const router = express.Router()
const groupController = require('../Controllers/group.controller')

router.post('/', groupController.createGroup)
router.get('/:userID', groupController.findUserGroup)
router.get('/find/:firstID/:secondID',groupController.findGroup)
module.exports = router;
