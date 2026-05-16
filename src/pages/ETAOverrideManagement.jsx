import React from 'react'

const ETAOverrideManagement = () => {
  return (
    <div
    className="bg-surface text-on-surface antialiased overflow-hidden">

<main className="min-h-screen flex flex-col relative bg-surface">

<div className="flex-1 p-10 overflow-y-auto">
<div className="max-w-6xl mx-auto space-y-8">
{/* <!-- Shipment Context Card (Bento Style) --> */}
<section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
<div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-outline-variant/15 flex flex-col justify-between relative overflow-hidden group">
<div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
<span className="material-symbols-outlined text-[160px]">local_shipping</span>
</div>
<div className="relative z-10">
<div className="flex items-center gap-3 mb-6">
<span className="px-3 py-1 bg-primary text-white text-[10px] font-black tracking-widest rounded-full uppercase">Priority Alpha</span>
<span className="text-sm font-bold text-primary/60">ID #VEL-TX-99021</span>
</div>
<div className="flex items-end justify-between gap-12">
<div className="space-y-4">
<div className="space-y-1">
<p className="text-[10px] uppercase tracking-tighter text-outline font-bold">Route Origin</p>
<h2 className="text-2xl font-bold text-primary tracking-tight">Chicago Hub</h2>
</div>
<div class="flex items-center gap-4">
<div class="h-px bg-outline-variant/30 w-12 relative">
<div class="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-secondary"></div>
</div>
<span class="material-symbols-outlined text-secondary">trending_flat</span>
<div class="h-px bg-outline-variant/30 w-12"></div>
</div>
<div class="space-y-1">
<p class="text-[10px] uppercase tracking-tighter text-outline font-bold">Terminal Destination</p>
<h2 class="text-2xl font-bold text-primary tracking-tight">New York Terminal</h2>
</div>
</div>
<div class="bg-surface-container-low p-6 rounded-xl border border-secondary/20 flex flex-col items-center justify-center min-w-[200px]">
<p class="text-[10px] uppercase tracking-widest text-secondary font-black mb-2">Current AI ETA</p>
<div class="text-4xl font-extrabold text-secondary flex items-baseline gap-1">
                                        3-5 <span class="text-sm font-bold uppercase">Days</span>
</div>
<div class="mt-3 flex items-center gap-2 text-[11px] font-medium text-secondary/60">
<span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                                        Predictive confidence: 92%
                                    </div>
</div>
</div>
</div>
</div>
<div class="md:col-span-4 bg-primary-container p-8 rounded-xl text-white flex flex-col justify-between relative overflow-hidden">
<img class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" data-alt="A futuristic digital representation of a high-speed logistics truck moving through a neon-lit urban landscape at night. The image emphasizes kinetic motion with streaks of emerald green and navy blue light trail effects. The style is sharp and high-contrast, representing the precision and speed of Velocity Transit. The overall composition is sleek, modern, and high-tech, fitting the aerodynamic archive aesthetic." src="https://lh3.googleusercontent.com/aida/ADBb0ugQPs8uURYPQF5xV3gpV94eKbO7U0U8xCYk1kIxeS8xFUw4j8nwVPU0RMT0n9qjULmQflqGUjTfPu4LC_0LcxHtEIu_cx0Pq7YyGZlAtDKgJppEbyKAtsZbrSAW66vcyJO0l7DzFPuyv07BMiP5qMx3a4qWtMlPPCnGj9QXfPxwx7a5dtBM2EK4JpHKbNKxsvMRTls7EC9IzqMJQSrLj5ZJzjdc1U8vw_WvkaTwqA9QsLMTg4e-7ULs5nDm"/>
<div class="relative z-10">
<h3 class="text-lg font-bold mb-2">Fleet Status</h3>
<div class="space-y-4 mt-6">
<div class="flex justify-between items-end border-b border-white/10 pb-2">
<span class="text-xs text-white/60">Assigned Asset</span>
<span class="font-bold">VT-TRUCK-88</span>
</div>
<div class="flex justify-between items-end border-b border-white/10 pb-2">
<span class="text-xs text-white/60">Current Velocity</span>
<span class="font-bold">64 MPH</span>
</div>
<div class="flex justify-between items-end">
<span class="text-xs text-white/60">Cargo Density</span>
<span class="font-bold">89%</span>
</div>
</div>
</div>
<div class="relative z-10 mt-8">
<button class="w-full py-3 bg-secondary text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">map</span>
                                Live Tracking
                            </button>
</div>
</div>
</section>
{/* <!-- Manual Configuration Area --> */}
<section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/* <!-- Config Form --> */}
<div class="lg:col-span-2 space-y-6">
<div class="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-outline-variant/15">
<div class="flex items-center gap-3 mb-8">
<div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined">edit_calendar</span>
</div>
<h3 class="text-xl font-extrabold text-primary tracking-tight uppercase">Manual ETA Configuration</h3>
</div>
<div class="grid grid-cols-2 gap-8 mb-8">
<div class="space-y-2">
<label class="block text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Minimum Days</label>
<div class="relative">
<input class="w-full bg-surface-container-low border-none rounded-xl p-4 text-xl font-bold text-primary focus:ring-2 focus:ring-secondary transition-all appearance-none" min="1" type="number" value="1"/>
<div class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
<span class="material-symbols-outlined text-[18px] text-primary/30 cursor-pointer hover:text-secondary">keyboard_arrow_up</span>
<span class="material-symbols-outlined text-[18px] text-primary/30 cursor-pointer hover:text-secondary">keyboard_arrow_down</span>
</div>
</div>
</div>
<div class="space-y-2">
<label class="block text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Maximum Days</label>
<div class="relative">
<input class="w-full bg-surface-container-low border-none rounded-xl p-4 text-xl font-bold text-primary focus:ring-2 focus:ring-secondary transition-all appearance-none" min="1" type="number" value="2"/>
<div class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
<span class="material-symbols-outlined text-[18px] text-primary/30 cursor-pointer hover:text-secondary">keyboard_arrow_up</span>
<span class="material-symbols-outlined text-[18px] text-primary/30 cursor-pointer hover:text-secondary">keyboard_arrow_down</span>
</div>
</div>
</div>
</div>
<div class="space-y-2 mb-8">
<label class="block text-[10px] font-black uppercase tracking-widest text-primary/40 ml-1">Override Reason</label>
<textarea class="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm font-medium text-primary focus:ring-2 focus:ring-secondary transition-all resize-none placeholder-primary/20" placeholder="Describe the necessity for manual intervention..." rows="3">Severe weather alert in Midwest corridor</textarea>
</div>
<div class="flex items-center gap-4">
<button class="flex-1 py-4 bg-secondary text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_8px_20px_-4px_rgba(0,109,54,0.4)] hover:shadow-[0_12px_24px_-4px_rgba(0,109,54,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                                    Set ETA Override
                                </button>
<button class="px-8 py-4 border-2 border-primary/10 text-primary font-black uppercase tracking-widest text-sm rounded-xl hover:bg-primary/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">restart_alt</span>
                                    Clear Current Override
                                </button>
</div>
</div>
</div>
{/* <!-- Side Info Panel --> */}
<div class="space-y-6">
<div class="bg-surface-dim/40 p-8 rounded-xl border border-primary/5 flex flex-col gap-6">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">gavel</span>
<h4 class="font-bold text-primary">Validation Rules</h4>
</div>
<div class="space-y-4">
<div class="flex gap-3">
<span class="material-symbols-outlined text-secondary text-[20px]">verified</span>
<p class="text-xs leading-relaxed text-primary/70 font-medium">
                                        Minimum days must be at least <span class="text-primary font-black">1</span>, and maximum days must be equal to or greater than the minimum.
                                    </p>
</div>
<div class="flex gap-3">
<span class="material-symbols-outlined text-secondary text-[20px]">verified</span>
<p class="text-xs leading-relaxed text-primary/70 font-medium">
                                        Overridden ETAs trigger immediate client notification and recalculation of downstream terminal scheduling.
                                    </p>
</div>
</div>
<div class="mt-4 p-5 bg-white rounded-xl shadow-inner-lg space-y-4">
<p class="text-[10px] font-black uppercase tracking-widest text-primary/40">Last Override Trace</p>
<div class="flex items-center gap-3">
<img class="w-8 h-8 rounded-full border border-surface-container" data-alt="A portrait photo of a senior logistics technician, showing a professional and serious expression. The person has grey hair and is wearing a modern navy polo shirt with the Velocity Transit logo. The background is a clean, bright, modern office with soft lighting, emphasizing the professional, secure nature of administrative actions. The aesthetic is clean and focused, reflecting high-end corporate reliability." src="https://lh3.googleusercontent.com/aida/ADBb0uj51YzYob2jyawwO-eZNpwCSRZLqShDsvJezgyTosH1qbWknGWI34KVbVGeUKPW1h4lqxwvb250uXYSzqs3jmy81sQO4Q44trxm6Imkn9pH9DcXkoREJhhYJEHmQUp3YlfmdCyi73QWDt4GmzuvIw7bBzWg1f0FaC5hw73UFgUfWeFSEfrYn_VxQYsGpjcgOsyrVOz7kaO3V5LTmsYKGcOrs5BCk1J-o1LIG71-vTWCk__MKqwYzeXmOwPl"/>
<div>
<p class="text-xs font-bold text-primary">J. Marcus (L3 Tech)</p>
<p class="text-[10px] text-primary/50">2023-11-20 14:32:01</p>
</div>
</div>
</div>
</div>
{/* <!-- Kinetic Design Element --> */}
<div class="bg-gradient-to-br from-primary to-primary-container p-6 rounded-xl shadow-xl flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden min-h-[200px]">
<img class="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" data-alt="A dynamic abstract visualization of data flows, featuring flowing neon emerald lines weaving through a structured midnight navy grid. The image represents the 'kinetic precision' of logistics data management, with points of light indicating critical intersections or milestones. The style is sleek, digital, and professional, perfectly aligned with the editorial engine aesthetic of Velocity Transit." src="https://lh3.googleusercontent.com/aida/ADBb0ui3vNkzHHUMIrcVb-tlzvhESPXOa4l_VET8S-qOV_Fb6a1OChO6MlLD8_5p07QK89u5UFWouGgqfEw907Wlz5Q0rBgfcDPnT4gSHfvSFL64-9u1PZ2tONa4_EH1qf-jTgMHDHXmCTYBIJQHNw4rYrfytWo3Cj17ucv0K9BVpBeHpMe-Tm43I1EWZk8_7dvZBq9kjEQIPzoDksHJ6I7evmaXEA2M6urmm4SEeR97kPdvKI4q1wXKYSD2pS-V"/>
<div class="relative z-10">
<span class="material-symbols-outlined text-secondary text-4xl mb-2">insights</span>
<p class="text-white font-bold leading-tight">System Performance</p>
<p class="text-white/60 text-[10px] uppercase tracking-widest mt-1">Override Accuracy: 99.8%</p>
</div>
</div>
</div>
</section>
{/* <!-- History Audit Section --> */}
<section class="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
<div class="flex items-center justify-between mb-8">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">history</span>
<h3 class="text-lg font-extrabold text-primary tracking-tight">Recent Activity Log</h3>
</div>
<button class="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2 hover:underline">
                            Export Log <span class="material-symbols-outlined text-[16px]">download</span>
</button>
</div>
<div class="space-y-3">
{/* <!-- History Row 1 --> */}
<div class="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/5">
<div class="flex items-center gap-4">
<div class="w-2 h-2 rounded-full bg-secondary"></div>
<div>
<p class="text-sm font-bold text-primary">AI ETA Adjustment Detected</p>
<p class="text-[10px] text-primary/40 uppercase font-black">Today, 09:12 AM</p>
</div>
</div>
<div class="text-right">
<p class="text-xs font-medium text-primary/60">Shift: +1.5 Days</p>
<p class="text-[10px] text-secondary font-bold">Auto-Correction Applied</p>
</div>
</div>
{/* <!-- History Row 2 --> */}
<div class="bg-white p-4 rounded-xl flex items-center justify-between shadow-sm border border-outline-variant/5">
<div class="flex items-center gap-4">
<div class="w-2 h-2 rounded-full bg-outline-variant"></div>
<div>
<p class="text-sm font-bold text-primary">Terminal Gate Congestion Alert</p>
<p class="text-[10px] text-primary/40 uppercase font-black">Yesterday, 11:45 PM</p>
</div>
</div>
<div class="text-right">
<p class="text-xs font-medium text-primary/60">Transit Delay: 4 Hours</p>
<p class="text-[10px] text-primary/50 font-bold">Informational Only</p>
</div>
</div>
</div>
</section>
</div>
</div>
{/* <!-- Velocity Tracker Footer --> */}
<footer class="h-16 bg-surface-container-highest flex items-center px-8 justify-between border-t border-primary/5 mt-auto">
<div class="flex items-center gap-8 w-full">
<div class="flex items-center gap-2 shrink-0">
<div class="w-3 h-3 rounded-full bg-secondary shadow-[0_0_8px_#006d36]"></div>
<span class="text-[10px] font-black uppercase tracking-widest text-primary/60">Real-Time Pulse</span>
</div>
<div class="flex-1 flex items-center gap-4 px-12">
<div class="h-[4px] flex-1 bg-primary/10 rounded-full overflow-hidden flex">
<div class="h-full bg-secondary w-2/3 shadow-[0_0_12px_rgba(0,109,54,0.3)]"></div>
</div>
<span class="text-[10px] font-black uppercase text-primary shrink-0">66% Transit Complete</span>
</div>
<div class="flex items-center gap-6 shrink-0">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-primary">cloud</span>
<span class="text-xs font-bold text-primary">Clear</span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-primary">thermostat</span>
<span class="text-xs font-bold text-primary">72°F</span>
</div>
</div>
</div>
</footer>
</main>

    </div>
  )
}


