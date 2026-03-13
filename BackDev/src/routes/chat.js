import express from "express";
import { Chat } from "../models/chat.models.js";
import userAuth from "../middlewares/auth.middleware.js";
const chatRouter = express.Router();


chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{
const {targetUserId } = req.params;

const userId=req.user._id

  try{
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] }
    }).populate("messages.senderId", "firstName lastName");
    if (!chat) {
         chat = new Chat({
          participants: [userId, targetUserId],
          messages: []
        });
        await chat.save();
      } 
    return res.status(200).json(chat);
  }catch(error){
    console.error("Error fetching chat:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
)

export default chatRouter;