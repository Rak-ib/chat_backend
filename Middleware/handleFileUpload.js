const { model } = require("mongoose")
const uploader=require("../Functions/uploader")
function handleFileUpload(req,res,next) {
    const upload=uploader(
        "avatars",
        ["images/jpeg","image/jpg","image/png"],
        1000000,
        "only .jpg .jpeg or .png formate is allowed"
    );

    // console.log("handle file upload --- ",upload);
    upload.any()(req,res,(err)=>{
        if(err){
            console.log("found error",err);
            res.json({
                errors :{
                    avatar:{
                        msg: err.message
                    }
                } 
        })
        }else{
            console.log("no error");
            next()
        }
    })
}

module.exports=handleFileUpload