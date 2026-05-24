import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../components/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 flex flex-row items-center rounded-lg font-medium transition-all duration-200
     ${
       isActive
         ? "text-green-600 bg-green-100"
         : "text-gray-600 hover:text-green-600 hover:bg-green-50"
     }`;

  return (
    <header className="w-full">
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-[1440px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl font-extrabold">
            <NavLink to="/" className="flex items-center gap-2">
              <logo />
              <span className="truncate max-w-[140px] md:max-w-none">
                Velocity Transit
              </span>
            </NavLink>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/tracking" className={linkClass}>
              Track Parcel
            </NavLink>
            <NavLink to="/services" className={linkClass}>
              Services
            </NavLink>
            <NavLink to="/about-us" className={linkClass}>
              About
            </NavLink>
            <NavLink to="/global-network" className={linkClass}>
              Global Network
            </NavLink>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <NavLink
                to="/contact-us"
                className="bg-[#001736] text-white px-6 py-2.5 rounded-lg font-bold kinetic-gradient hover:scale-95 transition-transform duration-200"
              >
                Contact Us
              </NavLink>
            </div>
            {/* <NavLink
              to="/payment-security"
              className="border text-[#001736] border-green-300 px-6 py-2.5 rounded-lg font-bold  hover:scale-95 transition-transform duration-200"
            >
              Payment
            </NavLink> */}
          </div>

          {/* Mobile Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden bg-white shadow-lg px-6 py-6 space-y-2">
            <NavLink
              to="/tracking"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Track Parcel
            </NavLink>

            <NavLink
              to="/services"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Services
            </NavLink>

            <NavLink
              to="/about-us"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/global-network"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Global Network
            </NavLink>

            <NavLink
              to="/contact-us"
              onClick={() => setOpen(false)}
              className="block bg-[#001736] text-white text-center px-6 py-3 rounded-lg font-bold mt-4"
            >
              Contact Us
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
}
