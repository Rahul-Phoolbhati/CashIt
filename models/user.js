const { default: mongoose } = require("mongoose");

const userShema = {
    name: String,
    email: String,
    mob:{
        type:Number,
        minlength:[6,'Mobile No. should be atleast 10 characters'],
    },
    password:{
        type: String,
        minlength:[6,'password should be atleast 6 characters'],
    },
    lat:{
        type:String,
    },
    lon:{
        type:String,
    },
    amount: {
        type: Number,
        default: 0,
    }
}

module.exports = mongoose.model("User",userShema);