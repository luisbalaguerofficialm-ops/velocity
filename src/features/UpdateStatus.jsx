import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";

export default function EditShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: shipment, isLoading } = useQuery({
    queryKey: ["shipment", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/shipments/${id}`);
      return res.data.data;
    },
  });

  const handleAdvanceStatus = async () => {
    try {
      const res = await axiosClient.patch(
        `/api/v1/shipments/${id}/advance-status`,
      );

      toast.success("Shipment status advanced");

      queryClient.invalidateQueries({ queryKey: ["shipment", id] });
      navigate("/admin/Update-Status-Success", {
        state: {
          shipment: res.data.shipment,
          status: res.data.status,
        },
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-[#e2fffe] font-body text-[#002020] min-h-screen flex overflow-hidden">
      {/* <!-- Navigation Drawer (Sidebar) --> */}

      {/* <!-- Main Content Area --> */}
      <main className=" flex-1 flex flex-col min-h-screen overflow-y-auto">
        <div className="p-8 space-y-8">
          {/* <!-- Shipment Identity Header --> */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-[#d7fafa] p-8 rounded-[2rem] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#83fba5] text-[#00743a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {shipment?.status?.replace("_", " ") || "Unknown Status"}
                  </span>
                  <span className="text-[#001736]/40 font-mono text-sm">
                    #{shipment?.trackingId}
                  </span>
                </div>
                <div className="flex items-end justify-between">
                  <div className="space-y-1">
                    <p className="text-3xl font-extrabold text-[#001736] tracking-tighter">
                      {shipment?.pickupAddress}
                    </p>
                    <p className="text-sm text-[#001736]/60">
                      To {shipment?.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#001736] p-8 rounded-[2rem] text-white flex flex-col justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">
                  Estimated Arrival
                </p>
                <p className="text-4xl font-light tracking-tighter">
                  Oct 24, <span className="font-bold">14:30</span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#83fba5]">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="schedule"
                >
                  schedule
                </span>
                <span className="text-xs font-bold uppercase tracking-wider italic">
                  Ahead of schedule
                </span>
              </div>
            </div>
          </section>
          {/* <!-- Progress Visualization --> */}
          <section className="bg-white p-10 rounded-[2rem] flex justify-between relative">
            <div className="absolute w-full h-1 bg-[#c6e9e9] top-1/2 left-0 -translate-y-1/2"></div>
            <div className="absolute w-2/3 h-1 bg-[#006d36] top-1/2 left-0 -translate-y-1/2"></div>

            {["Picked Up", "In Transit", "Out for Delivery", "Delivered"].map(
              (step, i) => (
                <div key={i} className="flex flex-col items-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                  ${
                    shipment?.status === step.toLowerCase().replace(" ", "_")
                      ? "bg-[#006d36]"
                      : "bg-[#e2fffe] text-[#001736]"
                  }`}
                  >
                    {i + 1}
                  </div>
                  <span className="mt-4 text-[10px] font-black uppercase">
                    {step}
                  </span>
                </div>
              ),
            )}
          </section>
          {/* <!-- Main Control Grid --> */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* <!-- Milestone Control Panel --> */}
            <section className="lg:col-span-8 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#001736]/40 px-2">
                Milestone Control
              </h3>
              {/* ================= CONTROL PANEL ================= */}
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 bg-[#d2f5f4] p-6 rounded-3xl">
                  <h3 className="font-bold text-[#001736] mb-6">
                    Advance Shipment Status
                  </h3>

                  <p className="text-sm text-[#001736]/70 mb-6">
                    Current status:{" "}
                    <span className="font-bold">
                      {shipment?.status?.replace("_", " ")}
                    </span>
                  </p>

                  <button
                    onClick={handleAdvanceStatus}
                    className="w-full py-4 bg-[#006d36] text-white rounded-xl font-bold uppercase tracking-widest"
                  >
                    Move to Next Stage
                  </button>
                </div>

                {/* ================= AUDIT / INFO ================= */}
                <div className="lg:col-span-4 bg-[#001736] text-white p-6 rounded-3xl">
                  <h3 className="text-xs uppercase tracking-widest text-white/60 mb-4">
                    Shipment Info
                  </h3>

                  <p className="text-sm">
                    Weight: {shipment?.weight || "-"} kg
                  </p>
                  <p className="text-sm">
                    Quantity: {shipment?.quantity || "-"}
                  </p>
                  <p className="text-sm">Type: {shipment?.shipmentType}</p>
                </div>
              </div>
            </section>
            {/* <!-- History Log --> */}
            <section className="lg:col-span-4 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#001736]/40 px-2">
                Audit Trail
              </h3>
              <div className="bg-[#006d36] rounded-[2rem] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#d7fafa]">
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#001736]/60">
                        Admin
                      </th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#001736]/60">
                        Action
                      </th>
                      <th className="p-4 text-[10px] font-black uppercase tracking-widest text-[#001736]/60">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c4c6d0]/10">
                    <tr className="hover:bg-[#d7fafa] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#e2fffe] flex items-center justify-center text-[8px] font-bold">
                            JD
                          </div>
                          <span className="text-xs font-bold text-[#001736]">
                            J. Doe
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-medium text-[#001736]">
                        Updated Status
                      </td>
                      <td className="p-4 text-[10px] font-mono text-[#001736]/50">
                        14:20:01
                      </td>
                    </tr>
                    <tr className="hover:bg-[#d7fafa] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#d2f5f4] flex items-center justify-center text-[8px] font-bold text-[#00743a]">
                            AM
                          </div>
                          <span className="text-xs font-bold text-[#001736]">
                            A. Marcus
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-medium text-[#001736]">
                        Added Note
                      </td>
                      <td className="p-4 text-[10px] font-mono text-[#001736]/50">
                        12:15:45
                      </td>
                    </tr>
                    <tr className="hover:bg-[#d7fafa] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#d6e3ff] flex items-center justify-center text-[8px] font-bold text-[#001b3d]">
                            TR
                          </div>
                          <span className="text-xs font-bold text-[#001736]">
                            T. Riggs
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-xs font-medium text-[#001736]">
                        Checkpoint OK
                      </td>
                      <td className="p-4 text-[10px] font-mono text-[#001736]/50">
                        09:04:12
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="w-full p-4 text-[10px] font-black text-[#006d36] uppercase tracking-[0.2em] bg-[#d7fafa]/30 hover:bg-[#d7fafa] transition-colors">
                  View Full History
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      {/* <!-- Contextual Map Overlay (Minimized) --> */}
      <div className="fixed bottom-12 right-12 w-80 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white glass-panel z-50">
        <div className="absolute inset-0 z-0">
          <img
            alt="Live tracking map"
            className="w-full h-full object-cover grayscale opacity-50"
            data-location="Singapore"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxh7Kc8KvRF1dc9Cmh4zlG5x7cxsggnAuSl5hQR7UhtxYQC_aUdjf34FrdZzBNX0tmoAKp0REkwW-w1Q95VANq62tqWvdxYrtJrUK5-WbLK_hCwt-mpilUjcQ9_sEl76L74GieIWB9bELYCg5TMCC2eIkSWe4Pkn5Rupp-OCZPTiPuRda0X0dX0RSgRe5wq2bgLfVZ58rZXW0f21CMlHk2qRIEl9hj0s-5fN2tOL7Cyqcq6ZRz032UYOaMCbRJa5DTQyrHH9UH_EX-"
          />
        </div>
        <div className="relative z-10 p-4 flex flex-col justify-between h-full bg-gradient-to-t from-[#001736]/60 to-transparent">
          <div className="flex justify-between items-start">
            <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] font-bold tracking-widest text-[#001736] uppercase">
              Live Satellite
            </span>
            <button className="bg-white/20 p-1 rounded-full text-white">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="fullscreen"
              >
                fullscreen
              </span>
            </button>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-2 h-2 rounded-full bg-[#006d36] animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Vessel: Northern Star 9
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
