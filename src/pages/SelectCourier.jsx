import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getStatusStyle } from "../utils/statusStyles";

export default function SelectCourier() {
  const navigate = useNavigate();

  // STATES (must be top-level)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const { state } = useLocation();
  const shipmentId = state?.shipmentId || localStorage.getItem("shipmentId");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* =========================
   DEBOUNCE SEARCH
========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (selectedCourier?._id) {
      localStorage.setItem("courierId", selectedCourier._id);
    }
  }, [selectedCourier]);

  useEffect(() => {
    if (state?.shipmentId) {
      localStorage.setItem("shipmentId", state.shipmentId);
    }
  }, [state]);

  const { data, isError } = useQuery({
    queryKey: ["couriers", debouncedSearch, page],

    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/couriers", {
        params: {
          search: debouncedSearch,
          page,
          limit: 5,
        },
      });

      return res.data.data;
    },

    keepPreviousData: true,
  });
  const couriers = data?.data || [];
  const totalPages = data?.pages || 1;
  /* ================= ASSIGN COURIER ================= */
  const handleCourier = async () => {
    if (!selectedCourier) {
      return toast.error("Please select a courier");
    }
    if (!shipmentId) {
      return toast.error("Shipment ID not found");
    }
    try {
      await axiosClient.post("/api/v1/couriers/assign-shipment", {
        shipmentId,
        courierId: selectedCourier._id,
      });

      toast.success("Courier assigned successfully");
      navigate("/admin/courier-assigned");
    } catch (err) {
      toast.error("Failed to assign courier");
    }
  };
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  /* ================= CANCEL ================= */
  const handleCancelAssignment = () => {
    setSelectedCourier(null);
    toast.info("Selection cleared");
  };

  /* ================= NAVIGATION ================= */
  const handleNewCourier = () => {
    navigate("/admin/add-courier");
  };

  return (
    <div className="bg-[#e2fffe] text-[#002020]">
      {/* <!-- Main Content --> */}
      <main className="p-6 min-h-screen pb-32">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-[#001736] mb-2 font-headline uppercase">
              Select Courier
            </h1>
            <p className="text-[#001736] font-medium flex items-center gap-2">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="info"
              >
                info
              </span>
              Shipment #{shipmentId} Created
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleNewCourier}
              className="px-4 py-2 bg-[#001736] text-white text-xs font-bold rounded-lg hover:bg-[#002b5b] transition-all"
            >
              Create new Courier
            </button>
            <div className="px-4 py-2 bg-[#ccefee] rounded-xl flex items-center gap-2 text-sm font-bold text-[#001736]">
              <span
                className="material-symbols-outlined text-emerald-600"
                data-icon="filter_list"
              >
                filter_list
              </span>
              Priority: Express
            </div>
          </div>
        </div>
        {/* <!-- High-Density Courier Table Container --> */}
        <div className="bg-[#ffffff] rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="mb-4 flex justify-between items-center">
            <input
              type="text"
              placeholder="Search courier (name, email, ID)..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border rounded-lg w-80 outline-none focus:ring-2 focus:ring-[#83fba5]"
            />
          </div>
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#d2f5f4] text-[#002020] uppercase tracking-widest text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Proximity/ETA</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c6e9e9]/20">
              {couriers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-7 text-gray-500">
                    No couriers found
                  </td>
                </tr>
              ) : (
                couriers.map((courier) => (
                  <tr
                    key={courier._id}
                    className={`transition-colors ${
                      selectedCourier?._id === courier._id
                        ? "bg-emerald-50 ring-2 ring-emerald-400"
                        : "hover:bg-[#d7fafa]"
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                          <img
                            src={courier.profileImage || "/default-avatar.png"}
                            onError={(e) =>
                              (e.target.src = "/default-avatar.png")
                            }
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#001736]">
                            {courier.fullName}
                          </div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase">
                            ID: {courier.employeeId}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">{courier.vehicle}</td>

                    <td className="px-6 py-5 font-bold">
                      {courier.rating || "4.5"}
                    </td>

                    <td className="px-6 py-5">
                      <div>{courier.distance || "N/A"}</div>
                      <div className="text-xs text-slate-500">
                        {courier.eta || "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className={getStatusStyle(courier.status)}>
                        {courier.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => setSelectedCourier(courier)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg ${
                          selectedCourier?._id === courier._id
                            ? "bg-[#001736] text-white"
                            : "bg-[#c6e9e9] hover:bg-[#001736] hover:text-white"
                        }`}
                      >
                        {selectedCourier?._id === courier._id
                          ? "Selected"
                          : "Select"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* ADD PAGINATION UI  for pages*/}

          <div className="flex justify-between items-center mb-2 px-4">
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[#d2f5f4] rounded-lg disabled:opacity-50"
              >
                Prev
              </button>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-[#d2f5f4] rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Bento Style Stats Grid for context --> */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#001736] p-6 rounded-xl flex flex-col justify-between h-40 relative overflow-hidden">
            <div className="z-10">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                Global Reach
              </span>
              <h3 className="text-white text-2xl font-black mt-2">
                Active Fleet
              </h3>
            </div>
            <div className="text-4xl font-extrabold text-white z-12">142</div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span
                className="material-symbols-outlined text-[120px]"
                data-icon="public"
              >
                public
              </span>
            </div>
          </div>
          <div className="bg-[#c6e9e9] p-6 rounded-xl border-l-4 border-emerald-500 flex flex-col justify-between h-40">
            <div>
              <span className="text-[10px] font-bold text-[#001736] uppercase tracking-widest">
                Performance
              </span>
              <h3 className="text-[#001736] text-2xl font-black mt-2">
                Avg. ETA
              </h3>
            </div>
            <div className="text-4xl font-extrabold text-emerald-600">
              14.2m
            </div>
          </div>
          <div className="bg-[#c6e9e9] p-6 rounded-xl border border-gray-200 flex flex-col justify-between h-40">
            <div>
              <span className="text-[10px] font-bold text-[#001736] uppercase tracking-widest">
                Network Health
              </span>
              <h3 className="text-[#001736] text-2xl font-black mt-2">
                Efficiency
              </h3>
            </div>
            <div className="text-4xl font-extrabold text-[#001736]">98.4%</div>
          </div>
        </div>
      </main>
      {/* <!-- Sticky Footer / Action Bar --> */}
      <div className="bg-[#c6e9e9]/90 backdrop-blur-xl shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)] mt-10 p-3 w-full">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#001736] flex items-center justify-center text-white font-bold text-lg ring-4 ring-emerald-500/20">
                {getInitials(selectedCourier?.fullName)}
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Selected Courier
                </div>
                <div className="text-xl font-black text-[#001736] leading-tight">
                  {selectedCourier?.fullName || "no courier selected"}
                </div>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200"></div>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Estimated Cost
                </div>
                <div className="text-lg font-extrabold text-[#001736]">
                  $24.50
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Arrival Window
                </div>
                <div className="text-lg font-extrabold text-[#001736]">
                  12:15 PM
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center border-t gap-4">
            <button
              onClick={handleCancelAssignment}
              className="px-8 py-4 bg-white border border-slate-200 text-[#001736] font-bold rounded-xl hover:bg-slate-300 transition-all"
            >
              Cancel Assignment
            </button>
            <button
              disabled={!selectedCourier || !shipmentId}
              onClick={handleCourier}
              className={`px-10 py-4  text-white font-black text-lg rounded-xl ${
                selectedCourier && shipmentId
                  ? "bg-[#006d36] hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Assign Selected Courier
              <span
                className="material-symbols-outlined"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
