const {check, validationResult}=require("express-validator")

const loginValidation=[
    check("email")
    .isLength({
        min:1,
    })
    .withMessage("mobile or email is required"),
    check("password")
    .isLength({
        min:1,
    })
    .withMessage("Password is required")
];

const handleValidation=(req,res,next)=>{
    const errors=validationResult(req)
    const mappedErrors=errors.mapped()
    if(Object.keys(mappedErrors).length==0){
        next()
    } else{
        console.log(mappedErrors);
        res.json({
            errors:mappedErrors
        })
    }
}

module.exports={loginValidation,handleValidation}