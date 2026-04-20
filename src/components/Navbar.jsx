import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full">
      {/* ===== Navbar ===== */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="flex justify-between items-center h-20 px-8 max-w-[1440px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 text-2xl font-extrabold">
            <Link to="/">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoAC6BO8mU6ISV9srLNvR4LxkWtwfxrrMxhAwQt8hHkLuTr4EvkSFn6Ygoir8GKOkMf1T6laqitFyNjor2puuKfHiMky3ExaQCD8lRh8buEy_WhjdZV6czFAlb7noIjPUJyr1l57-qMGBM0L4bCD6ZM9tOHAkijQ55KrPkcTlSl6ulpPstQCUVIp7aRkv5ATT-qlKu0aSxlzcgCpmzfIfVBugvvrAQn6LDHQ_AKduQ8aw2dqo4xMN9DIVprypOmiDUdZMDvPDHFDXj"
                className="h-10"
              />
            </Link>
            <span>Velocity Transit</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/tracking"
              className="text-emerald-600 font-bold border-b-2 border-emerald-600"
            >
              Track Parcel
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-emerald-600"
            >
              Services
            </Link>
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-emerald-600"
            >
              About
            </Link>
            <Link
              to="/global-network"
              className="text-gray-600 hover:text-emerald-600"
            >
              Global Network
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* <Link
              to="/signin"
              className="text-slate-600 font-medium hover:text-emerald-600 transition-colors duration-300"
            >
              Learn More
            </Link> */}
            <Link
              to="/contact-us"
              className="bg-[#001736] text-[#ffffff] px-6 py-2.5 rounded-lg font-bold kinetic-gradient hover:scale-95 transition-transform duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
