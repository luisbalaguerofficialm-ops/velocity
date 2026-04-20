import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";

export default function AllShipmentFeed() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("all");
  const [serviceLevel, setServiceLevel] = useState("all");
  const [page, setPage] = useState(1);

  /* =========================
     FETCH SHIPMENTS
  ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["shipments", status, serviceLevel, page],
    queryFn: async () => {
      const params = { page, limit: 10 };

      if (status !== "all") params.status = status;
      if (serviceLevel !== "all") params.serviceLevel = serviceLevel;

      const res = await axiosClient.get("/api/v1/shipments", { params });
      return res.data.data; // { data, pagination }
    },
    keepPreviousData: true,
  });

  const shipments = data?.data || [];
  const pagination = data?.pagination || {};

  /* =========================
     HANDLERS
  ========================= */
  const handleShipmentEdit = (shipment) => {
    navigate("/admin/edit-shipment", { state: shipment });
  };

  const handleShipmentDetail = (shipment) => {
    navigate("/admin/shipment-detail", { state: shipment });
  };

  const handleCreateShipment = () => {
    navigate("/admin/create-shipment");
  };

  return (
    <div className="bg-[#e2fffe] text-[#002020]">
      <main className="p-8 min-h-[calc(100vh-64px)]">
        {/* HEADER */}
        <section className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-extrabold text-[#001736] mb-2">
              Shipment Command Center
            </h2>
            <p className="text-[#43474f] max-w-md">
              Monitor logistics flows and manage shipments in real time.
            </p>
          </div>

          <button
            onClick={handleCreateShipment}
            className="px-6 py-2 bg-[#006d36] text-white rounded-xl font-bold"
          >
            Create Shipment
          </button>
        </section>

        {/* <!-- Stats Bento --> */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#006d36] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Active Routines
            </p>
            <h3 className="text-3xl font-extrabold text-[#001736]">1,284</h3>
            <div className="mt-4 flex items-center text-[#006d36] text-xs font-bold">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="trending_up"
              >
                trending_up
              </span>
              <span className="ml-1">+12% from yesterday</span>
            </div>
          </div>
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#c53929] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Delayed Transit
            </p>
            <h3 className="text-3xl font-extrabold text-[#001736]">42</h3>
            <div className="mt-4 flex items-center text-[#c53929] text-xs font-bold">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="warning"
              >
                warning
              </span>
              <span className="ml-1">8 Critical Redemptions</span>
            </div>
          </div>
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#006d36] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Fleet Utilization
            </p>
            <h3 className="text-3xl font-extrabold text-[#001736]">94.2%</h3>
            <div className="mt-4 flex items-center text-[#00743a] text-xs font-bold">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="bolt"
              >
                bolt
              </span>
              <span className="ml-1">Peak Efficiency</span>
            </div>
          </div>
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#43474f] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Average ETA
            </p>
            <h3 className="text-3xl font-extrabold text-[#001736]">14.2h</h3>
            <div className="mt-4 flex items-center text-[#43474f] text-xs font-bold">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="schedule"
              >
                schedule
              </span>
              <span className="ml-1">Consistent with Q3</span>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl shadow-[#001736]/5">
          <div className="p-6 border-b border-[#ccefee] flex justify-between items-center bg-[#d7fafa]/30">
            <div className="flex gap-4">
              {/* ALL */}
              <button
                onClick={() => {
                  setStatus("all");
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                  status === "all"
                    ? "bg-[#001736] text-white"
                    : "hover:bg-[#d2f5f4] text-[#43474f]"
                }`}
              >
                All Shipments
              </button>

              {/* IN-TRANSIT */}
              <button
                onClick={() => {
                  setStatus("In-Transit");
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  status === "In-Transit"
                    ? "bg-[#001736] text-white"
                    : "hover:bg-[#d2f5f4] text-[#43474f]"
                }`}
              >
                In-Transit
              </button>

              {/* DELAYED */}
              <button
                onClick={() => {
                  setStatus("Delayed");
                  setPage(1);
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  status === "Delayed"
                    ? "bg-[#001736] text-white"
                    : "hover:bg-[#d2f5f4] text-[#43474f]"
                }`}
              >
                Delayed
              </button>
            </div>

            <div className="flex items-center gap-2 text-[#43474f] text-sm">
              <span className="material-symbols-outlined text-lg">history</span>
              <span>Last updated: 2 mins ago</span>
            </div>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow">
            {isLoading ? (
              <p className="p-6">Loading shipments...</p>
            ) : isError ? (
              <p className="p-6 text-red-500">Failed to load shipments</p>
            ) : shipments.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">
                No shipments found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  {/* TABLE HEADER */}
                  <thead>
                    <tr className="bg-[#001736] text-white">
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-[#43474f] font-extrabold">
                        Tracking ID
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-[#43474f] font-extrabold">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-[#43474f] font-extrabold">
                        Origin
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-[#43474f] font-extrabold">
                        Destination
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-[#43474f]  font-extrabold">
                        Service Level
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-[#43474f]  font-extrabold">
                        ETA
                      </th>
                      <th className="px-6 py-4 text-xs font-label uppercase tracking-widest text-[#43474f] font-extrabold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {/* TABLE BODY */}
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr
                        key={shipment._id}
                        className="border-b hover:bg-[#f0fafa]"
                      >
                        <td className="p-4 font-mono font-bold">
                          <span className="font-mono font-bold text-[#001736]">
                            {shipment.trackingId}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83fba5] text-[#00743a] text-xs font-bold">
                            {shipment.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-bold text-[#001736]">
                            {shipment.origin?.city}
                          </div>
                          <div className="text-[10px] text-[#43474f] uppercase tracking-tighter">
                            {shipment.origin?.hub}
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="text-sm font-bold text-[#001736]">
                            {shipment.destination?.city}
                          </div>
                          <div className="text-[10px] text-[#43474f] uppercase tracking-tighter">
                            {shipment.destination?.hub}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-[#c6e9e9] text-[#001736] rounded">
                            {shipment.serviceLevel}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="text-sm font-bold text-[#001736]">
                            {shipment.eta}
                          </div>
                        </td>

                        <td className="p-4 flex gap-2">
                          <button
                            onClick={() => handleShipmentEdit(shipment)}
                            className="mr-2 px-4 py-1.5 border border-[#006d36] text-[#006d36] text-xs font-bold rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleShipmentDetail(shipment)}
                            className="px-4 py-1.5 bg-[#006d36] text-white text-xs font-bold rounded-lg"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAGINATION */}
            <div className="p-4 flex justify-between items-center border-t">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-3 py-1 border rounded"
              >
                Prev
              </button>

              <p>
                Page {pagination.page || 1} of {pagination.pages || 1}
              </p>

              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 border rounded"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- Contextual FAB - Restricted to Dashboard/Main screens --> */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-16 h-16 rounded-full kinetic-gradient text-white shadow-2xl shadow-[#001736]/40 flex items-center justify-center hover:scale-110 active:scale-90 transition-all">
          <span
            className="material-symbols-outlined text-3xl"
            data-icon="support_agent"
          >
            support_agent
          </span>
        </button>
      </div>
    </div>
  );
}
