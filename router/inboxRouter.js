const express=require("express");
const checkLogin = require("../Common/checkLogin");
const {searchUser, addConversation, getInbox, messages, sendMessages} = require("../Controller/inboxController");
const inboxRoute=express.Router()
console.log("coma");
inboxRoute.get('/search',checkLogin,searchUser)
inboxRoute.get('/',checkLogin,getInbox)
inboxRoute.post('/conversation',checkLogin,addConversation)
inboxRoute.get('/getmessages/:conversation_id',checkLogin,messages)
inboxRoute.post("/sendmessages",checkLogin,sendMessages)

module.exports=inboxRoute