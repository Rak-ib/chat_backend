const Conversation = require("../Modal/Conversation");
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


module.exports={searchUser,addConversation,getInbox}