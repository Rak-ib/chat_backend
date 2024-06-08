const express=require("express");
const checkLogin = require("../Common/checkLogin");
const {searchUser, addConversation, getInbox} = require("../Controller/inboxController");
const inboxRoute=express.Router()
console.log("coma");
inboxRoute.get('/search',checkLogin,searchUser)
inboxRoute.get('/',checkLogin,getInbox)
inboxRoute.post('/conversation',checkLogin,addConversation)

module.exports=inboxRoute





