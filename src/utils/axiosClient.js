import axios from "axios";
import { toast } from "react-toastify";
import socket from "./Socket";

const API_URL = "https://flyexpress-backend.onrender.com";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // This allows axios to send cookies (refresh token) with every request if needed
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ================= RESPONSE INTERCEPTOR =================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 and ensure we aren't already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔹 Refreshing using Cookies (HttpOnly)
        // We don't send a body because the backend reads req.cookies.refreshToken
        const refreshRes = await axios.post(
          `${API_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        // Access the data based on your backend responseHandler structure
        const { accessToken } = refreshRes.data.data;

        // 🔹 Update local state
        localStorage.setItem("accessToken", accessToken);

        // 🔹 Sync Socket
        socket.auth = { token: accessToken };
        if (socket.connected) {
          socket.disconnect();
          socket.connect();
        }

        // 🔹 Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed (cookie expired or invalid)
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("accessToken");
        // No need to clear refreshToken from localStorage as it's in a cookie

        if (socket.connected) socket.disconnect();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  },
);

export const logout = () => {
  localStorage.removeItem("accessToken");
  if (socket.connected) socket.disconnect();
  window.location.href = "/login";
};

export default axiosClient;
