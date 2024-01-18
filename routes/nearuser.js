const express = require('express')
const router = express.Router()
const {getNearbyUsers} = require('../controllers/user')



router.route('/').get(getNearbyUsers);

module.exports = router