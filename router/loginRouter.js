const express=require("express")
const loginRouter=express.Router()
const login=require("../Functions/login")
const {loginValidation,handleValidation}=require("../Functions/loginValidator")

loginRouter.post("/",loginValidation,handleValidation,login);

module.exports=loginRouter