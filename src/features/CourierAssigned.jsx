import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { useQuery } from "@tanstack/react-query";

export default function CourierAssigned() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const shipmentId = state?.shipmentId || localStorage.getItem("shipmentId");

  const courierId = state?.courierId || localStorage.getItem("courierId");

  /* ================= FETCH SHIPMENT ================= */
  const {
    data: shipmentRes,
    isLoading: shipmentLoading,
    isError: shipmentError,
  } = useQuery({
    queryKey: ["shipment", shipmentId],
    enabled: !!shipmentId,
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/shipments/${shipmentId}`);
      return res.data.data;
    },
  });

  /* ================= FETCH COURIER ================= */
  const {
    data: courierRes,
    isLoading: courierLoading,
    isError: courierError,
  } = useQuery({
    queryKey: ["courier", courierId],
    enabled: !!courierId,
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/couriers/${courierId}`);
      return res.data.data;
    },
  });

  const shipment = shipmentRes;
  const courier = courierRes;

  /* ================= NAVIGATION ================= */
  const handleLiveMap = () => {
    navigate("/admin/live-map", {
      state: { shipmentId, courierId },
    });
  };

  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };

  /* ================= LOADING ================= */
  if (shipmentLoading || courierLoading) {
    return <p className="p-6">Loading assignment...</p>;
  }

  /* ================= ERROR ================= */
  if (shipmentError || courierError) {
    return (
      <p className="p-6 text-red-500">Failed to load assignment details</p>
    );
  }

  const formatShipmentId = shipment?.trackingId || shipmentId || "N/A";

  return (
    <div className="bg-[#e2fffe] font-body text-[#002020] antialiased overflow-hidden">
      <div className="flex min-h-screen ">
        {/* <!-- Main Content Canvas --> */}
        <main className="flex-1 flex flex-col items-center justify-center p-12 bg-[#e2fffe]">
          <div className="max-w-4xl w-full flex flex-col items-center">
            {/* <!-- Confirmation Card --> */}
            <div className="kinetic-gradient w-full rounded-xl p-12 mb-8 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
              {/* <!-- Aerodynamic Decorative Element --> */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/5 rounded-full blur-2xl -ml-24 -mb-24"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-[#006d36] rounded-full flex items-center justify-center mb-6 mx-auto emerald-glow">
                  <span
                    className="material-symbols-outlined text-white text-5xl"
                    style={{ fontVariationSettings: "'wght' 600" }}
                    data-icon="check"
                  >
                    check
                  </span>
                </div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3 font-headline">
                  Courier Successfully Assigned!
                </h1>
                <p className="text-[#7594ca] text-lg max-w-lg mx-auto">
                  Shipment{" "}
                  <span className="text-white font-mono font-bold tracking-wider">
                    {formatShipmentId}
                  </span>{" "}
                  is now in transit. All logistics nodes have been synchronized.
                </p>
              </div>
            </div>
            {/* <!-- Summary Grid (Bento Layout) --> */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
              {/* <!-- Left Column: Shipment & Courier Info --> */}
              <div className="md:col-span-8 flex flex-col gap-6">
                {/* <!-- Courier Profile Card --> */}
                <div className="bg-[#d7fafa] p-8 rounded-xl flex items-center gap-8 relative overflow-hidden group">
                  <div className="relative">
                    <img
                      alt={courier?.fullName || courier}
                      className="w-24 h-24 rounded-full border-4 border-[#e2fffe] shadow-lg object-cover"
                      data-alt="portrait of a confident male delivery professional wearing a modern dark green uniform and wireless headset"
                      src={
                        courier?.profileImage ||
                        "https://via.placeholder.com/100"
                      }
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#006d36] w-8 h-8 rounded-full border-2 border-[#e2fffe] flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-white text-sm"
                        data-icon="verified"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-bold text-[#006d36] uppercase tracking-widest bg-[#83fba5] px-2 py-0.5 rounded">
                        {courier?.status || "Available"}
                      </span>
                      <span className="text-xs text-[#747780] font-medium tracking-tight">
                        {courier?.employeeId || "N/A"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#001736] mb-1">
                      {courier?.fullName}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#43474f]">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="material-symbols-outlined text-base"
                          data-icon="electric_bolt"
                        >
                          electric_bolt
                        </span>
                        <span className="font-semibold">
                          Vehicle{courier?.vehicle || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="material-symbols-outlined text-base"
                          data-icon="star"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="font-semibold">
                          Rating:{courier?.rating || "4.8"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Technical Details Bento Grid Internal --> */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#c6e9e9] p-6 rounded-xl flex flex-col justify-between h-32">
                    <span className="label-sm text-[11px] font-bold text-[#43474f] uppercase tracking-widest">
                      Shipment ID
                    </span>
                    <span className="text-xl font-mono font-bold text-[#001736]">
                      {formatShipmentId}
                    </span>
                  </div>
                  <div className="bg-[#c6e9e9] p-6 rounded-xl flex flex-col justify-between h-32">
                    <span className="label-sm text-[11px] font-bold text-[#43474f] uppercase tracking-widest">
                      Estimated Arrival
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#001736]">
                        14:45
                      </span>
                      <span className="text-sm font-bold text-[#43474f]">
                        PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Right Column: Status & Map Preview --> */}
              <div className="md:col-span-4 flex flex-col gap-6">
                {/* <!-- Status Tile --> */}
                <div className="bg-[#d7fafa] p-6 rounded-xl flex flex-col gap-4">
                  <span className="label-sm text-[11px] font-bold text-[#43474f] uppercase tracking-widest">
                    Current Status
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#006d36] rounded-full animate-pulse"></div>
                    <span className="text-xl font-bold text-[#006d36]">
                      {shipment?.status || "In Transit"}
                    </span>
                  </div>
                  <div className="w-full bg-[#001736] h-1 rounded-full overflow-hidden mt-2">
                    <div className="bg-[#006d36] h-full w-1/4 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold">Route</span>
                  <p className="text-sm">
                    {shipment?.origin || "Hub"} →{" "}
                    {shipment?.destination || "Destination"}
                  </p>
                </div>
                {/* <!-- Map Visual Teaser --> */}
                <div className="bg-[#d7fafa] p-2 rounded-xl flex-1 relative min-h-[160px] overflow-hidden group">
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-lg opacity-80 group-hover:scale-110 transition-transform duration-700"
                    data-alt="abstract satellite map view of city streets with a neon emerald route line glowing between two points"
                    data-location="Austin, Texas"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_1Ln0rtWfboXTqFtbuHvE8wNjOy_4W2YHfb1bXqZz_3IUpeoDmqVdOfETZ0qyHpPRjFl6Vvxe7sUCT9fWsO2f1eEZmvkWeg2Dgt5rHUbRxjWApUzStNEC0rVZa13na0y_02v5N9pxl5VTsbMI67Pw5nw2ncE8-epVdL5iu7Ouv7JBZXdZkVRE5-w7wWsRMKoE7CZsfotJDO9xUMGMgguz9iSUxUZUjU8kj-uoPScoD4_3YytGVLh87LnPPLSnTAca2HCSjVT2yw9j')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d7fafa] via-transparent to-transparent"></div>
                  <div className="relative z-10 h-full flex items-end p-4">
                    <span className="text-xs font-bold text-[#001736] bg-[#e2fffe]/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                      View Route Detail
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Action Buttons --> */}
            <div className="flex items-center justify-center gap-6 mt-12 w-full">
              <button
                onClick={handleLiveMap}
                className="flex-1 max-w-[280px] h-14 kinetic-gradient text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all emerald-glow group"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  data-icon="map"
                >
                  map
                </span>
                View in Live Feed
                <span
                  className="material-symbols-outlined text-sm opacity-50 group-hover:translate-x-1 transition-transform"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </button>
              <button
                onClick={handleDashboard}
                className="flex-1 max-w-[280px] h-14 border-2 border-[#001736]/20 text-[#001736] rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#001736]/5 transition-all"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  data-icon="dashboard"
                >
                  dashboard
                </span>
                Return to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
