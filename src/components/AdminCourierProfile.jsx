import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "../utils/axiosClient";
import { getStatusStyle } from "../utils/statusStyles";

export default function AdminCourierProfile() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const STATUS_OPTIONS = [
    { value: "active", label: "Active" },
    { value: "on_break", label: "On Break" },
    { value: "inactive", label: "Inactive" },
    { value: "offline", label: "Offline" },
  ];

  // Fetch Courier Profile Data
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courier-profile", id],
    enabled: !!id,
    queryFn: async () => {
      const response = await axiosClient.get(`/api/v1/couriers/${id}/profile`);
      return response.data.data;
    },
  });

  // Toggle Status
  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async (status) => {
      const res = await axiosClient.patch(
        `/api/v1/couriers/${id}/toggle-status`,
        { status },
      );
      return res.data;
    },

    onSuccess: (data) => {
      console.log("SUCCESS RESPONSE:", data);

      queryClient.invalidateQueries({
        queryKey: ["courier-profile", id],
      });

      toast.success("Status updated successfully");
    },

    onError: (error) => {
      console.log("UPDATE ERROR:", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    },
  });

  if (isLoading)
    return (
      <div className="p-20 text-center font-bold animate-pulse">
        Loading Profile...
      </div>
    );

  if (isError)
    return (
      <div className="p-20 text-center text-red-500">
        Error loading courier profile.
      </div>
    );

  const courier = profileData?.courier;
  const stats = profileData?.stats;
  const activeShipment = profileData?.activeShipment;
  const recentShipments = profileData?.recentShipments || [];

  const isActive = courier?.status?.toLowerCase() === "active";

  const successRate =
    stats?.totalShipments > 0
      ? Math.round((stats.completedShipments / stats.totalShipments) * 100)
      : 0;
  return (
    <div className="min-h-screen">
      {/* <!-- Main Content Canvas --> */}
      <main className="pt-16 p-8">
        {/* <!-- Profile Header Section --> */}
        <section className="mb-10 animate-fade-in">
          <div className="bg-[#f0f0f0] rounded-md p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            {/* <!-- Abstract background element --> */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
              <svg
                className="h-full w-full"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.7,-76.4C58.3,-69.2,70,-57.9,78.7,-44.5C87.4,-31.1,93.1,-15.5,91.8,-0.7C90.5,14,82.2,28.1,72.5,40.3C62.8,52.5,51.7,62.8,38.8,70.8C25.9,78.8,11.2,84.5,-3.1,89.8C-17.4,95.2,-31.2,100.2,-44.1,95.1C-56.9,89.9,-68.8,74.7,-77.3,59.3C-85.8,43.9,-90.9,28.4,-91.7,13.2C-92.4,-2.1,-88.7,-17,-81.9,-30.9C-75.1,-44.7,-65.2,-57.4,-52.5,-65.2C-39.8,-73.1,-24.3,-76,-8.7,-81C6.9,-86,21.5,-93.1,44.7,-76.4Z"
                  fill="#006d36"
                  transform="translate(100 100)"
                ></path>
              </svg>
            </div>
            <div className="relative">
              <div className="w-32 h-32 rounded-xl overflow-hidden shadow-2xl ring-4 ring-[#006d36]/10">
                <img
                  alt={courier?.fullName || "fullName"}
                  className="w-full h-full object-cover"
                  data-alt="portrait of a focused professional male courier in his 30s with a short beard, wearing a tactical dark blue uniform"
                  src={
                    courier?.profileImage ||
                    `https://ui-avatars.com/api/?name=${courier?.fullName || "Courier"}`
                  }
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <span className={getStatusStyle(courier?.status)}>
                  {courier?.status}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#43474f] uppercase mb-1 block">
                    {courier?.sector || "Sector Not Assigned"}
                  </span>
                  <h2 className="text-4xl font-extrabold text-[#001736] tracking-tight">
                    {courier?.fullName || "Courier"}
                  </h2>
                  {courier?.email && (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#43474f] mt-1">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                      {courier?.email}
                    </div>
                  )}

                  <p className="text-[#006d36] font-semibold text-sm mt-1">
                    System ID:{" "}
                    <span className="text-[#001736] opacity-80">
                      {courier?.employeeId}
                    </span>
                  </p>
                  {courier?.createdAt && (
                    <p className="text-xs text-[#43474f] font-medium mt-1">
                      Joined:{" "}
                      {new Date(courier.createdAt).toLocaleDateString(
                        undefined,
                        { month: "long", year: "numeric" },
                      )}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  {/* <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#001736]/10 text-[#001736] font-bold text-sm hover:bg-[#001736] hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-lg">
                      message
                    </span>{" "}
                    Message
                  </button> */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <select
                        value={courier?.status}
                        onChange={(e) => updateStatus(e.target.value)}
                        disabled={isPending}
                        className="appearance-none px-4 py-2 pr-10 rounded-xl border border-gray-300 bg-white text-sm font-bold focus:outline-none disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>

                      {/* dropdown arrow */}
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        expand_more
                      </span>
                    </div>

                    {/* Loading spinner */}
                    {isPending && (
                      <div className="flex items-center gap-2 text-sm text-[#006d36] font-bold">
                        <span className="w-4 h-4 border-2 border-[#006d36] border-t-transparent rounded-full animate-spin" />
                        Updating...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Bento Grid Sections --> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* <!-- Performance Metrics --> */}
          <div className="bg-[#d7fafa] rounded-lg p-8 transition-transform hover:scale-[1.01] duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#001736] flex items-center justify-center text-white">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <h3 className="font-bold text-[#001736] uppercase tracking-wider text-sm">
                Performance Metrics
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-bold text-[#43474f] uppercase tracking-wide">
                    Delivery Success
                  </span>
                  <span className="text-xl font-extrabold text-[#006d36]">
                    {successRate}%
                  </span>
                </div>
                <div className="h-2 w-full bg-[#c6e9e9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#006d36] rounded-full"
                    style={{ width: `${successRate}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between border-t border-[#c4c6d0]/10 pt-4">
                <span className="text-xs font-bold text-[#43474f] uppercase tracking-wide">
                  Reliability Score
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-extrabold text-[#006d36]">
                    4.9
                  </span>
                  <span className="text-xs text-[#43474f]">/ 5.0</span>
                </div>
              </div>
              <div className="flex justify-between border-t border-[#c4c6d0]/10 pt-4">
                <span className="text-xs font-bold text-[#43474f] uppercase tracking-wide">
                  Fuel Efficiency
                </span>
                <span className="text-lg font-extrabold text-[#006d36] tracking-tight">
                  {stats?.avgDeliveryTimeDays || 0} Days
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Assigned Vehicle --> */}
          <div className="bg-[#001736] text-white rounded-lg p-8 flex flex-col justify-between transition-transform hover:scale-[1.01] duration-300">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-[#006d36] flex items-center justify-center">
                  <span className="material-symbols-outlined text-white">
                    local_shipping
                  </span>
                </div>
                <h3 className="font-bold uppercase tracking-wider text-sm text-[#83fba5]">
                  Assigned Vehicle
                </h3>
              </div>
              <div className="mb-6">
                <h4 className="text-2xl font-bold mb-1">
                  {typeof courier?.vehicle === "string"
                    ? courier.vehicle
                    : courier?.vehicle?.type || "No Vehicle assigned"}
                </h4>

                <p className="text-[#a9c7ff] text-xs font-bold uppercase">
                  Plate:{" "}
                  {courier?.vehicle?.plateNumber || courier?.vehicle || "N/A"}
                </p>
              </div>
            </div>
            <div className="bg-[#002b5b] p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#83fba5]">
                  engineering
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#a9c7ff] font-bold">
                    Last Maintenance
                  </p>
                  <p className="font-bold text-sm">12 Days Ago</p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Operational Sector --> */}
          <div className="bg-[#d2f5f4] rounded-lg p-6 flex flex-col transition-transform hover:scale-[1.01] duration-300 overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#006d36] flex items-center justify-center text-white">
                <span className="material-symbols-outlined">explore</span>
              </div>
              <h3 className="font-bold text-[#001736] uppercase tracking-wider text-sm">
                Operational Sector
              </h3>
            </div>
            {activeShipment ? (
              <div className="space-y-4">
                <div className="mb-4">
                  <p className="text-[10px] font-black text-[#006d36] uppercase mb-1">
                    Tracking ID
                  </p>
                  <h4 className="text-lg font-bold text-[#001736]">
                    {activeShipment?.trackingId || "N/A"}
                  </h4>
                  {activeShipment?.updatedAt && (
                    <p className="text-[10px] text-[#43474f] font-bold opacity-60">
                      Last Update:{" "}
                      {new Date(activeShipment.updatedAt).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  )}
                </div>
                <div className="text-xs text-[#43474f] line-clamp-2 bg-white/50 p-3 rounded-lg border border-white">
                  {activeShipment.deliveryAddress || "N/A"}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#717972] text-xs italic font-medium">
                No active shipments assigned
              </div>
            )}
          </div>
        </div>
        {/* <!-- Recent Deliveries Table --> */}
        <section className="bg-[#d7fafa] rounded-lg overflow-hidden">
          <div className="p-8 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#001736] flex items-center justify-center text-white">
                <span className="material-symbols-outlined">history</span>
              </div>
              <h3 className="font-bold text-[#001736] uppercase tracking-wider text-sm">
                Recent Deliveries
              </h3>
            </div>
            <button className="text-xs font-bold text-[#006d36] uppercase hover:underline">
              Download Report
            </button>
          </div>
          <div className="overflow-x-auto px-8 pb-8">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[14px] font-black uppercase tracking-[0.2em] text-[#001736] opacity-60">
                  <th className="px-4 py-2">Tracking ID</th>
                  <th className="px-4 py-2">Destination</th>
                  <th className="px-4 py-2 ">receiver</th>
                  <th className="px-4 py-2 text-right">Date/Time</th>
                  <th className="px-4 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapping directly from your API response */}
                {recentShipments.map((shipment) => (
                  <tr
                    key={shipment._id}
                    className="bg-[#ffffff] group hover:bg-[#83fba5]/20 transition-colors shadow-sm"
                  >
                    {/* Tracking ID */}
                    <td className="px-4 py-4 rounded-l-xl font-bold text-sm text-[#001736]">
                      #{shipment.trackingId}
                    </td>

                    {/* Destination Details */}
                    <td className="px-4 py-4">
                      <span className="text-[10px] text-[#43474f] uppercase font-medium truncate max-w-[200px]">
                        {shipment.deliveryAddress}
                      </span>
                    </td>
                    {/* Receiver Name */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-medium text-[#43474f]">
                        {shipment.receiver?.name}
                      </span>
                    </td>

                    {/* Timestamp - using standard JS formatting */}
                    <td className="px-4 py-4 text-right text-sm font-medium text-[#43474f]">
                      {shipment.updatedAt ? (
                        <>
                          {new Date(shipment.updatedAt).toLocaleDateString()}
                          <span className="ml-2 opacity-50">
                            {new Date(shipment.updatedAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </>
                      ) : (
                        "N/A"
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4 rounded-r-xl text-right">
                      <span className={getStatusStyle(shipment.status)}>
                        {shipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Dynamic Empty State */}

            {!recentShipments?.length && (
              <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#c0c9c1]/30 rounded-xl">
                <span className="material-symbols-outlined text-[#717972] mb-2">
                  inventory_2
                </span>
                <p className="text-[#717972] text-xs font-bold uppercase tracking-widest">
                  No Shipment History
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
