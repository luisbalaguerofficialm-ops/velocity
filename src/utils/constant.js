import dayjs from "dayjs";

/**





Velocity Transit: Kinetic Precision Data Constants



Refined for logistics and fleet management.
 */

export const slideShow = [
  {
    id: 1,
    src: "{{DATA:IMAGE:IMAGE_228}}", // Cargo Jet at Dusk
    caption:
      "“Velocity Transit has redefined our logistics efficiency. Real-time tracking and automated manifests have reduced our delivery lag by 45%.”",
  },
  {
    id: 2,
    src: "{{DATA:IMAGE:IMAGE_154}}", // Warehouse with EV Van
    caption:
      "“The Kinetic Precision engine is designed to provide high-velocity supply chain management for the modern global economy.”",
  },
];

export const headers = (accessToken) => {
  if (!accessToken) return {};
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

/**





Shipments replace 'Applications' in the Velocity context.
 */
export const dummyShipments = [
  {
    id: "VEL-TX-99021",
    senderName: "John Smith",
    receiverName: "Sarah Johnson",
    serviceLevel: "Sky Priority",
    origin: "Chicago, IL",
    destination: "New York, NY",
    appliedDate: "1/17/2026",
    status: "In Transit",
    email: "sarah.johnson@email.com",
    phone: "+234 9067275765",
    parcelSpecs: {
      weight: "12.5 kg",
      dimensions: "40x30x20 cm",
      value: "$1,200",
      category: "Electronics",
    },
    internalNote: "Handle with extra care - fragile electronic components.",
  },
  {
    id: "VEL-TX-99022",
    senderName: "Michael Chen",
    receiverName: "Emily Davis",
    serviceLevel: "Flash Express",
    origin: "San Francisco, CA",
    destination: "Los Angeles, CA",
    appliedDate: "1/18/2026",
    status: "Delivered",
    email: "emily.davis@email.com",
    phone: "+234 9076543210",
    parcelSpecs: {
      weight: "2.1 kg",
      dimensions: "15x15x10 cm",
      value: "$450",
      category: "Documents",
    },
    internalNote: "",
  },
  {
    id: "VEL-TX-99023",
    senderName: "David Wilson",
    receiverName: "Alex Sterling",
    serviceLevel: "Green Freight",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    appliedDate: "1/19/2026",
    status: "Pending",
    email: "alex.sterling@email.com",
    phone: "+234 9054321098",
    parcelSpecs: {
      weight: "45.0 kg",
      dimensions: "100x80x60 cm",
      value: "$3,400",
      category: "Sustainable Goods",
    },
    internalNote: "Eco-friendly route optimization requested.",
  },
];

export const statusOptions = [
  "Pending",
  "In Transit",
  "Delayed",
  "Delivered",
  "Cancelled",
  "On Hold",
];

/**





Mapping status to Velocity Transit's Emerald & Midnight palette.



Emerald [#006d36] for success, Midnight [#001736] for neutral, 



and functional colors for alerts.
 */
export const getStatusColor = (statusValue) => {
  const colors = {
    Pending: "bg-[#e2fffe] text-[#001736]",
    "In Transit": "bg-[#83fba5] text-[#006d36]",
    Delivered: "bg-[#006d36] text-white",
    Delayed: "bg-orange-100 text-orange-800",
    Cancelled: "bg-red-100 text-red-800",
    "On Hold": "bg-yellow-100 text-yellow-800",
  };
  return colors[statusValue] || "bg-gray-100 text-gray-800";
};

export const getStatusStyles = (status) => {
  const styles = {
    Pending: "bg-[#e2fffe] text-[#001736] border-[#001736]/10",
    "In Transit": "bg-[#83fba5]/20 text-[#006d36] border-[#006d36]/20",
    Delivered: "bg-[#006d36]/10 text-[#006d36] border-[#006d36]/30",
    Delayed: "bg-orange-50 text-orange-700 border-orange-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
    "On Hold": "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
  return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
};

export const shipmentColumns = [
  {
    name: "Tracking ID",
    uid: "id",
  },
  {
    name: "Sender / Receiver",
    uid: "parties",
  },
  {
    name: "Service Level",
    uid: "serviceLevel",
  },
  {
    name: "Est. Delivery",
    uid: "appliedDate",
  },
  { name: "Status", uid: "status" },
  { name: "Actions", uid: "action" },
];

export const formatDate = (item, format = "display") => {
  if (format === "input") {
    return dayjs(item).format("YYYY-MM-DD");
  }
  return dayjs(item).format("DD/MM/YYYY");
};
