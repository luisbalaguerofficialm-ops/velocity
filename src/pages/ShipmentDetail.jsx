import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";

import ShipmentMap from "../components/ShipmentMap";
import socket, { connectSocket } from "../utils/Socket";

export default function ShipmentDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const queryClient = useQueryClient();

  const shipmentId =
    id || state?.shipmentId || localStorage.getItem("shipmentId");

  /* ================= SOCKET (OS LAYER) ================= */
  useEffect(() => {
    if (!admin?.id) return;

    connectSocket(admin.id);

    const handler = (data) => {
      queryClient.setQueryData(["shipment", data.shipmentId], (old) => {
        if (!old) return old;

        return {
          ...old,
          currentLocation: data.currentLocation,
          routeIndex: data.routeIndex,
        };
      });
    };

    socket.on("shipment:location:update", handler);

    return () => {
      socket.off("shipment:location:update", handler);
    };
  }, [admin, queryClient]);

  /* ================= FETCH SHIPMENT ================= */
  const {
    data: shipment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shipment", shipmentId],
    enabled: !!shipmentId,
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/shipments/${shipmentId}`);
      return res.data.data;
    },
  });

  const { data: admin } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/admin/me");
      return res.data.data;
    },
  });

  /* ================= DERIVED OS STATE ================= */
  const route = shipment?.route || [];
  const routeIndex = shipment?.routeIndex || 0;

  // 🚚 REAL PROGRESS ENGINE
  const progress = useMemo(() => {
    if (!route.length) return 0;
    return Math.min(100, Math.round((routeIndex / (route.length - 1)) * 100));
  }, [routeIndex, route]);

  const currentLocation = shipment?.currentLocation;

  /* ================= NAVIGATION ================= */
  const handleLiveMap = () => {
    navigate("/admin/live-map", { state: { shipmentId } });
  };

  const handleUpdateStatus = () => {
    navigate("/admin/update-status", { state: { shipmentId } });
  };

  const handleEditShipment = () => {
    navigate("/admin/edit-shipment", { state: { shipmentId } });
  };

  if (isLoading) return <p className="p-6">Loading shipment...</p>;

  if (isError) {
    toast.error("Failed to load shipment");
    return <p className="p-6 text-red-500">Error loading shipment</p>;
  }

  const origin = shipment?.pickupAddress;
  const destination = shipment?.deliveryAddress;

  return (
    <div class="bg-[#e2fffe] text-[#002020] selection:bg-[#83fba5] selection:text-[#00743a]">
      {/* /<!-- Main Content Canvas --> */}
      <main class="pt-20 px-8 pb-12">
        {/* <!-- Shipment Overview Header (Asymmetric Layout) --> */}
        <header class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <button class="px-5 py-2.5 bg-[#006d36] text-[#ffffff] font-bold rounded-xl text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95">
                <span class="material-symbols-outlined text-sm">send</span>{" "}
                Message Receiver
              </button>
              <span class="bg-[#83fba5] text-[#00743a] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                {statushipment?.status || "Unknown Status"}
              </span>
              <span class="text-[#43474f] text-sm font-medium tracking-tight">
                ID: {trackingId}
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-[#001736] tracking-tighter leading-none mb-2">
              {origin} → {destination}
            </h1>
            <p class="text-[#43474f] max-w-lg">
              Priority High-Value Transit. Estimated arrival:{" "}
              <span class="text-[#006d36] font-bold">14:20 PM Today</span>
              <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm mt-2 text-gray-600">
                Shipment Progress: {progress}%
              </p>
            </p>
            <div class="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-t border-[#c4c6d0]/10">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[#006d36] text-lg">
                  alternate_email
                </span>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-[#43474f]">
                    Receiver Email
                  </p>
                  <p class="text-sm font-bold text-[#001736]">
                    {receiverEmail}
                  </p>
                </div>
              </div>
              <div class="hidden sm:block w-px h-8 bg-[#c4c6d0]/20"></div>
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[#006d36] text-lg">
                  person_pin_circle
                </span>
                <div>
                  <p class="text-[10px] font-bold uppercase tracking-widest text-[#43474f]">
                    Recipient
                  </p>
                  <p class="text-sm font-bold text-[#001736]">{receiverName}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <button class="px-5 py-2.5 bg-[#001736]  text-[#ffffff] font-bold rounded-xl text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95">
              <span class="material-symbols-outlined text-sm">send</span>{" "}
              Message Receiver
            </button>

            <button
              onClick={() => handleLiveMap()}
              className="px-5 py-2.5 bg-[#001736]  text-[#ffffff] font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-surface-dim transition-colors"
            >
              Open Live Map
            </button>
            <button
              onClick={handleEditShipment}
              class="px-5 py-2.5 bg-[#001736]  text-[#ffffff] font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-surface-dim transition-colors"
            >
              <span class="material-symbols-outlined text-sm">edit</span>
              Edit Shipment
            </button>
            <button
              onClick={handleUpdateStatus}
              class="px-5 py-2.5 bg-[#001736]  text-[#ffffff]  font-bold rounded-xl text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span class="material-symbols-outlined text-sm">
                event_repeat
              </span>{" "}
              Update Status
            </button>
          </div>
        </header>
        {/* <!-- Bento Grid Layout --> */}
        <div class="grid grid-cols-12 gap-6">
          {/* <!-- Route Visualization (Map Card) --> */}
          <section class="col-span-12 lg:col-span-8 bg-[#ffffff] rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[400px]">
            <div class="p-6 border-b border-[#ffffff]/10 flex justify-between items-center">
              <h2 class="text-sm font-bold uppercase tracking-widest text-[#006d36] flex items-center gap-2">
                <span class="material-symbols-outlined text-lg">
                  location_on
                </span>{" "}
                Kinetic Route Tracker
              </h2>
              <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#43474f]">
                <span class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-[#006d36]"></span> Live
                  Position
                </span>
                <span class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-[#c4c6d0]/20"></span>{" "}
                  Planned Route
                </span>
              </div>
            </div>
            <div class="flex-1 relative bg-[#bee1e0] overflow-hidden">
              {/*  google map */}
              <div className="absolute inset-0 bg-cover bg-center rounded-lg opacity-80 group-hover:scale-110 transition-transform duration-700">
                <ShipmentMap
                  route={shipment?.route}
                  currentLocation={shipment?.currentLocation}
                  routeIndex={shipment?.routeIndex}
                  shipmentId={shipmentId}
                  address={shipment?.address}
                />
              </div>

              {/* <!-- Glassmorphic Overlay --> */}

              <div class="absolute bottom-6 left-6 p-4 bg-[#ffffff]/80 backdrop-blur-xl rounded-xl shadow-2xl max-w-xs border border-[#ffffff]/20">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <p class="text-[10px] font-bold uppercase text-[#43474f]">
                      Current Location
                    </p>
                    <p class="text-sm font-extrabold text-[#006d36]">
                      I-80 East, Clearfield, PA
                    </p>
                  </div>
                  <span class="material-symbols-outlined text-[]">speed</span>
                </div>
                <div class="w-full bg-[#c4c6d0]/20 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#006d36] h-full w-2/3"></div>
                </div>
                <p class="mt-2 text-[10px] text-[#43474f] font-medium">
                  68% of route completed. 182 mi remaining.
                </p>
              </div>

              {/* <!-- Pulse Point --> */}
              <div class="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2">
                <div class="relative flex items-center justify-center">
                  <div class="absolute w-12 h-12 bg-[#006d36]/30 rounded-full animate-ping"></div>
                  <div class="w-4 h-4 bg-[#006d36] border-2 border-[#ffffff] rounded-full shadow-lg"></div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Courier Management Sidebar --> */}
          <section class="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* <!-- Courier Profile --> */}
            <div className="bg-[#d2f5f4] rounded-2xl p-6 border-l-[6px] border-[#006d36] shadow-sm">
              <h2 className="text-[10px] font-black uppercase tracking-widest text-[#43474f] mb-6">
                Assigned Personnel
              </h2>
              {courier ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-md p-1">
                      <img
                        alt={courier.fullName}
                        className="w-full h-full object-cover rounded-xl"
                        src={
                          courier.profileImage ||
                          "https://lh3.googleusercontent.com/aida-public/AB6AXuAgRLQXvr39ZjZAF3HQCqMgipW763fdzJXNVd5XYLUhLj5l8Q1_zTPI0cIUHRHiL0g-wsuFbphATMlPdWNeTy0F4tU6qbPPv_ynGfs8OZf3vU9LGy4pUWQELkjHQIkWoMkE0mKK3liB1p9gQ7L1ORDoav2E1b_GTnO1ZqCZvH0oj3Aa3srrzVPIjp9yzSfjCTfQMN90JfKgiRiE_b0-WiXn3UWD_P5s1CWOUvbXVAXICx16hDu8Qfxf9cW0OCt2gnckG7cO5ca0NztX"
                        }
                      />
                    </div>
                    <div>
                      <p className="text-xl font-black text-[#001736] tracking-tight">
                        {courier.fullName}
                      </p>
                      <p className="text-[10px] font-bold text-[#006d36] uppercase">
                        ID: {courier.employeeId}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 py-4 border-t border-[#001736]/5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#43474f]/60 uppercase text-[9px]">
                        Vehicle Type
                      </span>
                      <span className="text-[#001736]">
                        {courier.vehicle?.type || "Standard Transit"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#43474f]/60 uppercase text-[9px]">
                        Plate Number
                      </span>
                      <span className="text-[#001736]">
                        {courier.vehicle?.plateNumber || "N/A"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-10 text-center text-xs font-bold text-[#43474f] italic">
                  No courier assigned to this shipment.
                </div>
              )}
            </div>
            {/* <!-- Sensor Logs --> */}
            <div class="bg-[#001736] text-[#ffffff] rounded-xl p-6 shadow-xl">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  Live Sensor Logs
                </h2>
                <span class="material-symbols-outlined text-[#83fba5]">
                  sensors
                </span>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <p class="text-[10px] opacity-60 uppercase mb-1">
                    Temperature
                  </p>
                  <p class="text-2xl font-bold">18.4°C</p>
                  <div class="w-full bg-white/10 h-1 mt-2 rounded-full">
                    <div class="bg-[#83fba5] h-full w-4/5"></div>
                  </div>
                </div>
                <div>
                  <p class="text-[10px] opacity-60 uppercase mb-1">Humidity</p>
                  <p class="text-2xl font-bold">42%</p>
                  <div class="w-full bg-white/10 h-1 mt-2 rounded-full">
                    <div class="bg-[#83fba5] h-full w-2/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Detailed Logistics Matrix --> */}
          <section className="col-span-12 bg-white rounded-2xl p-8 shadow-sm border border-[#001736]/5">
            <h2 className="text-xl font-black text-[#001736] tracking-tight mb-8">
              Chain of Custody Matrix
            </h2>
            <div className="space-y-1">
              {history.length > 0 ? (
                history.map((event, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 items-center py-4 border-b border-[#f0f0f0] hover:bg-[#f8fcf9] transition-all px-4 -mx-4 rounded-xl"
                  >
                    <div className="col-span-3 text-[10px] font-black text-[#43474f]">
                      {new Date(event.timestamp).toLocaleDateString()}{" "}
                      <span className="mx-1 text-[#006d36]/20">|</span>{" "}
                      {new Date(event.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#006d36]/10 text-[#006d36] flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">
                          inventory_2
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#001736]">
                          {event.location || "Process Node"}
                        </p>
                        <p className="text-[10px] font-bold text-[#43474f]/60 uppercase">
                          {event.message || "Status Update"}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-4 text-right">
                      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#006d36] bg-[#83fba5]/20 px-3 py-1 rounded-full">
                        Verified
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-xs font-bold text-[#43474f] italic">
                  No logistics events recorded yet.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
