import React from "react";

export default function Services() {
  return (
    <div className="bg-[#e2fffe] text-[#002020] font-body selection:bg-[#83fba5] selection:text-[#00743a]">
      <main className="mim-h-screen mx-auto px-18 py-50 space-y-24">
        {/* <!-- Hero Section --> */}
        <section className="px-8 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="text-[#006d36] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Velocity Transit Ecosystem
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#001736] tracking-tighter leading-none mb-8">
                Precision Moving <br />
                At Scale.
              </h1>
              <p className="text-xl text-[#43474f] max-w-2xl font-light leading-relaxed">
                Redefining global logistics through an aerodynamic blend of
                high-speed air freight, urban EV networks, and white-glove
                security protocols.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <div className="bg-[#ccefee] p-8 rounded-xl w-full">
                <div className="text-3xl font-black text-[#001736] mb-1">
                  99.9%
                </div>
                <div className="text-sm font-bold text-[#006d36] uppercase tracking-widest mb-4">
                  Precision Rating
                </div>
                <div className="h-1 bg-[#c4c6d0] w-full overflow-hidden rounded-full">
                  <div className="h-full bg-[#006d36] w-[99.9%]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Services Grid (Bento Style) --> */}
        <section className="px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* <!-- Sky Priority (Air Freight) - Large Feature --> */}
            <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-[#001736] min-h-[500px] flex flex-col justify-end p-10">
              <img
                alt="Sky Priority"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                data-alt="wide angle shot of a large cargo plane taking off at dusk with glowing turbine engines and purple twilight sky"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeYqTNpls6sniL3O9G5XUdA_rXFDQOnWDW4TKrO8iMXUnXt7DCjaR49WTs1RPT1SL5_zU-CfElr6YpKSnVMfbuxDvI3TScgs9SoqTuRcHcRO8BX_cltzu1UBsuwmqfMtjtx9eTeK88Bz_M59McPd5mQx8cLP3o2clnX4xplXSa_gW-nPxrdUPqp7q1ju3ltInrY2MidDQg0oozE2BgwBBM809UZRl-z2huX3sUnHSb5T-9IgUrfZ1PUdwClfZfXG_d9lrIn9oIcr6-"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001736] via-[#001736]/20 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="material-symbols-outlined text-[#83fba5] text-4xl"
                    data-icon="flight_takeoff"
                  >
                    flight_takeoff
                  </span>
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    Sky Priority
                  </h3>
                </div>
                <p className="text-[#c6e9e9] max-w-md mb-8 text-lg font-light leading-snug">
                  Global air freight solutions utilizing direct route
                  optimization for time-critical high-volume cargo.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                    24hr Global Span
                  </span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                    Customs Clearing
                  </span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold">
                    Door-to-Airport
                  </span>
                </div>
                <button className="bg-[#006d36] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#00743a] transition-colors">
                  Get Quote{" "}
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            {/* <!-- Flash Express (Intra-city) --> */}
            <div className="md:col-span-2 bg-[#d7fafa] p-10 rounded-xl flex flex-col justify-between border-b-4 border-[#006d36]">
              <div>
                <div className="bg-[#006d36]/10 w-16 h-16 rounded-full flex items-center justify-center mb-8">
                  <span
                    className="material-symbols-outlined text-[#006d36] text-3xl"
                    data-icon="bolt"
                  >
                    bolt
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#001736] mb-4 tracking-tight">
                  Flash Express
                </h3>
                <p className="text-[#43474f] font-light leading-relaxed mb-6">
                  Rapid intra-city delivery system. Hyper-local routing for
                  sub-2-hour transit within metropolitan hubs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-[#001736] font-medium">
                    <span
                      className="material-symbols-outlined text-[#006d36] text-base"
                      data-icon="check_circle"
                    >
                      check_circle
                    </span>
                    Real-time Couriers
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#001736] font-medium">
                    <span
                      className="material-symbols-outlined text-[#006d36] text-base"
                      data-icon="check_circle"
                    >
                      check_circle
                    </span>
                    Smart Route Optimization
                  </li>
                </ul>
              </div>
              <button className="text-[#006d36] font-bold flex items-center gap-2 mt-8 group">
                Explore Tier{" "}
                <span
                  className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                  data-icon="chevron_right"
                >
                  chevron_right
                </span>
              </button>
            </div>
            {/* <!-- Green Freight (EV Fleet) --> */}
            <div className="md:col-span-3 bg-[#c6e9e9] rounded-xl overflow-hidden flex flex-col">
              <div className="h-64 relative">
                <img
                  alt="Green Freight"
                  className="w-full h-full object-cover"
                  data-alt="Modern electric delivery van parked at a sleek charging station in a bright, clean sustainable logistics warehouse"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzZGqEvy7OsA2EEB6riRZGUoQ919tgLc9gg5xdmMo6Q_CZW5cCquJ2wGxzrUf-F_I6ghTDESIR9CKOR7eGTQSMI5RLs2sL2In2K53DvnHs3_-Yzt73l85cnMBYRVCZ2n9WL9ZO8FG25Awk9oYjq4KX4oB2lJs5HZegsuqBdWycJ-fFm8e1QBFFtpcOkKk0lqZ7klI3n01KnVAc6gpfx01uJ_h2nfsh1r_N0ljRqciv_jidEGk0zdeK0e-m_3N0EebmIE7jsfNHIxuv"
                />
                <div className="absolute top-4 left-4 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Eco-Certified
                </div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-[#001736] mb-4 tracking-tight">
                  Green Freight
                </h3>
                <p className="text-[#43474f] font-light mb-8">
                  Sustainable long-haul and last-mile delivery via our
                  proprietary fleet of electric heavy-duty vehicles.
                </p>
                <button className="w-full py-4 border-2 border-[#001736] text-[#001736] font-bold rounded-xl hover:bg-[#006d36] hover:text-white transition-all">
                  Sustainable Quote
                </button>
              </div>
            </div>
            {/* <!-- White Glove (High-Value) --> */}
            <div className="md:col-span-3 kinetic-gradient rounded-xl p-10 flex flex-col justify-between text-white">
              <div>
                <div className="flex justify-between items-start mb-12">
                  <span
                    className="material-symbols-outlined text-[#83fba5] text-5xl"
                    data-icon="verified_user"
                  >
                    verified_user
                  </span>
                  <div className="text-right">
                    <div className="text-xs text-[#83fba5] font-black uppercase tracking-widest">
                      Insurance Tier
                    </div>
                    <div className="text-xl font-bold">Grade A+</div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">
                  White Glove
                </h3>
                <p className="text-[#7594ca] text-lg font-light mb-8">
                  Secure transport for high-value assets, pharmaceuticals, and
                  sensitive technology with biometric tracking.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-xs text-[#83fba5] mb-1 uppercase font-bold">
                    Security
                  </div>
                  <div className="text-sm">2-Person Chain</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-xs text-[#83fba5] mb-1 uppercase font-bold">
                    Climate
                  </div>
                  <div className="text-sm">Active Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Dynamic Visual Spacer --> */}
        <section className="mt-24 py-20 bg-[#bee1e0] overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#001736] uppercase tracking-tighter max-w-xl">
                Engineered for the speed of global trade.
              </h2>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-[#001736] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#001736]"
                    data-icon="terminal"
                  >
                    terminal
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#001736] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#001736]"
                    data-icon="hub"
                  >
                    hub
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#001736] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#001736]"
                    data-icon="route"
                  >
                    route
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Decorative kinetic lines --> */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#001736] -rotate-12 translate-y-8"></div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#001736] -rotate-12 -translate-y-8"></div>
          </div>
        </section>
      </main>
      {/* <!-- Footer --> */}
      <footer className="bg-[#001736] dark:bg-[#000b1a] w-full rounded-t-none border-t border-[#002b5b]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 px-12 py-20">
          <div>
            <div className="text-2xl font-black text-[#83fba5] uppercase tracking-widest mb-8">
              Kinetic
            </div>
            <p className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 leading-relaxed max-w-xs">
              Precision logistics for the modern era. Seamless global
              connectivity through aerodynamic infrastructure.
            </p>
          </div>
          <div>
            <h4 className="text-[#e2fffe] font-bold mb-6 text-xs uppercase tracking-[0.2em]">
              Services
            </h4>
            <div className="flex flex-col space-y-4">
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Global Network
              </a>
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Shipping Tiers
              </a>
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Flash Delivery
              </a>
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Sky Freight
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-[#e2fffe] font-bold mb-6 text-xs uppercase tracking-[0.2em]">
              Sustainability
            </h4>
            <div className="flex flex-col space-y-4">
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Green Initiatives
              </a>
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Sustainability Report
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-[#e2fffe] font-bold mb-6 text-xs uppercase tracking-[0.2em]">
              Legal
            </h4>
            <div className="flex flex-col space-y-4">
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Carrier Terms
              </a>
              <a
                className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60 hover:text-[#83fba5] transition-all duration-200"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="px-12 py-8 border-t border-[#002b5b] flex justify-between items-center">
          <div className="font-manrope text-sm font-light tracking-wide text-[#c6e9e9]/60">
            © 2026 Kinetic Precision Logistics. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span
              className="material-symbols-outlined text-[#c6e9e9]/60 hover:text-[#83fba5] cursor-pointer"
              data-icon="public"
            >
              public
            </span>
            <span
              className="material-symbols-outlined text-[#c6e9e9]/60 hover:text-[#83fba5] cursor-pointer"
              data-icon="language"
            >
              language
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
