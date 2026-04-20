import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyAccount() {
  const navigate = useNavigate();

  const handleVerification = () => {
    navigate("/verification-Success", { replace: true });
  };

  return (
    <div className="bg-[#e2fffe] font-body text-[#001736] selection:bg-[#83fba5]">
      <main className="min-h-screen flex flex-col md:flex-row">
        <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#001736]">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            data-alt="Cinematic wide shot of a modern logistics hub at twilight with glowing blue and green industrial lights and cargo trucks in motion"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5YvydHlU-JTeN6jQVI2ZST2d3tB5YD7qQ24RTLowvtA89N4qG3sATwPxlcMOoh5abOTJz8MKqXOu-HHVmB_DOW0EY3-uIuFCmaMIWZ6Mo0Nxo4ScqDSKEycOzLA3lU2dICmtRB35HihObGVqNqNENX871-YFZzzn2nuHUlPY33mDbWvnMYx5i-FIhHLnPMR1sIQAI20DwIh3oma5JRfDpFL7Fs7s-hsB73dlh503eWTrOPIHt_CxH8IzfWlE6bkIKm8c66NT4s-WB"
          />
          <div className="relative z-10 p-12 flex flex-col justify-between h-full w-full">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#006d36] rounded-lg flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#ffffff]"
                  data-icon="local_shipping"
                >
                  local_shipping
                </span>
              </div>
              <span className="text-xl font-bold text-surface-bright tracking-tighter">
                Logistics Kinetic
              </span>
            </div>
            <div className="max-w-md">
              <h2 className="text-5xl font-extrabold text-[#e2fffe] leading-tight mb-6 tracking-tight">
                Securing Global <br />
                <span className="text-[#d6e3ff]">Velocity</span>.
              </h2>
              <p className="text-lg text-[#bee1e0]/80 leading-relaxed font-light">
                Our kinetic precision engine ensures your shipments move with
                unparalleled security and speed. Verification is the final step
                to full control.
              </p>
            </div>
            <div className="flex gap-8 items-center">
              <div className="flex flex-col">
                <span className="text-[#83fba5] font-bold text-2xl tracking-tighter">
                  99.9%
                </span>
                <span className="text-[#bee1e0] text-xs uppercase tracking-[0.1rem] font-semibold">
                  Uptime
                </span>
              </div>
              <div className="h-8 w-[1px] bg-[#bee1e0]/20"></div>
              <div className="flex flex-col">
                <span className="text-[#83fba5] font-bold text-2xl tracking-tighter">
                  1.2M+
                </span>
                <span className="text-[#bee1e0] text-xs uppercase tracking-[0.1rem] font-semibold">
                  Deliveries
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#001736] to-transparent opacity-40"></div>
        </section>
        <section className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#ffffff]">
          <div className="w-full max-w-md space-y-10">
            <div className="md:hidden flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ffffff] rounded-lg flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#fffff] text-sm"
                    data-icon="local_shipping"
                  >
                    local_shipping
                  </span>
                </div>
                <span className="text-lg font-bold text-[#001736] tracking-tighter">
                  Logistics Kinetic
                </span>
              </div>
            </div>
            <header className="space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#83fba5]/30 text-secondary mb-2">
                <span
                  className="material-symbols-outlined text-2xl"
                  data-icon="domain_verification"
                >
                  domain_verification
                </span>
              </div>
              <h1 className="text-4xl font-extrabold text-[#001736] tracking-tight">
                Enter the 6-digit Code
              </h1>
              <p className="text-on-[#43474f] text-sm font-medium leading-relaxed">
                We have sent a verification code to your email. Check your inbox
                and enter the digits below to access your kinetic dashboard.
              </p>
            </header>
            <div className="space-y-8">
              <div className="flex justify-between gap-2 md:gap-3">
                <input
                  className="pin-input w-full aspect-square text-center text-2xl font-bold bg-[#d7fafa] border-b-2 border-outline-variant text-primary rounded-t-lg transition-all focus:bg-surface-container-high"
                  maxlength="1"
                  placeholder="•"
                  type="text"
                />
                <input
                  className="pin-input w-full aspect-square text-center text-2xl font-bold bg-[#d7fafa] border-b-2 border-outline-variant text-primary rounded-t-lg transition-all focus:bg-surface-container-high"
                  maxlength="1"
                  placeholder="•"
                  type="text"
                />
                <input
                  className="pin-input w-full aspect-square text-center text-2xl font-bold bg-[#d7fafa] border-b-2 border-outline-variant text-primary rounded-t-lg transition-all focus:bg-surface-container-high"
                  maxlength="1"
                  placeholder="•"
                  type="text"
                />
                <input
                  className="pin-input w-full aspect-square text-center text-2xl font-bold bg-[#d7fafa] border-b-2 border-outline-variant text-primary rounded-t-lg transition-all focus:bg-surface-container-high"
                  maxlength="1"
                  placeholder="•"
                  type="text"
                />
                <input
                  className="pin-input w-full aspect-square text-center text-2xl font-bold bg-[#d7fafa] border-b-2 border-outline-variant text-primary rounded-t-lg transition-all focus:bg-surface-container-high"
                  maxlength="1"
                  placeholder="•"
                  type="text"
                />
                <input
                  className="pin-input w-full aspect-square text-center text-2xl font-bold bg-[#d7fafa] border-b-2 border-outline-variant text-primary rounded-t-lg transition-all focus:bg-surface-container-high"
                  maxlength="1"
                  placeholder="•"
                  type="text"
                />
              </div>
              <div className="space-y-4">
                Once you enter the code, click the button below to verify your
                account and access the dashboard.
              </div>
              <div className="space-y-4">
                <button
                  onClick={handleVerification}
                  className="w-full bg-gradient-to-br from-[#006d36] to-[#264778] text-[#ffffff] font-bold py-4 rounded-xl shadow-[0_8px_20px_-4px_rgba(0,109,54,0.3)] hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Verify Account</span>
                  <span
                    className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform"
                    data-icon="arrow_forward"
                  >
                    arrow_forward
                  </span>
                </button>
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
                  <div className="flex items-center gap-2 text-[#43474f] text-sm font-semibold">
                    <span
                      className="material-symbols-outlined text-lg animate-pulse"
                      data-icon="schedule"
                    >
                      schedule
                    </span>
                    <span>Resend in 02:54</span>
                  </div>
                  <button className="text-[#006d36] font-bold text-sm hover:underline underline-offset-4 decoration-2 decoration-[#006d36]/30 transition-all">
                    Resend Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
