const User=require("../Modal/People")
const bcrypt=require("bcrypt")
// const cookie_parser=require("cookie-parser")
const jwt=require("jsonwebtoken")
async function login(req,res,next){
    try {
        const user=await User.findOne(
            {
                $or:[{email:req.body.email},{name:req.body.name}]
            }
        )
        if(user && user._id){
            const passwordValidation=await bcrypt.compare(
                req.body.password,
                user.password
            )
            if(passwordValidation){
                const userObject={
                    username:user.name,
                    userid: user._id,
                    mobile:user.mobile,
                    email:user.email,
                    avatar:user.avatar||null,
                    role:"user"
                };

                const token=jwt.sign(userObject,process.env.JWT_SECRETE,{
                    expiresIn: 86400000
                })
                console.log("jwt token: ",token);
                res.cookie("learn_with_rakib",token,{
                    maxAge: 86400000,
                    httpOnly:true,
                    signed: true,
                })
                res.locals.loggedInUser=userObject;
                res.json({
                    message:"successful"
                })
            }else{
                throw createError("login Failed")
            }
    
    
    
        }else{
            throw createError("login failed")
        }
    } catch (error) {
        console.log(error);
        res.send({
            error
        })
    }

}
module.exports=login