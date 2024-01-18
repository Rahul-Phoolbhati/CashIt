const express = require('express')
const router = express.Router()
const {userChatGet} = require('../controllers/otherUserController')



router.route('/:id').get(userChatGet);

module.exports = router