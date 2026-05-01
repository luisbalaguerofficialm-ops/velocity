import React, { useState } from "react";
import {
  LayoutGrid,
  Bell,
  MessageCircle,
  LogOut,
  Group,
  X,
  Truck,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const toggle = (section) =>
    setOpenSection(openSection === section ? null : section);

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        // Clear localStorage
        localStorage.removeItem("adminToken");
        localStorage.removeItem("user");

        // Redirect to login
        window.location.href = "/login";
      } else {
        alert(data.message || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Server error during logout");
    }
  };

  const NavButton = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center w-full px-3 py-2 rounded-lg ${
        location.pathname.startsWith(to)
          ? "bg-[#001b3d] text-white"
          : "hover:bg-[#064e3b] text-[#10b981]"
      }`}
      onClick={() => setMobileOpen(false)}
    >
      <Icon className="w-4 h-4 mr-3" />
      {children}
    </Link>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0  z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen bg-[#001b3d] text-white shadow-sm p-4 flex flex-col overflow-y-auto z-50 transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/login" className="flex items-center">
            <Logo />
          </Link>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[#10b981] text-white transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <div className="space-y-6 text-medium text-[#FFFFFF] font-medium">
          {/* Overview */}
          <div>
            <div class="px-6 mb-8">
              <h1 class="text-xl font-extrabold text-white tracking-widest uppercase">
                Velocity Admin
              </h1>
              <p class="text-xs text-slate-400 mt-1 uppercase tracking-tighter">
                Logistics Control
              </p>
            </div>
            <p className="text-xs text-slate-400 mb-2">OVERVIEW</p>
            <NavButton to="/admin/dashboard" icon={LayoutGrid}>
              Dashboard
            </NavButton>
            <NavButton to="/admin/create-shipment" icon={Truck}>
              Create Shipment
            </NavButton>
            <NavButton to="/admin/add-courier" icon={Group}>
              Add Courier
            </NavButton>
            <NavButton to="/admin/manage-shipments" icon={MessageCircle}>
              Manage Shipments
            </NavButton>
            <NavButton to="/admin/notifications" icon={Bell}>
              Notifications
            </NavButton>
            <NavButton to="/admin/message" icon={Plus}>
              Live Chat
            </NavButton>
            <NavButton to="/admin/view-in-fleet" icon={Truck}>
              view-in-fleet
            </NavButton>
          </div>
        </div>

        {/* Logout */}

        <div className="mt-auto pt-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-red-600 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
