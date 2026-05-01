export const getStatusStyle = (status) => {
  const base =
    "px-3 py-1 rounded-full text-xs font-bold uppercase inline-flex items-center justify-center";

  switch (status) {
    case "active":
      return `${base} bg-green-100 text-green-700`;
    case "on_break":
      return `${base} bg-yellow-100 text-yellow-700`;
    case "inactive":
      return `${base} bg-red-100 text-red-600`;
    case "offline":
      return `${base} bg-gray-200 text-gray-600`;
    default:
      return `${base} bg-gray-100 text-gray-600`;
  }
};
