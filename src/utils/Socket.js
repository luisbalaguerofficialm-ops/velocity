// src/util/socket.js
import { io } from "socket.io-client";

const API_URL = "https://flyexpress-backend.onrender.com";

const socket = io(API_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = (adminId) => {
  const token = localStorage.getItem("accessToken");
  if (!adminId || !token) return;

  socket.auth = { token };
  if (!socket.connected) socket.connect();

  // Changed from 'join-user' to 'join-admin' for clarity
  socket.emit("join-admin", adminId);
};

export default socket;
