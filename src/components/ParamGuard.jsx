import React from "react";
import { useParams, Navigate, Outlet } from "react-router-dom";

/**
 * Prevents children from rendering if a specific route parameter is missing.
 * @param {string} paramName - The name of the param to check (default: "id")
 * @param {string} redirectTo - Where to send the user if the param is invalid
 */
export default function ParamGuard({
  paramName = "id",
  redirectTo = "/admin/dashboard",
}) {
  const params = useParams();
  const value = params[paramName];

  // Check if param is missing or is the literal string "undefined"
  if (!value || value === "undefined") {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
