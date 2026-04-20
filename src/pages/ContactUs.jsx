import axiosClient from "../utils/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Logistics Inquiry",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosClient.post("/contact", data);
      return res.data;
    },

    onSuccess: (data) => {
      toast.success("Message sent successfully 🚀");

      setFormData({
        name: "",
        email: "",
        subject: "General Logistics Inquiry",
        message: "",
      });
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to send message");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="bg-[#e2fffe] text-[#002020] min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* <!-- Hero Section --> */}
        <section className="px-8 py-20 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <span className="label-sm uppercase tracking-[0.2em] text-[#006d36] font-bold mb-4 block">
              Connect with Velocity
            </span>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-[#001736] leading-[0.9] mb-8">
              Precision <br />
              Communication.
            </h1>
            <p className="text-xl text-[#43474f] max-w-xl leading-relaxed">
              Our logistics experts are standing by to streamline your global
              supply chain. From routine inquiries to emergency freight
              redirection, we move at the speed of your business.
            </p>
          </div>
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-[#83fba5] p-8 rounded-xl aspect-square flex flex-col justify-between">
              <span
                className="material-symbols-outlined text-5xl text-[#00743a]"
                data-icon="speed"
              >
                speed
              </span>
              <div>
                <h3 className="text-2xl font-bold text-[#00743a]">
                  Average Response
                </h3>
                <p className="text-4xl font-black text-[#00743a] tracking-tighter">
                  14 Minutes
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Main Content: Form & Logistics Info --> */}
        <section className="px-8 py-12 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* <!-- Contact Form Section --> */}
            <div className="bg-[#d7fafa] p-10 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#006d36]/5 -mr-16 -mt-16 rounded-full blur-3xl"></div>
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#001736]/60">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#ffffff] border-0 border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 transition-all px-0 py-3 text-primary font-medium"
                      placeholder="John Doe"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#001736]/60">
                      Corporate Email
                    </label>
                    <input
                      className="w-full bg-[#ffffff] border-0 border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 transition-all px-0 py-3 text-primary font-medium"
                      placeholder="j.doe@velocity.com"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#001736]/60">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#ffffff] border-0 border-b-2 border-outline-variant focus:border-[#006d36] focus:ring-0 transition-all px-0 py-3 text-primary font-medium appearance-none"
                  >
                    <option>General Logistics Inquiry</option>
                    <option>Rate Quotation Request</option>
                    <option>Partnership Proposal</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[0.6875rem] font-bold uppercase tracking-wider text-[#001736]/60">
                    Your Message
                  </label>
                  <textarea
                    className="w-full bg-[#ffffff] border-0 border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 transition-all px-0 py-3 text-[#001736] font-medium resize-none"
                    placeholder="How can our network serve yours?"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full kinetic-gradient text-[#ffffff] py-5 rounded-xl font-bold tracking-wide flex items-center justify-center gap-3 group transition-all"
                >
                  {mutation.isPending
                    ? "Sending..."
                    : "Initialize Transmission"}
                  <span
                    className="material-symbols-outlined transition-transform group-hover:translate-x-1"
                    data-icon="send"
                  >
                    send
                  </span>
                </button>
              </form>
            </div>
            {/* <!-- Info Grid: Bento Style --> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* <!-- Emergency Card --> */}
              <div className="sm:col-span-2 bg-[#001736] p-8 rounded-xl text-[#ffffff] flex flex-col justify-between min-h-[240px]">
                <div className="flex justify-between items-start">
                  <span
                    className="material-symbols-outlined text-[#006d36] text-4xl"
                    data-icon="emergency_home"
                  >
                    emergency_home
                  </span>
                  <span className="bg-[#006d36]/20 text-[#83fba5] text-[0.6rem] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Priority Line
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[#ffffff]/60 uppercase tracking-widest mb-1">
                    Emergency Hotline
                  </h4>
                  <p className="text-4xl font-black tracking-tighter">
                    1-800-VELOCITY
                  </p>
                  <p className="text-sm text-[#ffffff]/40 mt-2">
                    24/7 Logistics Dispatch Center
                  </p>
                </div>
              </div>
              {/* <!-- Address Card --> */}
              <div className="bg-[#ccefee] p-8 rounded-xl space-y-4">
                <span
                  className="material-symbols-outlined text-[#001736]"
                  data-icon="location_on"
                >
                  location_on
                </span>
                <h4 className="font-bold text-[#001736] uppercase text-xs tracking-widest">
                  Global HQ
                </h4>
                <p className="text-[#002020] leading-relaxed font-medium">
                  1200 Kinetic Way
                  <br />
                  Chicago, IL 60601
                  <br />
                  United States
                </p>
              </div>
              {/* <!-- Email Card --> */}
              <div className="bg-[#ccefee] p-8 rounded-xl space-y-4">
                <span
                  className="material-symbols-outlined text-[#001736]"
                  data-icon="mail"
                >
                  mail
                </span>
                <h4 className="font-bold text-[#001736] uppercase text-xs tracking-widest">
                  Direct Support
                </h4>
                <p className="text-[#002020] leading-relaxed font-medium">
                  ops@velocitytransit.com
                  <br />
                  global.network@velocity.com
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Map Section --> */}
        <section className="px-8 py-20 max-w-screen-2xl mx-auto">
          <div className="relative w-full h-[500px] rounded-xl overflow-hidden group">
            <img
              className="w-full h-full object-cover filter brightness-75 contrast-125"
              data-alt="Modern stylized architectural map of downtown Chicago in a cool blue and emerald green color palette with data overlays"
              data-location="Chicago"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZYUJJEQLapGs57KS8PpbB4csUOhqys4GWfaKCrQQNG2qtCn7VxXa_Y6E19U6U9t-9iKkSMhSB07XMpLCVNMWL-LIsuJSwBCaexU7POqLdrEIv1umLFhPKQTg9CRXN17qVoU5QuBS7BCceIFHHBON_eTUXsQ2he5aSx4mORh1yftxnj1tnlh_80sNnYYq45J3nqDOxH1r-CcV3GX_bpp6PySTkwUzpOnhw1IWXC4nwG8LcGVTgXL9HHANQ3y5XkEPpj50NRk3yIhzw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001736]/80 to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
              <div className="glass-effect p-8 rounded-xl border border-white/10 max-w-md shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 bg-[#006d36] rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#006d36]">
                    Live Operations Center
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#001736] mb-2">
                  The Kinetic Hub
                </h3>
                <p className="text-[#001736]/70 text-sm leading-relaxed">
                  Our centralized command center monitoring 14,000 active
                  shipments across 6 continents. All coordination happens here.
                </p>
              </div>
              <a
                className="bg-[#e2fffe] text-[#001736] px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-[#006d36] hover:text-[#e2fffe] transition-all"
                href="https://maps.google.com"
                target="_blank"
              >
                <span>Get Directions</span>
                <span className="material-symbols-outlined" data-icon="near_me">
                  near_me
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
