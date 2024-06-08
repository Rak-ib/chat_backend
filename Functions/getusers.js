
const User=require("../Modal/People")

const getUser=async(req,res)=>{
    try {
        console.log("came to get user");
        console.log(req.signedCookies);
        const user=await User.find();
        res.json(user)
        
    } catch (error) {
        next(error)
    }
}
module.exports=getUser