const express=require('express');
const handleFileUpload=require("../Middleware/handleFileUpload")
const {userValidator,userValidatorHandler}=require("../Functions/userValidato")
const addUser=require("../Functions/adduser");
const getUser = require('../Functions/getusers');
const UserRoute=express.Router()

UserRoute.get("/",getUser)

UserRoute.post('/',handleFileUpload,userValidator,userValidatorHandler,addUser)

module.exports=UserRoute