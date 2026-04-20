import React from "react";

export default function AdminProfile() {
  return (
    <div className="bg-[#e2fffe] text-[#002020] font-body min-h-screen">
      {/* <!-- Main Content Area --> */}
      <main className="ml-72 pt-32 p-10 pb-20 max-w-7xl">
        {/* s<!-- Profile Header Section --> */}
        <section className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="flex items-center gap-8">
            <div className="relative group">
              <img
                alt="Admin Avatar"
                className="w-32 h-32 rounded-xl object-cover shadow-2xl ring-4 ring-white"
                data-alt="close up professional headshot of a executive with focused expression in a high tech office environment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN6pm8kxCqTmo1N6lrRmVqZ0XTTirfpe52U5aXhkZe-Eh-CpYRlBL04LLPTSim7hsWKgoo5tZ0PnhJ05E5yMB_tBvaJa3RdFPp0TKh11S1uEQjmlf3JkC2a-IIPHzl1HyGq0bUkWcjbMX7itOHt86tbS8U-oDkDQH5KJBrmCQGRDwtk8xyqJVTcwMW-uvGOdyINctFPOw-k0rDnqeeJarM3aLqsZrgYTOD458S6j4FMr996-QN1WwiJU2uXo5KNLud6TeFZaoRd-Gm"
              />
              <button className="absolute inset-0 bg-[#001736]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-[2px]">
                <div className="bg-white/90 p-2 rounded-lg shadow-xl flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#001736] text-xl"
                    data-icon="photo_camera"
                  >
                    photo_camera
                  </span>
                  <span className="text-[10px] font-bold text-[#001736] uppercase">
                    Upload image
                  </span>
                </div>
              </button>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-lg shadow-lg z-10">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="verified"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-extrabold text-[#001736] tracking-tight mb-1">
                Alex Sterling
              </h2>
              <p className="text-lg text-[#7594ca] font-medium mb-3">
                Senior Ops Controller
              </p>
              <div className="inline-flex items-center gap-2 bg-[#001736] px-4 py-1.5 rounded-full shadow-lg shadow-[#001736]/10">
                <span
                  className="material-symbols-outlined text-emerald-400 text-sm"
                  data-icon="lock_open"
                >
                  lock_open
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  Alpha-9 Security Clearance
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Main Content Area: Bento Layout --> */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* <!-- Left Column: Core Data --> */}
          <div className="lg:col-span-8 space-y-8">
            {/* <!-- Core Administrative Data --> */}
            <div className="bg-[#d7fafa] p-8 rounded-[2rem] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-[#006d36] rounded-full"></div>
                <h3 className="text-xl font-extrabold text-[#001736] tracking-tight">
                  Core Administrative Data
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#43474f]">
                    Legal Full Name
                  </label>
                  <p className="text-[#001736] font-bold">
                    Alex Sterling-Grant
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#43474f]">
                    Operational Email
                  </label>
                  <p className="text-[#001736] font-bold">
                    a.sterling@velocity-transit.io
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#43474f]">
                    Terminal ID
                  </label>
                  <p className="font-mono text-[#006d36] font-bold">
                    VEL-ADMIN-001
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#43474f]">
                    Assigned Node
                  </label>
                  <p className="text-[#001736] font-bold">
                    EMEA Central Hub / London
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Communication Controls --> */}
            <div className="bg-[#d2f5f4] p-8 rounded-[2rem] shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-6 bg-[#006d36] rounded-full"></div>
                <h3 className="text-xl font-extrabold text-[#001736] tracking-tight">
                  Communication Controls
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#ffffff] rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#006d36]/10 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[#006d36]"
                        data-icon="notifications_active"
                      >
                        notifications_active
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#001736]">
                        Real-time Delay Alerts
                      </p>
                      <p className="text-xs text-[#43474f]">
                        Push notifications for shipment deviations &gt; 15m
                      </p>
                    </div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-[#006d36]">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#ffffff] rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#006d36]/10 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[#006d36]"
                        data-icon="build"
                      >
                        build
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#001736]">
                        Fleet Maintenance Warnings
                      </p>
                      <p className="text-xs text-[#43474f]">
                        Visual priority cues for vehicle health telemetry
                      </p>
                    </div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none bg-[#006d36]">
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Right Column: Security --> */}
          <div className="lg:col-span-4">
            <div className="bg-primary p-8 rounded-[2rem] shadow-2xl shadow-[#001736]/30 text-white h-full">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="material-symbols-outlined text-emerald-400"
                  data-icon="security"
                >
                  security
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">
                  Security Protocol
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Manage your encrypted credentials and system access vectors.
                Your Alpha-9 clearance requires bi-weekly key rotation.
              </p>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-all group">
                  <span className="text-sm font-bold">
                    Manage System API Keys
                  </span>
                  <span
                    className="material-symbols-outlined text-emerald-400 group-hover:translate-x-1 transition-transform"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/15 rounded-2xl transition-all group">
                  <span className="text-sm font-bold">
                    Initialize Master Password Reset
                  </span>
                  <span
                    className="material-symbols-outlined text-emerald-400 group-hover:translate-x-1 transition-transform"
                    data-icon="restart_alt"
                  >
                    restart_alt
                  </span>
                </button>
              </div>
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Terminal Security Context
                  </p>
                </div>
                <div className="bg-black/20 p-4 rounded-xl font-mono text-[10px] text-emerald-500/80 leading-loose">
                  AUTH_TOKEN: AES-256-GCM
                  <br />
                  IP: 192.168.1.104 (PROXIED)
                  <br />
                  LAST_LOGIN: 2023-10-24 08:44:12
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
