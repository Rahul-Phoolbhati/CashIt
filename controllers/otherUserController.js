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

// updatte amount in users database
const userPayPut = async (req,res)=>{
    const { amount } = req.body;
//    console.log(amount); 
    const user =  await User.findById(req.params.id);
    if(user){
        user.amount = user.amount + amount;
        user.save();
    }
    res.status(200).json(user);
}


module.exports = { userChatGet, userPayGet , userPayPut }