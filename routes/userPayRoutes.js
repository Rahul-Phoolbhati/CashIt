const express = require('express')
const router = express.Router()
const {userPayGet, userPayPut } = require('../controllers/otherUserController')



router.route('/:id').get(userPayGet);
router.route('/:id').put(userPayPut);

module.exports = router