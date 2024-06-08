const express=require("express")
const loginRouter=express.Router()
const login=require("../Functions/login")
const {loginValidation,handleValidation}=require("../Functions/loginValidator");
const logedin = require("../Functions/logedin");

loginRouter.post("/",loginValidation,handleValidation,login);
loginRouter.get('/',logedin)

module.exports=loginRouter