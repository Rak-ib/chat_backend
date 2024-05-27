

const logout=(req,res,next)=>{
    res.clearCookie(process.env.cookie_secreate)
    res.send("logout successfully")
}
module.exports=logout