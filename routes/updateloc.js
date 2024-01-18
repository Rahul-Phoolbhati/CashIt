const express = require('express')
const router = express.Router()
const {updateLocInDb} = require('../controllers/user')



router.route('/').put(updateLocInDb);

module.exports = router