import React from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleVerifyAccount = () => {
    navigate("/verify", { replace: true });
  };

  return (
    <body class="bg-[#e2fffe] font-body text-on-surface min-h-screen flex flex-col">
      {/* <!-- TopAppBar --> */}
      <header class="w-full top-0 sticky bg-[#e2fffe] dark:bg-[#002020] z-50">
        <div class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div class="flex items-center gap-4">
            <span class="material-symbols-outlined text-[#001736] dark:text-[#e2fffe] cursor-pointer scale-95 active:scale-90 transition-transform">
              arrow_back
            </span>
            <h1 class="text-xl font-bold text-[#001736] dark:text-[#e2fffe] tracking-tighter">
              Velocity Transit
            </h1>
          </div>
        </div>
        <div class="bg-[#bee1e0] dark:bg-[#002b5b]/20 h-px w-full"></div>
      </header>
      <main class="grow flex items-center justify-center p-0 md:p-6 lg:p-12">
        <div class="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[#ffffff] rounded-xl shadow-2xl shadow-[#002020]/5 min-h-175">
          {/* <!-- Left Side: Visual Anchor --> */}
          <div class="relative hidden md:flex items-end p-12 overflow-hidden">
            <div class="absolute inset-0 bg-[#001736]">
              <img
                alt="Global logistics network lines and transit"
                class="w-full h-full object-cover opacity-60 mix-blend-overlay"
                data-alt="Abstract global transit network connections with glowing nodes"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMvhbnxI6g6ok13qRvDeAokdHPdEpHsxmWA68L-qIIMWiHiStmWIX4C6m8RRg2ilMo_4dr3sDVMh9EL8LD1jcKVxACMlFC-jp9pNhQRTiIkxtc--oXMnmqih_eeX74LUaAd8_523CH1hfM-B73Ldi5e-6tGTojXFZWDsjtOoXX-VUm0bnfQaz51W05pB5xzOkyn_7Y0U6bZfd_D2i5l436dAP4VaW4Zevp_4c6eVEDTbPPG-DAXYKdpdqQFTfkHos3lBldTz3ndpEP"
              />
              <div class="absolute inset-0 bg-linear-to-t from-[#006d36]/80 via-[#006d36]/20 to-transparent"></div>
            </div>
            <div class="relative z-10">
              <div class="inline-block px-3 py-1 bg-[#83fba5] text-[#00743a] text-[0.6875rem] font-bold tracking-[0.05rem] uppercase mb-6">
                Kinetic Logistics
              </div>
              <h2 class="text-5xl font-extrabold text-[#ffffff] tracking-tighter leading-tight max-w-md">
                Start your journey with Velocity Transit
              </h2>
              <p class="mt-6 text-[#ffffff]/80 font-medium max-w-sm body-md">
                Join the next generation of precision logistics and aerodynamic
                infrastructure.
              </p>
            </div>
          </div>
          {/* <!-- Right Side: Registration Form --> */}
          <div class="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-24 bg-surface-container-lowest">
            <div class="max-w-md w-full mx-auto">
              <div class="mb-10">
                <span class="text-[0.6875rem] font-bold text-[#006d36] tracking-[0.1rem] uppercase block mb-2">
                  Registration
                </span>
                <h3 class="text-3xl font-bold text-[#001736] tracking-tight">
                  Create Your Account
                </h3>
                <p class="text-[#43474f] body-md mt-2">
                  Enter your details to access the dashboard.
                </p>
              </div>
              <form class="space-y-6">
                {/* <!-- Name Field --> */}
                <div class="group">
                  <label class="block text-[0.6875rem] font-bold text-primary tracking-[0.05rem] uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    class="w-full bg-[#d7fafa] border-none focus:ring-0 px-4 py-3 text-[#002020] body-md rounded-lg transition-all border-b-2 border-[#c4c6d0] focus:border-[#006d36]"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                {/* <!-- Email Field --> */}
                <div class="group">
                  <label class="block text-[0.6875rem] font-bold text-[#001736] tracking-[0.05rem] uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    class="w-full bg-[#d7fafa] border-none focus:ring-0 px-4 py-3 text-[#002020] body-md rounded-lg transition-all border-b-2 border-[#c4c6d0] focus:border-[#006d36]"
                    placeholder="john@velocity.com"
                    type="email"
                  />
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* <!-- Password Field --> */}
                  <div class="group">
                    <label class="block text-[0.6875rem] font-bold text-[#001736] tracking-[0.05rem] uppercase mb-2">
                      Password
                    </label>
                    <input
                      class="w-full bg-[#d7fafa] border-none focus:ring-0 px-4 py-3 text-[#002020] body-md rounded-lg transition-all border-b-2 border-[#c4c6d0] focus:border-[#006d36]"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  {/* <!-- Confirm Password Field --> */}
                  <div class="group">
                    <label class="block text-[0.6875rem] font-bold text-[#001736] tracking-[0.05rem] uppercase mb-2">
                      Confirm Password
                    </label>
                    <input
                      class="w-full bg-[#d7fafa] border-none focus:ring-0 px-4 py-3 text-[#002020] body-md rounded-lg transition-all border-b-2 border-[#c4c6d0] focus:border-[#006d36]"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>
                {/* <!-- Terms of Service --> */}
                <div class="flex items-start gap-3 py-2">
                  <input
                    class="mt-1 rounded-sm border-[#c4c6d0] text-[#006d36] focus:ring-[#006d36]/20"
                    id="terms"
                    type="checkbox"
                  />
                  <label
                    class="text-xs text-[#43474f] font-medium leading-relaxed"
                    for="terms"
                  >
                    I agree to the{" "}
                    <span class="text-secondary font-bold cursor-pointer hover:underline transition-all">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span class="text-[#006d36] font-bold cursor-pointer hover:underline transition-all">
                      Privacy Policy
                    </span>
                    .
                  </label>
                </div>
                {/* <!-- Action Button --> */}
                <button
                  onClick={handleVerifyAccount}
                  class="w-full py-4 bg-[#006d36] text-[#ffffff] font-bold tracking-tight rounded-xl flex items-center justify-center gap-2 hover:bg-[#00743a] transition-all active:scale-95 shadow-lg shadow-[#006d36]/10"
                  type="submit"
                >
                  Create Account
                  <span class="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </button>
              </form>
              <div class="mt-12 text-center">
                <p class="text-sm text-[#43474f] font-medium">
                  Already have an account?
                </p>
                <Link
                  to="/signin"
                  class="text-[#006d36] font-bold ml-1 hover:text-[#00743a] transition-colors underline decoration-outline-variant underline-offset-4"
                  href="#"
                >
                  Sign in here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <!-- Footer --> */}
      <footer class="w-full py-8 mt-auto bg-[#e2fffe] dark:bg-[#001736]">
        <div class="border-t border-[#c4c6d0]/15"></div>
        <div class="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-7xl mx-auto pt-8">
          <span class="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b] dark:text-[#e2fffe] opacity-80 hover:opacity-100 transition-opacity">
            © 2026 Velocity Transit. Kinetic Precision Logistics.
          </span>
          <div class="flex gap-8">
            <a
              class="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b]/70 dark:text-[#c6e9e9]/70 hover:text-[#006d36] dark:hover:text-[#83fba5] transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              class="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b]/70 dark:text-[#c6e9e9]/70 hover:text-[#006d36] dark:hover:text-[#83fba5] transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              class="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b]/70 dark:text-[#c6e9e9]/70 hover:text-[#006d36] dark:hover:text-[#83fba5] transition-colors"
              href="#"
            >
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </body>
  );
}
