const express=require('express');
const handleFileUpload=require("../Middleware/handleFileUpload")

const UserRoute=express.Router()






UserRoute.post('/user',handleFileUpload)


module.exports=UserRoute