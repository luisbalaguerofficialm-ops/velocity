import React, { useState, useEffect, useRef } from "react";
import axiosClient from "../utils/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "../context/SocketProvider";
import { Video, Phone, MoreVertical, Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Message() {
  const { conversationId: routeConversationId } = useParams();
  const queryClient = useQueryClient();
  const socket = useSocket();
  const [conversationId, setConversationId] = useState(null);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  const [confirmModal, setConfirmModal] = useState({
    open: false,
    type: null, // "conversation" | "message"
    conversationId: null,
    messageId: null,
  });

  const conversationRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    conversationRef.current = conversationId;
  }, [conversationId]);

  /* ======================================================
      GET NOTIFICATIONS (Merged Data from Backend)
  ====================================================== */
  const { data: notificationData } = useQuery({
    queryKey: ["notifications", page],
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/notifications?page=${page}`);
      return res.data;
    },
  });

  const notifications = notificationData?.data || [];

  /* ======================================================
    GET MESSAGES
  ====================================================== */
  const { data: conversationData, isLoading } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: async () => {
      const res = await axiosClient.get(
        `/api/v1/notifications/conversation/${conversationId}`,
      );
      // Backend returns: { success: true, data: { messages: [], guestEmail: ... } }
      return res.data.data;
    },
    enabled: !!conversationId,
  });

  const messages = conversationData?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    if (routeConversationId) {
      setConversationId(routeConversationId);
    }
  }, [routeConversationId]);
  /* ======================================================
      SEND MESSAGE
  ====================================================== */
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: (variables) =>
      axiosClient.post(`/api/v1/notifications/message/send`, variables),
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });
    },
  });

  //================ DELETE conversation (your sidebar button)==========================
  const { mutate: deleteConversation, isPending: deletingConversation } =
    useMutation({
      mutationFn: (conversationId) =>
        axiosClient.delete(
          `/api/v1/notifications/conversation/${conversationId}`,
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        setConversationId(null);

        toast.success("Conversation deleted successfully");
      },

      onError: () => {
        toast.error("Failed to delete conversation");
      },
    });

  // =================DELETE single message (inside chat)====================
  const { mutate: deleteMessage, isPending: deletingMessage } = useMutation({
    mutationFn: ({ conversationId, messageId }) =>
      axiosClient.delete(
        `/api/v1/notifications/conversation/${conversationId}/message/${messageId}`,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", conversationId],
      });

      toast.success("Message deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete message");
    },
  });

  // =====================
  // Handle confirm action
  // ========================

  const handleConfirmDelete = () => {
    if (confirmModal.type === "conversation" && confirmModal.conversationId) {
      deleteConversation(confirmModal.conversationId);
    }

    if (
      confirmModal.type === "message" &&
      confirmModal.conversationId &&
      confirmModal.messageId
    ) {
      deleteMessage({
        conversationId: confirmModal.conversationId,
        messageId: confirmModal.messageId,
      });
    }

    // close modal AFTER triggering mutation
    setConfirmModal({
      open: false,
      type: null,
      conversationId: null,
      messageId: null,
    });
  };

  /* ======================================================
      🔌 SOCKET: JOIN / LEAVE
  ====================================================== */
  useEffect(() => {
    if (!socket || !conversationId) return;
    socket.emit("join-conversation", conversationId);
    return () => socket.emit("leave-conversation", conversationId);
  }, [socket, conversationId]);

  /* ======================================================
      REAL-TIME UPDATES
  ====================================================== */
  useEffect(() => {
    if (!socket) return;

    // 1. Handle incoming messages in current view
    const handleNewMessage = (message) => {
      const currentId = conversationRef.current;
      if (!currentId) return;

      queryClient.setQueryData(["conversation", currentId], (old) => {
        if (!old) return old;
        return {
          ...old,
          messages: [...(old.messages || []), message],
        };
      });
    };

    // 2. Update the Sidebar List (Notifications/Conversations)
    const handleConversationUpdated = (data) => {
      queryClient.setQueryData(["notifications"], (old) => {
        if (!old || !Array.isArray(old.data)) return old;
        return {
          ...old,
          data: old.data.map((n) =>
            n._id === data.conversationId
              ? {
                  ...n,
                  unreadCount: data.unreadCount,
                  message: data.lastMessage?.text,
                  createdAt: data.lastMessage?.createdAt || n.createdAt,
                }
              : n,
          ),
        };
      });
    };

    socket.on("new-message", handleNewMessage);
    socket.on("conversation-updated", handleConversationUpdated);

    return () => {
      socket.off("new-message");
      socket.off("conversation-updated");
    };
  }, [socket, queryClient]);

  const handleSend = () => {
    if (!text.trim() || !conversationId || isSending) return;
    sendMessage({ conversationId, text });
  };

  return (
    <div className="text-[#313234]">
      <main className="pt-16 min-h-screen bg-[#fcf9f9]">
        <div className="p-8 h-[calc(100vh-64px)] grid grid-cols-12 gap-8">
          {/* LEFT: CONVERSATION LIST */}
          <section className="col-span-4 bg-white rounded-xl p-4 overflow-y-auto flex flex-col">
            <h2 className="font-bold mb-4 text-lg">Inbox</h2>
            <div className="space-y-2">
              {notifications.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setConversationId(item._id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    conversationId === item._id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-60 items-center ">
                      <div className="flex flex-col truncate">
                        <p className="font-bold text-sm truncate max-w-[150px]">
                          {item.guestName || item.guestEmail || "Guest"}
                        </p>
                        <span className="text-[9px] text-[#006d36] font-bold uppercase tracking-tighter">
                          {item.source || "Direct"}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmModal({
                            open: true,
                            type: "conversation",
                            conversationId: item._id,
                          });
                        }}
                        className="w-13 h-5 border text-red-500 bg-red-50 text-sm rounded-md hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        delete
                      </button>
                    </div>

                    {item.unreadCount > 0 && (
                      <span className="bg-[#ba1a1a] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {item.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-end mt-1">
                    <p className="text-xs text-gray-500 truncate flex-1 mr-2 italic">
                      {item.lastMessage?.text || item.subject}
                    </p>
                    <span className="text-[9px] text-gray-400 whitespace-nowrap">
                      {item.lastMessage?.createdAt &&
                        new Date(item.lastMessage.createdAt).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CENTER: ACTIVE CHAT */}
          <section className="col-span-8 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-white">
              <div>
                <h3 className="font-bold text-[#001736]">
                  {conversationData?.guestName ||
                    conversationData?.guestEmail ||
                    "Select a message"}
                </h3>
                {conversationData?.guestEmail && (
                  <p className="text-[10px] text-gray-400">
                    {conversationData.guestEmail}
                  </p>
                )}
              </div>
              <div className="flex gap-4 text-gray-400">
                <Video size={18} className="cursor-not-allowed" />
                <Phone size={18} className="cursor-not-allowed" />
                <MoreVertical size={18} className="cursor-pointer" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f9f9f9]">
              {isLoading && (
                <p className="text-center text-gray-400">
                  Loading conversation...
                </p>
              )}

              {!conversationId && (
                <div className="h-full flex items-center justify-center text-gray-400 italic">
                  Select a conversation from the sidebar to start chatting
                </div>
              )}

              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.role === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="relative group">
                    <div
                      className={`px-4 py-2.5 rounded-2xl max-w-[75%] text-sm shadow-sm ${
                        msg.role === "admin"
                          ? "bg-[#001736] text-white rounded-tr-none"
                          : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* 🗑 DELETE BUTTON (hover) */}
                    <button
                      onClick={() =>
                        setConfirmModal({
                          open: true,
                          type: "message",
                          conversationId,
                          messageId: msg._id,
                        })
                      }
                      className="absolute -top-2 -right-2 w-5 h-5 hidden group-hover:block text-[10px] bg-red-500 text-white px-2 py-0.5 rounded cursor-pointer"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white flex gap-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write a reply..."
              />
              <button
                disabled={!text.trim() || !conversationId || isSending}
                onClick={handleSend}
                className={`p-2 rounded-xl transition-all ${
                  isSending
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#001736] text-white hover:bg-black"
                }`}
              >
                <Send size={20} />
              </button>
            </div>
          </section>
        </div>
      </main>
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in">
            <h2 className="text-lg font-bold text-[#001736]">Confirm Delete</h2>

            <p className="text-sm text-gray-500 mt-2">
              {confirmModal.type === "conversation"
                ? "Are you sure you want to delete this entire conversation?"
                : "Are you sure you want to delete this message?"}
            </p>

            <div className="flex justify-end gap-3 mt-6">
              {/* Cancel */}
              <button
                onClick={() =>
                  setConfirmModal({
                    open: false,
                    type: null,
                    conversationId: null,
                    messageId: null,
                  })
                }
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={handleConfirmDelete}
                disabled={deletingMessage || deletingConversation}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm disabled:opacity-50"
              >
                {deletingMessage || deletingConversation
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
