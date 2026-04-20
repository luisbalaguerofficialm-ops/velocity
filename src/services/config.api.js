import axiosClient from "../util/axiosClient";

export const getGoogleMapsKey = async () => {
  const res = await axiosClient.get("/api/v1/config/google-maps-key");
  return res.data.data.key;
};
