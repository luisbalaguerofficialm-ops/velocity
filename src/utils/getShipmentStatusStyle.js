// utils/getShipmentStatusStyle.js

export const getShipmentStatusStyle = (status = "") => {
  const base =
    "px-3 py-1 rounded-full text-xs font-bold uppercase inline-flex items-center gap-1 justify-center transition-all duration-300";

  const map = {
    pickup: {
      className: `${base} bg-blue-100 text-blue-700`,
      icon: "📦",
      label: "Picked Up",
    },

    in_transit: {
      className: `${base} bg-purple-100 text-purple-700`,
      icon: "🚚",
      label: "In Transit",
    },

    out_for_delivery: {
      className: `${base} bg-orange-100 text-orange-700`,
      icon: "🚛",
      label: "Out for Delivery",
    },

    paused: {
      className: `${base} bg-yellow-100 text-yellow-700`,
      icon: "⏸️",
      label: "Paused",
    },

    delayed: {
      className: `${base} bg-red-100 text-red-600`,
      icon: "⚠️",
      label: "Delayed",
    },

    delivered: {
      className: `${base} bg-green-100 text-green-700`,
      icon: "✅",
      label: "Delivered",
    },
  };

  const key = status.toLowerCase();

  return (
    map[key] || {
      className: `${base} bg-gray-100 text-gray-600`,
      icon: "❓",
      label: status || "Unknown",
    }
  );
};
