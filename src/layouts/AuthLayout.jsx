import React from "react";
import { Outlet, useLocation } from "react-router-dom";

/**
 * Velocity Transit Logo Component
 */
const Logo = () => (
  <div className="text-2xl font-extrabold text-[#001736] tracking-tight">
    Velocity Transit
  </div>
);

/**
 * Auth Slideshow Component
 */
const AuthSlideshow = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92", // placeholder
      quote:
        "Velocity Transit has redefined our logistics efficiency. Real-time tracking and automated manifests have reduced our delivery lag by 45%.",
      author: "Alex Sterling, Operations Lead",
    },
    {
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d", // placeholder
      quote:
        "The Kinetic Precision engine provides high-velocity supply chain management for the modern global economy.",
      author: "Marcus Thorne, Fleet Manager",
    },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <img
        src={slides[0].image}
        alt="Logistics Visual"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#001736]/70"></div>

      {/* Text Content */}
      <div className="absolute bottom-20 left-16 right-16 text-white space-y-6">
        <div className="w-12 h-1 bg-[#83fba5] rounded-full" />
        <p className="text-3xl font-semibold leading-tight italic">
          "{slides[0].quote}"
        </p>
        <p className="text-[#83fba5] font-bold tracking-widest uppercase text-sm">
          — {slides[0].author}
        </p>
      </div>
    </div>
  );
};

/**
 * Auth Layout
 */
export default function AuthLayout() {
  const location = useLocation();

  const hideSlideshow =
    location.pathname.includes("auth/reset-password") ||
    location.pathname.includes("auth/verify") ||
    location.pathname.includes("signin");

  return (
    <div className="flex min-h-screen">
      {/* Left Side (Form Area) */}
      <div
        className={`flex flex-col w-full ${
          !hideSlideshow ? "lg:w-1/2" : ""
        } bg-[#e2fffe] px-6 sm:px-12 md:px-20 py-10 z-10`}
      >
        {/* Logo */}
        <div className="mb-10">
          <Logo />
        </div>

        {/* Form Content */}
        <div className="flex flex-1 items-center justify-center max-w-lg mx-auto w-full">
          <div className="w-full bg-white/40 backdrop-blur-xl border border-white/60 p-8 sm:p-12 rounded-[2rem] shadow-2xl shadow-[#001736]/5">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center lg:text-left">
          <p className="text-[#001736]/50 text-xs font-medium tracking-wide uppercase">
            &copy; 2026 Velocity Transit. Kinetic Logistics Infrastructure.
          </p>
        </div>
      </div>

      {/* Right Side (Slideshow) */}
      {!hideSlideshow && (
        <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 border-l border-[#83fba5]/10">
          <AuthSlideshow />
        </div>
      )}
    </div>
  );
}
