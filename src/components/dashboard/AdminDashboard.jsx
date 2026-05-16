import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "../../utils/axiosClient";
import { getShipmentStatusStyle } from "../../utils/getShipmentStatusStyle";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // 1. Fetch Dashboard Data using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const response = await axiosClient.get("/api/v1/dashboard");
      return response.data.data;
    },
    refetchInterval: 30000, // Refetch every 3 minutes
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
    navigate(`/admin/shipment-detail/${shipment._id}`);
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
    <div className="bg-[#f8f9fa] font-body text-[#191c1d] antialiased">
      <main className="min-h-screen">
        <section className="p-8 space-y-12  max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-extrabold font-headline tracking-tight text-[#002B5B]">
              System Overview
            </h2>
            <p className="text-[#43474f] font-body">
              Operational pulse for{" "}
              <span className="text-[#002B5B] font-bold">Velocity Transit</span>{" "}
              Global Network.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* TOTAL SHIPMENTS */}
            <div className="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded">
                  inventory_2
                </span>
                <span className="text-xs font-bold text-[#064e3b] bg-[#d1fae5] px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>

              <p className="text-[#43474f] text-sm font-medium">
                Total Shipments
              </p>
              <h3 className="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                {data?.overview?.totalShipments || "0"}
              </h3>
            </div>

            {/* REVENUE */}
            <div className="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded">
                  payments
                </span>
                <span className="text-xs font-bold text-[#064e3b] bg-[#d1fae5] px-2 py-0.5 rounded-full">
                  MTD
                </span>
              </div>

              <p className="text-[#43474f] text-sm font-medium">Revenue</p>
              <h3 className="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                {data?.overview?.revenue || "$0"}
              </h3>
            </div>

            {/* ACTIVE COURIERS */}
            <div className="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded">
                  electric_moped
                </span>
                <span className="text-xs font-bold text-[#064e3b] bg-[#d1fae5] px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <p className="text-[#43474f] text-sm font-medium">
                Active Couriers
              </p>
              <h3 className="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                {data?.overview?.activeCouriers || "0"}
              </h3>
            </div>

            {/* SYSTEM HEALTH */}
            <div className="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-[#002B5B] bg-[#d6e3ff] p-2 rounded">
                  health_and_safety
                </span>
                <span className="text-xs font-bold text-[#064e3b] bg-[#d1fae5] px-2 py-0.5 rounded-full uppercase">
                  Stable
                </span>
              </div>

              <p className="text-[#43474f] text-sm font-medium">
                System Health
              </p>
              <h3 className="text-3xl font-extrabold text-[#002B5B] tracking-tight">
                {data?.overview?.systemHealth || "0%"}
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-[#002B5B]">
                  Live Shipment Feed
                </h4>
                <button
                  onClick={handleAllShipmentsFeed}
                  className="text-sm font-semibold text-[#10b981] flex items-center gap-1 hover:underline"
                >
                  View All Feed{" "}
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </button>
              </div>
              {/* table========================================= */}
              <div className="bg-white rounded shadow-sm overflow-hidden border border-[#c4c6d0]/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#edeeef] text-[#43474f] text-xs uppercase tracking-wider font-bold">
                      <tr>
                        <th className="px-6 py-4">Tracking ID</th>
                        <th className="px-6 py-4">Destination</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">ETA</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c4c6d0]/10 text-medium">
                      {data.table.map((shipment) => (
                        <tr
                          key={shipment._id}
                          className="hover:bg-[#f3f4f5] transition-colors"
                        >
                          <td className="px-6 py-5 font-bold text-[#002B5B]">
                            {shipment.trackingId}
                          </td>

                          <td className="px-6 py-5">
                            <span className="font-medium text-[#191c1d]">
                              {shipment.deliveryAddress}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={getShipmentStatusStyle(
                                shipment.status,
                              )}
                            >
                              {shipment.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 font-mono text-yellow-600">
                            {shipment.eta}
                          </td>
                          <td className="px-6 py-5">
                            <button
                              onClick={() => handleShipmentDetail(shipment)}
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
              <div className="bg-[#002B5B] p-8 rounded relative overflow-hidden min-h-[280px] flex flex-col justify-end">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                  <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div className="relative z-10 space-y-4">
                  <h4 className="text-white text-2xl font-bold font-headline uppercase tracking-tight">
                    Fleet Utilization Index
                  </h4>
                  <div className="flex items-end gap-2 h-32">
                    <div className="w-full bg-primary-[#001b3d]/40 rounded-t h-[60%] hover:bg-[#10b981] transition-all"></div>
                    <div className="w-full bg-primary-[#001b3d]/40 rounded-t h-[85%] hover:bg-[#10b981] transition-all"></div>
                    <div className="w-full bg-primary-[#001b3d]/40 rounded-t h-[45%] hover:bg-[#10b981] transition-all"></div>
                    <div className="w-full bg-[#10b981] rounded-t h-[95%] border-b-2 border-white transition-all"></div>
                    <div className="w-full bg-primary-[#001b3d]/40 rounded-t h-[70%] hover:bg-[#10b981] transition-all"></div>
                    <div className="w-full bg-primary-[#001b3d]/40 rounded-t h-[55%] hover:bg-[#10b981] transition-all"></div>
                    <div className="w-full bg-primary-[#001b3d]/40 rounded-t h-[80%] hover:bg-[#10b981] transition-all"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#d6e3ff] font-bold uppercase tracking-widest">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span className="text-[#10b981]">Thu (Peak)</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
                <h4 className="text-lg font-bold text-[#002B5B] mb-6">
                  Top Performers
                </h4>
                <div className="space-y-6">
                  {data.performers.map((courier) => (
                    <div key={courier._id} className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          alt="Courier"
                          className="w-12 h-12 rounded-full object-cover"
                          src={
                            courier.profileImage ||
                            "https://i.pravatar.cc/150?img=3"
                          }
                        />
                        <div className="absolute -bottom-1 -right-1 bg-[#10b981] w-4 h-4 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-bold text-[#002B5B] text-sm">
                            {courier.fullName}
                          </p>
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[#10b981] text-xs">
                              ⭐ star
                            </span>
                            <span className="text-xs font-bold">
                              {" "}
                              {courier.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-[#43474f]">
                          {courier.vehicleType} - {courier.completedDeliveries}{" "}
                          deliveries
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleViewinFleet}
                  className="w-full mt-8 py-2 text-[#002B5B] font-bold text-sm bg-[#edeeef] hover:bg-[#e7e8e9] rounded transition-colors"
                >
                  All Couriers
                </button>
              </div>
              <div className="bg-[#10b981] p-6 rounded relative overflow-hidden shadow-lg group">
                <div className="relative z-10 flex flex-col gap-4">
                  <span
                    className="material-symbols-outlined text-white text-3xl"
                    data-icon="bolt"
                  >
                    bolt
                  </span>
                  <h4 className="text-white text-xl font-bold leading-tight uppercase tracking-tight">
                    Optimize Route Network
                  </h4>
                  <p className="text-[#064e3b]/90 text-sm">
                    AI suggests 3 new corridors to reduce delivery time by 14%.
                  </p>
                  <p className="bg-white text-[#002B5B] font-extrabold px-4 py-2 rounded text-sm w-max shadow-sm active:scale-95 transition-all">
                    Review Proposal
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 text-white/10 group-hover:scale-125 transition-transform duration-700">
                  <span
                    className="material-symbols-outlined text-[160px]"
                    data-icon="hub"
                  >
                    hub
                  </span>
                </div>
              </div>
              <div className="bg-white p-6 rounded shadow-sm border border-[#c4c6d0]/20">
                <h4 className="text-xs font-bold text-[#43474f] uppercase tracking-widest mb-6">
                  Recent System Activity
                </h4>
                <div className="space-y-5">
                  {data.activityFeed.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-4 border-b border-[#c4c6d0]/10"
                    >
                      <span
                        className={`material-symbols-outlined text-white p-1.5 rounded text-sm ${activity.type === "alert" ? "bg-red-500" : "bg-[#10b981]"}`}
                      >
                        {activity.icon}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-[#002B5B] leading-tight">
                          {activity.title}
                        </p>
                        <p className="text-[10px] text-[#43474f] mt-1 uppercase font-bold tracking-wider">
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
        <footer className="mt-16 px-8 py-6 flex items-center justify-between text-[#43474f] text-xs font-medium bg-[#f3f4f5] border-t border-[#c4c6d0]/15">
          <p>
            © 2026 Velocity Transit Logistics. Kinetic Precision Architecture.
          </p>
          <div className="flex gap-6">
            <a className="hover:text-[#002B5B] transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-[#002B5B] transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-[#002B5B] transition-colors" href="#">
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
