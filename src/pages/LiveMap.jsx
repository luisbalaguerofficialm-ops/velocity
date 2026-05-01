import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";

import ShipmentMap from "../components/ShipmentMap";
import socket from "../utils/Socket";
import useAdmin from "../hooks/useAdmin";

export default function ShipmentDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const shipmentId =
    id || state?.shipmentId || localStorage.getItem("shipmentId");

  const { data: admin } = useAdmin();

  /* ================= SOCKET LISTENER ONLY ================= */
  useEffect(() => {
    if (!shipmentId) return;

    const handler = (data) => {
      if (data.shipmentId !== shipmentId) return;

      queryClient.setQueryData(["shipment", shipmentId], (old) => {
        if (!old) return old;

        return {
          ...old,
          currentLocation: data.currentLocation || old.currentLocation,
          routeIndex:
            data.routeIndex !== undefined ? data.routeIndex : old.routeIndex,
          status: data.status || old.status,
        };
      });
    };

    socket.on("shipment:location:update", handler);

    return () => {
      socket.off("shipment:location:update", handler);
    };
  }, [shipmentId, queryClient]);

  /* ================= FETCH ================= */
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

  /* ================= LOGIC ================= */
  const route = shipment?.map?.route || [];
  const routeIndex = shipment?.routeIndex || 0;

  const progress = useMemo(() => {
    if (!route.length) return 0;
    return Math.min(100, Math.round((routeIndex / (route.length - 1)) * 100));
  }, [routeIndex, route]);

  const formattedStatus = shipment?.status?.replace("_", " ")?.toUpperCase();

  const formattedAddress =
    shipment?.map?.currentLocation?.formattedAddress ||
    shipment?.pickupAddress ||
    "No location";

  /* ================= ACTION ================= */
  const handlePauseToggle = async () => {
    try {
      const res = await axiosClient.put(
        `/api/v1/shipments/${shipmentId}/toggle-pause`,
        { reason: "admin_action" },
      );

      queryClient.invalidateQueries(["shipment", shipmentId]);
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to update shipment state");
    }
  };

  /* ================= STATES ================= */
  if (!shipmentId) {
    return <p className="p-6 text-red-500">No shipment selected</p>;
  }

  if (isLoading) return <p className="p-6">Loading shipment...</p>;

  if (isError) {
    toast.error("Failed to load shipment");
    return <p className="p-6 text-red-500">Error loading shipment</p>;
  }

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] font-body overflow-hidden h-screen flex">
      {/* <!-- Main Control Center Content --> */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* <!-- Live Map Interface --> */}
        <div className="flex-1 relative bg-[#edeeef] overflow-hidden">
          {/* <!-- Literal Map Background --> */}
          <div className="absolute inset-0 bg-cover bg-center rounded-lg opacity-80 group-hover:scale-110 transition-transform duration-700">
            <ShipmentMap
              route={route}
              currentLocation={shipment?.map?.currentLocation}
              routeIndex={routeIndex}
              shipmentId={shipmentId}
              address={formattedAddress}
            />
          </div>
          {/* <!-- Routes Visualization --> */}
          <div className="absolute top-8 right-8 w-96 max-h-[calc(100%-16rem)] flex flex-col gap-4 z-20">
            {/* Active Routines */}
            <div className="bg-white/95 backdrop-blur-xl rounded shadow-2xl border border-slate-200/50 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <h3 className="font-headline font-bold text-[#002B5B] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#10b981]">
                    route
                  </span>
                  Active Routines
                </h3>
                <span className="bg-[#83fba5] text-[#064e3b] px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-[#10b981]/20">
                  Live
                </span>
              </div>
              <div className="overflow-y-auto p-4 space-y-3 max-h-[500px] custom-scrollbar">
                {/* Routine Item Examples */}
                {shipment && (
                  <div className="p-4 bg-white rounded border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-[#002B5B]">
                        {shipment.trackingId}
                      </span>
                      <span className="text-[10px] font-bold text-[#10b981] uppercase">
                        {formattedStatus}
                      </span>
                    </div>

                    <div className="text-xs text-[#43474f] mb-4">
                      {shipment?.pickupAddress} → {shipment?.deliveryAddress}
                    </div>

                    <div className="text-[10px] text-slate-400">
                      Progress: {progress}%
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button className="text-[10px] font-bold text-[#002B5B] hover:text-[#10b981] uppercase tracking-widest flex items-center gap-1">
                  View All Shipments
                  <span className="material-symbols-outlined text-[14px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Fleet Stats Mini-Bento --> */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#001b3d] text-white p-4 rounded shadow-lg border border-white/5">
                <p className="text-[10px] opacity-60 uppercase font-bold tracking-wider">
                  Fleet Size
                </p>
                <p className="text-2xl font-headline font-extrabold mt-1">
                  1,204
                </p>
              </div>
              <div className="bg-[#10b981] text-white p-4 rounded shadow-lg">
                <p className="text-[10px] opacity-90 uppercase font-bold tracking-wider">
                  Active
                </p>
                <p className="text-2xl font-headline font-extrabold mt-1">
                  842
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Playback Control Panel (Bottom Center) --> */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-30">
            <div className="bg-[#001b3d]/95 backdrop-blur-md p-6 rounded shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 text-white">
              <div className="flex items-center gap-8">
                {/* <!-- Main Controls --> */}
                <div className="flex items-center gap-4 border-r border-white/10 pr-8">
                  <button className="text-white/60 hover:text-white transition-colors">
                    <span
                      className="material-symbols-outlined"
                      data-icon="skip_previous"
                    >
                      skip_previous
                    </span>
                  </button>
                  <button
                    onClick={handlePauseToggle}
                    className="bg-[#10b981] h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <span
                      className="material-symbols-outlined text-3xl text-white"
                      data-icon="play_arrow"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {shipment?.isPaused
                        ? "Resume Shipment"
                        : "Pause Shipment"}
                    </span>
                  </button>
                  <button className="text-white/60 hover:text-white transition-colors">
                    <span
                      className="material-symbols-outlined"
                      data-icon="skip_next"
                    >
                      skip_next
                    </span>
                  </button>
                </div>
                {/* <!-- Timeline --> */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                        Playback Timeline
                      </span>
                      <span className="text-lg font-mono font-medium">
                        14:32:04{" "}
                        <span className="text-white/40 mx-2 text-sm">/</span>{" "}
                        24:00:00
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2 text-[10px] font-bold text-[#10b981] tracking-widest uppercase">
                        <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse"></span>
                        Real-Time Data Sync
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 w-full bg-white/10 rounded-full cursor-pointer group">
                    <div className="absolute top-0 left-0 h-full w-[60%] bg-[#10b981] rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
                    <div className="absolute top-1/2 left-[60%] -translate-y-1/2 h-5 w-5 bg-white rounded-full shadow-lg border-2 border-[#10b981] scale-0 group-hover:scale-100 transition-transform"></div>
                  </div>
                </div>
                {/* <!-- Speed & Settings --> */}
                <div className="flex items-center gap-6 border-l border-white/10 pl-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/40 uppercase mb-2 tracking-wider">
                      Speed
                    </span>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors">
                        1x
                      </button>
                      <button className="text-xs px-3 py-1 rounded bg-secondary text-white font-bold">
                        2x
                      </button>
                      <button className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors">
                        4x
                      </button>
                    </div>
                  </div>
                  <button className="text-white/60 hover:text-white p-2">
                    <span
                      className="material-symbols-outlined"
                      data-icon="layers"
                    >
                      layers
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Map HUD (Top Left Overlay) --> */}
          <div className="absolute top-8 left-8 z-20 space-y-4">
            <div className="bg-white/95 backdrop-blur shadow-xl p-4 rounded border border-slate-200/50 flex items-center gap-4">
              <div className="h-12 w-12 bg-[#d6e3ff] p-2 rounded flex items-center justify-center border border-[#002B5B]/10">
                <span
                  className="material-symbols-outlined text-[#002B5B] text-2xl"
                  data-icon="radar"
                >
                  radar
                </span>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-[#002B5B] uppercase tracking-wider">
                  System Status
                </h4>
                <p className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  Operational
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="h-10 w-10 bg-white/95 backdrop-blur shadow-md rounded flex items-center justify-center text-slate-600 hover:text-primary transition-colors border border-slate-200/50">
                <span className="material-symbols-outlined" data-icon="add">
                  add
                </span>
              </button>
              <button className="h-10 w-10 bg-white/95 backdrop-blur shadow-md rounded flex items-center justify-center text-slate-600 hover:text-primary transition-colors border border-slate-200/50">
                <span className="material-symbols-outlined" data-icon="remove">
                  remove
                </span>
              </button>
              <button className="h-10 w-10 bg-white/95 backdrop-blur shadow-md rounded flex items-center justify-center text-slate-600 hover:text-[#002B5B] transition-colors border border-slate-200/50">
                <span
                  className="material-symbols-outlined"
                  data-icon="my_location"
                >
                  my_location
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
