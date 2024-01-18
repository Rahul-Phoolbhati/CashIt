const User = require('../models/user')

let userId;
const userChatGet =(req,res)=>{
    userId = req.params.id;
    res.render('chat',{userId});
}


const userPayGet = async (req,res)=>{
    const user = await User.findById(req.params.id);
    const recipientInfo = {
        name: user.name,
        email: user.email,
        mobileNumber: user.mob,
    };

    res.render('pay', { recipientInfo });
}


module.exports = { userChatGet, userPayGet }