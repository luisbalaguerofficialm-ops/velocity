import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";

export default function AllShipmentFeed() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("all");
  const [serviceLevel, setServiceLevel] = useState("all");

  // REAL SEARCH INPUT
  const [search, setSearch] = useState("");

  // DEBOUNCED SEARCH SENT TO BACKEND
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);

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
     FETCH SHIPMENTS
  ========================= */
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["shipments", status, serviceLevel, debouncedSearch, page],

    queryFn: async () => {
      const params = {
        page,
        limit: 5,
      };

      // STATUS FILTER
      if (status !== "all") {
        params.status = status;
      }

      // SERVICE FILTER
      if (serviceLevel !== "all") {
        params.serviceLevel = serviceLevel;
      }

      // SEARCH
      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }

      const res = await axiosClient.get("/api/v1/shipments", { params });

      return res.data.data;
    },

    keepPreviousData: true,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });

  const shipments = data?.data || [];
  const pagination = data?.pagination || {};
  const stats = data?.stats || {};

  /* =========================
     HANDLERS
  ========================= */
  const handleShipmentEdit = (shipment) => {
    navigate(`/admin/edit-shipment/${shipment._id}`);
  };

  const handleShipmentDetail = (shipment) => {
    navigate(`/admin/shipment-detail/${shipment._id}`);
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
            className="px-6 py-2 bg-[#006d36] text-white rounded-xl hover:bg-[#006d36]/70 text-medium font-bold"
          >
            Create Shipment
          </button>
        </section>

        {/* STATS BENTO */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ACTIVE ROUTINES */}
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#006d36] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Active Routines
            </p>

            <h3 className="text-3xl font-extrabold text-[#001736]">
              {isLoading ? "--" : stats.activeRoutines || 0}
            </h3>

            <div className="mt-4 flex items-center text-[#006d36] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">
                trending_up
              </span>

              <span className="ml-1">Live active shipment operations</span>
            </div>
          </div>

          {/* DELAYED */}
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#c53929] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Delayed Transit
            </p>

            <h3 className="text-3xl font-extrabold text-[#001736]">
              {isLoading ? "--" : stats.delayedTransit || 0}
            </h3>

            <div className="mt-4 flex items-center text-[#c53929] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">warning</span>

              <span className="ml-1">Shipments requiring attention</span>
            </div>
          </div>

          {/* FLEET UTILIZATION */}
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#006d36] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Fleet Utilization
            </p>

            <h3 className="text-3xl font-extrabold text-[#001736]">
              {isLoading ? "--" : `${stats.fleetUtilization || 0}%`}
            </h3>

            <div className="mt-4 flex items-center text-[#00743a] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">bolt</span>

              <span className="ml-1">Delivery efficiency ratio</span>
            </div>
          </div>

          {/* AVERAGE ETA */}
          <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border-b-2 border-[#43474f] transition-transform hover:-translate-y-1">
            <p className="text-xs font-label uppercase tracking-wider text-[#43474f] mb-1">
              Average ETA
            </p>

            <h3 className="text-3xl font-extrabold text-[#001736]">
              {isLoading ? "--" : `${stats.averageEta || 0} Days`}
            </h3>

            <div className="mt-4 flex items-center text-[#43474f] text-xs font-bold">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>

              <span className="ml-1">Predicted delivery window</span>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section className="bg-white rounded-2xl p-4 mb-6 shadow-sm flex flex-wrap gap-4 items-center">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search shipment..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="flex-1 min-w-[250px] px-4 py-2 rounded-xl border border-[#ccefee] outline-none focus:ring-2 focus:ring-[#006d36]"
          />

          {/* STATUS FILTER */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 rounded-xl border border-[#ccefee]"
          >
            <option value="all">All Status</option>
            <option value="pickup">Pickup</option>
            <option value="in_transit">In Transit</option>
            <option value="out_for_delivery">Out For Delivery</option>
            <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="delivered">Delivered</option>
          </select>

          {/* SERVICE LEVEL FILTER */}
          <select
            value={serviceLevel}
            onChange={(e) => {
              setServiceLevel(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 rounded-xl border border-[#ccefee]"
          >
            <option value="all">All Services</option>
            <option value="priority">Priority</option>
            <option value="standard">Standard</option>
            <option value="economy">Economy</option>
            <option value="first_class">First Class</option>
            <option value="flash_priority">Flash Priority</option>
          </select>

          {/* FETCH STATE */}
          {isFetching && (
            <span className="text-xs font-bold text-[#006d36] animate-pulse">
              Updating...
            </span>
          )}
        </section>

        {/* TABLE */}
        <section className="bg-[#ffffff] rounded-3xl overflow-hidden shadow-2xl shadow-[#001736]/5">
          {isLoading ? (
            <p className="p-6">Loading shipments...</p>
          ) : isError ? (
            <p className="p-6 text-red-500">Failed to load shipments</p>
          ) : shipments.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No shipments found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* TABLE HEAD */}
                <thead>
                  <tr className="bg-[#001736] text-white">
                    <th className="px-6 py-4 text-xs font-bold uppercase">
                      Tracking ID
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase">
                      Origin
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase">
                      Destination
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase">
                      Service
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase">
                      ETA
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {shipments.map((shipment) => (
                    <tr
                      key={shipment._id}
                      className="border-b border-[#c4c6d0]/15 hover:bg-[#f0fafa]"
                    >
                      <td className="p-4 font-mono font-bold">
                        {shipment.trackingId}
                      </td>

                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#83fba5] text-[#00743a] text-xs font-bold">
                          {shipment.status}
                        </span>
                      </td>

                      <td className="p-4 text-sm font-bold text-[#001736]">
                        {shipment.pickupAddress}
                      </td>

                      <td className="p-4 text-sm font-bold text-[#6f22af]">
                        {shipment.deliveryAddress}
                      </td>

                      <td className="p-4">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-[#c6e9e9] text-[#001736] rounded">
                          {shipment.serviceLevel}
                        </span>
                      </td>

                      <td className="p-4">
                        {shipment.eta?.etaDays
                          ? `${shipment.eta.etaDays} days`
                          : "N/A"}
                      </td>

                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => handleShipmentEdit(shipment)}
                          className="px-4 py-1.5 border border-[#006d36] text-[#006d36] hover:bg-[#006d36]/70 hover:text-white text-xs font-bold rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleShipmentDetail(shipment)}
                          className="px-4 py-1.5 bg-[#006d36] text-white hover:border-[#006d36] hover:bg-white hover:text-xs hover:border-2 hover:text-[#006d36] font-bold rounded-lg"
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
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            <p>
              Page {pagination.page || 1} of {pagination.pages || 1}
            </p>

            <button
              disabled={page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
