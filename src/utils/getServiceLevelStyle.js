export const getServiceLevelStyle = (level = "") => {
  const base =
    "px-3 py-1 rounded-full text-xs font-bold uppercase inline-flex items-center justify-center";

  switch (level.toLowerCase()) {
    case "priority":
      return `${base} bg-red-100 text-red-600`;

    case "flash_priority":
      return `${base} bg-pink-100 text-pink-600`;

    case "standard":
      return `${base} bg-blue-100 text-blue-700`;

    case "economy":
      return `${base} bg-gray-200 text-gray-600`;

    case "sky_cargo":
      return `${base} bg-indigo-100 text-indigo-700`;

    default:
      return `${base} bg-gray-100 text-gray-600`;
  }
};
