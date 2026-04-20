import React from "react";

import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosClient from "../util/axiosClient";

export default function AdminCourierProfile() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // . Fetch Courier Profile Data
  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courier-profile", id],
    queryFn: async () => {
      const response = await axiosClient.get(`/api/v1/couriers/${id}/profile`);
      return response.data.data; // Accessing the structure from your responseHandler
    },
  });

  // . Example Mutation for Deactivation
  const { mutate: toggleStatus } = useMutation({
    mutationFn: (status) =>
      axiosClient.patch(`/api/v1/couriers/${id}/toggle-status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["courier-profile", id]);
      toast.success("Courier status updated");
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

  const { courier, stats, activeShipment } = profileData;

  // Calculate Success Rate
  const successRate =
    stats.totalShipments > 0
      ? Math.round((stats.completedShipments / stats.totalShipments) * 100)
      : 0;
  return (
    <div className="min-h-screen">
      {/* <!-- Main Content Canvas --> */}
      <main class="pt-16 p-8">
        {/* <!-- Profile Header Section --> */}
        <section class="mb-10 animate-fade-in">
          <div class="bg-[#f0f0f0] rounded-md p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            {/* <!-- Abstract background element --> */}
            <div class="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
              <svg
                class="h-full w-full"
                viewbox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.7,-76.4C58.3,-69.2,70,-57.9,78.7,-44.5C87.4,-31.1,93.1,-15.5,91.8,-0.7C90.5,14,82.2,28.1,72.5,40.3C62.8,52.5,51.7,62.8,38.8,70.8C25.9,78.8,11.2,84.5,-3.1,89.8C-17.4,95.2,-31.2,100.2,-44.1,95.1C-56.9,89.9,-68.8,74.7,-77.3,59.3C-85.8,43.9,-90.9,28.4,-91.7,13.2C-92.4,-2.1,-88.7,-17,-81.9,-30.9C-75.1,-44.7,-65.2,-57.4,-52.5,-65.2C-39.8,-73.1,-24.3,-76,-8.7,-81C6.9,-86,21.5,-93.1,44.7,-76.4Z"
                  fill="#006d36"
                  transform="translate(100 100)"
                ></path>
              </svg>
            </div>
            <div class="relative">
              <div class="w-32 h-32 rounded-xl overflow-hidden shadow-2xl ring-4 ring-[#006d36]/10">
                <img
                  alt={courier.fullName}
                  class="w-full h-full object-cover"
                  data-alt="portrait of a focused professional male courier in his 30s with a short beard, wearing a tactical dark blue uniform"
                  src={
                    courier.profileImage || "https://via.placeholder.com/150"
                  }
                />
              </div>
              <div class="absolute -bottom-2 -right-2 bg-[#006d36] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg">
                {courier.status}
              </div>
            </div>
            <div class="flex-1">
              <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span class="text-xs font-bold tracking-[0.2em] text-[#43474f] uppercase mb-1 block">
                    {courier.sector || "General Logistics"}
                  </span>
                  <h2 class="text-4xl font-extrabold text-[#001736] tracking-tight">
                    {courier.fullName || "Courier"}
                  </h2>
                  <p class="text-[#006d36] font-semibold text-sm mt-1">
                    System ID:{" "}
                    <span class="text-[#001736] opacity-80">
                      {courier.employeeId || courier._id}
                    </span>
                  </p>
                </div>
                <div class="flex gap-3">
                  <button class="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#001736]/10 text-[#001736] font-bold text-sm hover:bg-[#001736] hover:text-white transition-all duration-300">
                    <span class="material-symbols-outlined text-lg">
                      message
                    </span>{" "}
                    Message
                  </button>
                  <button
                    onClick={() =>
                      toggleStatus(
                        courier.status === "active" ? "inactive" : "active",
                      )
                    }
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      courier.status === "active"
                        ? "bg-[#ba1a1a]/10 text-[#ba1a1a] hover:bg-[#ba1a1a] hover:text-white"
                        : "bg-[#006d36]/10 text-[#006d36] hover:bg-[#006d36] hover:text-white"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {courier.status === "active" ? "block" : "check_circle"}
                    </span>
                    {courier.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Bento Grid Sections --> */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* <!-- Performance Metrics --> */}
          <div class="bg-[#d7fafa] rounded-lg p-8 transition-transform hover:scale-[1.01] duration-300">
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-lg bg-[#001736] flex items-center justify-center text-white">
                <span class="material-symbols-outlined">trending_up</span>
              </div>
              <h3 class="font-bold text-[#001736] uppercase tracking-wider text-sm">
                Performance Metrics
              </h3>
            </div>
            <div class="space-y-6">
              <div>
                <div class="flex justify-between items-end mb-2">
                  <span class="text-xs font-bold text-[#43474f] uppercase tracking-wide">
                    Delivery Success
                  </span>
                  <span class="text-xl font-extrabold text-[#006d36]">
                    {successRate}%
                  </span>
                </div>
                <div class="h-2 w-full bg-[#c6e9e9] rounded-full overflow-hidden">
                  <div class="h-full bg-[#006d36] w-[98%] rounded-full">
                    style={{ width: `${successRate}%` }}
                  </div>
                </div>
              </div>
              <div class="flex justify-between border-t border-[#c4c6d0]/10 pt-4">
                <span class="text-xs font-bold text-[#43474f] uppercase tracking-wide">
                  Reliability Score
                </span>
                <div class="flex items-center gap-1">
                  <span class="text-lg font-extrabold text-[#006d36]">4.9</span>
                  <span class="text-xs text-[#43474f]">/ 5.0</span>
                </div>
              </div>
              <div class="flex justify-between border-t border-[#c4c6d0]/10 pt-4">
                <span class="text-xs font-bold text-[#43474f] uppercase tracking-wide">
                  Fuel Efficiency
                </span>
                <span class="text-lg font-extrabold text-[#006d36] tracking-tight">
                  {stats.avgDeliveryTimeDays} Days
                </span>
              </div>
            </div>
          </div>
          {/* <!-- Assigned Vehicle --> */}
          <div class="bg-[#001736] text-white rounded-lg p-8 flex flex-col justify-between transition-transform hover:scale-[1.01] duration-300">
            <div>
              <div class="flex items-center gap-3 mb-8">
                <div class="w-10 h-10 rounded-lg bg-[#006d36] flex items-center justify-center">
                  <span class="material-symbols-outlined text-white">
                    local_shipping
                  </span>
                </div>
                <h3 class="font-bold uppercase tracking-wider text-sm text-[#83fba5]">
                  Assigned Vehicle
                </h3>
              </div>
              <div class="mb-6">
                <h4 class="text-2xl font-bold mb-1">
                  {courier.vehicle?.type || "No Vehicle"}
                </h4>
                <p class="text-[#a9c7ff] text-xs font-bold tracking-[0.15em] uppercase">
                  Plate: {courier.vehicle?.plateNumber || "N/A"}
                </p>
              </div>
            </div>
            <div class="bg-[#002b5b] p-4 rounded-xl border border-white/5">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[#83fba5]">
                  engineering
                </span>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-[#a9c7ff] font-bold">
                    Last Maintenance
                  </p>
                  <p class="font-bold text-sm">12 Days Ago</p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Operational Sector --> */}
          <div class="bg-[#d2f5f4] rounded-lg p-8 flex flex-col transition-transform hover:scale-[1.01] duration-300">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-[#006d36] flex items-center justify-center text-white">
                <span class="material-symbols-outlined">explore</span>
              </div>
              <h3 class="font-bold text-[#001736] uppercase tracking-wider text-sm">
                Operational Sector
              </h3>
            </div>
            {activeShipment ? (
              <>
                <div className="mb-4">
                  <p className="text-[10px] font-black text-[#006d36] uppercase mb-1">
                    Tracking ID
                  </p>
                  <h4 className="text-lg font-bold text-[#001736]">
                    {activeShipment.trackingNumber}
                  </h4>
                </div>
                <div className="text-xs text-[#43474f] line-clamp-2 bg-white/50 p-3 rounded-lg border border-white">
                  {activeShipment.deliveryAddress}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#717972] text-xs italic font-medium">
                No active shipments assigned
              </div>
            )}
          </div>
        </div>
        {/* <!-- Recent Deliveries Table --> */}
        <section class="bg-[#d7fafa] rounded-lg overflow-hidden">
          <div class="p-8 pb-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-[#001736] flex items-center justify-center text-white">
                <span class="material-symbols-outlined">history</span>
              </div>
              <h3 class="font-bold text-[#001736] uppercase tracking-wider text-sm">
                Recent Deliveries
              </h3>
            </div>
            <button class="text-xs font-bold text-[#006d36] uppercase hover:underline">
              Download Report
            </button>
          </div>
          <div className="overflow-x-auto px-8 pb-8">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-[#43474f] opacity-60">
                  <th className="px-4 py-2">Tracking ID</th>
                  <th className="px-4 py-2">Destination</th>
                  <th className="px-4 py-2 text-right">Date/Time</th>
                  <th className="px-4 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapping directly from your API response */}
                {profileData?.recentShipments?.map((shipment) => (
                  <tr
                    key={shipment._id}
                    className="bg-[#ffffff] group hover:bg-[#83fba5]/20 transition-colors shadow-sm"
                  >
                    {/* Tracking ID */}
                    <td className="px-4 py-4 rounded-l-xl font-bold text-sm text-[#001736]">
                      #{shipment.trackingNumber}
                    </td>

                    {/* Destination Details */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#001736]">
                          {shipment.receiverName || "Commercial Receiver"}
                        </span>
                        <span className="text-[10px] text-[#43474f] uppercase font-medium truncate max-w-[200px]">
                          {shipment.deliveryAddress}
                        </span>
                      </div>
                    </td>

                    {/* Timestamp - using standard JS formatting */}
                    <td className="px-4 py-4 text-right text-sm font-medium text-[#43474f]">
                      {new Date(shipment.updatedAt).toLocaleDateString()}
                      <span className="ml-2 opacity-50">
                        {new Date(shipment.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-4 rounded-r-xl text-right">
                      <span
                        className={`
              text-[10px] font-bold px-3 py-1 rounded-full uppercase
              ${
                shipment.status === "delivered"
                  ? "bg-[#83fba5]/20 text-[#006d36]"
                  : "bg-[#d6e3ff] text-[#001736]"
              }
            `}
                      >
                        {shipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Dynamic Empty State */}
            {(!profileData?.recentShipments ||
              profileData.recentShipments.length === 0) && (
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
