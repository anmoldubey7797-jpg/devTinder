import { Server } from "socket.io";
import crypto from "crypto";
import { Chat } from "../models/chat.models.js";

const getSecretKey = (userId,targetUserId) => {
   return crypto.createHash("sha256").
update([userId, targetUserId].sort().join("_")).digest("hex");
};

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });



  io.on("connection", (socket) => {
     
    socket.on("joinchat", ({ firstName,userId, targetUserId }) => {
      const roomId=getSecretKey(userId,targetUserId)
      socket.join(roomId); 
      console.log(firstName+ "Joining Room :"+roomId)
      console.log(roomId)
  });

  socket.on("sendMessage", async ({
  firstName,
  userId,
  targetUserId,
  text
}) => {

  const roomId = getSecretKey(userId, targetUserId);

  try {

    console.log(firstName + " $ " + text);

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] }
    });

    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: []
      });
    }

    chat.messages.push({
      senderId: userId,
      text
    });

    await chat.save();

  } catch (error) {
    console.error("Error handling sendMessage:", error);
  }

  io.to(roomId).emit("messageReceived", {
    firstName,
    text,
    userId
  });

});

    socket.on("disconnect",()=>{

    });

  })
};

export default initializeSocket;


