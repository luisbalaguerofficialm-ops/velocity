import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Phone, MapPinned, Send, Paperclip, Smile, X } from "lucide-react";
import axiosClient from "../utils/axiosClient";
import { useSocket } from "../context/SocketProvider";

export default function LiveChat({
  closeChat,
  conversationId,
  trackingId,
  guestEmail,
}) {
  const socket = useSocket();
  const emojiPickerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [typing, setTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  /* ======================================================
     LOAD CONVERSATION
  ====================================================== */

  const fetchConversation = async () => {
    try {
      if (!conversationId || !trackingId || !guestEmail) return;

      const res = await axiosClient.get(
        `/api/v1/notifications/tracking-chat/conversation/${conversationId}`,
        {
          params: {
            trackingId,
            email: guestEmail,
          },
        },
      );

      const data = res?.data?.data;

      setConversation(data);
      setMessages(data?.messages || []);
    } catch (error) {
      console.error("FETCH CONVERSATION ERROR:", error);
    }
  };

  useEffect(() => {
    if (conversationId) {
      fetchConversation();
    }
  }, [conversationId]);

  /* ======================================================
     AUTO SCROLL
  ====================================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /* ======================================================
     SOCKET CONNECTION
  ====================================================== */

  useEffect(() => {
    if (!socket || !conversationId) return;

    socket.emit("join-conversation", conversationId);

    /* ======================================================
       NEW MESSAGE
    ====================================================== */

    socket.on("new-message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    /* ======================================================
       TYPING
    ====================================================== */

    socket.on("typing", ({ conversationId: incomingId }) => {
      if (incomingId === conversationId) {
        setTyping(true);
      }
    });

    socket.on("stop-typing", ({ conversationId: incomingId }) => {
      if (incomingId === conversationId) {
        setTyping(false);
      }
    });

    /* ======================================================
       ONLINE USERS
    ====================================================== */

    socket.on("online-users", (users) => {
      setOnlineUsers(users || []);
    });

    return () => {
      socket.off("new-message");

      socket.off("typing");

      socket.off("stop-typing");

      socket.off("online-users");
    };
  }, [socket, conversationId]);

  /* ======================================================
     SEND MESSAGE
  ====================================================== */

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      setSending(true);

      const payload = {
        conversationId,
        trackingId,
        text: message,
      };

      const res = await axiosClient.post(
        "/api/v1/notifications/tracking-chat/send",
        payload,
      );

      const newMessage = res?.data?.data;

      setMessage("");

      socket.emit("stop-typing", {
        conversationId,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  /* ======================================================
     TYPING EVENT
  ====================================================== */

  const handleTyping = (e) => {
    setMessage(e.target.value);

    socket.emit("typing", {
      conversationId,
    });

    setTimeout(() => {
      socket.emit("stop-typing", {
        conversationId,
      });
    }, 1200);
  };

  /* ======================================================
     FILE UPLOAD
  ====================================================== */

  const handleFileChange = async (e) => {
    try {
      const files = Array.from(e.target.files);

      if (!files.length) return;

      setUploading(true);

      const formData = new FormData();

      formData.append("conversationId", conversationId);
      formData.append("trackingId", trackingId);
      formData.append("email", guestEmail);

      files.forEach((file) => {
        formData.append("files", file);
      });

      await axiosClient.post("/api/v1/notifications/chat/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newMessage = res?.data?.data;

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  /* ======================================================
     SEND STICKER
  ====================================================== */

  const sendSticker = async (stickerUrl) => {
    try {
      const payload = {
        conversationId,
        trackingId,
        text: "",
        sticker: stickerUrl,
      };

      const res = await axiosClient.post(
        "/api/v1/notifications/tracking-chat/send",
        payload,
      );

      const newMessage = res?.data?.data;

      setMessages((prev) => [...prev, newMessage]);

      setShowStickerPicker(false);
    } catch (error) {
      console.error(error);
    }
  };

  /* ======================================================
     ONLINE STATUS
  ====================================================== */

  const courierOnline = onlineUsers?.includes(conversation?.assignedCourier);

  return (
    <div className="h-full w-full bg-[#e2fffe] rounded-3xl overflow-hidden">
      <div className="flex flex-col h-full">
        {/* ======================================================
            HEADER
        ====================================================== */}

        <header className="h-20 px-6 border-b bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  conversation?.assignedCourierPhoto ||
                  "https://ui-avatars.com/api/?name=Courier"
                }
                alt="Courier"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  courierOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>

            <div>
              <h2 className="font-bold text-[#001736] text-lg">
                {conversation?.assignedCourierName || "Support"}
              </h2>

              <p className="text-sm text-gray-500">
                {typing ? "typing..." : courierOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-11 h-11 rounded-xl bg-[#dff7f7] flex items-center justify-center hover:scale-105 transition">
              <Phone size={18} />
            </button>

            <button className="w-11 h-11 rounded-xl bg-[#dff7f7] flex items-center justify-center hover:scale-105 transition">
              <MapPinned size={18} />
            </button>

            <button
              onClick={closeChat}
              className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:scale-105 transition"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* ======================================================
            MESSAGES
        ====================================================== */}

        <div className="flex-1 overflow-y-auto px-5 py-6 bg-gradient-to-b from-[#e9ffff] to-white">
          <div className="space-y-5">
            {messages.map((msg, index) => {
              const isUser =
                msg?.role === "user" || msg?.senderModel === "User";

              return (
                <div
                  key={msg?._id || index}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] flex flex-col ${
                      isUser ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-3xl overflow-hidden shadow-sm ${
                        isUser
                          ? "bg-[#001736] text-white rounded-br-md"
                          : "bg-[#d9f6f5] text-[#002020] rounded-bl-md"
                      }`}
                    >
                      {/* ATTACHMENTS */}
                      {/* ATTACHMENTS */}
                      {msg?.attachments?.length > 0 && (
                        <div className="space-y-2 p-2">
                          {msg.attachments.map((file, i) => (
                            <div key={i}>
                              {/* IMAGE */}
                              {file?.type?.startsWith("image") ? (
                                <img
                                  src={file.url}
                                  alt="attachment"
                                  onClick={() => {
                                    setPreviewFile({
                                      type: "image",
                                      url: file.url,
                                    });
                                    setPreviewOpen(true);
                                  }}
                                  className="rounded-2xl w-full max-h-72 object-cover cursor-pointer hover:opacity-90 transition"
                                />
                              ) : file?.type?.startsWith("video") ? (
                                /* VIDEO */
                                <video
                                  onClick={() => {
                                    setPreviewFile({
                                      type: "video",
                                      url: file.url,
                                    });
                                    setPreviewOpen(true);
                                  }}
                                  className="rounded-2xl w-full max-h-72 object-cover cursor-pointer"
                                >
                                  <source src={file.url} />
                                </video>
                              ) : (
                                /* OTHER FILE */
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block bg-white/10 px-4 py-3 rounded-xl text-sm underline"
                                >
                                  {file.name}
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* TEXT */}
                      {msg?.text && (
                        <div className="px-4 py-2">
                          <p className="leading-relaxed text-sm">{msg.text}</p>
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] text-gray-500 mt-1 px-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* TYPING */}
            {typing && (
              <div className="flex items-center gap-2 px-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>

                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-100"></div>

                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce delay-200"></div>
                </div>

                <span className="text-sm text-gray-500 italic">typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ======================================================
            INPUT
        ====================================================== */}

        <footer className="bg-white border-t p-4 shrink-0">
          <div className="flex items-center gap-3 bg-[#d9f6f5] rounded-2xl px-3 py-2">
            {/* FILE */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-600 hover:text-black"
            >
              <Paperclip size={20} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={handleFileChange}
            />

            <div className="relative" ref={emojiPickerRef}>
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="text-gray-600 hover:text-black"
              >
                <Smile size={20} />
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-14 left-0 z-50 shadow-2xl rounded-2xl overflow-hidden">
                  <EmojiPicker
                    theme="light"
                    searchDisabled={false}
                    skinTonesDisabled={false}
                    previewConfig={{
                      showPreview: false,
                    }}
                    onEmojiClick={(emojiData) => {
                      setMessage((prev) => prev + emojiData.emoji);
                    }}
                  />
                </div>
              )}
            </div>

            {/* INPUT */}
            <input
              value={message}
              onChange={handleTyping}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm"
            />

            {/* SEND */}
            <button
              disabled={sending}
              onClick={sendMessage}
              className="w-11 h-11 rounded-xl bg-green-700 text-white flex items-center justify-center hover:scale-105 transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>

          <div className="mt-2 flex justify-between text-[10px] text-gray-400 px-1">
            <span>{uploading ? "Uploading..." : "End-to-End Encrypted"}</span>

            <span>
              {courierOnline ? "Secure Connection" : "Waiting for courier"}
            </span>
          </div>
        </footer>
      </div>
      {/* ======================================================
    MEDIA PREVIEW MODAL
====================================================== */}

      {previewOpen && previewFile && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => {
              setPreviewOpen(false);
              setPreviewFile(null);
            }}
            className="absolute top-5 right-5 bg-white text-black rounded-full p-2 hover:scale-105 transition"
          >
            <X size={20} />
          </button>

          {/* IMAGE */}
          {previewFile.type === "image" && (
            <img
              src={previewFile.url}
              alt="preview"
              className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            />
          )}

          {/* VIDEO */}
          {previewFile.type === "video" && (
            <video
              src={previewFile.url}
              controls
              autoPlay
              className="max-w-full max-h-[90vh] rounded-2xl"
            />
          )}
        </div>
      )}
    </div>
  );
}
