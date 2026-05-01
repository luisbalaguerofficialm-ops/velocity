import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import { getStatusStyle } from "../utils/statusStyles";

export default function ViewInFleet() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("ALL");
  const [vehicle, setVehicle] = useState("ALL");
  const [page, setPage] = useState(1);

  /* =========================
     FETCH WITH REACT QUERY
  ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["couriers", status, vehicle, page],
    queryFn: async () => {
      const params = {
        page,
        limit: 5,
      };

      if (status !== "ALL") params.status = status;
      if (vehicle !== "ALL") params.vehicle = vehicle;

      try {
        const res = await axiosClient.get("/api/v1/couriers", { params });
        return res.data.data;
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch couriers");
        throw err;
      }
    },
    keepPreviousData: true,
  });

  const couriers = data?.data || [];

  const getButtonClass = (value) =>
    `px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
      status === value
        ? "bg-[#006d36] text-white"
        : "bg-gray-200 text-[#43474f] hover:bg-[#ccefee]"
    }`;

  const handleAdminCourierProfile = (courier) => {
    navigate(`/admin/admin-courier-profile/${courier._id}`);
  };

  return (
    <div className="bg-[#e2fffe] text-[#002020]">
      {/* <!-- Main Content Canvas --> */}
      <main className="p-8 min-h-screen bg-[#e2fffe]">
        {/* <!-- Header Section with Asymmetric Layout --> */}
        <div className="flex justify-between items-end mb-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tighter text-[#001736] mb-2">
              Fleet Operations
            </h2>
            <p className="text-[#43474f] font-medium">
              Real-time oversight of 124 active units across the metropolitan
              logistics grid.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-[#d7fafa] px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#006d36] animate-pulse"></div>
              <span className="text-xs font-bold tracking-widest uppercase text-[#43474f]">
                Live System: Optimal
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Filters Section - Glassmorphic Horizontal Bar --> */}
        <div className="bg-[#ffffff]/50 backdrop-blur-md p-4 rounded-2xl mb-8 flex flex-wrap items-center gap-6 border border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#43474f] pl-2">
              Filter by Status
            </span>
            <div className="flex gap-4 mb-5">
              <button
                onClick={() => setStatus("ALL")}
                className={getButtonClass("ALL")}
              >
                All Units
              </button>

              <button
                onClick={() => {
                  setStatus("Active");
                  setPage(1);
                }}
                className={getButtonClass("Active")}
              >
                Active
              </button>

              <button
                onClick={() => {
                  setStatus("On-Break");
                  setPage(1);
                }}
                className={getButtonClass("On-Break")}
              >
                On-Break
              </button>

              <button
                onClick={() => {
                  setStatus("Offline");
                  setPage(1);
                }}
                className={getButtonClass("Offline")}
              >
                Offline
              </button>
            </div>
          </div>
          <div className="h-6 w-px bg-[#c4c6d0]/20"></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#43474f]">
              Vehicle Class
            </span>
            <select
              value={vehicle}
              onChange={(e) => {
                setVehicle(e.target.value);
                setPage(1); // reset pagination
              }}
            >
              <option value="ALL">All Vehicles</option>
              <option value="Transit Van">Transit Van</option>
              <option value="E-Bike">E-Bike</option>
              <option value="Airplane">Airplane</option>
            </select>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <button className="flex items-center gap-2 text-xs font-bold text-[#83fba5] bg-[#001736] px-4 py-2 rounded-lg">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="file_download"
              >
                file_download
              </span>
              Export Manifest
            </button>
          </div>
        </div>
        {/* <!-- High-Density Fleet Table --> */}
        <div className="bg-[#ffffff] rounded-3xl overflow-hidden shadow-sm border border-[#c4c6d0]/10">
          {isLoading ? (
            <p>Loading couriers...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading couriers</p>
          ) : couriers.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No couriers found
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#001736] border-b border-[#001736]">
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/70">
                    Courier Profile
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/70">
                    Status
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/70">
                    Vehicle Class
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/70">
                    Operational Sector
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/70 text-center">
                    Load Capacity
                  </th>
                  <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-white/70 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c4c6d0]/5">
                {couriers.map((courier) => (
                  <tr
                    key={courier._id}
                    className="group hover:bg-[#d7fafa]/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#d6e3ff]"
                          data-alt="portrait of a professional courier driver with a friendly expression wearing a company uniform"
                          src={
                            courier.profileImage ||
                            "https://via.placeholder.com/40"
                          }
                        />
                        <div>
                          <p className="text-sm font-bold text-[#001736]">
                            {courier.fullName}
                          </p>
                          <p className="text-[10px] font-medium text-[#43474f]">
                            {courier.employeeId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={getStatusStyle(courier.status)}>
                        {courier.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[#43474f]">
                        <span
                          className="material-symbols-outlined text-lg"
                          data-icon="local_shipping"
                        >
                          local_shipping
                        </span>
                        <span className="text-xs font-semibold">
                          {courier.vehicle || "Transit Van"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-medium text-[#43474f]">
                        {courier.sector}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-24 h-1.5 bg-[#ccefee] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#006d36] rounded-full"
                            style={{ width: "82%" }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#001736]">
                          82%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => handleAdminCourierProfile(courier)}
                          className="px-5 py-2 bg-[#006d36] text-white rounded-xl text-xs font-bold hover:bg-[#005227] transition-all shadow-sm active:scale-95"
                        >
                          View
                        </button>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            className="p-2 hover:bg-[#83fba5]/20 text-[#006d36] rounded-lg transition-colors"
                            title="Message"
                          >
                            <span
                              className="material-symbols-outlined text-lg"
                              data-icon="chat_bubble"
                            >
                              chat_bubble
                            </span>
                          </button>
                          <button
                            className="p-2 hover:bg-[#ba1a1a]/10 text-[#ba1a1a] rounded-lg transition-colors"
                            title="Flag"
                          >
                            <span
                              className="material-symbols-outlined text-lg"
                              data-icon="flag"
                            >
                              flag
                            </span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* <!-- Pagination/Footer --> */}
        <div class="px-6 py-4 bg-[#d7fafa]/20 flex items-center justify-between border-t border-[#c4c6d0]/10">
          <div class="flex gap-4 items-center">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              class="p-1.5 rounded-lg border border-[#c4c6d0]/30 hover:bg-[#ccefee] transition-colors"
            >
              <span
                class="material-symbols-outlined text-sm"
                data-icon="chevron_left"
              >
                chevron_left
              </span>
              prev
            </button>
            <p>
              Page {data?.page} of {data?.pages}
            </p>
            <button
              onClick={() => setPage((p) => p + 1)}
              class="p-1.5 rounded-lg border border-[#c4c6d0]/30 hover:bg-[#ccefee] transition-colors"
            >
              <span
                class="material-symbols-outlined text-sm"
                data-icon="chevron_right"
              >
                chevron_right
              </span>
              Next
            </button>
          </div>
        </div>
        {/* <!-- Fleet Stats Bento Grid (Secondary Visual Data) --> */}
        <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-[#ccefee] p-6 rounded-3xl border-b-4 border-[#006d36]/40">
            <span class="text-[10px] font-black uppercase tracking-widest text-[#006d36] mb-2 block">
              System Utilization
            </span>
            <p class="text-3xl font-extrabold text-[#001736]">
              84.2<span class="text-sm font-bold opacity-60 ml-1">%</span>
            </p>
            <div class="mt-4 flex items-center gap-2 text-[#006d36]">
              <span
                class="material-symbols-outlined text-sm"
                data-icon="trending_up"
              >
                trending_up
              </span>
              <span class="text-[10px] font-bold">+2.4% vs Yesterday</span>
            </div>
          </div>
          <div class="bg-[#002b5b] p-6 rounded-3xl text-[#7594ca]">
            <span class="text-[10px] font-black uppercase tracking-widest text-[#83fba5] mb-2 block">
              Active Routes
            </span>
            <p class="text-3xl font-extrabold text-white">412</p>
            <p class="text-[10px] font-medium opacity-60 mt-4">
              Across 12 Global Hubs
            </p>
          </div>
          <div class="bg-[#d2f5f4] p-6 rounded-3xl md:col-span-2 relative overflow-hidden group">
            <div class="relative z-10">
              <span class="text-[10px] font-black uppercase tracking-widest text-[#43474f]/60 mb-2 block">
                Network Performance
              </span>
              <div class="flex gap-8 mt-4">
                <div>
                  <p class="text-2xl font-black text-[#002b5b]">99.1%</p>
                  <p class="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                    On-Time
                  </p>
                </div>
                <div>
                  <p class="text-2xl font-black text-[#002b5b]">1.2m</p>
                  <p class="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                    CO2 Saved (kg)
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Abstract visual element --> */}
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span
                className="material-symbols-outlined text-[12rem]"
                data-icon="language"
              >
                language
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
