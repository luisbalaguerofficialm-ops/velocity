import React from "react";

export function Badge({
  children,
  className = "",
  variant = "default",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full";
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
