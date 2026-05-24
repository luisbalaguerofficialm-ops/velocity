import React from "react";

export default function PaymentSecurity() {
  return (
    <div className="bg-[#e2fffe] text-[#002020] min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* <!-- Amount Input Header --> */}
        <div className="w-full max-w-2xl mb-12 text-center">
          <span className="font-label text-[0.75rem] uppercase tracking-[0.1rem] font-extrabold text-[#006d36] mb-2 block">
            Transaction Settlement
          </span>
          <h2 className="font-display text-4xl font-bold text-[#001736] mb-6">
            Authorize Funds
          </h2>
          <div className="relative group">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#001736] font-bold text-2xl">
              $
            </span>
            <input
              className="w-full bg-white border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 text-[#001736] text-5xl font-extrabold py-8 px-12 rounded-xl transition-all text-center placeholder-[#c4c6d0]/30"
              placeholder="0.00"
              type="text"
              value="2,450.00"
            />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#006d36] rounded-full opacity-40"></div>
          </div>
        </div>
        <div className="w-full max-w-2xl space-y-6">
          {/* <!-- Credit Card Section --> */}
          <section className="bg-[#d7fafa] rounded-xl p-8 overflow-hidden shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#006d36] flex items-center justify-center rounded-lg">
                  <span
                    className="material-symbols-outlined text-white"
                    data-icon="credit_card"
                  >
                    credit_card
                  </span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-[#001736]">
                    Credit / Debit Card
                  </h3>
                  <p className="text-body-sm text-[#43474f]">
                    Secure instant processing
                  </p>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-[#006d36]"
                data-icon="expand_less"
              >
                expand_less
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block font-label text-[0.6875rem] uppercase tracking-wider font-bold text-[#43474f] mb-2">
                  Cardholder Name
                </label>
                <input
                  className="w-full bg-white border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 p-4 rounded-lg font-medium text-[#001736]"
                  placeholder="Enter full name"
                  type="text"
                />
              </div>
              <div className="md:col-span-2 relative">
                <label className="block font-label text-[0.6875rem] uppercase tracking-wider font-bold text-[#43474f] mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-white border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 p-4 pr-12 rounded-lg font-medium text-[#001736]"
                    placeholder="XXXX XXXX XXXX XXXX"
                    type="text"
                  />
                  <span
                    className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#43474f]"
                    data-icon="payment"
                  >
                    payment
                  </span>
                </div>
              </div>
              <div>
                <label className="block font-label text-[0.6875rem] uppercase tracking-wider font-bold text-[#43474f] mb-2">
                  Expiry Date (MM/YY)
                </label>
                <input
                  className="w-full bg-white border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 p-4 rounded-lg font-medium text-[#001736]"
                  placeholder="MM / YY"
                  type="text"
                />
              </div>
              <div>
                <label className="block font-label text-[0.6875rem] uppercase tracking-wider font-bold text-[#43474f] mb-2">
                  CVV/CVC
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-white border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 p-4 rounded-lg font-medium text-[#001736]"
                    placeholder="***"
                    type="password"
                  />
                  <span
                    className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#43474f] cursor-help"
                    data-icon="help_outline"
                  >
                    help_outline
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- Bank Transfer Section --> */}
          <section className="bg-[#d7fafa] rounded-xl p-8 hover:opacity-100 transition-all shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#ffffff] flex items-center justify-center rounded-lg">
                  <span
                    className="material-symbols-outlined text-[#001736]"
                    data-icon="account_balance"
                  >
                    account_balance
                  </span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-bold text-[#001736]">
                    Bank Transfer
                  </h3>
                  <p className="text-body-sm text-[#43474f]">
                    B2B Direct Ledger Settlement
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex gap-2">
                  <span className="px-3 py-1 bg-[#ffffff] rounded-full font-label text-[0.6rem] font-bold text-[#001736] uppercase">
                    Wire
                  </span>
                  <span className="px-3 py-1 bg-[#ffffff] rounded-full font-label text-[0.6rem] font-bold text-[#001736] uppercase">
                    Ach
                  </span>
                </div>
                <span
                  className="material-symbols-outlined text-[#43474f]"
                  data-icon="expand_more"
                >
                  expand_more
                </span>
              </div>
            </div>
          </section>
          {/* <!-- Authorization Action --> */}
          <div className="pt-6">
            <button className="w-full emerald-gradient py-6 rounded-xl flex justify-center items-center gap-3 group transition-transform active:scale-95 shadow-xl">
              <span className="font-headline text-xl font-extrabold uppercase tracking-widest text-white">
                Authorize $2,450.00
              </span>
              <span
                className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform text-2xl"
                data-icon="arrow_forward"
              >
                arrow_forward
              </span>
            </button>
            <p className="mt-6 text-center text-[0.7rem] text-[#43474f] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
              <span
                className="material-symbols-outlined text-sm text-[#006d36]"
                data-icon="lock"
              >
                lock
              </span>
              Secure 256-bit SSL encrypted transaction
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
