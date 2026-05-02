import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";

export default function AdminTopbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const notifRef = useRef();
  const profileRef = useRef();

  /* ================= FETCH ADMIN ================= */
  const { data: admin } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/api/v1/admin/me");
        return res.data.data;
      } catch (err) {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  /* ================= FETCH NOTIFICATIONS ================= */
  const { data: notificationData } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/notifications");
      return res.data;
    },
  });

  const notifications = notificationData?.data || [];
  const unreadCount = notificationData?.unreadCount || 0;

  /* ================= SEARCH ================= */
  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/admin/track/${search}`);
      setSearch("");
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      const res = await axiosClient.post("/api/v1/admin/logout");

      if (res.data.success) {
        localStorage.removeItem("accessToken");

        toast.success("Logged out successfully");

        queryClient.clear();

        navigate("/", { replace: true });
      } else {
        toast.error(res.data.message || "Logout failed");
      }
    } catch (err) {
      toast.error("Server error during logout");
    }
  };

  /* ================= CLOSE DROPDOWNS ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-2 z-40 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center h-27 rounded-xl px-8 w-344 mx-auto text-slate-500 border-b border-[#c4c6d0]/30">
      {/* ================= SEARCH ================= */}
      <div className="flex items-center gap-4">
        <div className="bg-[#e7e8e9] px-3 py-1.5 rounded flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent border-none focus:ring-0 text-sm w-64"
            placeholder="Track shipment or courier..."
          />
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-6">
        {/* 🔔 NOTIFICATIONS */}
        <div className="relative" ref={notifRef}>
          <div
            onClick={() => setShowNotif(!showNotif)}
            className="relative cursor-pointer hover:bg-slate-50 p-2 rounded"
          >
            <span className="material-symbols-outlined">notifications</span>

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </div>

          {/* 🔽 DROPDOWN */}
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl p-4 z-50">
              <h3 className="font-bold text-sm mb-3">Notifications</h3>

              {notifications.length === 0 ? (
                <p className="text-xs text-gray-400">No notifications</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notifications.slice(0, 5).map((n) => (
                    <div
                      key={n._id}
                      className="p-2 rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/admin/message/${n._id}`)}
                    >
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {n.message}
                      </p>

                      {n.unreadCount > 0 && (
                        <span className="text-[10px] text-red-500 font-bold">
                          {n.unreadCount} new
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => navigate("/admin/Notification-History")}
                className="mt-3 text-xs text-blue-600 font-bold"
              >
                View all
              </button>
            </div>
          )}
        </div>

        {/* 👤 PROFILE */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 pl-4 border-l cursor-pointer"
          >
            <div className="text-right">
              <p className="text-sm font-bold text-[#002B5B]">
                {admin?.name || "Loading..."}
              </p>
              <p className="text-xs text-slate-500">{admin?.role || "Admin"}</p>
            </div>

            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-[#10b981]"
              src={
                admin?.profileImage || "https://ui-avatars.com/api/?name=Admin"
              }
              alt="profile"
            />
          </div>

          {/* 🔽 PROFILE DROPDOWN */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-3">
              <button
                onClick={() => navigate("/admin/admin-profile")}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setShowProfile(false); // 👈 close dropdown first
                  setShowLogoutModal(true);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-50 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#e2fffe] backdrop-blur-sm">
          <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in">
            <h2 className="text-lg font-bold text-[#001b3d]">Confirm Logout</h2>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to logout? You will need to sign in again to
              access your account.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              {/* Cancel */}
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={async () => {
                  setShowLogoutModal(false);
                  await handleLogout();
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
