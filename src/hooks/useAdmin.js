import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";

export default function useAdmin(options = {}) {
  return useQuery({
    queryKey: ["me"],

    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/v1/admin/me");
        return res?.data?.data || null;
      } catch (error) {
        return null; // ✅ safe fallback
      }
    },

    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,

    ...options,
  });
}
