const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require("dotenv")
const cookieParser=require("cookie-parser")
const loginRoute=require("./router/loginRouter")
const userRoute=require("./router/userRouter")
const inboxRoute=require("./router/inboxRouter")
const path=require("path")
const redirect = require("./Functions/redirect")

// const corsOptions = {
//     origin: 'http://localhost:3001', // Replace with your frontend URL
//     credentials: true // Allow credentials (cookies) to be sent
// };




const app=express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))
dotenv.config()
console.log(process.env.COOKIE_SECRETE);
app.use(cookieParser(process.env.COOKIE_SECRETE))


//Mongoose connection
mongoose.connect(process.env.MONGOOSE_CONNECTION)
.then(()=>console.log("connection successful"))
.catch(err=>console.log("Error form mongoose:  ",err))


// routes
app.use("/user",userRoute)


app.use("/inbox",inboxRoute)
app.use('/uploads', express.static(path.join(__dirname, 'UploadedResources')));
app.use("/",loginRoute)




app.listen(3000,()=>{
    console.log("app is running fine");
})