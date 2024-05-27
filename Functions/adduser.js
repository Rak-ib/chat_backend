const bcrypt=require("bcrypt")
const User=require("../Modal/People")
async function addUser(req,res,next){
    let newUser;
    const handlePassword=await bcrypt.hash(req.body.password,10)
    console.log("finally",handlePassword);
    if(req.files&&req.files.length>0){
        newUser=new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: handlePassword
        });
    } else {
        newUser=new User({
            ...req.body,
            password: handlePassword

        })
    }
    console.log("new user",newUser);
    try {
        const result=await newUser.save();
        console.log("hoice");
        res.json({
            message: "successful"
        })
    } catch (error) {
        console.log("something wrong",error);
        res.json({
            errors:{
                common:{
                    msg: error
                }
            }
        })
    }

}
module.exports=addUser