import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import {
  Trash2,
  Eye,
  Printer,
  MapPin,
  CheckCircle2,
  Plane,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageShipments() {
  const navigate = useNavigate();

  // STATES (must be top-level)
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [serviceLevel, setServiceLevel] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState(null);
  // REAL SEARCH INPUT
  const [search, setSearch] = useState("");
  // DEBOUNCED SEARCH SENT TO BACKEND
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selected, setSelected] = useState([]);

  /* =========================
   DEBOUNCE SEARCH
========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isFetching } = useQuery({
    queryKey: ["shipments", page, status, serviceLevel, debouncedSearch],

    queryFn: async () => {
      const params = {
        page,
        limit: 5,
      };

      // STATUS
      if (status !== "all") {
        params.status = status;
      }

      // SERVICE LEVEL
      if (serviceLevel !== "all") {
        params.serviceLevel = serviceLevel;
      }

      // SEARCH
      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      const res = await axiosClient.get("/api/v1/shipments", {
        params,
      });

      return res.data.data;
    },

    keepPreviousData: true,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
  const shipments = data?.data || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination?.pages || 1;

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  //  select all and delete
  const toggleSelectAll = () => {
    if (selected.length === shipments.length) {
      setSelected([]);
    } else {
      setSelected(shipments.map((s) => s._id));
    }
  };

  const handleView = (shipment) => {
    navigate(`/admin/shipment-detail/${shipment._id}`);
  };

  // delete shipment
  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/api/v1/shipments/${id}`);

      toast.success("Deleted");

      // update UI instantly
      setSelected([]);
    } catch {
      toast.error("Delete failed");
    }
  };

  // active Service button

  const getServiceClass = (value) =>
    `px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
      serviceLevel === value
        ? "bg-[#83fba5] text-[#00743a]"
        : "bg-[#d2f5f4] text-[#43474f] hover:bg-[#ccefee]"
    }`;
  //   active Status button
  const getStatusClass = (value) =>
    `px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
      status === value
        ? "bg-[#83fba5] text-[#00743a]"
        : "bg-[#d2f5f4] text-[#43474f] hover:bg-[#ccefee]"
    }`;

  return (
    <div className="bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      {/* <!-- Main Wrapper (Removed ml-64 since sidebar is gone) --> */}
      <main className="min-h-screen flex flex-col">
        {/* <!-- Content Area --> */}
        <div className="p-8 space-y-8 flex-1">
          {/* SEARCH */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-[#43474f] uppercase tracking-widest pl-1">
              Search Shipment
            </label>

            <input
              type="text"
              placeholder="Tracking ID, email, receiver..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-[280px] px-4 py-3 rounded-xl border border-[#ccefee] bg-white outline-none focus:ring-2 focus:ring-[#006d36]"
            />

            {isFetching && (
              <p className="text-[10px] text-[#006d36] font-bold animate-pulse">
                Updating shipments...
              </p>
            )}
          </div>
          {/* <!-- Filters & Bulk Actions Toolbar --> */}
          <section className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-1.5">
                <label className="block text-[15px] mb-3 font-bold text-black uppercase tracking-widest pl-1">
                  Status Filter
                </label>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setStatus("all");
                      setPage(1);
                    }}
                    className={getStatusClass("all")}
                  >
                    All Status
                  </button>

                  <button
                    onClick={() => {
                      setStatus("in_transit");
                      setPage(1);
                    }}
                    className={getStatusClass("in_transit")}
                  >
                    In-Transit
                  </button>

                  <button
                    onClick={() => {
                      setStatus("delayed");
                      setPage(1);
                    }}
                    className={getStatusClass("delayed")}
                  >
                    Delayed
                  </button>
                </div>
              </div>
              <div className="h-10 w-[4px] bg-black mt-5"></div>
              <div className="space-y-1.5">
                <label className="block text-[15px] mb-3  font-bold text-black uppercase tracking-widest pl-1">
                  Service Level
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setServiceLevel("all");
                      setPage(1);
                    }}
                    className={getServiceClass("all")}
                  >
                    All Service Levels
                  </button>
                  <button
                    onClick={() => {
                      setServiceLevel("priority");
                      setPage(1);
                    }}
                    className={getServiceClass("priority")}
                  >
                    Flash Priority
                  </button>
                  <button
                    onClick={() => {
                      setServiceLevel("economy");
                      setPage(1);
                    }}
                    className={getServiceClass("economy")}
                  >
                    Economy
                  </button>
                  <button
                    onClick={() => {
                      setServiceLevel("standard");
                      setPage(1);
                    }}
                    className={getServiceClass("standard")}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => {
                      setServiceLevel("first_class");
                      setPage(1);
                    }}
                    className={getServiceClass("first_class")}
                  >
                    First Class
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- Bulk Action Bar (Contextual) --> */}
            <div className="flex items-center bg-[#001736] text-white px-6 py-3 rounded-xl gap-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2">
                <span className="bg-[#83fba5] text-[#00743a] h-6 w-6 flex items-center justify-center rounded-full text-[10px] font-bold">
                  03
                </span>
                <span className="text-sm font-medium tracking-tight">
                  Shipments Selected
                </span>
              </div>
              <div className="h-6 w-[1px] bg-white/20"></div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-[#66dd8b] transition-colors">
                  <Printer className="w-4 h-4" />
                  Manifest
                </button>
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ffdad6] hover:text-white transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
              </div>
            </div>
          </section>
          {/* <!-- Table Container --> */}
          <section className="bg-[#ffffff] rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0f0f0]/50">
                    <th className="p-5 w-12">
                      <input
                        className="rounded-sm border-[#c4c6d0] text-[#006d36] focus:ring-[#006d36] cursor-pointer"
                        type="checkbox"
                        checked={
                          shipments.length > 0 &&
                          selected.length === shipments.length
                        }
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f]">
                      Tracking ID
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f]">
                      Receiver Full Name
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f]">
                      Receiver Email
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f]">
                      Destination
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f]">
                      Status
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f]">
                      Service Level
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f]">
                      ETA
                    </th>
                    <th className="p-5 text-[11px] font-extrabold uppercase tracking-widest text-[#43474f] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c4c6d0]/10">
                  {shipments.map((s) => (
                    <tr
                      key={s._id}
                      className="hover:bg-[#d2f5f4] transition-colors group"
                    >
                      {/* checkbox */}
                      <td className="p-5">
                        <input
                          type="checkbox"
                          checked={selected.includes(s._id)}
                          onChange={() => toggleSelect(s._id)}
                        />
                      </td>

                      <td className="p-5 font-bold">{s.trackingId}</td>

                      <td className="p-5">{s.receiver?.name}</td>

                      <td className="p-5">{s.receiver?.email}</td>

                      <td className="p-5 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#006d36]" />
                        {s.deliveryAddress || "N/A"}
                      </td>

                      <td className="p-5 font-bold uppercase text-xs">
                        {s.status}
                      </td>

                      <td className="p-5">{s.serviceLevel}</td>

                      <td className="p-5">
                        {s.eta?.etaDays ? (
                          <span className="font-semibold text-[#006d36]">
                            {s.eta.etaDays} days
                          </span>
                        ) : (
                          <span className="text-[#43474f] italic">
                            {s.eta?.type === "predicted"
                              ? "Predicting..."
                              : "N/A"}
                          </span>
                        )}
                      </td>

                      {/* actions */}
                      <td className="p-5 flex items-center text-right space-x-2">
                        <button
                          onClick={() => handleView(s)}
                          className="p-2 hover:bg-white rounded-lg"
                        >
                          <Eye className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => {
                            setShipmentToDelete(s);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 hover:bg-[#ffdad6] text-[#ba1a1a]"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="px-8 py-5 border-t border-[#43474f]/10 flex items-center justify-between">
              <span className="text-xs text-[#43474f] font-medium uppercase tracking-wider">
                Showing {(page - 1) * 5 + 1} -{" "}
                {Math.min(page * 5, pagination?.total || 0)} of{" "}
                {pagination?.total || 0} shipments
              </span>

              <div className="flex items-center gap-2">
                {/* Prev */}
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#d2f5f4] hover:bg-[#ccefee] transition-colors disabled:opacity-40"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page indicator */}
                <span className="text-sm font-bold text-[#001736] px-3">
                  {page} / {totalPages}
                </span>

                {/* Next */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#d2f5f4] hover:bg-[#ccefee] transition-colors disabled:opacity-40"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>
          {/* <!-- Metrics Bento Grid (Footer) --> */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12">
            <div className="p-6 bg-[#ccefee] rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#43474f] uppercase tracking-[0.1rem]">
                System Health
              </span>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-extrabold tracking-tighter text-[#001736]">
                  99.8%
                </span>
                <div className="h-12 w-12 rounded-full bg-[#83fba5] flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#006d36]" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-[#006d36] text-white rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#83fba5] uppercase tracking-[0.1rem]">
                Active Sky Cargo
              </span>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-extrabold tracking-tighter">
                  1,204
                </span>
                <Plane className="w-8 h-8 text-white/30" />
              </div>
            </div>
            <div className="p-6 bg-[#ccefee] rounded-xl flex flex-col justify-between border-2 border-[#43474f]/20">
              <span className="text-[10px] font-bold text-[#43474f] uppercase tracking-[0.1rem]">
                Critical Latency
              </span>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-extrabold tracking-tighter text-[#ba1a1a]">
                  12
                </span>
                <div className="px-2 py-1 bg-[#ba1a1a] text-white rounded text-[10px] font-bold">
                  URGENT
                </div>
              </div>
            </div>
            <div className="p-6 bg-[#ccefee] rounded-xl flex flex-col justify-between">
              <span className="text-[10px] font-bold text-[#43474f] uppercase tracking-[0.1rem]">
                Fleet Capacity
              </span>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold text-[#43474f]">
                  <span>84%</span>
                  <span>Optimal</span>
                </div>
                <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-[#006d36] w-[84%] rounded-full"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* HEADER */}
            <div className="p-6 border-b border-[#ececec]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#ffdad6] flex items-center justify-center">
                  <Trash2 className="w-7 h-7 text-[#ba1a1a]" />
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-[#001736]">
                    Delete Shipment
                  </h2>

                  <p className="text-sm text-[#5c5f66]">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* BODY */}
            <div className="p-6">
              <div className="bg-[#fff8f7] border border-[#ffdad6] rounded-2xl p-4">
                <p className="text-sm text-[#43474f] leading-relaxed">
                  Are you sure you want to delete this shipment?
                </p>

                {shipmentToDelete?.trackingId && (
                  <div className="mt-3 text-xs font-bold text-[#ba1a1a] uppercase tracking-wider">
                    Tracking ID: {shipmentToDelete.trackingId}
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 p-6 border-t border-[#ececec] bg-[#fafafa]">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setShipmentToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-[#d0d5dd] text-[#43474f] font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await handleDelete(shipmentToDelete._id);

                  setShowDeleteModal(false);
                  setShipmentToDelete(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#ba1a1a] text-white font-bold hover:bg-[#8f1515] transition-all active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
