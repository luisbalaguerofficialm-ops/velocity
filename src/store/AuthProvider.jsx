import { useEffect, useState } from "react";
import { AuthContext } from ".";
import { getAuthenticatedUser, refreshAccessToken } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedAdmin, refreshAdminAccessToken } from "../api/admin";

/**





Velocity Transit: AuthProvider



Manages authentication state for both system operators (admins) and customers.



Uses 'velocityToken' for persistent session management.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const isAdminPath = window.location.pathname.startsWith("/admin");

  // Kinetic Sync: Initializing access token from local storage
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("velocityToken");
  });

  // Effect: Sync token changes to local storage for persistence
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("velocityToken", accessToken);
    } else {
      localStorage.removeItem("velocityToken");
    }
  }, [accessToken]);

  const login = (userData) => setUser(userData);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  // Query: Fetch authenticated user/admin profile
  useQuery({
    queryKey: [
      isAdminPath ? "velocity_admin_profile" : "velocity_user_profile",
      accessToken,
    ],
    queryFn: async () => {
      setIsAuthenticating(true);
      try {
        const authRequest = isAdminPath
          ? getAuthenticatedAdmin(accessToken)
          : getAuthenticatedUser(accessToken);
        const res = await authRequest;

        if (res.status === 200) {
          setUser(res.data.data);
        }

        return res.data;
      } catch (err) {
        if (err?.response?.status === 401) {
          setUser(null);
          setAccessToken(null);
        }
        console.error(
          "Velocity Transit Auth Error:",
          err?.response?.data?.message,
        );
        throw err;
      } finally {
        setIsAuthenticating(false);
      }
    },
    enabled: !!accessToken,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  // Query: Automatic Token Refresh Logic
  useQuery({
    queryKey: ["velocity_refresh_token", isAdminPath],
    queryFn: async () => {
      const refresh = isAdminPath
        ? refreshAdminAccessToken
        : refreshAccessToken;

      const res = await refresh();
      const newToken = res?.data?.data?.accessToken;

      if (!newToken) {
        throw new Error("Kinetic Sync: Refresh failed");
      }

      setAccessToken(newToken);
      return newToken;
    },
    enabled: !accessToken,
    retry: false,
    onError: logout,
    refetchOnWindowFocus: false,
  });

  // Visual feedback during the authentication handshake
  if (isAuthenticating) {
    return;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        accessToken,
        setAccessToken,
        isAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
