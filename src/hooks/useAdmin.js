import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";

export default function useAdmin(options = {}) {
  const token = localStorage.getItem("accessToken");

  return useQuery({
    queryKey: ["me"],

    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/v1/admin/me");
        return res.data.data;
      } catch (error) {
        // Only ignore auth errors
        if (error.response?.status === 401) {
          return null;
        }

        // ❗ Let real errors surface
        throw error;
      }
    },

    enabled: !!token, // ✅ only run when token exists

    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
    refetchOnWindowFocus: false,

    ...options,
  });
}
