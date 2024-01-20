const { default: mongoose } = require("mongoose");

const conversationSchema = {
    
    members: Array,

    messages:{
        type: Array
    },

}

module.exports = mongoose.model("Conversation",conversationSchema);