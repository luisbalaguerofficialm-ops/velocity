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

  const [conversationId, setConversationId] = useState(null);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  /* ======================================================
     📩 GET NOTIFICATIONS (LEFT SIDEBAR)
  ====================================================== */
  const { data: notificationsData } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/notifications`);
      return res.data.data;
    },
  });

  /* ======================================================
     📩 GET CONVERSATION MESSAGES
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
    refetchInterval: 3000, // 🔥 simulate realtime
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
      queryClient.invalidateQueries(["conversation", conversationId]);
    },
  });

  /* ======================================================
     ✍️ TYPING HANDLER
  ====================================================== */
  const handleTyping = (e) => {
    setText(e.target.value);

    // show typing indicator
    setIsTyping(true);

    // stop typing after delay
    setTimeout(() => {
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = () => {
    if (!text.trim() || !conversationId) return;
    sendMessageMutation.mutate();
  };

  const messages = conversationData?.messages || [];

  return (
    <div className="text-[#313234]">
      <main className="pt-16 min-h-screen bg-[#fcf9f9]">
        <div className="p-8 h-[calc(100vh-64px)] grid grid-cols-12 gap-8">
          {/* ================= LEFT: CONVERSATIONS ================= */}
          <section className="col-span-4 bg-white rounded-xl p-4 overflow-y-auto">
            <h2 className="font-bold mb-4">Conversations</h2>

            {notificationsData?.map((item) => (
              <div
                key={item._id}
                onClick={() => setConversationId(item._id)}
                className={`p-3 rounded-lg cursor-pointer mb-2 ${
                  conversationId === item._id
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <p className="font-bold text-sm">
                  {item.email || item.receiverEmail}
                </p>
                <p className="text-xs text-gray-500 truncate">{item.message}</p>
              </div>
            ))}
          </section>

          {/* ================= CENTER: CHAT ================= */}
          <section className="col-span-8 flex flex-col bg-white rounded-xl">
            {/* HEADER */}
            <div className="p-4 border-b flex justify-between">
              <h3 className="font-bold">
                {conversationData?.guestEmail || "Select conversation"}
              </h3>
              <div className="flex gap-3">
                <Video size={18} />
                <Phone size={18} />
                <MoreVertical size={18} />
              </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isLoading && <p>Loading...</p>}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-3 rounded-xl max-w-[70%] text-sm ${
                      msg.role === "admin"
                        ? "bg-[#001736] text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* TYPING INDICATOR */}
              {isTyping && (
                <div className="flex justify-end">
                  <div className="bg-gray-200 px-4 py-2 rounded-xl text-xs italic">
                    typing...
                  </div>
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t flex gap-3">
              <input
                value={text}
                onChange={handleTyping}
                className="flex-1 border rounded-lg px-4 py-2"
                placeholder="Type message..."
              />
              <button
                onClick={handleSend}
                className="bg-[#001736] text-white px-4 rounded-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </section>
                 {/* ===================================== */}
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
              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#5e5f61]">
                  Live Feed
                </span>

                <button
                  onClick={() => {
                    queryClient.setQueryData(["notifications"], (old) =>
                      old?.map((n) => ({ ...n, unreadCount: 0 })),
                    );
                  }}
                  className="text-xs font-bold text-[#001736] hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              {/* LIST */}
              <div className="flex-1 space-y-4 overflow-y-auto">
                {notificationsData?.map((item) => {
                  const isUnread = item.unreadCount > 0;

                  return (
                    <div
                      key={item._id}
                      onClick={() => {
                        setConversationId(item._id);

                        // mark this one as read in UI
                        queryClient.setQueryData(["notifications"], (old) =>
                          old?.map((n) =>
                            n._id === item._id ? { ...n, unreadCount: 0 } : n,
                          ),
                        );
                      }}
                      className={`group relative p-4 rounded-xl border-l-4 cursor-pointer transition-all
              ${
                isUnread
                  ? "border-red-500 bg-[#fcf9f9]"
                  : "border-gray-200 bg-white"
              }
              hover:bg-[#f5f3f4]
            `}
                    >
                      {/* TOP */}
                      <div className="flex justify-between items-start mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase
                  ${
                    isUnread
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                        >
                          {item.type === "contact_form"
                            ? "Message"
                            : "Notification"}
                        </span>

                        <span className="text-[10px] font-medium text-[#b2b2b4]">
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h4 className="text-sm font-bold text-[#313234] mb-1">
                        {item.title || "New Update"}
                      </h4>

                      {/* MESSAGE */}
                      <p className="text-xs text-[#5e5f61] leading-snug line-clamp-2">
                        {item.message}
                      </p>

                      {/* UNREAD BADGE */}
                      {isUnread && (
                        <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </div>
                  );
                })}

                {!notificationsData?.length && (
                  <p className="text-center text-sm text-gray-400">
                    No notifications yet
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
