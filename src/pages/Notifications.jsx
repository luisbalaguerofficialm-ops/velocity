import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosClient from "../utils/axiosClient";

export default function Notifications() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    receiverEmail: "",
    title: "",
    message: "",
    channel: "email",
  });

  const handleNotificationHistory = () => {
    navigate("/admin/Notification-History");
  };

  // Fetch stats and recent activity
  const { data: activityData } = useQuery({
    queryKey: ["notifications-activity"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/notifications");
      return res.data;
    },
  });

  const recentLogs = activityData?.data?.slice(0, 5) || [];
  const stats = activityData?.stats || {};

  // React Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => axiosClient.post("/api/v1/notifications/send", data),
    onSuccess: () => {
      toast.success("Notification sent successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications-activity"] });
      setFormData({
        receiverEmail: "",
        title: "",
        message: "",
        channel: "email",
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.receiverEmail || !formData.title || !formData.message) {
      return toast.error("All fields are required");
    }

    mutate(formData);
  };

  return (
    <div className="bg-[#e2fffe] font-body text-[#002020]">
      {/* <!-- Full Width Workspace --> */}
      <main className="mim-h-screen mx-auto px-1 py-7 space-y-24">
        {/* <!-- Brand & Page Anchor --> */}
        <header className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#001736] flex items-center justify-center rounded-2xl">
                <span
                  className="material-symbols-outlined text-white text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  speed
                </span>
              </div>
              <div>
                <span className="text-3xl font-extrabold tracking-tighter text-[#001736] uppercase leading-none block">
                  Velocity Transit
                </span>
                <span className="text-[0.625rem] font-bold tracking-[0.3em] text-[#006d36] uppercase">
                  Enterprise Dispatch
                </span>
              </div>
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight text-[#001736]">
              Send Notification
            </h1>
            <p className="text-[#43474f] max-w-lg font-medium opacity-80 pt-2">
              Communicate vital updates across the fleet with precision delivery
              and real-time tracking.
            </p>
          </div>
          <div className="flex gap-4 mb-2">
            <button className="px-6 py-4 bg-[#ccefee] rounded-2xl font-bold text-[#001736] flex items-center gap-2 transition-all hover:bg-[#c6e9e9]">
              <span className="material-symbols-outlined text-[20px]">
                help_outline
              </span>
              Protocol Guide
            </button>
            <button className="px-6 py-4 bg-[#001736] text-white rounded-2xl font-bold flex items-center gap-2 transition-all hover:opacity-90">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Draft
            </button>
          </div>
        </header>
        {/* <!-- Navigation Tabs (Preserved) --> */}
        <nav className="flex gap-2 mb-12 p-1.5 bg-[#d7fafa] w-fit rounded-2xl border border-[#c4c6d0]/20">
          <button className="px-10 py-3.5 rounded-xl font-bold transition-all bg-[#43474f] text-white shadow-lg">
            Send Notification
          </button>
          <button
            onClick={handleNotificationHistory}
            className="px-10 py-3.5 rounded-xl font-bold transition-all text-[#43474f] hover:bg-[#ccefee]"
          >
            Notification History
          </button>
        </nav>
        <div className="grid grid-cols-12 gap-12">
          {/* <!-- Left: Focused Compose Card --> */}
          <div className="col-span-8">
            <section className="bg-white rounded-[40px] p-12 shadow-[0_32px_80px_-24px_rgba(0,32,32,0.08)] relative overflow-hidden">
              {/* <!-- Subtle Geometric Accent --> */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#006d36]/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <span className="material-symbols-outlined text-[#006d36] text-4xl">
                    send_and_archive
                  </span>
                  <h2 className="text-3xl font-bold text-[#001736]">
                    Compose Dispatch
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* <!-- Receiver Email Field (Updated from User ID) --> */}
                  <div className="group">
                    <label className="block text-[0.75rem] uppercase font-extrabold tracking-[0.15em] text-[#43474f] mb-4 px-1">
                      Receiver Email
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#747780]">
                        alternate_email
                      </span>
                      <input
                        className="w-full pl-14 pr-6 py-5 bg-[#d7fafa] border-none rounded-2xl focus:ring-2 focus:ring-[#006d36] transition-all text-[#001736] font-bold placeholder:text-[#c4c6d0] text-lg"
                        placeholder="driver.id@velocity.com"
                        type="email"
                        name="receiverEmail"
                        value={formData.receiverEmail}
                        onChange={handleChange}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[96%] h-[2px] bg-[#c4c6d0] opacity-20 group-focus-within:bg-[#006d36] group-focus-within:opacity-100 transition-all"></div>
                    </div>
                  </div>
                  {/* <!-- Notification Title --> */}
                  <div className="group">
                    <label className="block text-[0.75rem] uppercase font-extrabold tracking-[0.15em] text-[#43474f] mb-4 px-1">
                      Message Title
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-[#747780]">
                        title
                      </span>
                      <input
                        className="w-full pl-14 pr-6 py-5 bg-[#d7fafa] border-none rounded-2xl focus:ring-2 focus:ring-[#006d36] transition-all text-[#001736] font-bold placeholder:text-[#c4c6d0] text-lg"
                        placeholder="Route Adjustment: Zone 4B"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                      />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[96%] h-[2px] bg-[#c4c6d0] opacity-20 group-focus-within:bg-[#006d36] group-focus-within:opacity-100 transition-all"></div>
                    </div>
                  </div>
                  {/* <!-- Channel Selection --> */}
                  <div>
                    <label className="block text-[0.75rem] uppercase font-extrabold tracking-[0.15em] text-[#43474f] mb-5 px-1">
                      Delivery Channel
                    </label>
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          setFormData({ ...formData, channel: "in_app" })
                        }
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold border-2 border-transparent shadow-sm transition-all ${
                          formData.channel === "in_app"
                            ? "bg-[#83fba5] text-[#00743a]"
                            : "bg-[#c6e9e9]/50 text-[#43474f] hover:bg-[#c6e9e9]"
                        }`}
                        type="button"
                      >
                        <span
                          className="material-symbols-outlined text-[22px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          chat_bubble
                        </span>
                        In-App
                      </button>

                      <button
                        onClick={() =>
                          setFormData({ ...formData, channel: "email" })
                        }
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold border-2 border-transparent shadow-sm transition-all ${
                          formData.channel === "email"
                            ? "bg-[#83fba5] text-[#00743a]"
                            : "bg-[#c6e9e9]/50 text-[#43474f] hover:bg-[#c6e9e9]"
                        }`}
                        type="button"
                      >
                        <span
                          className="material-symbols-outlined text-[22px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          alternate_email
                        </span>
                        email
                      </button>

                      <button
                        onClick={() =>
                          setFormData({ ...formData, channel: "sms" })
                        }
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold border-2 border-transparent shadow-sm transition-all ${
                          formData.channel === "sms"
                            ? "bg-[#83fba5] text-[#00743a]"
                            : "bg-[#c6e9e9]/50 text-[#43474f] hover:bg-[#c6e9e9]"
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[22px]">
                          sms
                        </span>
                        SMS Alert
                      </button>
                      <button
                        onClick={() =>
                          setFormData({ ...formData, channel: "push" })
                        }
                        className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold border-2 border-transparent shadow-sm transition-all ${
                          formData.channel === "push"
                            ? "bg-[#83fba5] text-[#00743a]"
                            : "bg-[#c6e9e9]/50 text-[#43474f] hover:bg-[#c6e9e9]"
                        }`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[22px]">
                          notifications_active
                        </span>
                        Push Notify
                      </button>
                    </div>
                  </div>
                  {/* <!-- Message Content --> */}
                  <div className="group">
                    <label className="block text-[0.75rem] uppercase font-extrabold tracking-[0.15em] text-[#43474f] mb-4 px-1">
                      Message Content
                    </label>
                    <textarea
                      className="w-full p-8 bg-[#d7fafa] border-none rounded-[32px] focus:ring-2 focus:ring-[#006d36] transition-all text-[#001736] font-medium placeholder:text-[#c4c6d0] resize-none text-lg leading-relaxed"
                      placeholder="Detailed instructions for the driver or logistical update..."
                      rows="6"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {/* <!-- Actions --> */}
                  <div className="flex items-center justify-between pt-6">
                    <div className="flex gap-3">
                      <button
                        className="p-5 rounded-2xl text-[#747780] hover:bg-[#d2f5f4] hover:text-[#001736] transition-all"
                        title="Attach Files"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-2xl">
                          attach_file
                        </span>
                      </button>
                      <button
                        className="p-5 rounded-2xl text-[#747780] hover:bg-[#d2f5f4] hover:text-[#001736] transition-all"
                        title="Schedule Message"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-2xl">
                          schedule
                        </span>
                      </button>
                    </div>
                    {/* <!-- Primary Action: Emerald Green Button --> */}
                    <button
                      className="px-14 py-5 bg-[#006d36] text-white hover:bg-[#006d36]/60 rounded-[20px] text-lg font-extrabold flex items-center gap-4 emerald-swell transition-all shadow-xl"
                      type="submit"
                      disabled={isPending}
                    >
                      {isPending ? "Sending..." : "Send Message"}
                      <span className="material-symbols-outlined text-[24px]">
                        rocket_launch
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
          {/* <!-- Right: Secondary Contextual Sidebar --> */}
          <div className="col-span-4 space-y-12">
            {/* <!-- Status Bento --> */}
            <div className="space-y-6">
              <div className="bg-[#001736] text-white p-10 rounded-[40px] kinetic-gradient shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <span className="material-symbols-outlined text-[#83fba5] text-3xl">
                    outbox
                  </span>
                  <span className="text-[0.6875rem] font-extrabold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    Active Queue
                  </span>
                </div>
                <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-2">
                  Total Dispatches
                </p>
                <h3 className="text-5xl font-extrabold tracking-tighter">
                  {stats.total || 0}
                </h3>
              </div>
              <div className="bg-[#83fba5] p-10 rounded-[40px] shadow-lg">
                <div className="flex justify-between items-start mb-8 text-[#00743a]">
                  <span className="material-symbols-outlined text-3xl">
                    check_circle
                  </span>
                  <span className="text-[0.6875rem] font-extrabold uppercase tracking-widest bg-black/5 px-4 py-1.5 rounded-full">
                    Success Rate
                  </span>
                </div>
                <p className="text-[#00743a]/60 font-bold text-xs uppercase tracking-widest mb-2">
                  Delivered Today
                </p>
                <h3 className="text-5xl font-extrabold tracking-tighter text-[#00743a]">
                  {stats.delivered || 0}
                </h3>
              </div>
            </div>
            {/* <!-- Template Snippets --> */}
            <section>
              <div className="flex justify-between items-center mb-8 px-2">
                <h3 className="text-2xl font-extrabold text-[#001736]">
                  Quick Templates
                </h3>
                <button className="text-[#006d36] font-extrabold text-sm hover:underline tracking-tight">
                  Manage All
                </button>
              </div>
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-[32px] border-2 border-transparent hover:border-[#006d36] transition-all cursor-pointer group shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-extrabold text-[#001736] text-lg">
                      Weather Delay
                    </h4>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 bg-[#d2f5f4] rounded-xl text-[#001736] hover:text-[#006d36]">
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#43474f] line-clamp-2 leading-relaxed font-medium">
                    "Attention Drivers: Severe weather alert in Northern Region.
                    Please adhere to reduced speed protocols..."
                  </p>
                </div>
                <div className="p-8 bg-[#43474f] rounded-[32px] border-2 border-transparent hover:border-[#006d36] transition-all cursor-pointer group shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-extrabold text-[#001736] text-lg">
                      Fuel Stop Re-route
                    </h4>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-2.5 bg-[#d2f5f4] rounded-xl text-[#001736] hover:text-[#006d36]">
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#43474f] line-clamp-2 leading-relaxed font-medium">
                    "Due to maintenance at Station 7, please utilize Station 12
                    for all refueling operations..."
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/* <!-- Recent Logs (Preserved) --> */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-6">
              <h2 className="text-4xl font-extrabold text-[#001736] tracking-tight">
                Recent Activity
              </h2>
              <span className="px-6 py-2 bg-[#001736] text-white font-bold text-xs rounded-full uppercase tracking-widest">
                Last 24 Hours
              </span>
            </div>
            <div className="relative">
              <input
                className="pl-12 pr-8 py-4 bg-white  border-none rounded-2xl text-sm font-bold w-80 shadow-sm focus:ring-2 focus:ring-[#006d36] transition-all"
                placeholder="Search logs..."
                type="text"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#747780] text-[22px]">
                search
              </span>
            </div>
          </div>
          <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-[#c4c6d0]/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#d7fafa]/30 border-b border-[#c4c6d0]/10">
                  <th className="px-10 py-8 text-[0.75rem] font-extrabold text-[#747780] uppercase tracking-[0.2em]">
                    Dispatch Title
                  </th>
                  <th className="px-10 py-8 text-[0.75rem] font-extrabold text-[#747780] uppercase tracking-[0.2em]">
                    Channel
                  </th>
                  <th className="px-10 py-8 text-[0.75rem] font-extrabold text-[#747780] uppercase tracking-[0.2em]">
                    Target Email
                  </th>
                  <th className="px-10 py-8 text-[0.75rem] font-extrabold text-[#747780] uppercase tracking-[0.2em]">
                    Status
                  </th>
                  <th className="px-10 py-8 text-[0.75rem] font-extrabold text-[#747780] uppercase tracking-[0.2em] text-right">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d7fafa]">
                <tr className="group hover:bg-[#d7fafa]/20 transition-colors">
                  <td className="px-10 py-8">
                    <span className="font-extrabold text-[#001736] block text-lg mb-1">
                      Maintenance Alert: Truck #402
                    </span>
                    <span className="text-xs font-bold text-[#43474f]/70 uppercase tracking-wider">
                      System Generated Protocol
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-[#006d36]">
                        mail
                      </span>
                      <span className="text-sm font-bold text-[#001736]">
                        In-App
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-bold font-mono text-[#43474f]">
                      m.rodriguez@velocity.com
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 bg-[#83fba5] text-[#00743a] text-[0.625rem] font-extrabold uppercase tracking-widest rounded-full">
                      Delivered
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <span className="text-sm font-extrabold text-[#001736]">
                      14:22 PM
                    </span>
                    <span className="text-[0.625rem] block text-[#747780] font-extrabold uppercase mt-1">
                      Oct 24, 2023
                    </span>
                  </td>
                </tr>
                <tr className="group hover:bg-[#d7fafa]/20 transition-colors">
                  <td className="px-10 py-8">
                    <span className="font-extrabold text-[#001736] block text-lg mb-1">
                      Emergency Reroute - Highway 101
                    </span>
                    <span className="text-xs font-bold text-[#43474f]/70 uppercase tracking-wider">
                      Manual Dispatch
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px] text-[#001736]">
                        sms
                      </span>
                      <span className="text-sm font-bold text-[#001736]">
                        SMS
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-sm font-bold font-mono text-[#43474f]">
                      broadcast.west@velocity.com
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-1.5 bg-[#c6e9e9] text-[#43474f] text-[0.625rem] font-extrabold uppercase tracking-widest rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <span className="text-sm font-extrabold text-[#001736]">
                      14:15 PM
                    </span>
                    <span className="text-[0.625rem] block text-[#747780] font-extrabold uppercase mt-1">
                      Oct 24, 2023
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="p-10 bg-[#d7fafa]/10 flex justify-center border-t border-[#c4c6d0]/10">
              <button
                onClick={handleNotificationHistory}
                className="flex items-center gap-3 text-[#001736] font-extrabold hover:text-[#006d36] transition-colors uppercase text-sm tracking-widest"
              >
                Load Full Log History
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
