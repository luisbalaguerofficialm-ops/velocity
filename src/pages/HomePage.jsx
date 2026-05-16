import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Play, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";

export default function HomePage() {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (trackingId) => {
      const res = await axiosClient.get(
        `/api/v1/shipments/track/${trackingId}`,
      );
      return res.data;
    },

    onSuccess: (data, trackingId) => {
      // ✅ only navigate after success
      navigate(`/tracking-detail/${trackingId}`);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Tracking failed");
    },
  });

  const handleTrackShipment = () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    mutate(trackingId);
  };
  return (
    <div className="pt-20">
      {/* <!-- Hero Section --> */}
      <section className="relative bg-[#001b3d] min-h-217.5 flex items-center overflow-hidden hero-clip">
        <div className="absolute inset-0 opacity-40">
          <img
            className="w-full h-full object-cover"
            data-alt="Modern logistics warehouse with blue lighting and motion blur"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDidrV8qxeFIM4vfDv-4ioOwko0GUMJWCsJ9EFdqsY75znKI9ilXf5XqMptX7PSydCp-6XifTOMmkWfCPiW7DLZDG-uMmx9Ng04lBqNady9TG22wA3Q9gIDbaWztGV0_kNzzhg256DPUk5KL6qB5Hf8recG8EgBmEAGY1py-w-pVdiM41YZAXEO5Z2678I6ydJ1bT3xGkF1YrdNXhOExN9D17FaXSqLk26jZPtSaFMiKaEqEPo8_n5TrfmOQPZIsevBFm-IA0fdhDw9"
          />
        </div>
        <div className="absolute inset-0 kinetic-gradient opacity-60"></div>
        <div className="relative z-10 max-w-360 mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="font-headline text-7xl font-extrabold text-white leading-tight tracking-tight mb-8">
              Precision in <span className="text-[#63fca7]">Motion</span>
            </h1>
            <p className="text-[#7594ca] text-xl font-body mb-12 max-w-xl">
              Experience the next generation of global logistics. Real-time
              tracking, seamless integration, and unparalleled reliability for
              your most critical shipments.
            </p>
            {/* <!-- Integrated Parcel Tracking --> */}
            <div className="bg-[#ffffff] backdrop-blur-xl p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl">
              <div className="grow flex items-center px-4 bg-[#e7e8e9] rounded-lg">
                <span className="material-symbols-outlined text-outline">
                  package_2
                </span>
                <input
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTrackShipment();
                  }}
                  className="bg-transparent border-none focus:ring-0 w-full font-body py-4 px-3 text-[#191c1d]"
                  placeholder="Enter Tracking Number"
                  type="text"
                />
              </div>
              <button
                onClick={handleTrackShipment}
                disabled={isPending}
                className={`bg-[#006d3e] text-[#ffffff] px-10 py-4 rounded-lg font-bold font-headline uppercase tracking-wider transition-all flex items-center justify-center gap-2
  ${isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-700"}`}
              >
                {isPending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Tracking...
                  </>
                ) : (
                  "Track Shipment"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Quick Actions Section --> */}
      <section className="max-w-360 mx-auto px-8 -mt-30 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* <!-- Card: Book a Parcel --> */}
          <div className="bg-[#ffffff] p-8 rounded-xl shadow-[0_12px_32px_rgba(0,23,54,0.06)] group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-lg bg-[#001736]/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#001736] text-3xl">
                local_shipping
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-[#001736] mb-3">
              Book a Parcel
            </h3>
            <p className="text-[#43474f] font-body mb-6">
              Schedule your pickup in under 60 seconds with our streamlined
              booking engine.
            </p>
            <a
              className="text-[#006d3e] font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all"
              href="#"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          {/* <!-- Card: Find a Station --> */}
          <div className="bg-[#ffffff] p-8 rounded-xl shadow-[0_12px_32px_rgba(0,23,54,0.06)] group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-lg bg-[#002b5b]/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#001736] text-3xl">
                location_on
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-[#001736] mb-3">
              Find a Station
            </h3>
            <p className="text-[#43474f] font-body mb-6">
              Locate our premium concierge hubs and drop-off points across the
              global network.
            </p>
            <a
              className="text-[#006d3e] font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all"
              href="#"
            >
              View Map{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          {/* <!-- Card: Price Calculator --> */}
          <div className="bg-[#ffffff] p-8 rounded-xl shadow-[0_12px_32px_rgba(0,23,54,0.06)] group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-lg bg-[#006d3e]/10 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#001736] text-3xl">
                calculate
              </span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-[#001736] mb-3">
              Price Calculator
            </h3>
            <p className="text-[#43474f] font-body mb-6">
              Transparent, real-time pricing for domestic and international
              transit options.
            </p>
            <a
              className="text-[#006d3e] font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all"
              href="#"
            >
              Calculate{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>
      {/* <!-- Trending Services Carousel --> */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8 mb-12 flex justify-between items-end">
          <div>
            <span className="text-[#63fca7] font-bold uppercase tracking-widest text-sm block mb-2">
              Portfolio
            </span>
            <h2 className="font-headline text-4xl font-extrabold text-[#001736]">
              Trending Services
            </h2>
          </div>
        </div>
        <div className="flex gap-8 px-8 max-w-[1440px] mx-auto overflow-x-auto pb-4">
          {/* <!-- Service Card 1 --> */}
          <div className="min-w-[400px] h-[500px] rounded-2xl relative overflow-hidden group">
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              data-alt="Heavy cargo delivery truck on a coastal highway"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj8SO2ziVRLG7YyuQsPDrpJVPi-ZccTVaJtwkr5pvlyrqPxyXVdB797neI9pKObpYlzBP8tOgjfIUIeVkNR7OaPX3mDGqESe3RyAVsMREnkDxvTCD3MVn7UHFsEkChY6SWZQn-i7zVScdxg3-wkQqb3c9Bfp7BaLVVxoSQYeuvykIPSokiIdX5kMbVxg68L4lVBOAPctMactId-FyYPvy8SaJO7aS6LFAFvQ3gFyyJdAm-nyFAXZaLYc6dvkoehvu91wKK1jP2vNFJ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/90 via-[#001736]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="bg-[#006d3e] text-[#002111] px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                MOST POPULAR
              </div>
              <h4 className="font-headline text-2xl font-bold text-white mb-2">
                Priority Velocity
              </h4>
              <p className="text-slate-300 font-body text-sm">
                Guaranteed next-day delivery across 45 countries with dedicated
                courier handling.
              </p>
            </div>
          </div>
          {/* <!-- Service Card 2 --> */}
          <div className="min-w-[400px] h-[500px] rounded-2xl relative overflow-hidden group">
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              data-alt="Cargo plane loading containers at night"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVDtidL8OtCW9VVK7DYCFPmWRP1W0PKJFhUmlkwxemDHI9KzsaYnxY8uUGUBmVh8oKtCqiNQyK86rd9aIU-RGxU_LRz69dTPXeHRNn83qqmywYeo2fMydJBWdmfqEKfWo6UWgVtg0ImwsE1oNMLD8zRhz0-Y5eDNe_l3lfDQS6A5DzxW406oFMusG7_UW10NeosWTuzvtMhCRPv7UMQELPtE9hE6loYUNHmi3RJ67OdXtE9-PWjqBrDsUqYP1G_18hHG6D5VBmX5EB"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/90 via-[#001736]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h4 className="font-headline text-2xl font-bold text-white mb-2">
                Intercontinental Air
              </h4>
              <p className="text-slate-300 font-body text-sm">
                Swift air-freight solutions for oversized shipments with global
                customs clearance.
              </p>
            </div>
          </div>
          {/* <!-- Service Card 3 --> */}
          <div className="min-w-[400px] h-[500px] rounded-2xl relative overflow-hidden group">
            <img
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              data-alt="Logistics drone flying over a modern city"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN1XDIWSAVwpQaHTXM_txgknf6pzpAlBgeoTNZtXkBTHIGcc_3bWOTl5uEO7iCUH-O1J59DB4GcLQvgti1gHnvAjKwExXbti_hwg0-9tbkmayuJ-89fRSJbQX6LwgrKzU9OraVNJN59C6cB3ZIeRLVwr0LrAXVHuu8mj1dpNXQt5_lfJNeffOaIYV1k5k5vJCwo2Ul-uaiR1RSM5hWLPQanU8Y9f_89n4Tivv_-770-J89bz2yX6WLyJihHyt5l-9ouhDrBm3NByuW"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/90 via-[#001736]/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h4 className="font-headline text-2xl font-bold text-white mb-2">
                Last Mile Drone
              </h4>
              <p className="text-slate-300 font-body text-sm">
                Cutting-edge autonomous delivery for urban environments and
                remote areas.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ==================================== Video Advertisement Section */}
      <section className="py-24 bg-[#001736] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="text-[#63fca7] font-bold uppercase tracking-[0.3em] text-meduim block mb-3">
              Logistics Experience
            </span>

            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              The Future of <br />
              Smart Delivery
            </h2>

            <p className="text-[#7594ca] text-xl max-w-3xl mx-auto leading-relaxed">
              Discover how Velocity Logistics powers seamless global shipping
              with AI-driven tracking, secure freight handling, and ultra-fast
              transit operations.
            </p>
          </div>

          {/* Video Card */}
          <div
            onClick={() => setIsVideoOpen(true)}
            className="relative group max-w-6xl mx-auto cursor-pointer"
          >
            {/* Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#63fca7] via-[#006d3e] to-[#002b5b] blur-xl opacity-30 group-hover:opacity-60 transition duration-700"></div>

            {/* Main Container */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              {/* Thumbnail */}
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
                alt="Velocity Logistics Advertisement"
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Pulsing Ring */}
                <div className="absolute w-32 h-32 rounded-full bg-white/10 animate-ping"></div>

                {/* Main Button */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <Play className="text-white fill-white ml-1" size={50} />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      Velocity Global Network
                    </h3>

                    <p className="text-slate-300">
                      Watch how we move thousands of shipments daily across
                      continents.
                    </p>
                  </div>

                  <button className="bg-[#63fca7] text-[#001736] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                    Watch Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Always Nearby Section --> */}
      <section className="py-24 bg-[#f3f4f5]">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                data-alt="Digital map visualization with shipping routes"
                data-location="Singapore"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUWXVfcS2r29tH3hxVVG4ifYVMpGnUCqvWEJteqcxjJMRT2e2JG8wwGBnWzW8p66J7pU0fBznprFhfB0rr4mCIddnh8850IqSLPTE-JLmZSlKChGuEynzPHNEzN9eynbzo1qA0Yb1epaeybHY1phopghOrrUOkdYoYU6pAdcv1yddOOicmVqQKprOkJKPJtO-5tsqIcmWzK5S0hNh5a6tl8wxTtIQHftRCIqYqyk47GmRhDck5TJlREN-UVT47gh6l6MhjAMHyn2on"
              />
            </div>
            {/* <!-- Floating Widget --> */}
            <div className="absolute bottom-10 -right-10 bg-[#ffffff]/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-sm hidden xl:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#006d3e]/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#006d3e]">
                    verified
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#006d3e] uppercase tracking-tighter">
                    Verified Hub
                  </p>
                  <h5 className="text-lg font-bold text-[#001736]">
                    Downtown Plaza Station
                  </h5>
                </div>
              </div>
              <p className="text-sm text-[#43474f] font-body mb-4">
                Located in the heart of the business district. Open 24/7 for
                express drop-offs and concierge pickup.
              </p>
              <button className="w-full py-3 bg-[#002B5B] text-[#ffffff] rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                View Directions
              </button>
            </div>
          </div>
          <div>
            <h2 className="font-headline text-5xl font-extrabold text-[#002B5B] mb-8 leading-tight">
              Always Nearby. <br />
              Always Moving.
            </h2>
            <p className="text-[#43474f] text-lg font-body mb-10 leading-relaxed">
              Our network spans over 12,000 local hubs globally. We don't just
              deliver packages; we provide a local presence that understands
              your community's unique logistical challenges.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#63fca7]/20 rounded-lg">
                  <span className="material-symbols-outlined text-[#006d3e]">
                    bolt
                  </span>
                </div>
                <div>
                  <h6 className="font-headline font-bold text-[#002B5B]">
                    Express Dispatch
                  </h6>
                  <p className="text-[#43474f] text-sm">
                    Hubs strategically placed within 15 minutes of most urban
                    centers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#63fca7]/20 rounded-lg">
                  <span className="material-symbols-outlined text-[#006d3e]">
                    support_agent
                  </span>
                </div>
                <div>
                  <h6 className="font-headline font-bold text-[#002B5B]">
                    Human-Centric Support
                  </h6>
                  <p className="text-[#43474f] text-sm">
                    Real people at every station ready to assist with complex
                    documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#63fca7]/20 rounded-lg">
                  <span className="material-symbols-outlined text-[#006d3e]">
                    eco
                  </span>
                </div>
                <div>
                  <h6 className="font-headline font-bold text-[#002B5B]">
                    Zero-Emission Hubs
                  </h6>
                  <p className="text-[#43474f] text-sm">
                    Eco-friendly local delivery fleets operating from 80% of our
                    stations.
                  </p>
                </div>
              </div>
            </div>
            <button className="mt-12 bg-transparent border-2 border-[#002B5B] text-[#002B5B] px-8 py-4 rounded-lg font-bold hover:bg-[#002B5B] hover:text-white transition-all flex items-center gap-3">
              Find Your Nearest Hub
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6">
          {/* Close Button */}
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#63fca7] transition-colors"
          >
            <X size={36} />
          </button>

          {/* Video Container */}
          <div className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* YouTube Embed */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/8q-80rTT7uI?autoplay=1"
              title="Velocity Logistics Advertisement"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
