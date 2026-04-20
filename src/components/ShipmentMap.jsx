import React, { useEffect, useState } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";
import axiosClient from "../utils/axiosClient";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function ShipmentMap({
  route = [],
  currentLocation,
  routeIndex = 0,
  shipmentId,
}) {
  const [animatedPosition, setAnimatedPosition] = useState(null);

  /* ================= BACKEND MAP CONFIG (NO ENV KEY) ================= */
  useEffect(() => {
    // optional: fetch map config from backend if needed later
    axiosClient.get("/api/v1/maps/config").catch(() => {});
  }, []);

  /* ================= SMOOTH INTERPOLATION ================= */
  useEffect(() => {
    if (!currentLocation) return;

    let frame;

    const animate = () => {
      setAnimatedPosition((prev) => {
        if (!prev) return currentLocation;

        return {
          lat: prev.lat + (currentLocation.lat - prev.lat) * 0.12,
          lng: prev.lng + (currentLocation.lng - prev.lng) * 0.12,
        };
      });

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [currentLocation]);

  const center = animatedPosition || route?.[0] || { lat: 6.5244, lng: 3.3792 };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
      {/* ROUTE LINE */}
      {route.length > 0 && (
        <Polyline
          path={route}
          options={{
            strokeColor: "#00a86b",
            strokeWeight: 4,
          }}
        />
      )}

      {/* 🚚 DEFAULT GOOGLE MARKER (NO IMAGE URL) */}
      {animatedPosition && (
        <Marker
          position={animatedPosition}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#00a86b",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#fff",
          }}
        />
      )}
    </GoogleMap>
  );
}
