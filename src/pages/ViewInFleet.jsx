import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { getStatusStyle } from "../utils/statusStyles";

export default function ViewInFleet() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("ALL");
  const [vehicle, setVehicle] = useState("ALL");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /* =========================
     DEBOUNCE SEARCH
  ========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* =========================
     FETCH WITH REACT QUERY
  ========================= */
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["couriers", status, vehicle, page, debouncedSearch],

    queryFn: async () => {
      const params = {
        page,
        limit: 5,
      };

      if (status !== "ALL") {
        params.status = status;
      }

      if (vehicle !== "ALL") {
        params.vehicle = vehicle;
      }

      // SEARCH
      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      try {
        const res = await axiosClient.get("/api/v1/couriers", {
          params,
        });

        return res.data.data;
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch couriers");

        throw err;
      }
    },

    keepPreviousData: true,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });

  const couriers = data?.data || [];
  const pagination = data?.pagination || {};

  /* =========================
   DELETE COURIER
========================= */
  const handleDeleteCourier = async () => {
    if (!selectedCourier) return;

    try {
      setIsDeleting(true);

      await axiosClient.delete(`/api/v1/couriers/${selectedCourier._id}`);

      toast.success("Courier deleted successfully");

      setDeleteModal(false);
      setSelectedCourier(null);

      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete courier");
    } finally {
      setIsDeleting(false);
    }
  };

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
      {/* MAIN CONTENT */}
      <main className="p-8 min-h-screen bg-[#e2fffe]">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tighter text-[#001736] mb-2">
              Fleet Operations
            </h2>

            <p className="text-[#43474f] font-medium">
              Real-time oversight of active courier units across the logistics
              grid.
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

        {/* FILTERS */}
        <div className="bg-[#ffffff]/50 backdrop-blur-md p-4 rounded-2xl mb-8 flex flex-wrap items-center gap-6 border border-white/20">
          {/* SEARCH */}
          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="Search courier name, email or employee ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-3 rounded-xl border border-[#ccefee] bg-white outline-none focus:ring-2 focus:ring-[#006d36]"
            />
          </div>

          {/* STATUS FILTER */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#43474f] pl-2">
              Filter by Status
            </span>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  setStatus("ALL");
                  setPage(1);
                }}
                className={getButtonClass("ALL")}
              >
                All Units
              </button>

              <button
                onClick={() => {
                  setStatus("active");
                  setPage(1);
                }}
                className={getButtonClass("active")}
              >
                Active
              </button>

              <button
                onClick={() => {
                  setStatus("on_break");
                  setPage(1);
                }}
                className={getButtonClass("on_break")}
              >
                On-Break
              </button>

              <button
                onClick={() => {
                  setStatus("offline");
                  setPage(1);
                }}
                className={getButtonClass("offline")}
              >
                Offline
              </button>
            </div>
          </div>

          {/* VEHICLE FILTER */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#43474f]">
              Vehicle Class
            </span>

            <select
              value={vehicle}
              onChange={(e) => {
                setVehicle(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-xl border border-[#ccefee] bg-white"
            >
              <option value="ALL">All Vehicles</option>
              <option value="Transit Van">Transit Van</option>
              <option value="E-Bike">E-Bike</option>
              <option value="Airplane">Airplane</option>
            </select>
          </div>

          {/* FETCHING */}
          {isFetching && (
            <span className="text-xs font-bold text-[#006d36] animate-pulse">
              Updating fleet...
            </span>
          )}

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

        {/* TABLE */}
        <div className="bg-[#ffffff] rounded-3xl overflow-hidden shadow-sm border border-[#c4c6d0]/10">
          {isError ? (
            <div className="text-center py-10 text-red-500">
              Error loading couriers
            </div>
          ) : couriers.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              {isLoading ? "Loading couriers..." : "No couriers found"}
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                            src={
                              courier.profileImage ||
                              "https://via.placeholder.com/40"
                            }
                            alt={courier.fullName}
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
                          <span className="text-xs font-semibold">
                            {courier.vehicle}
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
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              setSelectedCourier(courier);
                              setDeleteModal(true);
                            }}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 bg-[#d7fafa]/20 flex items-center justify-between border-t border-[#c4c6d0]/10">
          <div className="flex gap-4 items-center">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="p-1.5 rounded-lg border border-[#c4c6d0]/30 hover:bg-[#ccefee] transition-colors disabled:opacity-40"
            >
              Prev
            </button>

            <p>
              Page {pagination.page || 1} of {pagination.pages || 1}
            </p>

            <button
              disabled={page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-[#c4c6d0]/30 hover:bg-[#ccefee] transition-colors disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#ccefee] p-6 rounded-3xl border-b-4 border-[#006d36]/40">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#006d36] mb-2 block">
              System Utilization
            </span>

            <p className="text-3xl font-extrabold text-[#001736]">
              84.2
              <span className="text-sm font-bold opacity-60 ml-1">%</span>
            </p>
          </div>

          <div className="bg-[#002b5b] p-6 rounded-3xl text-[#7594ca]">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#83fba5] mb-2 block">
              Active Routes
            </span>

            <p className="text-3xl font-extrabold text-white">412</p>
          </div>

          <div className="bg-[#d2f5f4] p-6 rounded-3xl md:col-span-2 relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#43474f]/60 mb-2 block">
                Network Performance
              </span>

              <div className="flex gap-8 mt-4">
                <div>
                  <p className="text-2xl font-black text-[#002b5b]">99.1%</p>

                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                    On-Time
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-black text-[#002b5b]">1.2m</p>

                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                    CO2 Saved (kg)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* DELETE COURIER MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[90%] max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[#001736]">
                  Delete Courier
                </h2>

                <p className="text-xs text-[#43474f]">
                  Permanent removal action
                </p>
              </div>
            </div>

            <p className="text-sm text-[#43474f] leading-relaxed">
              Are you sure you want to delete this courier? This action cannot
              be undone.
            </p>

            {selectedCourier && (
              <div className="mt-4 p-4 rounded-2xl bg-[#f5f7fa] border border-[#e5e7eb]">
                <p className="text-sm font-bold text-[#001736]">
                  {selectedCourier.fullName}
                </p>

                <p className="text-xs text-[#43474f]">
                  {selectedCourier.employeeId}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedCourier(null);
                }}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#001736] font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteCourier}
                disabled={isDeleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
