import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import initializeSocket from "./utils/socket.js";
import dotenv from "dotenv";
dotenv.config();
import http from "http";


 const app=express();
 app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
 ))

 app.use(express.json())
 app.use(cookieParser())

import authRouter from "../src/routes/authRouter.js";
import profileRouter from "../src/routes/profileRouter.js";
import requestRouter from "../src/routes/request.js";
import userRouter from "./routes/user.js";
import initializeSocket from "./utils/socket.js";


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

const server=http.createServer(app);
initializeSocket(server);

connectDB()
.then(()=>{
   console.log("MongoDb Connect successfully")
   server.listen(process.env.PORT,()=>{
    console.log("Thik hai Server ")
})
})
.catch((error)=>{
    console.log("Not totally Connected")
})


