import React, { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function NotificationHistory() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  /* ======================================================
     📡 FETCH NOTIFICATIONS
  ====================================================== */
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notifications-history", page, search],
    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/notifications", {
        params: {
          page,
          limit: 5,
          search: search.trim() || undefined,
        },
      });
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const notifications = data?.data || [];
  const stats = data?.stats || {};
  const pagination = data?.pagination || {};

  return (
    <div className="bg-[#e2fffe] text-[#002020] min-h-screen">
      <main className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* <!-- Header Section: Editorial Engine --> */}
        <section className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[#006d36] font-bold tracking-widest text-[10px] uppercase">
              Fleet Communication Ledger
            </span>
            <h1 className="text-display-sm md:text-4xl font-extrabold text-[#001736] tracking-tight">
              Notification History
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center bg-[#d7fafa] px-4 py-2 rounded-xl border border-[#c4c6d0]/10 shadow-sm">
              <span className="material-symbols-outlined text-[#001736] text-sm mr-2">
                search
              </span>
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1); // Reset to page 1 on new search
                }}
                className="bg-transparent border-none focus:ring-0 text-sm font-medium text-[#001736] placeholder:text-slate-400 w-64"
                placeholder="Search ..."
                type="text"
              />
            </div>
            <button className="bg-[#001736] text-[#ffffff] px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-[#002b5b] transition-all ease-out scale-98 active:scale-95 font-semibold text-sm">
              <span className="material-symbols-outlined text-sm">
                filter_list
              </span>
              Refine View
            </button>
          </div>
        </section>
        {/* <!-- Metrics Overview: Bento Style --> */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Stat title="Total" value={stats.total} />
          <Stat title="Delivered" value={stats.delivered} />
          <Stat title="Pending" value={stats.pending} />
          <Stat title="Failed" value={stats.failed} />
        </section>
        {/* <!-- Main Data Table: Kinetic Precision --> */}
        <div className="bg-[#ffffff] rounded-2xl shadow-sm overflow-hidden border border-[#c4c6d0]/10">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low">
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20">
                    Notification Title
                  </th>
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20">
                    Channel
                  </th>
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20">
                    Audience Target
                  </th>
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20 text-center">
                    Sent Count
                  </th>
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20">
                    Timestamp
                  </th>
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20">
                    Created By
                  </th>
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20">
                    Status
                  </th>
                  <th className="px-6 py-5 text-label-sm font-bold text-[#001736] uppercase tracking-widest border-b border-[#c4c6d0]/20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c4c6d0]/10">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-10 text-center animate-pulse font-bold text-slate-400"
                    >
                      Synchronizing Ledger...
                    </td>
                  </tr>
                ) : notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <tr
                      key={notification._id}
                      onClick={() =>
                        navigate(`/admin/message/${notification._id}`)
                      }
                      className="hover:bg-[#d2f5f4]/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#001736]">
                            {notification.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-[#001736] text-white text-[10px] font-bold rounded uppercase">
                            {notification.channel || "email"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-[#002020]">
                          {notification.targetAudience ||
                            notification.receiverEmail}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-extrabold text-[#001736]">
                          {notification.sentCount || 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-[#001736]">
                          {new Date(
                            notification.createdAt,
                          ).toLocaleDateString()}
                          <span className="block text-[10px] opacity-50">
                            {new Date(
                              notification.createdAt,
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <span class="text-sm font-bold text-[#001736]">
                          {notification.createdBy || "System Auto"}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-2 text-[#006d36]">
                          <span class="text-xs font-bold uppercase tracking-wider">
                            <StatusBadge status={notification.status} />
                          </span>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <div>
                          <button class="text-[#001736] hover:text-[#00743a] transition-colors">
                            <span class="material-symbols-outlined">
                              more_vert
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-10 text-center text-slate-400 italic"
                    >
                      No transmission records found in this sector.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* <!-- Pagination / Footer Logic --> */}
          <div class="bg-[#d7fafa] px-8 py-4 flex justify-between items-center border-t border-[#c4c6d0]/10">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </button>

            <span>
              Page {pagination.currentPage} / {pagination.totalPages}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
        {/* <!-- System Analytics: Kinetic Map Overlay Style --> */}
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-[#c6e9e9]/30 rounded-2xl p-6 relative overflow-hidden h-64 border border-[#c4c6d0]/20">
            <div class="relative z-10 space-y-2">
              <h3 class="text-lg font-bold text-[#001736]">
                Transmission Heatmap
              </h3>
              <p class="text-xs text-slate-500 max-w-xs">
                Real-time visualization of geographic notification density
                across the primary transit corridors.
              </p>
            </div>
            <div class="absolute inset-0 z-0 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <img
                alt="Logistics map"
                class="w-full h-full object-cover"
                data-alt="highly detailed digital topographic map of North America with blue and green data visualization overlays showing logistics corridors"
                data-location="North America"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe1Be3iGhCOmyB_ny-k8QNGrSnc8tTHh3GgpVFUMcPFZhymRmwJtQi3xD9pYFdTeJY4ycls2YlVIGglUL8QKAuoX3kFwofCp5gq5MoqJUGqJw4jFhFY16tSGGzEh8kJ3m1FI1JewE6rNk2Q8XS4kY4ZXm6ukjITB-HDXdkSb5MCfP0MF7XW4dAJTb1aXs8Bp4vLqgTt31sDGXmGlcKHJRRg4KA2f0jT0ZRchd9rdTOUttTPZOOEG8ao-X1gwtcasfThZnAhA7u710B"
              />
            </div>
            <div class="absolute bottom-6 right-6 z-20">
              <div class="bg-[#e2fffe]/80 backdrop-blur-lg p-4 rounded-xl shadow-xl border border-white/20">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-[#006d36]"></div>
                  <span class="text-xs font-bold text-[#001736] tracking-tight">
                    Active Transmissions (1.2k)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-[#001736] text-[#ffffff] rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative">
            <div class="space-y-4">
              <h3 class="text-lg font-bold tracking-tight">Audit Log Export</h3>
              <p class="text-xs text-[#ffffff]/70 leading-relaxed">
                Generate a cryptographically signed CSV or PDF manifest of all
                notifications for regulatory compliance.
              </p>
            </div>
            <div class="mt-8">
              <button class="w-full bg-[#006d36] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#005227] transition-all">
                <span class="material-symbols-outlined text-sm">download</span>
                Export Full Ledger
              </button>
            </div>
            {/* <!-- Abstract Texture --> */}
            <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-[#002b5b] rounded-full blur-3xl opacity-50"></div>
          </div>
        </section>
      </main>
      {/* <!-- Contextual Information Overlay --> */}
      <footer class="mt-12 p-8 border-t border-[#c4c6d0]/10 text-center">
        <div class="flex justify-center items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          <span>Secured Terminal</span>
          <span class="w-1 h-1 bg-slate-400 rounded-full"></span>
          <span>Version 4.9.2-Precision</span>
          <span class="w-1 h-1 bg-slate-400 rounded-full"></span>
          <span>Kinetic Precision Design System</span>
        </div>
      </footer>
      {/* DELETE MODAL */}
      {/* {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <h2 className="text-xl font-extrabold text-[#001736] mb-3">
              Delete Conversation
            </h2>

            <p className="text-sm text-[#43474f] leading-relaxed">
              Are you sure you want to delete this conversation? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedConversation(null);
                }}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#001736] font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteConversation}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
function Stat({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-xs uppercase text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value || 0}</h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    delivered: "text-green-600",
    pending: "text-yellow-600",
    failed: "text-red-600",
  };

  return (
    <span className={`font-bold ${colors[status]}`}>{status || "unknown"}</span>
  );
}
