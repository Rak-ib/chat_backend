const { cookie } = require("express-validator");
const jwt=require("jsonwebtoken")

const checkLogin=(req,res,next)=>{
    console.log(req.signedCookies);
    let cookies=Object.keys(req.signedCookies).length>0?req.signedCookies:null;
    console.log("my",cookies);
    if(cookies){
        try {
            const token=cookies[process.env.COOKIE_NAME]
            const decode=jwt.verify(token,process.env.JWT_SECRETE)
            req.user=decode;
            console.log("decode:::::",decode);
            next()

        } catch (error) {
            console.log("error",error);
            res.send(error)
        }
    }
    else{
        console.log("cookies problem ");
        console.log("login again");
        res.send("login again")
    }
}
module.exports=checkLogin