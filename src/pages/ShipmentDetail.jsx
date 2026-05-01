import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import { getShipmentStatusStyle } from "../utils/getShipmentStatusStyle";
import { getStatusStyle } from "../utils/statusStyles";

import ShipmentMap from "../components/ShipmentMap";
import socket, { connectSocket } from "../utils/Socket";

export default function ShipmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    return (
      <p className="text-red-500 font-bold p-6">No Shipment ID provided</p>
    );
  }
  const queryClient = useQueryClient();

  /* ==========  first get admin======= SOCKET (OS LAYER) ================= */
  //  FIRST: get admin
  const { data: admin } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/admin/me");
      return res.data.data;
    },
  });

  // THEN: use it
  useEffect(() => {
    if (!admin?.id) return;

    connectSocket(admin.id);
    const handler = (data) => {
      queryClient.setQueryData(["shipment", data.shipmentId], (old) => {
        if (!old) return old;

        return {
          ...old,
          map: {
            ...old.map,
            currentLocation: data.currentLocation,
          },
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
    queryKey: ["shipment", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/shipments/${id}`);
      return res.data.data;
    },
  });

  const receiverEmail = shipment?.receiver?.email || "N/A";
  const receiverName = shipment?.receiver?.name || "N/A";
  const courier = shipment?.courier;
  const milestones = shipment?.milestones || [];

  /* ================= DERIVED OS STATE ================= */
  const route = shipment?.map?.route || [];
  const routeIndex = shipment?.routeIndex || 0;

  //  REAL PROGRESS ENGINE
  const progress = useMemo(() => {
    if (!route.length) return 0;
    return Math.min(100, Math.round((routeIndex / (route.length - 1)) * 100));
  }, [routeIndex, route]);

  const currentLocation = shipment?.map?.currentLocation;

  /* ================= NAVIGATION ================= */
  const handleLiveMap = () => {
    navigate(`/admin/live-map/${id}`);
  };

  const handleUpdateStatus = () => {
    navigate(`/admin/update-status/${id}`);
  };

  const handleEditShipment = () => {
    navigate(`/admin/edit-shipment/${id}`);
  };

  const handleMessageReceiver = () => {
    navigate("/admin/message", { state: { email: receiverEmail } });
  };

  if (isLoading) return <p className="p-6">Loading shipment...</p>;

  if (isError) {
    toast.error("Failed to load shipment");
    return <p className="p-6 text-red-500">Error loading shipment</p>;
  }

  const origin = shipment?.pickupAddress;
  const destination = shipment?.deliveryAddress;

  return (
    <div className="bg-[#e2fffe] text-[#002020] selection:bg-[#83fba5] selection:text-[#00743a]">
      {/* /<!-- Main Content Canvas --> */}
      <main className="pt-20 px-8 pb-12">
        {/* <!-- Shipment Overview Header (Asymmetric Layout) --> */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={getShipmentStatusStyle(shipment?.status)}>
                {shipment?.status}
              </span>
              <span className="text-[#43474f] text-sm font-medium tracking-tight">
                ID: {shipment?.trackingId}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#001736] tracking-tighter leading-none mb-2">
              {origin} → {destination}
            </h1>
            <p className="text-[#43474f] max-w-lg">
              Priority High-Value Transit. Estimated arrival:{" "}
              <span className="text-[#006d36] font-bold">
                {shipment?.eta?.etaDays
                  ? `${shipment.eta.etaDays} Days`
                  : "In Transit"}
              </span>
            </p>

            <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm mt-2 text-gray-600">
              Shipment Progress: {progress}%
            </p>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-t border-[#c4c6d0]/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d36] text-lg">
                  alternate_email
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#43474f]">
                    Receiver Email
                  </p>
                  <p className="text-sm font-bold text-[#001736]">
                    {receiverEmail}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-[#c4c6d0]/20"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006d36] text-lg">
                  person_pin_circle
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#43474f]">
                    Recipient
                  </p>
                  <p className="text-sm font-bold text-[#001736]">
                    {receiverName}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleMessageReceiver}
              className="px-5 py-2.5 bg-[#001736]  text-[#ffffff] font-bold rounded-xl text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">send</span>{" "}
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
              className="px-5 py-2.5 bg-[#001736]  text-[#ffffff] font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-surface-dim transition-colors"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Shipment
            </button>
            <button
              onClick={handleUpdateStatus}
              className="px-5 py-2.5 bg-[#001736]  text-[#ffffff]  font-bold rounded-xl text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">
                event_repeat
              </span>{" "}
              Update Status
            </button>
          </div>
        </header>
        {/* <!-- Bento Grid Layout --> */}
        <div className="grid grid-cols-12 gap-6">
          {/* <!-- Route Visualization (Map Card) --> */}
          <section className="col-span-12 lg:col-span-8 bg-[#ffffff] rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[670px]">
            <div className="p-6 border-b border-[#ffffff]/10 flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#006d36] flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  location_on
                </span>{" "}
                Kinetic Route Tracker
              </h2>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#43474f]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#006d36]"></span>{" "}
                  Live Position
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#c4c6d0]/20"></span>{" "}
                  Planned Route
                </span>
              </div>
            </div>
            <div className="flex-1 relative bg-[#bee1e0] overflow-hidden">
              {/*  google map */}
              <div className="absolute inset-0 bg-cover bg-center rounded-lg opacity-80 group-hover:scale-110 transition-transform duration-700">
                <ShipmentMap
                  route={shipment?.map?.route}
                  currentLocation={shipment?.map?.currentLocation}
                  routeIndex={routeIndex}
                  shipmentId={id}
                  address={shipment?.address}
                />
              </div>

              {/* <!-- Glassmorphic Overlay --> */}

              <div className="absolute bottom-6 left-6 p-4 bg-[#ffffff]/80 backdrop-blur-xl rounded-xl shadow-2xl max-w-xs border border-[#ffffff]/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#43474f] tracking-widest">
                      Last Verified Node
                    </p>
                    <p className="text-sm font-extrabold text-[#006d36]">
                      {milestones.find((m) => m.active)?.location ||
                        milestones.filter((m) => m.completed).pop()?.location ||
                        destination ||
                        "In Transit"}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-lg">
                    speed
                  </span>
                </div>
                <div className="w-full bg-[#c4c6d0]/20 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#006d36] h-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-[10px] text-[#43474f] font-medium">
                  {progress}% of route completed.
                </p>
              </div>
            </div>
          </section>
          {/* <!-- Courier Management Sidebar --> */}
          <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
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
                          `https://ui-avatars.com/api/?name=${courier.fullName}&background=d7fafa&color=006d36`
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
                        courier status
                      </span>
                      <span className={getStatusStyle(courier.status)}>
                        {courier.status}
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
            <div className="bg-[#001736] text-[#ffffff] rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                  Live Sensor Logs
                </h2>
                <span className="material-symbols-outlined text-[#83fba5]">
                  sensors
                </span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] opacity-60 uppercase mb-1">
                    Temperature
                  </p>
                  <p className="text-2xl font-bold">18.4°C</p>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded-full">
                    <div className="bg-[#83fba5] h-full w-4/5"></div>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] opacity-60 uppercase mb-1">
                    Humidity
                  </p>
                  <p className="text-2xl font-bold">42%</p>
                  <div className="w-full bg-white/10 h-1 mt-2 rounded-full">
                    <div className="bg-[#83fba5] h-full w-2/5"></div>
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
              {milestones.length > 0 ? (
                milestones.map((event, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-12 gap-4 items-center py-4 border-b border-[#f0f0f0] transition-all px-4 -mx-4 rounded-xl ${
                      event.active
                        ? "bg-[#83fba5]/10 border-l-4 border-[#006d36]"
                        : "hover:bg-[#f8fcf9]"
                    }`}
                  >
                    <div className="col-span-3 text-[10px] font-black text-[#43474f]">
                      {event.time ? (
                        <>
                          {new Date(event.time).toLocaleDateString()}{" "}
                          <span className="mx-1 text-[#006d36]/20">|</span>{" "}
                          {new Date(event.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </>
                      ) : (
                        "Scheduled"
                      )}
                    </div>
                    <div className="col-span-5 flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${event.completed ? "bg-[#006d36] text-white" : "bg-[#006d36]/10 text-[#006d36]"}`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {event.completed ? "check_circle" : "inventory_2"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#001736]">
                          {event.label}
                        </p>
                        <p className="text-[10px] font-bold text-[#43474f]/60 uppercase">
                          {event.location || "Location Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-4 text-right">
                      <span
                        className={`text-[9px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full ${event.completed ? "text-[#006d36] bg-[#83fba5]/20" : "text-gray-400 bg-gray-100"}`}
                      >
                        {event.completed
                          ? "Verified"
                          : event.active
                            ? "In Progress"
                            : "Queued"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-xs font-bold text-[#43474f] italic">
                  No milestones defined for this shipment.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
