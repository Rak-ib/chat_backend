const mongoose=require("mongoose")

const ConversationSchema= mongoose.Schema({
    creator:{
        id:mongoose.Types.ObjectId,
        name:String,
        Avatar:String,
    },
    participant:{
        id:mongoose.Types.ObjectId,
        name:String,
        Avatar:String,

    },
    last_updated:{
        type: Date,
        default: Date.now,
    }
},{timestamps:true})

const Conversation=mongoose.model("Conversation",ConversationSchema)

module.exports=Conversation