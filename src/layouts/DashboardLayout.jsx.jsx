import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

import AdminTopbar from "../components/AdminTopbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#e2fffe]">
      {/* Sidebar (fixed width) */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminTopbar />

        <main className="flex-1 p-8 overflow-auto">
          <div className="rounded-lg shadow-sm p-6 bg-white h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
