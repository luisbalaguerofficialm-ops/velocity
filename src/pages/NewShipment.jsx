import React, { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AtSign,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
} from "lucide-react";

export default function Message() {
  const queryClient = useQueryClient();

  const [conversationId, setConversationId] = useState(
    "69e441de8c906a7e39c15409", // 🔥 replace dynamically later
  );
  const [text, setText] = useState("");

  /* ======================================================
     📩 GET MESSAGES
  ====================================================== */
  const { data: conversationData, isLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const res = await axiosClient.get(
        `/api/v1/notifications/conversation/${conversationId}`,
      );
      return res.data.data;
    },
    enabled: !!conversationId,
  });

  /* ======================================================
     🔔 GET NOTIFICATIONS
  ====================================================== */
  const { data: notificationsData } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/notifications`);
      return res.data.data;
    },
  });

  /* ======================================================
     💬 SEND MESSAGE
  ====================================================== */
  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return await axiosClient.post(`/api/v1/notifications/message/send`, {
        conversationId,
        text,
      });
    },
    onSuccess: () => {
      setText("");

      // 🔥 refresh messages instantly
      queryClient.invalidateQueries(["conversation", conversationId]);
    },
  });

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessageMutation.mutate();
  };

  const messages = conversationData?.messages || [];
  return (
    <div className="text-[#313234] selection:bg-[#dae2fd]">
      {/* */}
      <main className="pt-16 min-h-screen bg-[#fcf9f9]">
        <div className="p-8 h-[calc(100vh-64px)] grid grid-cols-12 gap-8">
          {/* */}
          <section className="col-span-8 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-extrabold text-[#313234] tracking-tight">
                  Communications
                </h1>
                <p className="text-[#5e5f61] font-medium">
                  Manage secure tunnel interactions
                </p>
              </div>
            </div>
            <div className="flex-1 flex bg-[#ffffff] rounded-xl overflow-hidden ring-1 ring-[#b2b2b4]/10">
              {/* */}
              <div className="w-72 bg-[#f5f3f4] border-r border-[#b2b2b4]/10 flex flex-col">
                <div className="p-4 bg-[#f5f3f4]/50 border-b border-[#b2b2b4]/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#5e5f61] px-2">
                    Active Channels
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {/* Active Contact */}
                  <div className="p-3 bg-[#ffffff] rounded-lg ring-1 ring-[#0053dc]/20 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3e76fe]/30 flex items-center justify-center text-[#006d36]">
                      <AtSign size={18} />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-[#313234] truncate">
                        marcus.v@vault.sys
                      </p>
                      <p className="text-[10px] text-[#006d36] font-bold">
                        ACTIVE NOW
                      </p>
                    </div>
                  </div>
                  {/* Inactive Contact */}
                  <div className="p-3 hover:bg-[#e9e8e9] transition-colors rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                      <AtSign size={18} />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-medium text-[#313234] truncate">
                        elara.k@sentinel.org
                      </p>
                      <p className="text-[10px] text-[#5e5f61]">2h ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* */}
              <div className="flex-1 flex flex-col bg-[#ffffff] relative">
                {/* */}
                <div className="px-6 py-4 flex justify-between items-center bg-[#ffffff]/80 backdrop-blur-md border-b border-[#b2b2b4]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#006d36]"></div>
                    <h3 className="font-headline font-bold text-[#313234]">
                      {conversationData?.guestEmail || "Conversation"}
                    </h3>
                  </div>
                  <div className="flex gap-4">
                    <Video
                      size={20}
                      className="text-[#7a7a7d] cursor-pointer hover:text-[#006d36]"
                    />
                    <Phone
                      size={20}
                      className="text-[#7a7a7d] cursor-pointer hover:text-[#006d36]"
                    />
                    <MoreVertical
                      size={20}
                      className="text-[#7a7a7d] cursor-pointer hover:text-[#006d36]"
                    />
                  </div>
                </div>

                {/* */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                  {/* Received Message */}
                  {isLoading && <p>Loading messages...</p>}

                  {messages.map((msg, index))}
                  <div className="flex flex-col items-start max-w-[80%]">
                    <div className="bg-[#f5f3f4] px-5 py-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-[#5e5f61] leading-relaxed">
                      Administrator, the biometric bypass was logged at 0400. We
                      need a verification on the audit trail for Sector 7.
                    </div>
                    <span className="mt-2 text-[10px] font-bold text-[#b2b2b4] uppercase tracking-widest ml-1">
                      08:12 AM • Marcus
                    </span>
                  </div>
                  {/* Sent Message */}
                  <div className="flex flex-col items-end ml-auto max-w-[80%]">
                    <div className="bg-[#001736] text-[#f7f7ff] px-5 py-4 rounded-2xl rounded-tr-none shadow-lg text-sm leading-relaxed">
                      Confirmed. I'm reviewing the logs now. Sector 7 was
                      scheduled for a routine maintenance check, but the bypass
                      shouldn't have triggered a high-level alert.
                    </div>
                    <span className="mt-2 text-[10px] font-bold text-[#006d36] uppercase tracking-widest mr-1">
                      08:15 AM • You
                    </span>
                  </div>
                </div>

                {/* */}
                <div className="p-6 border-t border-[#b2b2b4]/10">
                  <div className="relative flex items-center gap-4">
                    <div className="flex-1 bg-[#f5f3f4] rounded-xl px-4 flex items-center border-b-2 border-transparent focus-within:border-[#0053dc] transition-all">
                      <input
                        className="w-full bg-transparent border-none focus:ring-0 py-4 text-sm text-[#313234] outline-none"
                        placeholder="Type a secure message..."
                        type="text"
                      />
                      <div className="flex items-center gap-3 text-[#7a7a7d]">
                        <Paperclip
                          size={18}
                          className="cursor-pointer hover:text-[#83fba5]"
                        />
                        <Smile
                          size={18}
                          className="cursor-pointer hover:text-[#83fba5]"
                        />
                      </div>
                    </div>
                    <button className="w-12 h-12 bg-[#001736] text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* */}
          <aside className="col-span-4 flex flex-col h-full space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#313234] tracking-tight">
                Notification Center
              </h2>
              <p className="text-[#5e5f61] font-medium">
                Real-time system integrity
              </p>
            </div>
            <div className="flex-1 bg-[#ffffff] rounded-xl ring-1 ring-[#b2b2b4]/10 p-6 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#5e5f61]">
                  Live Feed
                </span>
                <button className="text-xs font-bold text-[#001736] hover:underline">
                  Mark all as read
                </button>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {/* Alert Item */}
                <div className="group relative bg-[#fcf9f9] p-4 rounded-xl border-l-4 border-red-500 hover:bg-[#f5f3f4] transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter">
                      Critical
                    </span>
                    <span className="text-[10px] font-medium text-[#b2b2b4]">
                      Just Now
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#313234] mb-1">
                    System Integrity Compromised
                  </h4>
                  <p className="text-xs text-[#5e5f61] leading-snug">
                    Multiple failed login attempts detected on Vault 04 from
                    internal IP 192.168.1.45.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
