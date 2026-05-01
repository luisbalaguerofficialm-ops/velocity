import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";

export default function useAdmin(options = {}) {
  return useQuery({
    queryKey: ["me"],

    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/v1/admin/me");
        return res.data.data;
      } catch (error) {
        // ✅ prevent React Query from crashing app
        return null;
      }
    },

    staleTime: 1000 * 60 * 5,

    retry: false, // ❗ prevent infinite retry loops

    refetchOnWindowFocus: false, // ❗ avoid random re-fetch

    ...options, // ✅ allow control (enabled, etc.)
  });
}
