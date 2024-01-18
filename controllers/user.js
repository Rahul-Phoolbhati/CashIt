const User = require('../models/user');

const getNearbyUsers = async (req,res)=>{
    
    const userLat = parseFloat(req.query.lat);
    const userLon = parseFloat(req.query.lon);
    const latMaxD = 2.045;
    const lonMaxD = 1+5/111.320*Math.cos(userLat);
    const nearusers = await User.find({lat:{ $gte: userLat - latMaxD, $lte: userLat + latMaxD },
    lon:{ $gte: userLon - lonMaxD, $lte: userLon + lonMaxD },
    });
    
    res.json(nearusers);
}

const updateLocInDb= async(req,res)=>{
  try{
    
    const  userlat = req.body.lat;
    const  userlon = req.body.lon;
    // console.log(`${userlat} and ${userlon}`);
    const user = await User.findOneAndUpdate({_id:req.user._id},{ $set: { lat:userlat, lon:userlon } });
   
    // console.log(`${req.user._id}`+"updated");
    res.json({success:true});
  }
  catch(err){
    console.log(err);
  }
  
}

module.exports = {
    getNearbyUsers,
    updateLocInDb,
}