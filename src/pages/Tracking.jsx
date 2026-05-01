import React from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import { useState } from "react";

export default function Tracking() {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async (trackingId) => {
      const res = await axiosClient.get(
        `/api/v1/shipments/track/${trackingId}`,
      );
      return res.data;
    },

    onSuccess: (data, trackingId) => {
      // ✅ only navigate after success
      navigate(`/tracking-detail/${trackingId}`);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Tracking failed");
    },
  });

  const handleTrackShipment = () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    mutate(trackingId);
  };
  return (
    <div className="bg-[#e2fffe] font-body text-[#002020] antialiased overflow-x-hidden">
      <main className="mim-h-screen mx-auto px-5 py-50 space-y-24">
        {/* <!-- Hero Tracking Search --> */}
        <section className="relative">
          <div className="flex flex-col md:flex-row gap-12 items-end">
            <div className="w-full md:w-2/3">
              <span className="text-xs font-label uppercase tracking-widest text-[#006d36] font-bold mb-2 block">
                Global Logistics Network
              </span>
              <h1 className="text-6xl font-headline font-extrabold tracking-tighter text-[#001736] leading-none mb-8">
                Precision <br /> Movement.
              </h1>
              <div className="relative group">
                <div className="flex items-center bg-[#ffffff] p-2 rounded-xl shadow-xl shadow-[#002020]/5">
                  <span className="material-symbols-outlined px-4 text-[#747780]">
                    search
                  </span>
                  <input
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleTrackShipment();
                    }}
                    className="bg-transparent border-none focus:ring-0 w-full font-body py-4 px-3 text-on-surface"
                    placeholder="Enter Tracking Number"
                    type="text"
                  />
                  <button
                    onClick={handleTrackShipment}
                    disabled={isPending}
                    className={`bg-[#006d3e] text-on-secondary px-10 py-4 rounded-lg font-bold font-headline uppercase tracking-wider transition-all flex items-center justify-center gap-2
  ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-700"}`}
                  >
                    {isPending ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Tracking...
                      </>
                    ) : (
                      "Track Shipment"
                    )}
                  </button>
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-[#001736] scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left"></div>
              </div>
            </div>
            <div className="w-full md:w-1/3 text-right hidden md:block">
              <p className="text-body-md text-[#43474f] max-w-xs ml-auto">
                Leveraging real-time telemetry and kinetic precision to ensure
                your cargo moves at the speed of business.
              </p>
            </div>
          </div>
        </section>
        {/* <!-- Real-time Status Dashboard --> */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-[#d2f5f4] rounded-3xl p-13 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <span className="bg-[#83fba5] text-[#00743a] px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#006d36] animate-pulse"></span>
                LIVE UPDATE
              </span>
            </div>
            <div className="mb-12">
              <p className="text-xs font-label tracking-widest text-[#001736]/60 mb-1">
                CURRENT SHIPMENT
              </p>
              <h2 className="text-4xl font-headline font-bold text-[#001736]">
                #VEL-TX-99021
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div>
                <p className="text-xs font-label text-[#747780] mb-2">STATUS</p>
                <p className="font-bold text-[#001736]">In-Transit</p>
                <p className="text-sm text-[#006d36] font-medium">
                  Global Gateway
                </p>
              </div>
              <div>
                <p className="text-xs font-label text-[#747780] mb-2">ORIGIN</p>
                <p className="font-bold text-[#001736]">Chicago, USA</p>
                <p className="text-sm text-[#43474f] font-medium text-xs">
                  O'HARE INTL (ORD)
                </p>
              </div>
              <div>
                <p className="text-xs font-label text-[#747780] mb-2">
                  DESTINATION
                </p>
                <p className="font-bold text-[#001736]">London, UK</p>
                <p className="text-sm text-[#43474f] font-medium text-xs">
                  HEATHROW (LHR)
                </p>
              </div>
              <div>
                <p className="text-xs font-label text-[#747780] mb-2">
                  EST. ARRIVAL
                </p>
                <p className="font-bold text-[#006d36]">Oct 24, 14:30</p>
                <p className="text-sm text-[#43474f] font-medium text-xs">
                  LOCAL TIME
                </p>
              </div>
            </div>
            {/* <!-- Velocity Tracker Component --> */}
            <div className="relative pt-8 pb-4">
              <div className="absolute top-8 left-0 w-full h-1 bg-[#c6e9e9]"></div>
              <div className="absolute top-8 left-0 w-3/4 h-1 bg-[#006d36]"></div>
              <div className="flex justify-between relative">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#006d36] ring-4 ring-[#006d36]/20 mb-2"></div>
                  <span className="text-[10px] font-bold text-[#001736]">
                    PICKUP
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#006d36] ring-4 ring-[#006d36]/20 mb-2"></div>
                  <span className="text-[10px] font-bold text-[#001736]">
                    SORTING
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#006d36] ring-4 ring-[#006d36]/20 mb-2"></div>
                  <span className="text-[10px] font-bold text-[#001736]">
                    DEPARTED
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 -mt-2 rounded-full bg-[#001736] text-on-primary flex items-center justify-center shadow-lg mb-2">
                    <span className="material-symbols-outlined text-sm">
                      flight_takeoff
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#001736]">
                    TRANSIT
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#c6e9e9] mb-2"></div>
                  <span className="text-[10px] font-bold text-[#747780]">
                    ARRIVAL
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[#c6e9e9] mb-2"></div>
                  <span className="text-[10px] font-bold text-[#747780]">
                    DELIVERY
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Detail Sidebar (Table & Specs) --> */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-[#001736] p-8 rounded-3xl text-[#ffffff] flex-1">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#83fba5]">
                  inventory_2
                </span>
                Parcel Specifications
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-[#ffffff]/10">
                  <span className="text-sm opacity-60">Weight</span>
                  <span className="font-medium">14.50 kg</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#ffffff]/10">
                  <span className="text-sm opacity-60">Dimensions</span>
                  <span className="font-medium">45 x 30 x 25 cm</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#ffffff]/10">
                  <span className="text-sm opacity-60">Service Tier</span>
                  <span className="text-[#83fba5] font-bold tracking-tight">
                    Sky Priority
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-sm opacity-60">Insurance</span>
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-xs text-[#83fba5]">
                      verified
                    </span>
                    Fully Covered
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#ccefee] p-8 rounded-3xl">
              <button className="w-full py-4 bg-[#006d36] text-[#ffffff] rounded-xl font-bold flex items-center justify-center gap-3 mb-4">
                <span className="material-symbols-outlined">description</span>
                Download Invoice
              </button>
              <button className="w-full py-4 bg-[#ffffff] text-[#001736] rounded-xl font-bold flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">headset_mic</span>
                Contact Courier
              </button>
            </div>
          </div>
        </section>
        {/* <!-- Professional Courier Showcases (Bento-style Grid) --> */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-headline font-extrabold tracking-tight text-[#001736] mb-4">
              The Human Element of Logistics
            </h2>
            <p className="text-[#43474f]">
              White-glove service isn't just a phrase; it's our standard
              operating procedure. Meet the teams ensuring your precision
              delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* <!-- Section 1: Handling --> */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-surface-dim">
              <img
                alt="Professional handling delivery"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                data-alt="Professional man in a tailored dark suit carefully inspecting a premium package in a bright modern office setting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWzILR1dbXK-ZotQLJVaiTW10jFV43rDQ8PPkEBeOqDWjn78YVlAdm3OUIyK9b4NDV4U5hxEGT_npQBuU0EwdWklv1OA8_ack7dmYR4cfvL1Ixi06IBPWObvD4tdyNr7azg2Q3Z1OKeJgfFqxHyny69NSDGQ614_uBiAYEDVnalK0m-X545viPOqDLoAiREKXlWNi33XmV3GPNhXbYt5BdrBnVjUED-6lAtz3k7JEovy48A3y1_lj6qh4nTxWkaSxFz6UATDQD2J9j"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/90 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#83fba5] text-xs font-bold mb-2">
                  PRECISION
                </span>
                <h4 className="text-xl font-bold text-[#ffffff] leading-tight">
                  Premium Handling
                </h4>
              </div>
            </div>
            {/* <!-- Section 2: Command Center --> */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#bee1e0] lg:mt-12">
              <img
                alt="Command center oversight"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                data-alt="A focused female executive in a professional navy blazer reviewing global logistics data on high-tech transparent displays"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxRarDefC2XKMaejKzYe_rVe_cOe7mh0jYLd_n-foJg9ULyqsNE6-zM5nIZh1AkICgKCc2g-831y4qXpgL8X_YTDC7el3hIm6lC42i2Kugo1XI-DAzHOWXMAVCANE7-SUPk4vBMA3rIsixPvbef2BMfeVmpwD1kU3h7X4D50mnztGQYTu2z0gEQljItmVbf1qdM9cgkuA3sGhUROMvQqN6V452wwu6qf8d_QgNb6bceFYtp8OR7SWLPmwUH8vBlN8vB11TF3Vbeugl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/90 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#83fba5] text-xs font-bold mb-2">
                  OVERSIGHT
                </span>
                <h4 className="text-xl font-bold text-[#ffffff] leading-tight">
                  Command Intelligence
                </h4>
              </div>
            </div>
            {/* <!-- Section 3: Management --> */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#bee1e0]">
              <img
                alt="Management team"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                data-alt="A diverse team of logistics professionals in business attire standing confidently in a glass-walled boardroom with city view"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOt_w5TlnoNLh28IfVLonRmFZ_q1V0YOc6acGBVsylc7Pohkbk6BW5nIA819F9aoQR3ccDlwMkzGjsCJEaqieqx45rqfLwNwY8KVG9OAOeDvccrnTYk-Z9oZf6c4AfxW69DrVrKbGdBjXtFQXRH_9_ySc2HtI1qAfP_uBtzc0W7wZZGsbl48zqqGccZFVi8FCc9K6oA553PwDUYt2E6G3_3_DLXvq5ZVaqUXNHASK6I86K84z6exc6sxWHVWWBgNANsBACG0W1WxMG"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/90 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#83fba5] text-xs font-bold mb-2">
                  STRATEGY
                </span>
                <h4 className="text-xl font-bold text-[#ffffff] leading-tight">
                  Global Leadership
                </h4>
              </div>
            </div>
            {/* <!-- Section 4: Verification --> */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-[#bee1e0] lg:mt-12">
              <img
                alt="Delivery verification"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                data-alt="A close-up of a professional in a grey suit using a digital tablet for signature verification with high-end transit van background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbeGly_RPvBQPug4ffHHjxelkBHGX9FKklz53SBPw9Cxl9CDtCRcJd3WK6A6BmUzy7Ey4nfIU2OTnZVPpCTn0a3nAosZIgmK7_xhmkLcBBwGwyecnHHzBlACDJihZyVfbJXSfKrQsCWUW88GWEa3VDUnQLO4vPkcS8hK_oqowV3SUqx6PxDGEu3Jm47k4jAPWsXVJhGl_7qePivBvATqVdhfk1PV1RNjD40UnzUgp_c1gHUPKhdy1fpM4Q--I_hi4DO3uwD8l4bGME"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/90 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#83fba5] text-xs font-bold mb-2">
                  SECURITY
                </span>
                <h4 className="text-xl font-bold text-[#ffffff] leading-tight">
                  Elite Verification
                </h4>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Milestone Timeline & Details --> */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-bold text-[#001736] mb-12 flex items-center gap-4">
              <span className="material-symbols-outlined text-[#006d36] text-3xl">
                route
              </span>
              Transit History
            </h3>
            <div className="space-y-0 relative">
              {/* <!-- Vertical Line --> */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-[#c4c6d0]/30"></div>
              {/* <!-- Milestone 1 --> */}
              <div className="relative pl-20 pb-12 group">
                <div className="absolute left-4 top-0 w-4 h-4 rounded-full bg-[#006d36] ring-8 ring-[#006d36]/10 group-hover:scale-125 transition-transform"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-label text-[#006d36] font-bold">
                      OCT 22, 2024 • 09:12 AM
                    </p>
                    <h5 className="text-lg font-bold text-[#001736]">
                      Scanned at LHR Sorting Center
                    </h5>
                    <p className="text-[#43474f] text-sm">
                      Heathrow Terminal 4, London, UK
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#d2f5f4] rounded-full text-[10px] font-bold text-[#001736] uppercase self-start">
                    Processing
                  </span>
                </div>
              </div>
              {/* <!-- Milestone 2 --> */}
              <div className="relative pl-20 pb-12 group">
                <div className="absolute left-5 top-1 w-2 h-2 rounded-full bg-[#747780] group-hover:bg-[#006d36] transition-colors"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-label text-[#747780]">
                      OCT 21, 2024 • 11:45 PM
                    </p>
                    <h5 className="text-lg font-bold text-[#001736]/70">
                      Arrived at ORD International
                    </h5>
                    <p className="text-[#43474f] text-sm">
                      O'Hare Intl Airport, Chicago, USA
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- Milestone 3 --> */}
              <div className="relative pl-20 pb-12 group">
                <div className="absolute left-5 top-1 w-2 h-2 rounded-full bg-outline group-hover:bg-[#006d36] transition-colors"></div>
                <div>
                  <p className="text-xs font-label text-[#747780]">
                    OCT 21, 2024 • 06:20 PM
                  </p>
                  <h5 className="text-lg font-bold text-[#001736]/70">
                    Departed Origin Facility
                  </h5>
                  <p className="text-[#43474f] text-sm">
                    Logistics Hub West, Chicago, USA
                  </p>
                </div>
              </div>
              {/* <!-- Milestone 4 --> */}
              <div className="relative pl-20 group">
                <div className="absolute left-5 top-1 w-2 h-2 rounded-full bg-outline group-hover:bg-secondary transition-colors"></div>
                <div>
                  <p className="text-xs font-label text-[#747780]">
                    OCT 21, 2024 • 02:00 PM
                  </p>
                  <h5 className="text-lg font-bold text-[#001736]/70">
                    Pick-up Completed
                  </h5>
                  <p className="text-[#43474f] text-sm">
                    Corporate Pickup, Illinois, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-[#d7fafa] rounded-3xl p-8 sticky top-32">
              <h4 className="text-lg font-bold mb-6 text-[#001736]">
                Real-Time Trajectory
              </h4>
              <div className="aspect-video bg-[#bee1e0] rounded-2xl overflow-hidden relative border border-[#c4c6d0]/20 shadow-inner">
                <img
                  alt="Logistics Map"
                  className="w-full h-full object-cover opacity-50 mix-blend-multiply"
                  data-alt="A stylized minimalist map showing air transit routes over the Atlantic Ocean with glowy teal line paths"
                  data-location="London"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIj4HvgCea6KH4BUVuJM5jVtBezZZ3WywdbZfRMqk32tFYC1VG-f43aZd45Rp6Mj6yc9l_FS49-VgeGCTglrYwqrAklyo0VGhsG_QL7Hw_P74Ee46SvdK16GIIAeGPBtrJJ-BOnYEp19mRA-9-tF6O5EYlWRhgP9yFwc0KdWOfGywV5yVEO3bubm_LJ4dSQYoyxphi2115ENnimAvjvR2gqFJocrIK5TWrRibv_AOdq1C2ZZLGIHnKNdpy-8KpbqiJ-vPQcfBd7Cqw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#006d36]/20 rounded-full animate-ping"></div>
                  <div className="absolute w-4 h-4 bg-[#006d36] rounded-full border-2 border-[#ffffff] shadow-lg shadow-[#006d36]/50"></div>
                </div>
                <div className="absolute bottom-4 left-4 glass-panel px-4 py-2 rounded-lg">
                  <p className="text-[10px] font-bold text-[#001736]">
                    ALTITUDE: 32,000 FT
                  </p>
                  <p className="text-[10px] font-bold text-[#001736]">
                    SPEED: 540 MPH
                  </p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <p className="text-sm font-medium text-[#43474f]">
                  Your shipment is currently crossing the Atlantic. Our flight
                  optimization engine has adjusted for a 15-minute early arrival
                  due to favorable tailwinds.
                </p>
                <div className="flex gap-4">
                  <span className="flex-1 text-center py-2 px-4 bg-[#d2f5f4] rounded-lg text-xs font-bold text-[#001736]">
                    GPS: 51.4700° N
                  </span>
                  <span className="flex-1 text-center py-2 px-4 bg-[#d2f5f4] rounded-lg text-xs font-bold text-[#001736]">
                    ETA: 14:30 GMT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
