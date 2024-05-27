const {check, validationResult}=require("express-validator")
const mongoose=require("mongoose")
const path=require("path")
const User=require("../Modal/People")
const { unlink } = require("../router/loginRouter")
const userValidator=[
    check("name")
    .isLength({min:1})
    .isAlpha("en-US",{ignore:" -"})
    .withMessage("name can't have special character")
    .trim(),
    check("email")
    .isEmail()
    .withMessage("must be valid email")
    .trim()
    .custom(async (value)=>{
        try {
            const user=await User.findOne({email:value})
            if(user){
                throw createError("Email already in use")
            }
        } catch (error) {
            throw createError(error.message)
        }
    })
    
]


const userValidatorHandler=(req,res,next)=>{
    const error=validationResult(req);

    const mappedErrors=error.mapped();
    console.log(mappedErrors);
    if(Object.keys(mappedErrors).length==0){
        next()
    }else{
        console.log("come- here",req.files);
        if(req.files.length>0){
            const {filename}=req.files[0]
            unlink(
                path(`../UploadedResources/${filename}`),
                (err)=>{
                    if(err)console.log(err);
                }
            );

        }
        res.status(500).json({
            errors:mappedErrors
        })
    }
};

module.exports={
    userValidator,userValidatorHandler
}