import socket from "socket.io";

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", () => {
    console.log("New client connected: ");

    socket.on("joinChat", () => {
      console.log("User joined chat");
    });

    socket.on("sendMessage", () => {
      console.log("Received message: ");
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected: " );
    });
  });
};

export default initializeSocket;


