import axios from "axios";
import { toast } from "react-toastify";
import socket from "./Socket";

const API_URL = "https://flyexpress-backend.onrender.com";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ================= REQUEST =================
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ================= RESPONSE =================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔥 Handle network/CORS errors
    if (!error.response) {
      toast.error("Network error. Check backend or CORS.");
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          `${API_URL}/api/v1/admin/refresh-token`,
          {},
          { withCredentials: true }, 
        );

        const { accessToken } = refreshRes.data.data;

        localStorage.setItem("accessToken", accessToken);

        // 🔌 Sync socket
        socket.auth = { token: accessToken };
        if (socket.connected) {
          socket.disconnect();
          socket.connect();
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please login again.");

        localStorage.removeItem("accessToken");

        if (socket.connected) socket.disconnect();

        window.location.href = "/signin"; 

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  },
);

// ================= LOGOUT =================
export const logout = () => {
  localStorage.removeItem("accessToken");
  if (socket.connected) socket.disconnect();
  window.location.href = "/signin"; // ✅ FIXED
};

export default axiosClient;
