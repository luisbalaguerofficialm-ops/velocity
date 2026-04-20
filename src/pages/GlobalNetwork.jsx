import React from "react";

export default function GlobalNetwork() {
  return (
    <div className="bg-[#e2fffe] text-[#002020] font-body selection:bg-[#83fba5] selection:text-[#00743a]">
      <main className="pt-20">
        {/* <!-- Hero Section: Kinetic Map Overlay --> */}
        <section className="relative h-[819px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-[#001736] z-0">
            <img
              className="w-full h-full object-cover opacity-60 mix-blend-screen"
              data-alt="Abstract 3D topographic map with glowing emerald energy lines connecting major global cities on a dark midnight navy blue background"
              data-location="Global"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF9Ss4wHsKQdj1Q5zd-_UyP5OdjNBJiBVD3etH4xKPOkkTw_gFR36FFDR3XSOQSBIEeTDQuE251QyLXYmu8POjuhhfq8dwr3CeGXY7Kr9Mq5h_lmw5YKkS_UvEDs3P3HgZ2f1FYiOI9Sn9RNpYMm3cgL9rJXFwF8EzXGKXmnZHmB1oEJBko81UXIb-XSiam_gYoRGu8-q8Uzpq89sP3rFIfWWlIDkJSi8e6AfbL6LTqpiheZ9u0oNK-XzgDvLjje7pXINhCeZQ1cZZ"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 pointer-events-none">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#83fba5] text-[#00743a] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                Aerodynamic Archive
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#83fba5] tracking-tighter leading-[0.9] mb-6">
                Velocity <br />
                <span className="text-[#006d36] italic">Transit</span> Network
              </h1>
              <p className="text-[#ffffff] text-lg md:text-xl font-light max-w-xl leading-relaxed">
                A precision-engineered infrastructure spanning the globe,
                delivering reliability at the speed of thought.
              </p>
            </div>
          </div>
          {/* <!-- Floating Data Panel --> */}
          <div className="absolute bottom-10 bg-[#e2fffe] right-8 md:right-20 z-20 glass-panel p-8 rounded-xl shadow-2xl max-w-sm pointer-events-auto border-l-4 border-[#006d36]">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="material-symbols-outlined text-4xl text-[#001736]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                speed
              </span>
              <h3 className="font-bold text-[#001736] tracking-tight">
                Active Node Monitoring
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs uppercase tracking-widest text-[#747780]">
                  Real-time Latency
                </span>
                <span className="text-sm font-mono font-bold text-[#006d36]">
                  0.02ms
                </span>
              </div>
              <div className="w-full bg-surface-container h-1 rounded-full overflow-hidden">
                <div className="bg-[#006d36] h-full w-[85%]"></div>
              </div>
              <p className="text-xs text-[#43474f] font-light">
                Precision routing active across 240+ global transit hubs with
                automated failover protocol.
              </p>
            </div>
          </div>
        </section>
        {/* <!-- Network Statistics: Bento Grid --> */}
        <section className="px-8 md:px-20 py-24 bg-[#d7fafa]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* <!-- Stat Card 1 --> */}
              <div className="bg-[#ffffff] p-10 rounded-xl relative overflow-hidden group hover:bg-[#ccefee] transition-colors duration-300">
                <div className="relative z-10">
                  <span className="text-[#006d36] text-sm font-bold tracking-[0.2em] uppercase mb-2 block">
                    Reach
                  </span>
                  <div className="text-6xl font-black text-[#001736] tracking-tighter mb-2">
                    6
                  </div>
                  <div className="text-xl font-light text-[#43474f] tracking-tight">
                    Continents covered by dedicated fleet
                  </div>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-[#006d36]/5 group-hover:text-[#006d36]/10 transition-colors">
                  public
                </span>
              </div>
              {/* <!-- Stat Card 2 --> */}
              <div className="bg-[#ffffff] p-10 rounded-xl relative overflow-hidden group hover:bg-[#ccefee] transition-colors duration-300">
                <div className="relative z-10">
                  <span className="text-[#006d36] text-sm font-bold tracking-[0.2em] uppercase mb-2 block">
                    Infrastructure
                  </span>
                  <div className="text-6xl font-black text-[#001736] tracking-tighter mb-2">
                    240+
                  </div>
                  <div className="text-xl font-light text-[#43474f] tracking-tight">
                    Strategic Hubs globally integrated
                  </div>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-8xl text-[#006d36]/5 group-hover:text-[#006d36]/10 transition-colors">
                  location_on
                </span>
              </div>
            </div>
            {/* <!-- Featured Large Stat --> */}
            <div className="kinetic-gradient p-12 rounded-xl text-[#ffffff] flex flex-col justify-between">
              <div>
                <span className="text-[#83fba5] text-sm font-bold tracking-[0.2em] uppercase mb-6 block">
                  Uptime SLA
                </span>
                <div className="text-7xl font-black tracking-tighter mb-4 text-white">
                  99.9%
                </div>
                <p className="text-[#7594ca] text-lg font-light leading-snug">
                  Guaranteed reliability through our Kinetic AI routing engine.
                </p>
              </div>
              <div className="pt-8 border-t border-white/10 mt-8">
                <div className="flex items-center gap-2 text-[#83fba5]">
                  <span className="material-symbols-outlined text-sm">
                    verified_user
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Precision Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Regional Hubs Section --> */}
        <section className="px-8 md:px-20 py-24 bg-[#e2fffe]">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <h2 className="text-4xl font-extrabold text-[#001736] tracking-tighter">
              Regional Hubs
            </h2>
            <h2 className="text-4xl font-extrabold text-[#001736] tracking-tighter">
              Regional Hubs
            </h2>
            <div className="h-[1px] flex-grow bg-[#c4c6d0]/30 mx-8 hidden md:block"></div>
            <p className="text-[#43474f] max-w-sm text-sm font-light">
              Deep integration with local transit authorities in high-density
              economic corridors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* <!-- North America --> */}
            <div className="space-y-8">
              <div className="border-l-2 border-[#006d36] pl-6">
                <h3 className="text-xl font-bold text-[#001736] mb-2">
                  North America
                </h3>
                <p className="text-xs text-[#747780] uppercase tracking-widest font-semibold">
                  Americas Command Center
                </p>
              </div>
              <ul className="space-y-6">
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    New York (JFK/EWR)
                  </div>
                  <div className="text-sm text-[#c4c6d0] font-light">
                    Global Gateway &amp; Air Hub
                  </div>
                </li>
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    Los Angeles (LAX)
                  </div>
                  <div className="text-sm text-[#c4c6d0] font-light">
                    Trans-Pacific Primary Node
                  </div>
                </li>
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    Chicago (ORD)
                  </div>
                  <div className="text-sm text-[#c4c6d0] font-light">
                    Central Logistics &amp; Rail Intermodal
                  </div>
                </li>
              </ul>
            </div>
            {/* <!-- Europe --> */}
            <div className="space-y-8">
              <div className="border-l-2 border-[#006d36] pl-6">
                <h3 className="text-xl font-bold text-[#001736] mb-2">
                  Europe
                </h3>
                <p className="text-xs text-[#747780] uppercase tracking-widest font-semibold">
                  Euro-Zone Connectivity
                </p>
              </div>
              <ul className="space-y-6">
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    Frankfurt (FRA)
                  </div>
                  <div className="text-sm text-[#43474f] font-light">
                    European Air Cargo Core
                  </div>
                </li>
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    Rotterdam (RTM)
                  </div>
                  <div className="text-sm text-[#43474f] font-light">
                    Autonomous Port Systems
                  </div>
                </li>
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    London (LHR)
                  </div>
                  <div className="text-sm text-[#43474f] font-light">
                    High-Velocity Courier Node
                  </div>
                </li>
              </ul>
            </div>
            {/* <!-- Asia-Pacific --> */}
            <div className="space-y-8">
              <div className="border-l-2 border-[#006d36] pl-6">
                <h3 className="text-xl font-bold text-[#001736] mb-2">
                  Asia-Pacific
                </h3>
                <p className="text-xs text-[#747780] uppercase tracking-widest font-semibold">
                  APAC Velocity Grid
                </p>
              </div>
              <ul className="space-y-6">
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    Singapore (SIN)
                  </div>
                  <div className="text-sm text-[#43474f] font-light">
                    Global Multimodal Hub
                  </div>
                </li>
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    Hong Kong (HKG)
                  </div>
                  <div className="text-sm text-[#43474f] font-light">
                    E-commerce Distribution Hub
                  </div>
                </li>
                <li className="group cursor-pointer">
                  <div className="text-lg font-bold text-[#001736] group-hover:text-[#006d36] transition-colors">
                    Tokyo (HND)
                  </div>
                  <div className="text-sm text-[#43474f] font-light">
                    Precision Tech Transit Center
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* <!-- Velocity Tracker Visual --> */}
        <section className="px-8 md:px-20 py-24 bg-[#bee1e0]">
          <div className="bg-[#ffffff] p-12 rounded-xl shadow-sm border-l-4 border-[#006d36]">
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#006d36] mb-12">
              Dynamic Transit Flow
            </h4>
            <div className="relative flex items-center justify-between w-full h-1 bg-[#747780]/30">
              {/* <!-- Point A --> */}
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#006d36] ring-8 ring-[#83fba5]"></div>
                <span className="absolute top-8 font-bold text-[#001736]">
                  Shanghai
                </span>
                <span className="absolute -top-8 text-[10px] text-[#747780] font-bold">
                  DEPARTED
                </span>
              </div>
              {/* <!-- Leg 1 --> */}
              <div className="h-1 bg-[#006d36] w-1/4"></div>
              {/* <!-- Point B --> */}
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#006d36] ring-8 ring-[#83fba5]"></div>
                <span className="absolute top-8 font-bold text-[#001736]">
                  Dubai
                </span>
                <span className="absolute -top-8 text-[10px] text-[#747780] font-bold uppercase">
                  In-Transit
                </span>
              </div>
              {/* <!-- Leg 2 (Dashed) --> */}
              <div className="h-1 border-t-2 border-dashed border-[#c4c6d0] w-1/4"></div>
              {/* <!-- Point C --> */}
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#c6e9e9] border-2 border-[#c4c6d0]"></div>
                <span className="absolute top-8 font-bold text-[#43474f]">
                  Munich
                </span>
                <span className="absolute -top-8 text-[10px] text-[#747780] font-bold uppercase">
                  Pending
                </span>
              </div>
              {/* <!-- Leg 3 --> */}
              <div className="h-1 border-t-2 border-dashed border-[#c4c6d0] w-1/4"></div>
              {/* <!-- Point D --> */}
              <div className="relative flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-[#ffffff] border-2 border-[#c4c6d0]"></div>
                <span className="absolute top-8 font-bold text-[#43474f]">
                  New York
                </span>
                <span className="absolute -top-8 text-[10px] text-[#747780] font-bold uppercase">
                  Destination
                </span>
              </div>
            </div>
            <div className="mt-24 flex flex-col md:flex-row gap-8 justify-between items-center bg-[#d2f5f4] p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <span
                  className="material-symbols-outlined text-4xl text-[#001736]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  speed
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#006d36]">
                    Kinetic Status
                  </div>
                  <div className="text-xl font-bold text-[#001736]">
                    Optimal Velocity Reached
                  </div>
                </div>
              </div>
              <button className="bg-[#001736] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#002b5b] transition-colors">
                View Live Network Map
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
