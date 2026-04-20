import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";

import ShipmentMap from "../components/ShipmentMap";
import socket, { connectSocket } from "../utils/Socket";

export default function TrackingDetail() {
  const { trackingId } = useParams();
  const queryClient = useQueryClient();

  const [liveLocation, setLiveLocation] = useState(null);

  // ===============================
  // 📡 FETCH TRACKING DATA (React Query)
  // ===============================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/shipments/track/${trackingId}`);
      return res.data.data;
    },
    enabled: !!trackingId,
  });

  // ===============================
  // 🔌 SOCKET CONNECTION (LIVE TRACKING)
  // ===============================
  useEffect(() => {
    if (!trackingId) return;

    connectSocket();

    socket.emit("joinTracking", trackingId);

    socket.on("locationUpdate", (update) => {
      setLiveLocation(update.currentLocation);

      // update cache instantly
      queryClient.setQueryData(["tracking", trackingId], (old) => {
        if (!old) return old;

        return {
          ...old,
          map: {
            ...old.map,
            currentLocation: update.currentLocation,
          },
        };
      });
    });

    return () => {
      socket.off("locationUpdate");
    };
  }, [trackingId, queryClient]);

  // ===============================
  // 🧠 STATES
  // ===============================
  if (isLoading) return <p className="p-10">Loading...</p>;
  if (isError || !data) return <p className="p-10">No shipment found</p>;

  const currentLocation = liveLocation || data.map?.currentLocation || null;

  return (
    <div className="bg-[#e2fffe] text-[#002020] min-h-screen flex flex-col">
      <main className=" mx-auto px-20 py-36 space-y-24">
        {/* <!-- High-Impact Header Section --> */}
        <section className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-[#83fba5] text-[#00743a] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                {data.shipmentType?.label}
              </span>
              <h2 className="text-sm font-medium text-[#001736]/60 tracking-wider">
                TRACKING ID: {data.trackingId}
              </h2>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#001736] tracking-tighter">
              {data.status.replaceAll("_", " ").toUpperCase()}
            </h1>
            <p className="text-[#006d36] font-bold flex items-center gap-2">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                schedule
              </span>
              Estimated Delivery: {data.eta?.etaDays}Days
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
              <span className="material-symbols-outlined">edit_square</span>
              Manage Delivery
            </button>
            <button className="p-3 bg-[#c6e9e9] rounded-xl text-[#001736] hover:bg-surface-dim transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </section>
        {/* <!-- Main Tracking Content: Split View --> */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* <!-- Left Panel: Shipment Details --> */}
          <div className="lg:col-span-4 space-y-6">
            {/* <!-- Location Details Card --> */}
            <div className="bg-[#d7fafa] p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#006d36] opacity-5 -mr-16 -mt-16 rounded-full"></div>
              <div className="relative space-y-8">
                {/* <!-- Origin --> */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#006d36] flex items-center justify-center text-white shrink-0">
                      <span className="material-symbols-outlined text-sm">
                        location_on
                      </span>
                    </div>
                    <div className="w-0.5 h-16 bg-gradient-to-b from-[#001736] to-[#006d36]"></div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#001736]/40 uppercase tracking-[0.2em] mb-1">
                      Origin Details
                    </h3>
                    <p className="text-lg font-extrabold text-[#001736]">
                      {data.pickupAddress}
                    </p>
                    <p className="text-sm text-[#43474f] font-medium"></p>
                    <p className="text-xs text-[#43474f]/70 mt-1 italic">
                      Contact: {data.sender.phone}
                    </p>
                  </div>
                </div>
                {/* <!-- Destination --> */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#006d36] flex items-center justify-center text-white shrink-0">
                    <span className="material-symbols-outlined text-sm">
                      flag
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-[#001736]/40 uppercase tracking-[0.2em] mb-1">
                      Destination Details
                    </h3>
                    <p className="text-lg font-extrabold text-[#001736]">
                      {data.deliveryAddress}
                    </p>
                    <p className="text-sm text-[#001736] font-medium"></p>
                    <p className="text-xs text-[#001736]/70 mt-1 italic">
                      Contact:{data.receiver.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Parcel Specs Card --> */}
            <div className="bg-[#ffffff] p-8 rounded-2xl shadow-sm border-l-4 border-[#006d36]">
              <h3 className="text-[10px] font-bold text-[#001736]/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  person
                </span>{" "}
                Sender Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Full Name
                  </p>
                  <p className="text-lg font-extrabold text-[#001736]">
                    {data.sender.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Email Address
                  </p>
                  <p className="text-lg font-extrabold text-[#001736]">
                    {data.sender.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Full Address
                  </p>
                  <p className="text-sm font-medium text-[#43474f]">
                    {data.sender.address}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                      Phone Number
                    </p>
                    <p className="text-sm font-bold text-[#006d36]">
                      {data.sender.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                      ZIP Code
                    </p>
                    <p className="text-sm font-extrabold text-[#001736]">
                      {data.sender.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#ffffff] p-8 rounded-2xl shadow-sm">
              <h3 className="text-[10px] font-bold text-[#001736]/40 uppercase tracking-[0.2em] mb-6">
                Parcel Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Weight
                  </p>
                  <p className="text-xl font-extrabold text-[#001736]">
                    {data.package.weight}kg
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    quantity
                  </p>
                  <p className="text-xl font-extrabold text-[#001736]">
                    {data.package.quantity}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Dimensions
                  </p>
                  <p className="text-xl font-extrabold text-[#001736]">
                    {data.package.dimensions}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Category
                  </p>
                  <p className="text-sm font-bold text-[#006d36]">
                    {data.package.type}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Declared Value
                  </p>
                  <p className="text-xl font-extrabold text-[#001736]">
                    USD {data.package.declaredValue}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#ffffff] p-8 rounded-2xl shadow-sm border-l-4 border-[#006d36]">
              <h3 className="text-[10px] font-bold text-[#001736]/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  person_pin
                </span>{" "}
                Receiver Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Full Name
                  </p>
                  <p className="text-lg font-extrabold text-[#001736]">
                    {data.receiver.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Email Address
                  </p>
                  <p className="text-lg font-extrabold text-[#001736]">
                    {data.receiver.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                    Full Address
                  </p>
                  <p className="text-sm font-medium text-[#43474f]">
                    {data.receiver.address}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                      Phone Number
                    </p>
                    <p className="text-sm font-bold text-[#006d36]">
                      {data.receiver.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#43474f]/60 font-bold uppercase">
                      ZIP Code
                    </p>
                    <p className="text-sm font-extrabold text-[#001736]">
                      {data.receiver.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Right Panel: Map & Timeline --> */}
          <div className="lg:col-span-8 space-y-8">
            {/* <!-- Kinetic Map View --> */}
            <div className="h-[450px] bg-surface-dim rounded-[2rem] overflow-hidden relative shadow-inner">
              <ShipmentMap
                route={data.map?.route || []}
                currentLocation={currentLocation}
                routeIndex={0}
                shipmentId={data.trackingId}
              />
              {/* <!-- Glassmorphic Map Overlay --> */}
              <div className="absolute top-6 left-6 glass-panel p-4 rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#006d36] rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#001736]/60">
                      Current Velocity
                    </p>
                    <p className="text-lg font-extrabold text-[#001736]">
                      542 mph{" "}
                      <span className="text-xs font-normal opacity-50">
                        at 32,000 ft
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Vertical Delivery Path Bento Section --> */}
            <div className="bg-[#ccefee] rounded-[2rem] p-10">
              <h3 className="text-xl font-extrabold text-[#001736] mb-10 tracking-tight">
                Kinetic Milestones
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {data.milestones.map((step) => {
                  const isCompleted = step.completed;
                  const isActive = step.active;

                  return (
                    <div
                      key={step.key}
                      className={`relative p-6 rounded-2xl transition-all duration-300
          
          ${isCompleted && "bg-white border-b-4 border-[#006d36]"}
          ${isActive && "bg-[#001736] text-white shadow-xl scale-105 z-10"}
          ${!isCompleted && !isActive && "bg-[#d7fafa] opacity-50"}
          
          hover:scale-[1.02]`}
                    >
                      {/* ICON + TIME */}
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`material-symbols-outlined
                ${isCompleted ? "text-[#006d36]" : ""}
                ${isActive ? "text-[#83fba5]" : ""}
                ${!isCompleted && !isActive ? "text-[#001736]/30" : ""}
              `}
                          style={{
                            fontVariationSettings: isCompleted
                              ? "'FILL' 1"
                              : "'FILL' 0",
                          }}
                        >
                          {step.key === "pickup" && "check_circle"}
                          {step.key === "in_transit" && "flight_takeoff"}
                          {step.key === "out_for_delivery" && "local_shipping"}
                          {step.key === "delivered" && "done_all"}
                        </span>

                        <span
                          className={`text-[10px] font-bold
                ${isActive ? "opacity-60" : "text-[#43474f]/40"}
              `}
                        >
                          {step.time
                            ? new Date(step.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—"}
                        </span>
                      </div>

                      {/* LABEL */}
                      <p
                        className={`text-sm font-black uppercase tracking-tight
              ${isActive ? "text-white" : "text-[#001736]"}
            `}
                      >
                        {step.label}
                      </p>

                      {/* LOCATION */}
                      <p
                        className={`text-xs mt-1
              ${isActive ? "opacity-80" : "text-[#43474f]"}
            `}
                      >
                        {step.location || "—"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <!-- Footer --> */}
      <footer className="bg-[#001736] dark:bg-[#000b1a] w-full mt-auto border-t border-[#002b5b]">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-lg font-black text-[#83fba5] tracking-tight">
              Velocity Transit
            </span>
            <p className="font-manrope text-xs font-light tracking-wide text-[#e2fffe]/60">
              © 2026 Velocity Transit. Kinetic Precision Logistics.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              className="font-manrope text-xs font-light tracking-wide text-[#e2fffe]/60 hover:text-white transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-manrope text-xs font-light tracking-wide text-[#e2fffe]/60 hover:text-white transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-manrope text-xs font-light tracking-wide text-[#e2fffe]/60 hover:text-white transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Support Center
            </a>
            <a
              class="font-manrope text-xs font-light tracking-wide text-[#e2fffe]/60 hover:text-white transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Global Network
            </a>
            <a
              class="font-manrope text-xs font-light tracking-wide text-[#e2fffe]/60 hover:text-white transition-colors opacity-80 hover:opacity-100"
              href="#"
            >
              Track API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
