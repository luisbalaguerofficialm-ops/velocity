import axios from "axios";
import { toast } from "sonner";
import socket from "./Socket";

const API_URL = "https://api.velocitytransit.xyz";

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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ================= RESPONSE =================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (!error.response) {
      toast.error("Network error. Check backend or CORS.");
      return Promise.reject(error);
    }

    const isAuthRoute = window.location.pathname === "/signin";

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("refresh-token")
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

        socket.auth = { token: accessToken };
        if (socket.connected) {
          socket.disconnect();
          socket.connect();
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        if (!isAuthRoute) {
          toast.error("Session expired. Please login again.");

          localStorage.removeItem("accessToken");

          if (socket.connected) socket.disconnect();

          window.location.href = "/signin";
        }

        return Promise.reject(refreshError);
      }
    }

    if (!isAuthRoute && error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  },
);

// ================= LOGOUT =================
export const logout = () => {
  localStorage.removeItem("accessToken");

  if (socket.connected) socket.disconnect();

  if (window.location.pathname !== "/signin") {
    window.location.href = "/signin";
  }
};

export default axiosClient;
