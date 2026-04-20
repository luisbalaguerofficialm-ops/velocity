import React from "react";

export default function Onboarding() {
  return (
    <div class="bg-[#e2fffe] font-body text-[#002020] selection:bg-[#d2f5f4] selection:text-[#00743a]">
      {/* <!-- TopNavBar (Suppressed for focused onboarding journey, using Brand Identity Only) --> */}
      <header class="fixed top-0 w-full z-50 bg-[#e2fffe]/80 backdrop-blur-xl border-b border-emerald-500/10 shadow-sm">
        <div class="flex justify-between items-center px-8 h-16 w-full">
          <div class="text-2xl font-extrabold text-[#001736] tracking-tighter">
            Velocity Transit
          </div>
          <div class="flex items-center gap-6">
            <span class="font-manrope text-sm font-semibold text-slate-600">
              English (US)
            </span>
            <span
              class="material-symbols-outlined text-[#001736] cursor-pointer"
              data-icon="help"
            >
              help
            </span>
          </div>
        </div>
      </header>
      <main class="min-h-screen pt-16 overflow-hidden">
        {/* <!-- Hero Section: The Aerodynamic Archive --> */}
        <section class="relative min-h-[921px] flex items-center">
          {/* <!-- Background Visuals --> */}
          <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-r from-[#e2fffe] via-[#e2fffe]/90 to-transparent z-10"></div>
            <img
              alt="Logistics background"
              class="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
              data-alt="Modern high-tech shipping warehouse with automation"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu9Eq3nV2U_hhqpCeDE5fn423GWaTdv9MAXIlYBjjHhZCoXhq3SjfAMIj1xBqnm6l8ap0IP_a57jvCydyRxwuhmQXdZkTEbJMnYq8nszkTELWf9cpmBmatA3FmXmPlEIowDwqOrSQmCUCgO_1ShuPl0H0US33LnzwLV-PocZESck5Py_9L6D2WwI7w5QXB3JzVeyE6Px5mq6H24bPXifCbnAmrCe2T3uWqXcO4t5wK7leP6gR065WM2jkBUY3dwbzjTk_gAw2qQ1ZW"
            />
          </div>
          <div class="container mx-auto px-8 relative z-20">
            <div class="grid grid-cols-12 gap-8 items-center">
              {/* <!-- Left: Editorial Content --> */}
              <div class="col-span-12 lg:col-span-7">
                <div class="inline-flex items-center px-3 py-1 bg-[#83fba5] text-on-[#005227] rounded-full text-[0.6875rem] font-bold tracking-[0.05rem] uppercase mb-6">
                  The Future of Transit
                </div>
                <h1 class="text-7xl font-extrabold tracking-tighter text-[#001736] leading-[0.9] mb-8">
                  Kinetic Precision <br />
                  <span class="text-[#006d36]">Every Mile.</span>
                </h1>
                <p class="text-lg text-[#43474f] max-w-xl mb-12 leading-relaxed">
                  Experience the synergy of high-speed logistics and unwavering
                  reliability. Velocity Transit redefines cargo movement with
                  real-time intelligence and editorial-grade transparency.
                </p>
                <div class="flex flex-wrap gap-4">
                  <button class="kinetic-gradient text-[#ffffff] px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-2xl shadow-[#001736]/20 hover:scale-[1.02] transition-transform">
                    Track Shipment
                    <span class="material-symbols-outlined" data-icon="east">
                      east
                    </span>
                  </button>
                  <button class="bg-[#ccefee] text-[#001736] border border-[#c4c6d0]/10 px-8 py-4 rounded-xl font-bold hover:bg-[#c6e9e9] transition-colors">
                    Customer Support
                  </button>
                </div>
              </div>
              {/* <!-- Right: Bento Grid of Benefits --> */}
              <div class="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
                <div class="col-span-1 bg-surface-[#ffffff] p-6 rounded-xl shadow-sm border border-[#c4c6d0]/5">
                  <div class="w-10 h-10 bg-[#83fba5] rounded-lg flex items-center justify-center mb-4">
                    <span
                      class="material-symbols-outlined text-[#00743a]"
                      data-icon="speed"
                    >
                      speed
                    </span>
                  </div>
                  <h3 class="font-bold text-[#001736] mb-2">99% On-Time</h3>
                  <p class="text-xs text-[#43474f] leading-relaxed">
                    Global delivery precision backed by aerodynamic routing.
                  </p>
                </div>
                <div class="col-span-1 mt-8 bg-[#001736] p-6 rounded-xl shadow-sm">
                  <div class="w-10 h-10 bg-[#002b5b] rounded-lg flex items-center justify-center mb-4">
                    <span
                      class="material-symbols-outlined text-[#83fba5]"
                      data-icon="verified_user"
                    >
                      verified_user
                    </span>
                  </div>
                  <h3 class="font-bold text-white mb-2">Secure Transit</h3>
                  <p class="text-xs text-slate-400 leading-relaxed">
                    Advanced encryption for every manifest and ledger.
                  </p>
                </div>
                <div class="col-span-2 glass-panel p-8 rounded-xl shadow-xl border border-white/40 flex items-center gap-6">
                  <div class="flex-1">
                    <h3 class="font-bold text-[#001736] text-xl mb-1">
                      Global Velocity
                    </h3>
                    <p class="text-sm text-[#001736]">
                      Connecting 142 countries with direct, non-stop shipping
                      lanes.
                    </p>
                  </div>
                  <div class="flex -space-x-3">
                    <img
                      alt="Team"
                      class="w-10 h-10 rounded-full border-2 border-white object-cover"
                      data-alt="Logistics specialist portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX7Fb2mzqaMs9A8eOSkONboTxQbKIoTEyLdBTHzkMh89VzJLX52NHnFaliazjjaTY902se1BXcG0QvANyJZVaWdL4ivUlDFHoDZ2Iz9fvw6NYc1cBHb3a6ODvj5tdwznCsEGMjEXJFcm3DvOEhTmsTG29CDaRxmjirAtPAAZE60NvovdDgk0NfPc-fC1UA_knuoB22bEtVBkkQloQNvVkpBupYzXZMEtxNT4VLYql2f40B4YHZhj3kUu2OsAsj1mlzrPVvg7-sXxmj"
                    />
                    <img
                      alt="Team"
                      class="w-10 h-10 rounded-full border-2 border-white object-cover"
                      data-alt="Customer success manager portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX7Fb2mzqaMs9A8eOSkONboTxQbKIoTEyLdBTHzkMh89VzJLX52NHnFaliazjjaTY902se1BXcG0QvANyJZVaWdL4ivUlDFHoDZ2Iz9fvw6NYc1cBHb3a6ODvj5tdwznCsEGMjEXJFcm3DvOEhTmsTG29CDaRxmjirAtPAAZE60NvovdDgk0NfPc-fC1UA_knuoB22bEtVBkkQloQNvVkpBupYzXZMEtxNT4VLYql2f40B4YHZhj3kUu2OsAsj1mlzrPVvg7-sXxmj"
                    />
                    <div class="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] font-bold text-white">
                      +24k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Tracking Visual Section --> */}
        <section class="bg-[#d7fafa] py-24 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#006d36]/5 to-transparent"></div>
          <div class="container mx-auto px-8 grid grid-cols-12 gap-12 items-center">
            <div class="col-span-12 lg:col-span-6">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  alt="Tracking map"
                  class="w-full h-96 object-cover"
                  data-alt="Digital map showing shipping routes in Europe"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX7Fb2mzqaMs9A8eOSkONboTxQbKIoTEyLdBTHzkMh89VzJLX52NHnFaliazjjaTY902se1BXcG0QvANyJZVaWdL4ivUlDFHoDZ2Iz9fvw6NYc1cBHb3a6ODvj5tdwznCsEGMjEXJFcm3DvOEhTmsTG29CDaRxmjirAtPAAZE60NvovdDgk0NfPc-fC1UA_knuoB22bEtVBkkQloQNvVkpBupYzXZMEtxNT4VLYql2f40B4YHZhj3kUu2OsAsj1mlzrPVvg7-sXxmj"
                />
                <div class="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-xl border border-white/20">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-xs font-bold text-[#001736] tracking-widest uppercase">
                      Live Tracking ID: VT-8829-QX
                    </span>
                    <span class="px-2 py-0.5 bg-[#006d36] text-white text-[10px] font-bold rounded">
                      IN TRANSIT
                    </span>
                  </div>
                  {/* <!-- The Velocity Tracker Component --> */}
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-[#006d36]"></div>
                    <div class="flex-1 h-1 bg-[#006d36] rounded-full"></div>
                    <div class="w-3 h-3 rounded-full bg-[#006d36]"></div>
                    <div class="flex-1 h-1 bg-[#c4c6d0]/30 border-t border-dashed border-[#c4c6d0]"></div>
                    <div class="w-3 h-3 rounded-full border-2 border-[#c4c6d0] bg-[#e2fffe]"></div>
                  </div>
                  <div class="flex justify-between mt-2">
                    <span class="text-[10px] font-bold text-[#001736]">
                      LONDON, UK
                    </span>
                    <span class="text-[10px] font-bold text-[#001736]">
                      ROTTERDAM, NL
                    </span>
                    <span class="text-[10px] font-bold text-[#747780]">
                      BERLIN, DE
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-12 lg:col-span-5 lg:col-start-8">
              <h2 class="text-4xl font-bold text-[#001736] tracking-tight mb-6">
                Real-time oversight for complex supply chains.
              </h2>
              <p class="text-[#43474f] mb-8">
                Our Kinetic Map Overlay provides granular data points at every
                stage. Monitor temperature, humidity, and handling velocity from
                your desktop dashboard.
              </p>
              <ul class="space-y-4">
                <li class="flex items-start gap-4">
                  <span
                    class="material-symbols-outlined text-[#006d36] mt-1"
                    data-icon="verified"
                  >
                    verified
                  </span>
                  <div>
                    <h4 class="font-bold text-[#001736]">Automated Ledger</h4>
                    <p class="text-sm text-[#43474f]">
                      Instant digital receipts and customs documentation.
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-4">
                  <span
                    class="material-symbols-outlined text-[#006d36] mt-1"
                    data-icon="cloud_done"
                  >
                    cloud_done
                  </span>
                  <div>
                    <h4 class="font-bold text-[#001736]">Cloud Fleet Control</h4>
                    <p class="text-sm text-[#43474f]">
                      Direct communication with fleet captains and logistics
                      hubs.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* <!-- Final Onboarding Action --> */}
        <section class="py-24 bg-[#e2fffe] text-center px-8">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-5xl font-extrabold text-[#001736] tracking-tighter mb-8">
              Ready to accelerate?
            </h2>
            <div class="bg-[#ffffff] p-2 rounded-2xl shadow-sm border border-[#c4c6d0]/10 flex items-center mb-12">
              <input
                class="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 text-[#001736] font-medium placeholder:text-[#c4c6d0]"
                placeholder="Enter shipment number to begin..."
                type="text"
              />
              <button class="kinetic-gradient text-[#ffffff] px-10 py-4 rounded-xl font-bold transition-all hover:px-12">
                Get Started
              </button>
            </div>
            <div class="flex justify-center gap-12 grayscale opacity-40">
              <span class="font-bold tracking-widest">LOGISTA CORP</span>
              <span class="font-bold tracking-widest">EURO FREIGHT</span>
              <span class="font-bold tracking-widest">NORDIC SHIP</span>
              <span class="font-bold tracking-widest">ATLANTIC HUB</span>
            </div>
          </div>
        </section>
      </main>
      <footer class="bg-[#001736] text-white py-16 px-8 border-t border-white/5">
        <div class="container mx-auto grid grid-cols-12 gap-12">
          <div class="col-span-12 lg:col-span-4">
            <div class="text-2xl font-extrabold tracking-tighter text-[#83fba5] mb-6">
              Velocity Transit
            </div>
            <p class="text-[#7594ca] text-sm leading-relaxed max-w-xs">
              Architecting the world's most aerodynamic logistics network.
              Precision at the speed of thought.
            </p>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <h5 class="text-[0.6875rem] font-bold tracking-[0.05rem] uppercase text-white/40 mb-6">
              Services
            </h5>
            <ul class="space-y-3 text-sm font-medium text-slate-400">
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                Air Freight
              </li>
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                Sea Logistics
              </li>
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                Road Transport
              </li>
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                Warehouse Management
              </li>
            </ul>
          </div>
          <div class="col-span-6 lg:col-span-2">
            <h5 class="text-[0.6875rem] font-bold tracking-[0.05rem] uppercase text-white/40 mb-6">
              Support
            </h5>
            <ul class="space-y-3 text-sm font-medium text-slate-400">
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                Help Center
              </li>
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                API Docs
              </li>
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                Track Status
              </li>
              <li class="hover:text-[#83fba5] cursor-pointer transition-colors">
                Contact Us
              </li>
            </ul>
          </div>
          <div class="col-span-12 lg:col-span-4">
            <h5 class="text-[0.6875rem] font-bold tracking-[0.05rem] uppercase text-white/40 mb-6">
              Subscribe to Velocity Insight
            </h5>
            <div class="flex gap-2">
              <input
                class="bg-[#002b5b] border-none rounded-lg text-sm flex-1 focus:ring-1 focus:ring-[#83fba5] text-white px-4 py-3"
                placeholder="Email address"
                type="email"
              />
              <button class="bg-[#006d36] text-white px-4 py-3 rounded-lg flex items-center justify-center">
                <span
                  class="material-symbols-outlined"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="container mx-auto mt-16 pt-8 border-t border-white/5 flex justify-between items-center text-[0.6875rem] font-bold tracking-widest text-white/20">
          <span>© 2026 VELOCITY TRANSIT SYSTEMS</span>
          <div class="flex gap-8">
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
