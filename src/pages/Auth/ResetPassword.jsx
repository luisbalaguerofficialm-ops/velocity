import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleVerifyAccount = () => {
    navigate("/verify", { replace: true });
  };

  return (
    <div className="bg-[#e2fffe] font-body text-[#002020] selection:bg-[#83fba5] selection:text-[#00743a]">
      <main className="min-h-screen w-full flex overflow-hidden">
        {/* <!-- Left Side: Cinematic Visual --> */}
        <section className="hidden lg:block lg:w-7/12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#001736]/20 mix-blend-multiply z-10"></div>
          <img
            alt="Cinematic cargo airplane"
            class="absolute inset-0 w-full h-full object-cover"
            data-alt="Cinematic side profile of a massive cargo airplane on a wet tarmac at dusk, emerald green wingtip navigation lights glowing intensely against a deep navy blue sky"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0iTOLp7WNPGW-uUuE0SYOJ7B9L7o5LqGr_xySt2rGH9zVQPJuvOCvK6p0G16Q04e78iafMlUaKSHNB_l9sySiU6EqLNdRU35WSq28sY7MG7yahFNKuf6VbTDiDOQOAuk2N84TDG9Mz0blLdakCVK8vAgJPwBtKNmKxaaN7boa0cyyc0sRW1LL4lGwg7BTXsXYfEeCoszdG0i_ue0Mt5o097aeW3xdZP3w7Kvt8gcAO3wESIdkHs-BH-fD1jPoBUcx7hFmTu4zC79b"
          />
          {/* <!-- Branding Overlay --> */}
          <div className="absolute top-12 left-12 z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#006d36] flex items-center justify-center rounded-xl shadow-xl">
                <span
                  className="material-symbols-outlined text-white"
                  data-icon="speed"
                >
                  speed
                </span>
              </div>
              <span className="font-headline font-extrabold text-2xl tracking-tighter text-white uppercase">
                Kinetic Logistics
              </span>
            </div>
          </div>
          {/* <!-- Kinetic Quote Overlay --> */}
          <div className="absolute bottom-20 left-12 right-12 z-20 max-w-lg">
            <h2 className="font-headline text-4xl font-bold text-white leading-tight mb-4">
              Securing the speed of global commerce.
            </h2>
            <div className="h-1 w-24 bg-[#006d36]"></div>
          </div>
        </section>
        {/* <!-- Right Side: Interaction Canvas --> */}
        <section className="w-full lg:w-5/12 bg-[#e2fffe] flex flex-col justify-between p-8 md:p-16 lg:p-20 relative">
          {/* <!-- Mobile Branding --> */}
          <div className="lg:hidden mb-12 flex items-center gap-3">
            <span className="font-headline font-extrabold text-xl tracking-tighter text-[#001736] uppercase">
              Kinetic Logistics
            </span>
          </div>
          <div className="max-w-md mx-auto w-full flex-grow flex flex-col justify-center">
            <header className="mb-10">
              <h1 className="font-headline text-3xl font-extrabold text--[#001736] tracking-tight mb-2">
                Set New Password
              </h1>
              <p className="text-[#43474f] font-medium">
                Reset your Velocity Transit credentials to resume fleet
                management.
              </p>
            </header>
            <form className="space-y-8" onsubmit="return false;">
              {/* <!-- New Password Field --> */}
              <div className="space-y-2 accent-bar-input">
                <label className="block text-[0.6875rem] font-bold uppercase tracking-widest text-[#747780]/60 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-[#ffffff] border-0 py-4 px-4 text-[#001736] focus:ring-0 placeholder:text-[#c4c6d0] font-medium transition-all"
                    placeholder="••••••••••••"
                    type="password"
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#747780] hover:text-[#006d36] transition-colors"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    >
                      visibility
                    </span>
                  </button>
                  <div className="accent-bar absolute bottom-0 left-0 h-[2px] w-0 bg-[#c4c6d0] transition-all duration-300"></div>
                </div>
              </div>
              {/* <!-- Confirm New Password Field --> */}
              <div className="space-y-2 accent-bar-input">
                <label className="block text-[0.6875rem] font-bold uppercase tracking-widest text-[#001736]/60 ml-1">
                  Confirm New Password
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-[#ffffff] border-0 py-4 px-4 text-[#001736] focus:ring-0 placeholder:text-[#c6e9e9] font-medium transition-all"
                    placeholder="••••••••••••"
                    type="password"
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#747780] hover:text-[#006d36] transition-colors"
                    type="button"
                  >
                    <span
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    >
                      visibility
                    </span>
                  </button>
                  <div className="accent-bar absolute bottom-0 left-0 h-[2px] w-0 bg-[#c4c6d0] transition-all duration-300"></div>
                </div>
              </div>
              {/* <!-- Password Requirements Checklist --> */}
              <div className="bg-[#d7fafa] p-6 rounded-xl space-y-3">
                <p className="text-[0.6875rem] font-extrabold uppercase tracking-widest text-[#001736]/40 mb-2">
                  Security Manifest
                </p>
                <div className="flex items-center gap-3 text-[#006d36]">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="text-sm font-semibold">
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#006d36]">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="check_circle"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="text-sm font-semibold">
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#002020]/40">
                  <span
                    className="material-symbols-outlined text-sm"
                    data-icon="circle"
                  >
                    circle
                  </span>
                  <span className="text-sm font-medium">One number</span>
                </div>
              </div>
              {/* <!-- Submit Button --> */}
              <button
                onClick={handleVerifyAccount}
                className="w-full kinetic-gradient text-white py-5 px-8 rounded-xl font-headline font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 shadow-xl hover:shadow-secondary/20 transition-all active:scale-95 group"
                type="submit"
              >
                <span>Update Password</span>
                <span
                  className="material-symbols-outlined text-[#83fba5] group-hover:translate-x-1 transition-transform"
                  data-icon="arrow_forward"
                >
                  arrow_forward
                </span>
              </button>
            </form>
            <div className="mt-8 text-center">
              <a
                className="text-sm font-bold text-primary/60 hover:text-[#006d36] transition-colors"
                href="#"
              >
                Return to login terminal
              </a>
            </div>
          </div>
          {/* <!-- Footer Meta --> */}
          <footer className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.6875rem] font-bold uppercase tracking-widest text-primary/30 border-t border-primary/5">
            <div className="flex gap-6">
              <a className="hover:text-[#001736] transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-[#001736] transition-colors" href="#">
                Security Protocol
              </a>
            </div>
            <div>© 2026 Kinetic Logistics v2.4.0</div>
          </footer>
        </section>
      </main>
    </div>
  );
}
