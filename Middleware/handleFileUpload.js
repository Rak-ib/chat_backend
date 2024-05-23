const { model } = require("mongoose")
const uploader=require("../Functions/uploader")
function handleFileUpload(req,res,next) {
    const upload=uploader(
        "avatars",
        ["images/jpeg","image/jpg","image/png"],
        1000000,
        "only .jpg .jpeg or .png formate is allowed"
    );

    upload.any()(req,res,(err)=>{
        if(err){
            res.json({
                errors :{
                    avatar:{
                        msg: err.message
                    }
                } 
        })
        }else{
            next()
        }
    })
}

module.exports=handleFileUpload