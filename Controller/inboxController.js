const Conversation = require("../Modal/Conversation");
const Message = require("../Modal/Messages");
const People = require("../Modal/People");


const searchUser=async(req,res,next)=>{
    const {name}=req.query;
    console.log("hill",name);
    try {
        const User=await People.find({name})
        res.json(User)
    } catch (error) {
        next(`${error.message}`)
    }
}

const addConversation=async(req,res,next)=>{
    try {
        const conversation=new Conversation({
            creator:{
                id: req.user.userid,
                name: req.user.username,
                avatar:req.user.avatar
            },
            participant:{
                name:req.body[0].name,
                id:req.body[0]._id,
                avatar:req.body[0].avatar
            },
        })
        const result= await conversation.save()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
}


const getInbox=async(req,res,next)=>{
    try {
        
        const result=await Conversation.find({
            $or:[
                {"creator.id":req.user.userid},
                {"participant.id":req.user.userid}
            ]
        })
        res.send(result)
    } catch (error) {
        next(`${error.message}`)
    }
}


const messages=async(req,res,next)=>{
    try {
        const messages=await Message.find({
            conversation_id: req.params.conversation_id
        }).sort("-createdAt")
        console.log("any message:",messages,"   and   ",req.params.conversation_id);
        const {creator,participant}=await Conversation.findById(req.params.conversation_id)
        res.json({
            messages,creator,participant
        })
    } catch (error) {
        res.send("no messages")
    }
}

async function sendMessages(req,res,next){
    try {
        console.log("accomplished");
        const message=new Message({
            text:req.body.message,
            attachment:null,
            sender:{
                id:req.user.userid,
                name:req.user.username,
                avatar:req.user.avatar||null
            },
            receiver:{
                id:req.body.receiverId,
                name:req.body.receiverName,
                avatar:req.body.avatar||null
            },
            conversation_id:req.body.conversation_id
        })
        const result=await message.save()
        res.send(result)
    } catch (error) {
        res.send(`${error.message}`)
    }
}

module.exports={searchUser,addConversation,getInbox,messages,sendMessages}