import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

export default function ProtectedRoute({ type = "private" }) {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  const { data: admin, isLoading } = useAdmin({
    enabled: !!token,
  });

  // ⏳ Prevent flicker / race condition
  if (isLoading && type === "private") return null;

  // =========================
  // 🔐 PRIVATE ROUTE (ADMIN ONLY)
  // =========================
  if (type === "private") {
    if (!token || !admin) {
      return <Navigate to="/signin" replace state={{ from: location }} />;
    }

    return <Outlet />;
  }

  // =========================
  // 🌐 PUBLIC ROUTE (NORMAL SITE)
  // =========================
  if (type === "public") {
    return <Outlet />;
  }

  // =========================
  // 🚫 GUEST ROUTE (AUTH PAGES ONLY)
  // =========================
  if (type === "guest") {
    // if logged in → block auth pages
    if (token && admin) {
      return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
  }

  return <Outlet />;
}
