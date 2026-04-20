// services/notificationService.js 

import axiosClient from "../utils/axiosClient";

export const sendNotificationAPI = async (data) => {
  const response = await axiosClient.post("/api/v1/notifications/send", data);
  return response.data;
};
