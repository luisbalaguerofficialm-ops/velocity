import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateStatusSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  //  data coming from advance-status API flow
  const shipment = location.state?.shipment;
  const status = location.state?.status;

  const trackingId = shipment?.trackingId || "N/A";
  const newStatus = status || shipment?.status || "UPDATED";
  const updatedAt = new Date().toLocaleString();

  return (
    <div class="bg-[#e2fffe] text-[#002020] min-h-screen flex overflow-hidden">
      <main class="flex-1 overflow-y-auto p-12 flex flex-col items-center justify-center relative">
        {/* <!-- Abstract Kinetic Background Elements --> */}
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#83fba5]/20 blur-[120px]"></div>
          <div class="absolute -bottom-[10%] -left-[5%] w-[300px] h-[300px] rounded-full bg-[#002b5b]/10 blur-[100px]"></div>
        </div>
        {/* <!-- Central Success Card --> */}
        <section class="max-w-2xl w-full relative z-10">
          <div class="bg-[#ffffff] p-10 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,32,32,0.08)] flex flex-col items-center text-center">
            {/* <!-- Emerald Checkmark Icon --> */}
            <div class="w-20 h-20 bg-[#83fba5] flex items-center justify-center rounded-full mb-8">
              <span
                class="material-symbols-outlined text-[#006d36] text-5xl font-bold"
                data-weight="fill"
              >
                check_circle
              </span>
            </div>
            {/* <!-- Headline & Subtext --> */}
            <h1 class="text-[#001736] font-headline text-3xl font-extrabold tracking-tight mb-4">
              Shipment Status Updated Successfully
            </h1>
            <p class="text-[#002020]/60 font-body text-md leading-relaxed mb-10 max-w-md">
              The operational manifest for{" "}
              <span class="font-bold text-[#001736]">VEL-TX-99021</span> has
              been synchronized with the global network.
            </p>
            {/* <!-- Summary Data Grid (Bento Style) --> */}
            <div class="grid grid-cols-2 gap-4 w-full mb-10">
              <div class="bg-[#d7fafa] p-5 rounded-2xl flex flex-col items-start gap-1">
                <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">
                  Tracking ID
                </span>
                <span class="font-headline font-bold text-[#001736]">
                  {trackingId}
                </span>
              </div>
              <div class="bg-[#d7fafa] p-5 rounded-2xl flex flex-col items-start gap-1">
                <span class="text-[10px] font-bold uppercase tracking-widest text-[#002020]/40">
                  New Status
                </span>
                <span class="bg-[#83fba5] text-[#00743a] px-3 py-1 rounded-full text-xs font-black tracking-tighter">
                  {newStatus}
                </span>
              </div>
              <div class="bg-[#d7fafa] p-5 rounded-2xl flex flex-col items-start gap-1">
                <span class="text-[10px] font-bold uppercase tracking-widest text-[#002020]/40">
                  Effective Time
                </span>
                <span class="font-headline font-bold text-[#001736]">
                  {updatedAt}
                </span>
              </div>
              <div class="bg-[#d7fafa] p-5 rounded-2xl flex flex-col items-start gap-1">
                <span class="text-[10px] font-bold uppercase tracking-widest text-[#002020]/40">
                  Updated By
                </span>
                <span class="font-headline font-bold text-[#001736]">
                  Admin
                </span>
              </div>
            </div>
            {/* <!-- Actions --> */}
            <div class="flex flex-col gap-3 w-full">
              <button
                onClick={() => navigate(`/admin/shipments/${shipment?._id}`)}
                className="w-full bg-[#006d36] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#005227] transition"
              >
                View Updated Shipment
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <div class="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate("/admin/shipments/activity")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#c4c6d0] text-[#001736] font-semibold hover:bg-[#d2f5f4] transition"
                >
                  <span className="material-symbols-outlined text-sm">
                    history
                  </span>
                  Activity Log
                </button>
                <button
                  onClick={() => navigate("/admin/shipments")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#c4c6d0] text-[#001736] font-semibold hover:bg-[#d2f5f4] transition"
                >
                  <span className="material-symbols-outlined text-sm">
                    grid_view
                  </span>
                  Operations
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Subtle Decorative Floating Map Element --> */}
          <div class="mt-8 flex justify-center">
            <div class="glass-panel px-6 py-4 rounded-full flex items-center gap-4 border border-white/40 shadow-sm">
              <div class="w-2 h-2 rounded-full bg-[#006d36]"></div>
              <span class="text-xs font-bold text-[#001736]/80 uppercase tracking-widest">
                Network Node Sync: 100% Verified
              </span>
              <div class="flex -space-x-2">
                <div class="h-6 w-6 rounded-full border-2 border-white bg-[#bee1e0] overflow-hidden">
                  <img
                    alt="Network Node 1"
                    class="w-full h-full object-cover"
                    data-alt="stylized satellite view of earth with digital grid overlays in soft blue and emerald tones"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC32wA4uGGyZx0F0aLuUmzyqkY4QL928qQitiRK2VGt3hL3j2k_yZrCRN6n1Plj8gwNStTSLddKvXnkHq6HfMEutRnLHapYLCdI4x-In8cPc5Zr2Omdd2wK5WJD0mIrzMXJct5fSrhRPKwcQgwzxu3tO2hYuJJOAfpwDa785wLXeQvtvsr1Rvps9O8zjffTB5__JG6hFWFIJG7MFJDK--xUpkH8-ApbjSWFFDGJgrB0Y7ALCIZWnbU3n445Ndjy93wFS63RZRCZ5DJQ"
                  />
                </div>
                <div class="h-6 w-6 rounded-full border-2 border-white bg-surface-dim overflow-hidden">
                  <img
                    alt="Network Node 2"
                    class="w-full h-full object-cover"
                    data-alt="abstract close-up of a high-tech circuit board with glowing emerald paths on a dark navy base"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpLN7iHtG-yL54pAD_4SPkQ1-PSJyXgYR1PuHfK7I9-nIvuOtRDytfK-xrJpj_ul7Ucg_YmVupm5Fx9KWiOwI5fB3yxfdWdIrdrfwQ_E3u5qj6w2Ozcik0dUuRDigBNqJG42g_t3Nh_J-aQbRvmyztfHkhpIGa4goyF_X2fvcOdpscK6AvsiKRz-ZBYuOGAlZ4HNrErDIIz7w60VSmZOtMzBYyzpCPg-aOhoVgOqBqBMI6DOHQCo7b0ARiEEBDkjL9QpAT-VKcPlQy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
