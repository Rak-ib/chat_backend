const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const loginRoute=require("./router/loginRouter")
const userRoute=require("./router/userRouter")
const inboxRoute=require("./router/inboxRouter")






const app=express();
app.use(express.json())
app.use(cors())
dotenv.config()
app.use(cookieParser(process.env.cookie_parser))


//Mongoose connection
mongoose.connect(process.env.MONGOOES_CONNECTION)
.then(()=>console.log("connection successful"))
.catch(err=>console.log("Error form mongoose:  ",err))


// routes
app.use("/",loginRoute)
app.use("/user",userRoute)
app.use("/inbox",inboxRoute)





app.listen(3000,()=>{
    console.log("app is running fine");
})