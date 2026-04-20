import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosClient from "../util/axiosClient";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 1. Fetch Dashboard Data using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await axiosClient.get("/dashboard");
      return response.data.data;
    },
    refetchInterval: 30000, // Refetch every 5 minutes
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to sync with network");
    },
  });

  const handleAllShipmentsFeed = () => {
    navigate("/admin/shipment-list");
  };

  const handleViewinFleet = () => {
    navigate("/admin/view-in-fleet");
  };

  const handleShipmentDetail = (shipment) => {
    navigate("/admin/shipment-detail", { state: shipment });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="animate-pulse text-[#002B5B] font-bold">
          Synchronizing Global Network...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-red-600 font-medium">Error: {error.message}</div>
      </div>
    );
  }
  return (
    <div class="bg-[#f8f9fa] font-body text-[#191c1d] antialiased">
      <main class="min-h-screen">
        <section class="p-8 space-y-12  max-w-7xl mx-auto">
          <div class="flex flex-col gap-2">
            <h2 class="text-4xl font-extrabold font-headline tracking-tight text-[#002B5B]">
              System Overview
            </h2>
            <p class="text-[#43474f] font-body">
              Operational pulse for{" "}
              <span class="text-[#002B5B] font-bold">Velocity Transit</span>{" "}
              Global Network.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <div class="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20 relative overflow-hidden group">
              <div class="relative z-10 flex flex-col h-full justify-between text-center">
                <div class="flex items-center justify-between mb-4">
                  <span
                    class="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded"
                    data-icon="inventory_2"
                  >
                    inventory_2
                  </span>
                  <span class="text-xs font-bold text-[#064e3b] bg-[#064e3b] px-2 py-0.5 rounded-full">
                    +12.5%
                  </span>
                </div>
                <div>
                  <p class="text-[#43474f] text-sm font-medium">
                    Total Shipments
                  </p>
                  <h3 class="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                    24,812
                  </h3>
                </div>
              </div>
            </div>
            <div class="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20 relative overflow-hidden group">
              <div class="relative z-10 flex flex-col h-full justify-between">
                <div class="flex items-center justify-between mb-4">
                  <span
                    class="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded"
                    data-icon="payments"
                  >
                    payments
                  </span>
                  <span class="text-xs font-bold text-[#064e3b] bg-[#064e3b] px-2 py-0.5 rounded-full">
                    +8.2%
                  </span>
                </div>
                <div>
                  <p class="text-[#43474f] text-sm font-medium">
                    Revenue (MTD)
                  </p>
                  <h3 class="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                    $842.4K
                  </h3>
                </div>
              </div>
            </div>
            <div class="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20 relative overflow-hidden group">
              <div class="relative z-10 flex flex-col h-full justify-between">
                <div class="flex items-center justify-between mb-4">
                  <span
                    class="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded"
                    data-icon="electric_moped"
                  >
                    electric_moped
                  </span>
                  <span class="text-xs font-bold text-[#064e3b] bg-[#064e3b] px-2 py-0.5 rounded-full">
                    94% Active
                  </span>
                </div>
                <div>
                  <p class="text-[#43474f] text-sm font-medium">
                    Active Couriers
                  </p>
                  <h3 class="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                    1,104
                  </h3>
                </div>
              </div>
            </div>
            <div class="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20 relative overflow-hidden group">
              <div class="relative z-10 flex flex-col h-full justify-between">
                <div class="flex items-center justify-between mb-4">
                  <span
                    class="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded"
                    data-icon="health_and_safety"
                  >
                    health_and_safety
                  </span>
                  <span class="text-xs font-bold text-[#064e3b] bg-[#064e3b] px-2 py-0.5 rounded-full uppercase">
                    Optimal
                  </span>
                </div>
                <div>
                  <p class="text-[#43474f] text-sm font-medium">
                    System Health
                  </p>
                  <h3 class="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                    99.9%
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div class="lg:col-span-2 space-y-6">
              <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold text-[#002B5B]">
                  Live Shipment Feed
                </h4>
                <button
                  onClick={handleAllShipmentsFeed}
                  class="text-sm font-semibold text-[#10b981] flex items-center gap-1 hover:underline"
                >
                  View All Feed{" "}
                  <span
                    class="material-symbols-outlined text-sm"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </button>
              </div>
              {/* table========================================= */}
              <div class="bg-white rounded shadow-sm overflow-hidden border border-[#c4c6d0]/20">
                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead class="bg-[#edeeef] text-[#43474f] text-xs uppercase tracking-wider font-bold">
                      <tr>
                        <th class="px-6 py-4">Tracking ID</th>
                        <th class="px-6 py-4">Destination</th>
                        <th class="px-6 py-4">Status</th>
                        <th class="px-6 py-4">ETA</th>
                        <th class="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#c4c6d0]/10 text-sm">
                      {data.table.map((shipment) => (
                        <tr
                          key={shipment.id}
                          class="hover:bg-[#f3f4f5] transition-colors"
                        >
                          <td class="px-6 py-5 font-bold text-[#002B5B]">
                            {shipment.trackingId}
                          </td>
                          <td class="px-6 py-5">
                            <div class="flex flex-col">
                              <span class="font-medium text-[#191c1d]">
                                {shipment.destination}
                              </span>
                              <span class="text-xs text-[#43474f]">
                                {shipment.destinationDetails}
                              </span>
                            </div>
                          </td>
                          <td class="px-6 py-5">
                            <span class="bg-[#d1fae5] text-[#064e3b] px-3 py-1 rounded-full text-xs font-bold">
                              {shipment.status}
                            </span>
                          </td>
                          <td class="px-6 py-5 font-mono text-[#10b981]">
                            {shipment.eta}
                          </td>
                          <td class="px-6 py-5">
                            <button
                              onClick={() =>
                                handleShipmentDetail({
                                  id: shipment.id,
                                  destination: shipment.destination,
                                  status: shipment.status,
                                  eta: shipment.eta,
                                })
                              }
                              className="inline-block bg-[#10b981] hover:bg-[#064e3b] text-white text-xs font-bold py-1.5 px-4 rounded shadow-sm transition-all active:scale-95 text-center"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* ======================================= */}
              <div class="bg-[#002B5B] p-8 rounded relative overflow-hidden min-h-[280px] flex flex-col justify-end">
                <div class="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                  <div class="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div class="relative z-10 space-y-4">
                  <h4 class="text-white text-2xl font-bold font-headline uppercase tracking-tight">
                    Fleet Utilization Index
                  </h4>
                  <div class="flex items-end gap-2 h-32">
                    <div class="w-full bg-primary-[#001b3d]/40 rounded-t h-[60%] hover:bg-[#10b981] transition-all"></div>
                    <div class="w-full bg-primary-[#001b3d]/40 rounded-t h-[85%] hover:bg-[#10b981] transition-all"></div>
                    <div class="w-full bg-primary-[#001b3d]/40 rounded-t h-[45%] hover:bg-[#10b981] transition-all"></div>
                    <div class="w-full bg-[#10b981] rounded-t h-[95%] border-b-2 border-white transition-all"></div>
                    <div class="w-full bg-primary-[#001b3d]/40 rounded-t h-[70%] hover:bg-[#10b981] transition-all"></div>
                    <div class="w-full bg-primary-[#001b3d]/40 rounded-t h-[55%] hover:bg-[#10b981] transition-all"></div>
                    <div class="w-full bg-primary-[#001b3d]/40 rounded-t h-[80%] hover:bg-[#10b981] transition-all"></div>
                  </div>
                  <div class="flex justify-between text-[10px] text-[#d6e3ff] font-bold uppercase tracking-widest">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span class="text-[#10b981]">Thu (Peak)</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-8">
              <div class="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
                <h4 class="text-lg font-bold text-[#002B5B] mb-6">
                  Top Performers
                </h4>
                <div class="space-y-6">
                  {data.performers.map((courier) => (
                    <div key={courier._id} class="flex items-center gap-4">
                      <div class="relative">
                        <img
                          alt="Courier"
                          class="w-12 h-12 rounded-full object-cover"
                          src={
                            courier.profileImage ||
                            "https://i.pravatar.cc/150?img=3"
                          }
                        />
                        <div class="absolute -bottom-1 -right-1 bg-[#10b981] w-4 h-4 rounded-full border-2 border-white"></div>
                      </div>
                      <div class="flex-1">
                        <div class="flex justify-between">
                          <p class="font-bold text-[#002B5B] text-sm">
                            {courier.fullName}
                          </p>
                          <div class="flex items-center gap-1">
                            <span
                              class="material-symbols-outlined text-[#10b981] text-xs"
                              data-icon="star"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              ⭐ star
                            </span>
                            <span class="text-xs font-bold">
                              {" "}
                              {courier.rating}
                            </span>
                          </div>
                        </div>
                        <p class="text-xs text-[#43474f]">
                          {courier.vehecleType} - {courier.completedDeliveries}{" "}
                          deliveries
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleViewinFleet}
                  class="w-full mt-8 py-2 text-[#002B5B] font-bold text-sm bg-[#edeeef] hover:bg-[#e7e8e9] rounded transition-colors"
                >
                  Manage All Couriers
                </button>
              </div>
              <div class="bg-[#10b981] p-6 rounded relative overflow-hidden shadow-lg group">
                <div class="relative z-10 flex flex-col gap-4">
                  <span
                    class="material-symbols-outlined text-white text-3xl"
                    data-icon="bolt"
                  >
                    bolt
                  </span>
                  <h4 class="text-white text-xl font-bold leading-tight uppercase tracking-tight">
                    Optimize Route Network
                  </h4>
                  <p class="text-[#064e3b]/90 text-sm">
                    AI suggests 3 new corridors to reduce delivery time by 14%.
                  </p>
                  <p class="bg-white text-[#002B5B] font-extrabold px-4 py-2 rounded text-sm w-max shadow-sm active:scale-95 transition-all">
                    Review Proposal
                  </p>
                </div>
                <div class="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-125 transition-transform duration-700">
                  <span
                    class="material-symbols-outlined text-[160px]"
                    data-icon="hub"
                  >
                    hub
                  </span>
                </div>
              </div>
              <div class="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
                <h4 class="text-xs font-bold text-[#43474f] uppercase tracking-widest mb-6">
                  Recent System Activity
                </h4>
                <div class="space-y-5">
                  {data.activityFeed.map((activity, index) => (
                    <div
                      key={index}
                      class="flex items-start gap-3 pb-4 border-b border-[#c4c6d0]/10"
                    >
                      <span
                        className={`material-symbols-outlined text-white p-1.5 rounded text-sm ${activity.type === "alert" ? "bg-red-500" : "bg-[#10b981]"}`}
                      >
                        {activity.icon}
                      </span>
                      <div class="flex-1">
                        <p class="text-sm font-bold text-[#002B5B] leading-tight">
                          {activity.title}
                        </p>
                        <p class="text-[10px] text-[#43474f] mt-1 uppercase font-bold tracking-wider">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="mt-16 px-8 py-6 flex items-center justify-between text-[#43474f] text-xs font-medium bg-[#f3f4f5] border-t border-[#c4c6d0]/15">
          <p>
            © 2026 Velocity Transit Logistics. Kinetic Precision Architecture.
          </p>
          <div class="flex gap-6">
            <a class="hover:text-[#002B5B] transition-colors" href="#">
              Privacy Policy
            </a>
            <a class="hover:text-[#002B5B] transition-colors" href="#">
              Terms of Service
            </a>
            <a class="hover:text-[#002B5B] transition-colors" href="#">
              API Status
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, trend }) {
  return (
    <div className="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
      <div className="flex items-center justify-between mb-4">
        <span className="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded">
          {icon}
        </span>
        <span className="text-xs font-bold text-[#064e3b] bg-[#d1fae5] px-2 py-0.5 rounded-full">
          {trend}
        </span>
      </div>
      <p className="text-[#43474f] text-sm font-medium">{label}</p>
      <h3 className="text-3xl font-extrabold text-[#002B5B] tracking-tight">
        {value}
      </h3>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    "In-Transit": "bg-[#d1fae5] text-[#064e3b]",
    Delivered: "bg-[#d6e3ff] text-[#002B5B]",
    Delayed: "bg-[#fee2e2] text-[#93000a]",
  };
  return (
    <span
      className={`${colors[status] || "bg-gray-100"} px-3 py-1 rounded-full text-xs font-bold`}
    >
      {status}
    </span>
  );
}
