import React, { createContext, useContext, useEffect } from "react";
import socket, { connectSocket } from "../utils/Socket";
import useAdmin from "../hooks/useAdmin";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { data: admin } = useAdmin();

  useEffect(() => {
    if (!admin?._id) return;

    // ✅ connect ONCE globally
    connectSocket(admin._id);

    return () => {
      socket.disconnect(); // optional cleanup on logout/app unmount
    };
  }, [admin?._id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// custom hook
export const useSocket = () => useContext(SocketContext);
