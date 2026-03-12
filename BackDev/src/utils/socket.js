const server=http.createServer(app);
import socket from 'socket.io';


const initializeSocket=(server)=>{
    const io=socket(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    },
})  

io.on("connection",(socket)=>{
    console.log("New client connected: " + socket.id);
})
}

export default initializeSocket;