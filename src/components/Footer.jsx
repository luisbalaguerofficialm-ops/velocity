import React from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 w-full py-16 border-t border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-8">
        <div className="col-span-1 md:col-span-1">
          <div className="font-manrope text-xl font-black text-white">
            <div class="flex items-center gap-3 mb-6">
              <Logo />
              <span class="text-white font-headline font-extrabold text-2xl tracking-tighter">
                Velocity Transit
              </span>
            </div>
          </div>
          <p class="text-slate-400 font-inter text-sm mb-8">
            Redefining the speed of global trade with precision engineering and
            human expertise.
          </p>
          <div class="flex gap-4">
            <span class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-emerald-600 transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                public
              </span>
            </span>
            <span class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-emerald-600 transition-colors">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                share
              </span>
            </span>
          </div>
        </div>
        <div>
          <h5 class="font-inter text-xs uppercase tracking-widest text-white font-bold mb-6">
            Services
          </h5>
          <ul class="space-y-4">
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Global Coverage
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Express Transit
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Cold Chain
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Customs Hub
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 class="font-inter text-xs uppercase tracking-widest text-white font-bold mb-6">
            Resources
          </h5>
          <ul class="space-y-4">
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                API Docs
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Shipment Tracking
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Rates &amp; Fees
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Merchant Portal
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 class="font-inter text-xs uppercase tracking-widest text-white font-bold mb-6">
            Legal
          </h5>
          <ul class="space-y-4">
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Cookie Settings
              </a>
            </li>
            <li>
              <a
                class="text-slate-400 hover:text-white transition-colors text-sm"
                href="#"
              >
                Security Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-400 font-inter text-xs uppercase tracking-widest">
          © 2026 Velocity Transit Logistics. All rights reserved.
        </p>
        <div className="flex gap-8">
          <span className="text-slate-400 text-xs uppercase tracking-widest">
            v2.4.0 High-Impact Release
          </span>
          <span className="text-emerald-400 text-xs uppercase tracking-widest font-bold">
            Status: Online
          </span>
        </div>
      </div>
    </footer>
  );
}
