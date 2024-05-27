
const User=require("../Modal/People")

const getUser=async(req,res)=>{
    try {
        const user=await User.find();
        res.send(user)
        
    } catch (error) {
        next(error)
    }
}
module.exports=getUser