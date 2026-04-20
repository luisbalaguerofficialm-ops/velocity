import React from "react";

export default function ShipmentTracking() {
  return (
    <body className="bg-surface font-body text-on-surface selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      <div className="flex pt-20 h-screen overflow-hidden">
        {/* <!-- Main Content Area --> */}
        <main className="flex-1 overflow-y-auto bg-surface-container-low p-8 lg:p-12">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* <!-- Profile Header --> */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-xl object-cover shadow-lg border-4 border-white"
                    data-alt="High resolution profile portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6znlOKXmxw3koGhKgwpwl3MYRLd16dvHbC3vRtPiFYOIJZdWUU63GAbs2HnQtnW0Ob0SV-UOlwE1m7KWhh_JWmM-maDkRHWFwOlEqQdWbC0g4CDu45UqEk6nHg7ywhZjP2pobBJSKZKECppHccW7gonfuDE3I5f3a8Yo95jjIOTfEO60l1Q_LbIq0nXFwju97pekPQSaq-73kzdAvGblVxtMgcGJYETv0O62gqh6e8bWG2FUC7brtlgMCXgz3jBVf1p2QwAR8AcfX"
                  />
                  <button
                    className="absolute -bottom-2 -right-2 bg-secondary text-white p-2 rounded-lg shadow-md hover:scale-105 transition-transform material-symbols-outlined"
                    data-icon="photo_camera"
                  >
                    photo_camera
                  </button>
                </div>
                <div>
                  <h1 className="text-4xl font-headline font-extrabold text-primary tracking-tight">
                    Alex Sterling
                  </h1>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                      <span
                        className="material-symbols-outlined text-lg"
                        data-icon="badge"
                      >
                        badge
                      </span>
                      System Admin
                    </span>
                    <span className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                      <span
                        className="material-symbols-outlined text-lg"
                        data-icon="domain"
                      >
                        domain
                      </span>
                      Velocity Transit HQ
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-secondary border border-secondary/20 font-bold rounded-lg shadow-sm hover:bg-secondary-fixed/20 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined" data-icon="edit">
                  edit
                </span>
                Edit Profile
              </button>
            </header>
            {/* <!-- Bento Grid Layout --> */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* <!-- Contact Info & Notifications (Left Column) --> */}
              <div className="lg:col-span-8 space-y-8">
                {/* <!-- Contact Information --> */}
                <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-6">
                  <h2 className="text-xl font-headline font-bold text-secondary">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Email Address
                      </label>
                      <p className="font-medium text-lg">
                        alex.sterling@velocity.com
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Phone Number
                      </label>
                      <p className="font-medium text-lg">+1 (555) 234-8901</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Company
                      </label>
                      <p className="font-medium text-lg">
                        Velocity Transit Corp.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                        Language Preference
                      </label>
                      <p className="font-medium text-lg">
                        English (United States)
                      </p>
                    </div>
                  </div>
                </section>
                {/* <!-- Notifications --> */}
                <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-headline font-bold text-secondary mb-6">
                    Notifications
                  </h2>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                      <div>
                        <p className="font-bold text-on-surface">
                          Shipment Updates
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          Real-time status changes for all active transit items.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked=""
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                      <div>
                        <p className="font-bold text-on-surface">
                          Promotional Emails
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          Stay updated on new routes, features, and logistics
                          discounts.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input className="sr-only peer" type="checkbox" />
                        <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-bold text-on-surface">
                          Security Alerts
                        </p>
                        <p className="text-sm text-on-surface-variant">
                          Critical alerts regarding your account access and
                          verification.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          checked=""
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                      </label>
                    </div>
                  </div>
                </section>
              </div>
              {/* <!-- Side Widgets (Right Column) --> */}
              <div className="lg:col-span-4 space-y-8">
                {/* <!-- Kinetic Plus Subscription Card --> */}
                <section className="bg-gradient-kinetic p-8 rounded-2xl text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="px-3 py-1 bg-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
                        Premium Tier
                      </div>
                      <span
                        className="material-symbols-outlined text-4xl opacity-50"
                        data-icon="rocket_launch"
                      >
                        rocket_launch
                      </span>
                    </div>
                    <h3 className="text-3xl font-headline font-extrabold italic tracking-tighter mb-4">
                      Kinetic Plus
                    </h3>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start gap-2 text-sm text-white/80">
                        <span
                          className="material-symbols-outlined text-secondary"
                          data-icon="check_circle"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        Unlimited Global Tracking
                      </li>
                      <li className="flex items-start gap-2 text-sm text-white/80">
                        <span
                          className="material-symbols-outlined text-secondary"
                          data-icon="check_circle"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        15% Priority Discount
                      </li>
                      <li className="flex items-start gap-2 text-sm text-white/80">
                        <span
                          className="material-symbols-outlined text-secondary"
                          data-icon="check_circle"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        24/7 Dedicated Concierge
                      </li>
                    </ul>
                    <button className="w-full py-4 bg-white text-secondary font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-transform">
                      Manage Subscription
                    </button>
                  </div>
                </section>
                {/* <!-- Quick Actions / Meta --> */}
                <div className="bg-surface-container-highest/30 p-6 rounded-xl space-y-4">
                  <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-lg text-secondary"
                      data-icon="history"
                    >
                      history
                    </span>
                    Last logged in: Today, 10:45 AM
                  </p>
                  <p className="text-sm font-bold text-on-surface-variant flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-lg text-secondary"
                      data-icon="verified_user"
                    >
                      verified_user
                    </span>
                    2FA Security: Enabled
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Bottom Sections: Addresses and Payments --> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* <!-- Saved Addresses --> */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-headline font-bold text-secondary">
                    Saved Addresses
                  </h2>
                  <button className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline">
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="add"
                    >
                      add
                    </span>
                    Add New
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-secondary-fixed rounded-lg flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-secondary"
                          data-icon="apartment"
                        >
                          apartment
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Global HQ</p>
                        <p className="text-xs text-on-surface-variant">
                          Default Shipping
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      101 Velocity Blvd, Suite 400
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                  <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-secondary-fixed rounded-lg flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-secondary"
                          data-icon="home"
                        >
                          home
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Home Office</p>
                        <p className="text-xs text-on-surface-variant">
                          Personal
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      452 Sterling Heights Dr
                      <br />
                      Palo Alto, CA 94301
                    </p>
                  </div>
                </div>
              </section>
              {/* <!-- Payment Methods --> */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-headline font-bold text-secondary">
                    Payment Methods
                  </h2>
                  <button className="text-secondary font-bold text-sm flex items-center gap-1 hover:underline">
                    <span
                      className="material-symbols-outlined text-lg"
                      data-icon="add"
                    >
                      add
                    </span>
                    Add Card
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-container-lowest px-6 py-4 rounded-xl flex items-center justify-between border border-outline-variant/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-[10px] text-white font-bold italic">
                        VISA
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">•••• 4242</p>
                        <p className="text-xs text-on-surface-variant">
                          Expires 12/26
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-secondary-fixed text-secondary px-2 py-0.5 rounded-full font-bold">
                        Default
                      </span>
                      <button
                        className="material-symbols-outlined text-on-surface-variant hover:text-secondary"
                        data-icon="more_vert"
                      >
                        more_vert
                      </button>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest px-6 py-4 rounded-xl flex items-center justify-between border border-outline-variant/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-blue-700 rounded flex items-center justify-center text-[10px] text-white font-bold italic">
                        CHASE
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">•••• 9012</p>
                        <p className="text-xs text-on-surface-variant">
                          Expires 08/25
                        </p>
                      </div>
                    </div>
                    <button
                      className="material-symbols-outlined text-on-surface-variant hover:text-secondary"
                      data-icon="more_vert"
                    >
                      more_vert
                    </button>
                  </div>
                </div>
              </section>
            </div>
            {/* <!-- Footer Actions --> */}
            <footer className="pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-on-surface-variant">
                © 2026 Velocity Transit. Kinetic Precision Design System v2.1
              </p>
              <a
                className="text-error font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-lg"
                  data-icon="delete_forever"
                >
                  delete_forever
                </span>
                Deactivate Account
              </a>
            </footer>
          </div>
        </main>
      </div>
    </body>
  );
}
