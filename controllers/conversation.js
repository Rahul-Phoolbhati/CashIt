const conversasion = require('../models/conversasion');

const getConversations = async (req,res)=>{

    const userId = req.user.id;
    const conversations = await conversasion.find({members:{$all:[userId]}});
    res.json(conversations);
}

