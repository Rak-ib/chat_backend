const redirect=(req,res,next)=>{
    const cookies=Object.keys(req.signedCookies).length>0?req.signedCookies:null;
    if(cookies){
        next();
    }else
    {
        res.redirect('http://localhost:5173/inbox.jsx')
    }
}
module.exports=redirect