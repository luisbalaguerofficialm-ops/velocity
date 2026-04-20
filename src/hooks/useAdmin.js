import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";

export default function useAdmin() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/admin/me");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
