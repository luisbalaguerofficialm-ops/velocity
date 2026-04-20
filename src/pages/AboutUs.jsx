import React from "react";

export default function AboutUs() {
  return (
    <div class="bg-[#e2fffe] text-[#002020]">
      <main>
        {/* <!-- Hero Section: Kinetic Precision --> */}
        <section className="relative min-h-[819px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Modern Cargo Jet"
              className="w-full h-full object-cover"
              data-alt="Cinematic low-angle shot of a sleek modern cargo jet on a wet runway at night with brilliant emerald landing lights reflecting on the ground"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASg92uTnYWtUs5UWL6qXWQPbr4qivJ0J0R1dHIgGfNtYeRrkkr0Xm3olyqxecCshMQ0Z3eu_IGbj9BWVpzJNDMv8P2VLnTykr3zHfdKWVgol4OheNvCgG5uUPCQ0riSMUYPI37V8mY1br4eekYLQfWFTIPHzdG3yEJKiMB0zXGKjgLmt_JZ3xFLuxecp53WNSMSJuIrhqkqC8wcyDlig4oNcpLZtkmQH1F7b5JL0aTzxIK4KX0mErjYkKOeqCL7Q7LqRA3wPsP23DA"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#001736] via-[#001736] to-[#e2fffe]/90 via-[#001736]/40 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
            <div className="max-w-3xl">
              <span className="label-sm font-bold uppercase tracking-[0.2rem] text-[#006d36] mb-4 block">
                Engineered for Excellence
              </span>
              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white leading-[0.9] mb-8">
                The Future of <br />
                <span className="text-[#006d36]">Precision</span> Transit.
              </h1>
              <p className="text-xl text-[#c6e9e9] font-medium max-w-xl leading-relaxed opacity-90">
                At Velocity Transit, we don't just move cargo; we orchestrate
                the kinetic pulse of global commerce with surgical accuracy and
                sustainable innovation.
              </p>
            </div>
          </div>
          {/* <!-- Kinetic Map Overlay (Glassmorphism) --> */}
          <div className="absolute bg-[#c6e9e9]  bottom-12 right-12 hidden lg:block">
            <div className="glass-panel p-6 rounded-xl shadow-2xl border border-white/10 w-80">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="material-symbols-outlined text-[#006d36]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  rocket_launch
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#001736]">
                  Live Operations
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#001736]/60">
                    Active Fleet
                  </span>
                  <span className="text-sm font-bold text-[#001736]">
                    1,248 Units
                  </span>
                </div>
                <div className="w-full bg-[#001736]/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-[#006d36] h-full w-3/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#001736]/60">
                    On-Time Rate
                  </span>
                  <span className="text-sm font-bold text-[#006d36]">
                    99.92%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Mission & Precision Section (Asymmetric Layout) --> */}
        <section className="py-24 bg-[#e2fffe]">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5">
                <h2 className="text-4xl font-extrabold tracking-tight text-[#001736] mb-8 leading-tight">
                  Our Mission: To redefine the boundaries of logistics through
                  kinetic intelligence.
                </h2>
                <p className="text-lg text-[#001736]/70 leading-relaxed mb-6">
                  Founded on the principle that time is the most valuable
                  commodity in the modern world, Velocity Transit has evolved
                  from a local courier service into a global infrastructure
                  titan.
                </p>
                <p className="text-lg text-[#001736]/70 leading-relaxed">
                  We bridge the gap between production and consumption by
                  leveraging a multi-modal network that operates with the
                  synchronicity of a high-performance engine.
                </p>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* <!-- Bento-style Feature Cards --> */}
                <div className="bg-[#d2f5f4] p-8 rounded-xl flex flex-col justify-between h-64 border-b-4 border-[#006d36]/20">
                  <span className="material-symbols-outlined text-4xl text-[#006d36]">
                    speed
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-[#001736] mb-2">
                      Unrivaled Velocity
                    </h3>
                    <p className="text-sm text-[#001736]/60">
                      Cross-continental delivery windows reduced by an average
                      of 34% through AI routing.
                    </p>
                  </div>
                </div>
                <div className="bg-[#001736] p-8 rounded-xl flex flex-col justify-between h-64 shadow-xl">
                  <span className="material-symbols-outlined text-4xl text-[#83fba5]">
                    gps_fixed
                  </span>
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">
                      Absolute Precision
                    </h3>
                    <p className="text-sm opacity-70">
                      Real-time telemetry tracking with 1.5-meter accuracy
                      across all transit modes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Brief History: The Editorial Engine --> */}
        <section className="py-24 bg-[#d7fafa]">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-2xl rotate-1">
                <img
                  alt="Modern Warehouse Management"
                  className="w-full aspect-[4/3] object-cover"
                  data-alt="High-tech automated logistics warehouse with robotic arms and rows of organized shipments under clean cool-toned LED lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCETwdy0oIHwodSjwjchCFrVTvYBQ_U23zqsW3p8176sMkxHPA0Eh19yAps_ASObuzJkt-a1r0INMvGyaXF7wcYMXcaVyGzTyLrIBnfD9KjPfVIPmcupfDN15G7bsvB-JWhsC_EGtxZv8JtVvKmUveu5IHfZqPN1AWM9OIvbZ9mVDGpnOQViMHRwsmS6vdZP3aKdzau9_L6klWNvXNPuRf3Z2-OqZJpQJctObiuUKKOqzaMrGO4Ndpn3decjVI3iHqrqnXzHky046kr"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="inline-block px-3 py-1 bg-[#006d36]/10 rounded-full mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-[#006d36]">
                    Legacy of Innovation
                  </span>
                </div>
                <h2 className="text-5xl font-extrabold tracking-tighter text-[#001736] mb-8 leading-tight">
                  A History Built on <br />
                  Moving Forward.
                </h2>
                <div className="space-y-8 relative before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-[#001736]/5 pl-8">
                  <div>
                    <h4 className="text-sm font-black text-[#006d36] tracking-widest mb-1">
                      1998 — THE SPARK
                    </h4>
                    <p className="text-[#001736]/70">
                      Started as a boutique express service for medical isotopes
                      in Berlin.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#006d36] tracking-widest mb-1">
                      2010 — GLOBAL EXPANSION
                    </h4>
                    <p className="text-[#001736]/70">
                      Launched the Trans-Atlantic Kinetic Corridor, integrating
                      air and sea logistics.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#006d36] tracking-widest mb-1">
                      2022 — THE GREEN PIVOT
                    </h4>
                    <p className="text-[#001736]/70">
                      Fully transitioned to a zero-emission last-mile fleet
                      across 40 major global hubs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Core Values: The Aerodynamic Archive --> */}
        <section className="py-24 bg-[#e2fffe]">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-[#001736]">
                The Core Principles
              </h2>
              <div className="h-1 w-24 bg-[#006d36] mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* <!-- Value 1 --> */}
              <div className="group p-8 bg-white rounded-xl transition-all duration-300 hover:bg-[#001736]">
                <div className="w-12 h-12 rounded-lg bg-[#006d36]/10 flex items-center justify-center mb-6 group-hover:bg-[#006d36]">
                  <span className="material-symbols-outlined text-[#006d36] group-hover:text-[#ffffff]">
                    bolt
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#001736] mb-3 group-hover:text-white">
                  Speed
                </h3>
                <p className="text-sm text-[#001736]/60 group-hover:text-white/70">
                  Time is the only non-renewable resource. We maximize every
                  second through predictive analytics.
                </p>
              </div>
              {/* <!-- Value 2 --> */}
              <div className="group p-8 bg-white rounded-xl transition-all duration-300 hover:bg-[#001736]">
                <div className="w-12 h-12 rounded-lg bg-[#006d36]/10 flex items-center justify-center mb-6 group-hover:bg-[#006d36]">
                  <span className="material-symbols-outlined text-[#006d36] group-hover:text-[#ffffff]">
                    architecture
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#001736] mb-3 group-hover:text-white">
                  Precision
                </h3>
                <p className="text-sm text-[#001736]/60 group-hover:text-white/70">
                  Logistics is a game of millimeters. Our proprietary tracking
                  ensures exactness at every node.
                </p>
              </div>
              {/* <!-- Value 3 --> */}
              <div className="group p-8 bg-white rounded-xl transition-all duration-300 hover:bg-[#001736]">
                <div className="w-12 h-12 rounded-lg bg-[#006d36]/10 flex items-center justify-center mb-6 group-hover:bg-[#006d36]">
                  <span className="material-symbols-outlined text-[#006d36] group-hover:text-[#ffffff]">
                    shield
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#001736] mb-3 group-hover:text-[#ffffff]">
                  Reliability
                </h3>
                <p className="text-sm text-[#001736]/60 group-hover:text-white/70">
                  Trust is built on consistency. We maintain a failsafe
                  redundancy across our entire network.
                </p>
              </div>
              {/* <!-- Value 4 --> */}
              <div className="group p-8 bg-white rounded-xl transition-all duration-300 hover:bg-[#001736]">
                <div className="w-12 h-12 rounded-lg bg-[#006d36]/10 flex items-center justify-center mb-6 group-hover:bg-[#006d36]">
                  <span className="material-symbols-outlined text-[#006d36] group-hover:text-[#ffffff]">
                    eco
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#001736] mb-3 group-hover:text-[#ffffff]">
                  Sustainability
                </h3>
                <p className="text-sm text-[#001736]/60 group-hover:text-[#ffffff]/70">
                  Movement shouldn't cost the Earth. We lead the industry in
                  carbon-neutral transit solutions.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- CTA Section --> */}
        <section className="py-24 bg-[#001736] overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
              width="100%"
            >
              <path d="M0 100 L100 0 L100 100 Z" fill="#006d36"></path>
            </svg>
          </div>
          <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
            <div className="bg-[#83fba5] rounded-2xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-4xl font-extrabold text-[#00743a] mb-4">
                  Ready to accelerate your supply chain?
                </h2>
                <p className="text-lg text-[#00743a]/80 max-w-lg">
                  Partner with the leaders in kinetic logistics and experience
                  the Velocity difference.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#001736] text-[#ffffff] px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-[#002b5b] transition-all">
                  Get a Quote
                </button>
                <button className="border-2 border-[#001736]/20 text-[#001736] px-8 py-4 rounded-xl font-bold tracking-wide hover:bg-[#001736]/5 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
