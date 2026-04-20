import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerificationSuccess() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/signIn", { replace: true });
  };

  return (
    <div className="bg-[#e2fffe] text-[#002020] selection:bg-[#83fba5] selection:text-[#00210c] overflow-hidden">
      <main className="flex min-h-screen">
        {/* <!-- Split-screen Layout: Left Cinematic Section --> */}
        <section className="hidden md:flex w-1/2 relative kinetic-gradient items-center justify-center p-12">
          {/* <!-- Background Image with Tonal Depth --> */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
            <img
              alt="Global Logistics Hub"
              className="w-full h-full object-cover"
              data-alt="Cinematic wide shot of a massive modern cargo port at dusk with deep blue tones and glowing emerald port lights"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzy2nM_VpRN6HCveRJFHvdWGoOl5sr53izEJE0upo6qD31X7QtdwvgRDEYF05jgAph6AL4FWloD2kbI5fsNFhLv6Se35VsD2Thx-gspMyiUspDPGDsRiLpI3jobQApVoNVgX5UcWGzGBB-2_ULKaUIj5GrHw5QSNRlAFD61qfCUfIYq_mWKUVyT1_8tfmsNLu1QsdLTfAx1O2LPsfYh3nOq4imGjYD2DGlxnKu_JMci7yCcnDMU8ZKm8UDxPo8WhCvv7QdddKm6slI"
            />
          </div>
          {/* <!-- Glassmorphic Brand Overlay --> */}
          <div className="relative z-10 w-full max-w-lg p-8 backdrop-blur-xl bg-[#001736]/10 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="material-symbols-outlined text-[#006d36] text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                hub
              </span>
              <h1 className="text-surface font-headline text-3xl font-extrabold tracking-tighter">
                Logistics Kinetic
              </h1>
            </div>
            <h2 className="text-[#e2fffe] font-headline text-5xl font-bold leading-tight mb-6">
              Connecting the World with Precision.
            </h2>
            <p className="text-[#e2fffe]/70 font-body text-lg leading-relaxed">
              Your portal to high-velocity supply chain management is now ready.
              Experience the future of global transit.
            </p>
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#001736]"
                  data-alt="Professional logistics manager headshot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7DXc2t9Xg2-jN4ER4yT6u8Tb9eqomyquVbivFlRQEwEb6imFssWvXBy689m2YjXHwlIyZpjvKebM9AWB2oGzQyUWJ0zdqws_fuR04yKH3w8nwRhXnUWMreoiO2hOapnbdxmqFV0VH-ZLZ7IimDuCzT2O2KZqMVeFRH4GHliL6Q5toIl2Es2mRrOXwS9jVrfxcDEyQMHTMunwipq55WHPtTyEXh07_JRUjXepB7Xl2nCSgAS6fFoi30N-_w_3alrB0fy51dV8sqXJQ"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#001736]"
                  data-alt="Executive team member headshot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdmA9qATx2WR4MDeVp8Kayw2UNte3SQwY4Op2p8Jp1sU6Yoa8Wjfrijitjr5yP_3KHBV0WqWEnIeH7AYlzQsIhuI1AEZSJGCqoDdK-HvQ8CHzKNp3DZoFX-zdnXBKtbqi8TebHCt5J3nGrd_qtXjbLyx0X0-3xh7VGrvlBB0SFQvtUrJoKJaxjdD7kohmG5KWIwVrKXLZzKG1HMpE2jf7nqbTYZ868NTlLi26RbEKCFYo-6YkQUPRrA4NjB4CQSoDnOC2IVZ2IberU"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-[#001736]"
                  data-alt="Warehouse operations director headshot"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt5WijGhar7Svx4_zQPNr4T__cWMXEJrrTl0WMf6tuSv3Bc3J-buO-FTabsy2V6VpS5yPwmxUXrbVIEc8avT8NYSHmU2TY2LXqYnAyXitUUW3gm6dc_PF9rBRuW1MetpCZIpUfjz6FIfLjRzT7QZnuJbI5mDuSMIR4TAoSY3bmEc4etmHcglAiYup4Ruqs1736WshKG_CYVBNMAvhKiCu-6vUyAX-XIqTrDt_JvjuwqCEUGVq6bkjjdJCV7gBFTSRl3zSeC9mNzvqr"
                />
              </div>
              <span className="text-[#e2fffe]/50 text-sm font-label uppercase tracking-widest">
                Trusted by 2.4k+ Global Fleets
              </span>
            </div>
          </div>
        </section>
        {/* <!-- Split-screen Layout: Right Content Section --> */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-6 bg-[#ffffff]">
          <div className="w-full max-w-md text-center">
            {/* <!-- Success Illustration Area --> */}
            <div className="relative mb-12 flex justify-center">
              {/* <!-- Decorative concentric circles --> */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-[#83fba5]/20 scale-150"></div>
                <div className="absolute w-40 h-40 rounded-full bg-[#83fba5]/40 scale-125"></div>
              </div>
              {/* <!-- Main Checkmark Container --> */}
              <div className="relative w-32 h-32 bg-[#006d36] rounded-full flex items-center justify-center emerald-glow transition-transform duration-700 hover:scale-110">
                <span
                  className="material-symbols-outlined text-[#e2fffe] text-6xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>
            {/* <!-- Text Content --> */}
            <div className="space-y-4 mb-12">
              <h2 className="text-[#001736] font-headline text-4xl font-extrabold tracking-tight">
                Congratulations!
              </h2>
              <p className="text-[#747780] font-body text-lg max-w-sm mx-auto">
                Your account has been verified successfully
              </p>
            </div>
            {/* <!-- Features / Next Steps Bento-lite Card --> */}
            <div className="bg-[#d7fafa] rounded-2xl p-6 mb-10 text-left space-y-4">
              <h3 className="text-[#001736] font-label text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                Verified Privileges
              </h3>
              <div className="flex items-start gap-4 p-3 bg-[#ffffff] rounded-xl">
                <span className="material-symbols-outlined text-[#006d36]">
                  speed
                </span>
                <div>
                  <p className="text-[#001736] font-bold text-sm">
                    Instant Shipments
                  </p>
                  <p className="text-[#747780] text-xs">
                    Create and track orders in real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-[#ffffff] rounded-xl">
                <span className="material-symbols-outlined text-[#006d36]">
                  shield
                </span>
                <div>
                  <p className="text-[#001736] font-bold text-sm">
                    Full Cargo Insurance
                  </p>
                  <p className="text-[#747780] text-xs">
                    Your goods are now covered by Kinetic Shield.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Action Button --> */}
            <div className="space-y-4">
              <button
                onClick={handleContinue}
                className="w-full bg-[#006d36] text-[#e2fffe] font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-[#006d36]/60 emerald-glow"
              >
                Continue to Dashboard
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </button>
              <button className="w-full text-[#006d36]/60 font-label text-xs font-bold uppercase tracking-widest hover:text-[#001736] transition-colors py-2">
                Need Help? Contact Support
              </button>
            </div>
            {/* <!-- Footer Metadata --> */}
            <div className="mt-16 border-t border-[#c4c6d0]/15 pt-6 flex justify-center gap-8">
              <div className="text-center">
                <p className="text-[#001736] font-bold text-xl">0.0ms</p>
                <p className="text-[#747780] text-[10px] font-label uppercase">
                  Latency
                </p>
              </div>
              <div className="w-px h-8 bg-[#c4c6d0]/30 self-center"></div>
              <div className="text-center">
                <p className="text-[#001736] font-bold text-xl">99.9%</p>
                <p className="text-[#747780] text-[10px] font-label uppercase">
                  Uptime
                </p>
              </div>
              <div className="w-px h-8 bg-[#c4c6d0]/30 self-center"></div>
              <div className="text-center">
                <p className="text-[#001736] font-bold text-xl">AES</p>
                <p className="text-[#747780] text-[10px] font-label uppercase">
                  Security
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- Background Decoration (Subtle Kinetic Patterns) --> */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              height="40"
              id="grid"
              patternunits="userSpaceOnUse"
              width="40"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#001736"
                stroke-width="1"
              ></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
        </svg>
      </div>
    </div>
  );
}
