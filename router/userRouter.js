const express=require('express');
const handleFileUpload=require("../Middleware/handleFileUpload")
const {userValidator,userValidatorHandler}=require("../Functions/userValidato")
const addUser=require("../Functions/adduser");
const getUser = require('../Functions/getusers');
const checkLogin = require('../Common/checkLogin');
const UserRoute=express.Router()
console.log("came in user");
UserRoute.get("/",checkLogin,getUser)

UserRoute.post('/',handleFileUpload,userValidator,userValidatorHandler,addUser)

module.exports=UserRoute