const express = require('express')
const router = express.Router()
const {userPayGet} = require('../controllers/otherUserController')



router.route('/:id').get(userPayGet);

module.exports = router