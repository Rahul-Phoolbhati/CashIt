const { getMyProfile } = require('../controllers/user');
const express = require('express')
const router = express.Router()


router.route('/').get((req,res)=>{
    res.redirect(`/api/v1/profile/${req.user.id}`);
})

router.route('/:id').get(getMyProfile);


module.exports = router