import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";

export default function EditShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    sender: { name: "", phone: "", email: "" },
    receiver: { name: "", phone: "", email: "" },
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
    quantity: "",
    declaredValue: "",
    dimensions: { length: "", width: "", height: "" },
    package: "",
    status: "",
    shipmentType: "",
  });

  /* ================= FETCH ================= */
  const { data: shipment, isLoading } = useQuery({
    queryKey: ["shipment", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/shipments/${id}`);
      return res.data.data;
    },
  });

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (!shipment) return;

    setForm({
      sender: shipment.sender || { name: "", phone: "", email: "" },
      receiver: shipment.receiver || { name: "", phone: "", email: "" },
      pickupAddress: shipment.pickupAddress || "",
      deliveryAddress: shipment.deliveryAddress || "",
      weight: shipment.weight || "",
      quantity: shipment.quantity || "",
      declaredValue: shipment.declaredValue || "",
      dimensions: shipment.dimensions || { length: "", width: "", height: "" },
      package: shipment.package || "",
      status: shipment.status || "",
      shipmentType: shipment.shipmentType || "",
    });
  }, [shipment]);

  const [shipmentType, setShipmentType] = useState("");

  useEffect(() => {
    if (shipment?.shipmentType) {
      setShipmentType(shipment.shipmentType);
    }
  }, [shipment]);

  /* ================= HANDLERS ================= */
  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateNested = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  /* ================= SUBMIT ================= */
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const payload = {
        shipmentType,

        sender: form.sender,
        receiver: form.receiver,

        pickupAddress: form.pickupAddress,
        deliveryAddress: form.deliveryAddress,

        package: form.package, // ✅ string only
        weight: Number(form.weight),
        quantity: Number(form.quantity),
        declaredValue: Number(form.declaredValue),

        dimensions: {
          length: Number(form.dimensions.length),
          width: Number(form.dimensions.width),
          height: Number(form.dimensions.height),
        },

        status: form.status,
      };

      const res = await axiosClient.put(`/api/v1/shipments/${id}`, payload);

      toast.success(res.data.message || "Shipment updated");

      queryClient.invalidateQueries({
        queryKey: ["shipment", id],
      });

      navigate(-1);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setSubmitting(false);
    }
  };
  const isSelected = (type) => form.package === type;
  if (isLoading) return <p className="p-6">Loading...</p>;
  return (
    <div className="bg-[#f5f7f8] text-[#002020] flex overflow-hidden h-screen font-body">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* <!-- View Content --> */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          {/* <!-- Header & Toggle Section --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              {/* ✅ BACK BUTTON */}
              <div
                onClick={() => navigate("/admin/shipments")}
                className="flex items-center gap-2 text-[#006d36] font-bold text-sm mb-1 uppercase tracking-tighter cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  arrow_back
                </span>
                Back to shipments
              </div>

              {/*  TITLE */}
              <h2 className="text-4xl font-extrabold text-[#001736] tracking-tight">
                Edit Shipment
              </h2>

              {/*  DYNAMIC TRACKING + STATUS */}
              <p className="text-[#43474f] font-medium flex items-center gap-2">
                Tracking ID:{" "}
                <span className="text-[#001736] font-bold">
                  #{shipment?.trackingId || "----"}
                </span>
                <span className="px-2 py-0.5 bg-[#006d36]/10 text-[#006d36] text-[10px] rounded uppercase font-black">
                  {shipment?.status?.replace("_", " ") || "Unknown"}
                </span>
              </p>
            </div>

            {/* SEGMENT CONTROL */}
            <div className="bg-[#d2f5f4] p-1 rounded-xl flex w-fit">
              <button
                onClick={() => setShipmentType("inter-city")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  shipmentType === "inter-city"
                    ? "bg-white text-[#001736] shadow-sm"
                    : "text-[#43474f] hover:text-[#001736]"
                }`}
              >
                Inter-city
              </button>

              <button
                onClick={() => setShipmentType("international")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  shipmentType === "international"
                    ? "bg-white text-[#001736] shadow-sm"
                    : "text-[#43474f] hover:text-[#001736]"
                }`}
              >
                International
              </button>
            </div>
          </div>
          {/* <!-- Main Form Columns --> */}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* <!-- Left Column: Details --> */}
            <div className="lg:col-span-8 space-y-8">
              {/* <!-- Sender Details Card --> */}
              <div className="bg-[#f5f7f8] rounded-2xl p-8 shadow-[0_40px_60px_-15px_rgba(0,32,32,0.05)] border-l-4 border-[#006d36]">
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="material-symbols-outlined text-[#006d36]"
                    data-icon="outbound"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    outbound
                  </span>
                  <h3 className="text-xs font-bold tracking-widest text-[#006d36] uppercase">
                    Sender Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f] tracking-widest block ml-1">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#d7fafa] border-none border-b-2 border-[#43474f]  focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                      type="text"
                      value={form.sender.name}
                      onChange={(e) =>
                        updateNested("sender", "name", e.target.value)
                      }
                      placeholder="full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f] tracking-widest block ml-1">
                      Phone Number
                    </label>
                    <input
                      className="w-full bg-[#d7fafa] border-none border-b-2 border-[#43474f] focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                      type="tel"
                      value={form.sender.phone}
                      onChange={(e) =>
                        updateNested("sender", "phone", e.target.value)
                      }
                      placeholder="Sender Phone"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f] tracking-widest block ml-1">
                      Pickup Address
                    </label>
                    <div className="relative">
                      <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#43474f]/40"
                        data-icon="location_on"
                      >
                        location_on
                      </span>
                      <input
                        className="w-full bg-[#d7fafa] border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                        type="text"
                        value={form.pickupAddress}
                        onChange={(e) =>
                          updateField("pickupAddress", e.target.value)
                        }
                        placeholder="Pickup Address"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f] tracking-widest block ml-1">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-[#d7fafa] border-none border-b-2 border-outline-[#c4c6d0] focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                      type="email"
                      value={form.sender.email}
                      onChange={(e) =>
                        updateNested("sender", "email", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Receiver Details Card --> */}
              <div className="bg-[#ffffff] rounded-2xl p-8 shadow-[0_40px_60px_-15px_rgba(0,32,32,0.05)] border-l-4 border-[#1e1e74]">
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className="material-symbols-outlined text-[#001736]"
                    data-icon="input"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    input
                  </span>
                  <h3 className="text-xs font-bold tracking-widest text-[#001736] uppercase">
                    Receiver Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f] tracking-widest block ml-1">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#d7fafa] border-none border-b-2 border-outline-[#c4c6d0] focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                      type="text"
                      value={form.receiver.name}
                      onChange={(e) =>
                        updateNested("receiver", "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f] tracking-widest block ml-1">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-[#d7fafa] border-none border-b-2 border-outline-[#c4c6d0] focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                      type="email"
                      value={form.receiver.email}
                      onChange={(e) =>
                        updateNested("receiver", "email", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f] tracking-widest block ml-1">
                      Delivery Address
                    </label>
                    <div className="relative">
                      <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#43474f]/40"
                        data-icon="map"
                      >
                        map
                      </span>
                      <input
                        className="w-full bg-[#d7fafa] border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                        type="text"
                        value={form.deliveryAddress}
                        onChange={(e) =>
                          updateField("deliveryAddress", e.target.value)
                        }
                        placeholder="Delivery Address"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#43474f]  tracking-widest block ml-1">
                      Receiver Phone
                    </label>
                    <input
                      className="w-full bg-[#d7fafa] border-none border-b-2 border-[#c4c6d0] focus:border-[#006d36] transition-all rounded-lg p-3 font-semibold text-[#001736]"
                      type="text"
                      value={form.receiver.phone}
                      onChange={(e) =>
                        updateNested("receiver", "phone", e.target.value)
                      }
                      placeholder="Receiver Phone"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Package Specifications Section --> */}
              <section className="bg-white p-8 rounded-2xl shadow-[0_40px_60px_-15px_rgba(0,32,32,0.05)] border border-[#c0c9c1]/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-xl text-[#001736]">
                    Package Specifications
                  </h3>
                  <span className="text-xs font-bold text-[#006d36] bg-[#006d36]/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                    Metric Units
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-[#43474f] uppercase tracking-widest mb-2 ml-1">
                      Package Type
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => updateField("package", "box")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all
  ${
    isSelected("box")
      ? "border-2 border-[#006d36] bg-[#e2fffe]"
      : "border border-[#c4c6d0]/30 bg-[#d7fafa] hover:border-[#006d36]/50"
  }`}
                      >
                        <span
                          className="material-symbols-outlined text-2xl mb-1 text-[#43474f]  group-hover:text-[#006d36]"
                          data-icon="inventory_2"
                        >
                          inventory_2
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">
                          Box
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => updateField("package", "envelope")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all
  ${
    isSelected("envelope")
      ? "border-2 border-[#006d36] bg-[#e2fffe]"
      : "border border-[#c4c6d0]/30 bg-[#d7fafa] hover:border-[#006d36]/50"
  }`}
                      >
                        <span
                          className="material-symbols-outlined text-2xl mb-1 text-[#006d36]"
                          data-icon="mail"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          mail
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-tight text-[#006d36]">
                          Envelope
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("package", "pallet")}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all
  ${
    isSelected("pallet")
      ? "border-2 border-[#006d36] bg-[#e2fffe]"
      : "border border-[#c4c6d0]/30 bg-[#d7fafa] hover:border-[#006d36]/50"
  }`}
                      >
                        <span
                          className="material-symbols-outlined text-2xl mb-1 text-[#43474f]  group-hover:text-[#006d36]"
                          data-icon="pallet"
                        >
                          pallet
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-tight">
                          Pallet
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-4 md:col-span-2">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-black text-[#43474f]  uppercase tracking-widest mb-1 ml-1">
                          Weight (kg)
                        </label>
                        <input
                          className="w-full bg-[#d7fafa] border-none rounded-lg px-3 py-3 text-sm font-bold text-[#001736] focus:ring-2 focus:ring-[#006d36]/20"
                          value={form.weight}
                          onChange={(e) =>
                            updateField("weight", e.target.value)
                          }
                          placeholder="Weight"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[#43474f]  uppercase tracking-widest mb-1 ml-1">
                          Qty
                        </label>
                        <input
                          className="w-full bg-[#d7fafa] border-none rounded-lg px-3 py-3 text-sm font-bold text-[#001736] focus:ring-2 focus:ring-secondary/20"
                          type="number"
                          value={form.quantity}
                          onChange={(e) =>
                            updateField("quantity", e.target.value)
                          }
                          placeholder="Quantity"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[#43474f]  uppercase tracking-widest mb-1 ml-1">
                          Declared Val
                        </label>
                        <input
                          className="w-full bg-[#d7fafa] not-first-of-type:not-last-of-type:border-none rounded-lg px-3 py-3 text-sm font-bold text-[#001736] focus:ring-2 focus:ring-[#006d36]/20"
                          type="text"
                          value={form.declaredValue}
                          onChange={(e) =>
                            updateField("declaredValue", e.target.value)
                          }
                          placeholder="Declared Value"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-black text-[#43474f]  uppercase tracking-widest mb-1 ml-1">
                          Length (cm)
                        </label>
                        <input
                          className="w-full bg-[#d7fafa] border-none rounded-lg px-3 py-3 text-sm font-bold text-[#001736] focus:ring-2 focus:ring-[#006d36]/20"
                          placeholder="0"
                          type="number"
                          value={form.dimensions?.length || ""}
                          onChange={(e) =>
                            updateNested("dimensions", "length", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[#43474f]  uppercase tracking-widest mb-1 ml-1">
                          Width (cm)
                        </label>
                        <input
                          className="w-full bg-[#d7fafa] border-none rounded-lg px-3 py-3 text-sm font-bold text-[#001736] focus:ring-2 focus:ring-[#006d36]/20"
                          placeholder="0"
                          type="number"
                          value={form.dimensions?.width || ""}
                          onChange={(e) =>
                            updateNested("dimensions", "width", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-[#43474f]  uppercase tracking-widest mb-1 ml-1">
                          Height (cm)
                        </label>
                        <input
                          className="w-full bg-[#d7fafa] border-none rounded-lg px-3 py-3 text-sm font-bold text-[#001736] focus:ring-2 focus:ring-[#006d36]/20"
                          placeholder="0"
                          type="number"
                          value={form.dimensions?.height || ""}
                          onChange={(e) =>
                            updateNested("dimensions", "height", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* <!-- Right Column: Stats & Actions --> */}
            <div className="lg:col-span-4 space-y-8">
              {/* <!-- Visual Progress Card --> */}
              <div className="bg-[#d2f5f4] rounded-2xl p-6 border border-[#006d36] /10">
                <div className="aspect-video rounded-xl bg-[#bee1e0] overflow-hidden relative mb-6">
                  <img
                    alt="Logistics warehouse map view"
                    className="w-full h-full object-cover opacity-50 grayscale mix-blend-multiply"
                    data-alt="high-angle architectural shot of a modern clean warehouse facility with glowing digital grid overlays and abstract logistics routes"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbmVVLGQ0-Xl8ZxY42agO6absYnZZL3Rq_WLo89AW-Gi6V_64HsE_pZ19vPzKyDD-9MvX2xCXLBwsYlmZv-BP3tI6Us6y64BK5pni7XJnjljtM5B5HGliVPm2PRVYlnt-d_xlOsUMIeOkQ2b4OLAj6zjpnaVpzUsPhMn0_GFNn9gmcTa7W-m6siSb935c-JIkqA9_NXGIAsLwCBec1_UInEsXdykGzAuMDaEkKoWrW_-CLfWmZfIzupn4QBNIdOLdXUzYfKFKzIdek"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d2f5f4] to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold text-[#006d36] uppercase tracking-widest">
                          Velocity Route
                        </p>
                        <p className="text-sm font-black text-[#001736]">
                          {form.pickupAddress}
                          <span
                            className="material-symbols-outlined text-[10px] align-middle"
                            data-icon="arrow_forward"
                          >
                            arrow_forward
                          </span>{" "}
                          {form.deliveryAddress}
                        </p>
                      </div>
                      <span
                        className="material-symbols-outlined text-[#006d36] text-3xl"
                        data-icon="route"
                      >
                        route
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#006d36] shadow-[0_0_8px_#006d36]"></div>
                    <div className="flex-1 h-1 bg-[#bee1e0] rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-[#006d36]"></div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#bee1e0]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#001736]">
                    <span>Dispatched</span>
                    <span>75% Complete</span>
                    <span>Arrival</span>
                  </div>
                </div>
              </div>
              {/* <!-- Extra Context Card --> */}
              <div className="bg-[#001736] text-white rounded-2xl p-8 shadow-xl overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#006d36]/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="material-symbols-outlined text-[#006d36]"
                      data-icon="info"
                    >
                      info
                    </span>
                    <h3 className="font-bold tracking-widest text-[10px] uppercase">
                      Operational Notes
                    </h3>
                  </div>
                  <p className="text-sm text-[#bee1e0] leading-relaxed opacity-80">
                    Current estimated arrival at San Antonio hub: Tomorrow,
                    09:30 AM. Weather conditions along route are stable. No
                    delays reported by driver.
                  </p>
                </div>
              </div>
              {/* <!-- Form Submission --> */}
              <div className="pt-4 space-y-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-5 text-white font-extrabold text-lg rounded-xl flex items-center justify-center gap-3 transition-all
  ${
    submitting
      ? "bg-gray-400"
      : "bg-gradient-to-br from-[#006d36] to-[#001736] active:scale-[0.98]"
  }`}
                >
                  {submitting ? "Updating..." : "Update Shipment"}
                </button>
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="w-full py-4 bg-transparent border border-[#bee1e0] text-[#bee1e0] font-bold rounded-xl hover:bg-[#d2f5f4] transition-colors"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
