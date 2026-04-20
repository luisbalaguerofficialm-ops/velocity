import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**





Velocity Transit: PublicRoutes



Handles redirection for authenticated operators and customers.
 */
export function PublicRoutes({ children, accessToken, user }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !user) return;

    // Security Protocol: Force verification for all roles
    if (!user.isVerified) {
      if (location.pathname !== "/auth/verify") {
        navigate("/auth/verify", { replace: true });
      }
      return;
    }

    const isAdminAuth = location.pathname.startsWith("/auth/admin");
    const stateFrom = location.state?.from;

    // Routing Logic: Differentiate between Admin Console and Customer Dashboard
    const from = isAdminAuth
      ? user.role === "admin"
        ? "/admin"
        : "/" // Unauthorized access to admin portal redirects to base
      : typeof stateFrom === "string"
        ? stateFrom
        : stateFrom?.pathname || "/dashboard";

    if (location.pathname !== from) {
      navigate(from, { state: { from: location }, replace: true });
    }
  }, [accessToken, user, location, navigate]);

  return children;
}

/**





Velocity Transit: PrivateRoutes



Secures high-precision operational routes.
 */
export function PrivateRoutes({
  children,
  accessToken,
  isAuthenticating,
  user,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAuthenticating) return;

    // Standard Login Paths
    const loginPath = isAdminRoute ? "/auth/admin/signin" : "/auth/signin";

    if (!accessToken && location.pathname !== loginPath) {
      navigate(loginPath, { state: { from: location }, replace: true });
      return;
    }

    // Role Enforcement for Admin Operations
    if (accessToken && user && isAdminRoute && user.role !== "admin") {
      navigate("/dashboard", { replace: true });
      return;
    }

    // Verification Check
    if (user && !user.isVerified && location.pathname !== "/auth/verify") {
      navigate("/auth/verify", { replace: true });
    }
  }, [accessToken, isAuthenticating, user, location, navigate, isAdminRoute]);

  return children;
}
