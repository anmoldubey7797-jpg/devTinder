import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null;

export const createSocketConnection = () => {

  if (!socket) {
    console.log("Creating socket connection to:", BASE_URL);

    socket = io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true
    });
  }

  return socket;
};