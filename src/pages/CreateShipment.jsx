import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";

// 💳 checkout + payment integration

export default function CreateShipment() {
  const navigate = useNavigate();

  // Initial state structured for your backend's req.body destructuring
  const [formData, setFormData] = useState({
    shipmentType: "",
    senderFullName: "",
    senderEmail: "",
    senderPhone: "",
    pickupAddress: "",
    sender: { zip: "" },
    receiverFullName: "",
    receiverEmail: "",
    receiverPhone: "",
    deliveryAddress: "",
    receiver: { zip: "" },
    packageType: "",
    weight: 1.5,
    quantity: 1,
    declaredValue: "",
    dimensions: { length: 0, width: 0, height: 0 },
    serviceLevel: "",
    courier: "",
  });

  //  FOR PRICE CACULATION
  const [price, setPrice] = useState({
    baseRate: 0,
    weightSurcharge: 0,
    priorityFee: 0,
    fuelAdjustment: 0,
    total: 0,
  });
  // 🚀 TanStack Mutation for Creating Shipment
  const { mutate, isLoading } = useMutation({
    mutationFn: (newShipment) => {
      return axiosClient.post("/api/v1/shipments", newShipment);
    },
    onSuccess: (res) => {
      toast.success("Shipment created and simulation started!");
      navigate("/admin/shipment-successful", {
        state: { shipment: res.data.data },
      });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Error creating shipment";
      toast.error(message);
    },
  });

  // ============FETCH PRICE=========================

  const { mutate: calculatePrice } = useMutation({
    mutationFn: (data) =>
      axiosClient.post("/api/v1/shipments/calculate-price", data),

    onSuccess: (res) => {
      setPrice(res.data.data);
    },
  });

  /* ================= FETCH COURIERS ================= */

  const { data, isLoading: courierLoading } = useQuery({
    queryKey: ["couriers"],
    queryFn: async () => {
      const res = await axiosClient.get("/api/v1/couriers");

      return res.data.data;
    },
  });

  const couriers = data?.data || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      // ✅ Fix numbers properly
      weight: Number(formData.weight) || 0,
      quantity: Number(formData.quantity) || 0,
      declaredValue: formData.declaredValue
        ? Number(formData.declaredValue)
        : 0,

      dimensions: {
        length: Number(formData.dimensions.length) || 0,
        width: Number(formData.dimensions.width) || 0,
        height: Number(formData.dimensions.height) || 0,
      },

      // ✅ Fix courier null issue
      courier: formData.courier || null,
    };

    mutate(payload);
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [name]: value },
    }));
  };

  // -=================Auto-calculate when form changes==========================
  React.useEffect(() => {
    if (!formData.weight || !formData.serviceLevel) return;

    const timer = setTimeout(() => {
      calculatePrice({
        weight: Number(formData.weight),
        quantity: Number(formData.quantity),
        declaredValue: Number(formData.declaredValue || 0),
        serviceLevel: formData.serviceLevel,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [
    formData.weight,
    formData.quantity,
    formData.declaredValue,
    formData.serviceLevel,
  ]);

  return (
    <div className="bg-[#f8fcf9] font-body text-[#00210e] antialiased">
      {/* <!-- Main Content Area --> */}
      <form className=" min-h-screen" onSubmit={handleSubmit}>
        {/* <!-- Content Canvas --> */}
        <div className="p-8 lg:p-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* <!-- Form Section --> */}
          <div className="lg:col-span-8 space-y-8">
            {/* <!-- Section: Shipment Type --> */}
            <section className="bg-[#ffffff] p-6 rounded-xl shadow-sm border border-[#c0c9c1]/10">
              <label className="block text-xs font-semibold text-outline uppercase tracking-wider mb-4">
                Shipment Type
              </label>
              <div className="grid grid-cols-2 p-1 bg-[#e1e3e1] rounded-lg">
                <label className="relative">
                  <input
                    className="peer sr-only"
                    name="shipmentType"
                    type="radio"
                    value="inter-city"
                    checked={formData.shipmentType === "inter-city"}
                    onChange={handleChange}
                  />
                  <div className="flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-all peer-checked:bg-white peer-checked:text-[#006d36] peer-checked:shadow-sm text-[#717972] hover:text-[#00210e]">
                    <span
                      className="material-symbols-outlined text-sm"
                      data-icon="location_city"
                    >
                      location_city
                    </span>
                    <span className="text-sm font-bold">Inter-city</span>
                  </div>
                </label>
                <label className="relative">
                  <input
                    className="peer sr-only"
                    name="shipmentType"
                    type="radio"
                    value="international"
                    checked={formData.shipmentType === "international"}
                    onChange={handleChange}
                  />
                  <div className="flex items-center justify-center gap-2 py-2 rounded-md cursor-pointer transition-all peer-checked:bg-white peer-checked:text-[#006d36] peer-checked:shadow-sm text-[#717972] hover:text-[#00210e]">
                    <span
                      className="material-symbols-outlined text-sm"
                      data-icon="public"
                    >
                      public
                    </span>
                    <span className="text-sm font-bold">International</span>
                  </div>
                </label>
              </div>
            </section>
            {/* <!-- Section: Address Details --> */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <!-- Sender Card --> */}
              <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border border-[#c0c9c1]/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#006d36] text-sm"
                      data-icon="outbox"
                    >
                      outbox
                    </span>
                  </span>
                  <h3 className="font-headline font-bold text-lg">
                    Sender Details
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="e.g. John Doe"
                      type="text"
                      name="senderFullName"
                      required
                      value={formData.senderFullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="e.g. john.doe@example.com"
                      type="email"
                      name="senderEmail"
                      required
                      value={formData.senderEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                      Pickup Address
                    </label>
                    <textarea
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="Street address, apartment, city"
                      rows="2"
                      required
                      name="pickupAddress"
                      value={formData.pickupAddress}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                        Phone
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                        placeholder="+1..."
                        name="senderPhone"
                        type="tel"
                        required
                        value={formData.senderPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                        ZIP Code
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                        placeholder="00000"
                        type="text"
                        name="zip"
                        value={formData.sender.zip}
                        onChange={(e) =>
                          handleNestedChange("sender", "zip", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Receiver Card --> */}
              <div className="bg-[#ffffff] p-6 rounded-xl shadow-sm border border-[#c0c9c1]/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-[#d6e3ff] flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#006d36] text-sm"
                      data-icon="move_to_inbox"
                    >
                      move_to_inbox
                    </span>
                  </span>
                  <h3 className="font-headline font-bold text-lg">
                    Receiver Details
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="e.g. Jane Smith"
                      type="text"
                      name="receiverFullName"
                      value={formData.receiverFullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="e.g. john.doe@example.com"
                      name="receiverEmail"
                      type="email"
                      value={formData.receiverEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                      Delivery Address
                    </label>
                    <textarea
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="Street address, suite, city"
                      rows="2"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                        Phone
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                        placeholder="+1..."
                        type="tel"
                        name="receiverPhone"
                        value={formData.receiverPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                        ZIP Code
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                        placeholder="00000"
                        type="text"
                        name="zip"
                        value={formData.receiver.zip}
                        onChange={(e) =>
                          handleNestedChange("receiver", "zip", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Section: Package Specs --> */}
            <section className="bg-[#ffffff] p-8 rounded-xl shadow-sm border border-[#c0c9c1]/10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-headline font-bold text-xl">
                  Package Specifications
                </h3>
                <span className="text-xs font-medium text-[#006d36] bg-[#d6e3ff] px-3 py-1 rounded-full uppercase tracking-tighter">
                  Metric Units
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-1.5">
                    Package Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Box", "Envelope", "Pallet"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((p) => ({ ...p, packageType: type }))
                        }
                        className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                          formData.packageType === type
                            ? "border-2 border-[#006d36] bg-[#d6e3ff]"
                            : "border-[#c0c9c1]/30 bg-[#f5f5f5]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl mb-1">
                          {type === "Box"
                            ? "inventory_2"
                            : type === "Envelope"
                              ? "mail"
                              : "pallet"}
                        </span>
                        <span className="text-[10px] font-bold uppercase">
                          {type}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4 md:col-span-2">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#717972] uppercase mb-1">
                        Weight (kg)
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-3 py-2 text-sm"
                        type="number"
                        name="weight"
                        placeholder="10kg"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#717972] uppercase mb-1">
                        Qty
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-3 py-2 text-sm"
                        type="number"
                        name="quantity"
                        placeholder="88"
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#717972] uppercase mb-1">
                        Declared Val
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-3 py-2 text-sm"
                        placeholder="$0.00"
                        type="text"
                        name="declaredValue"
                        value={formData.declaredValue}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-[#717972] uppercase mb-1">
                        Length (cm)
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-3 py-2 text-sm"
                        placeholder="0"
                        type="number"
                        name="length"
                        value={formData.dimensions.length}
                        onChange={handleDimensionChange}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#717972] uppercase mb-1">
                        Width (cm)
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-3 py-2 text-sm"
                        placeholder="0"
                        type="number"
                        name="width"
                        value={formData.dimensions.width}
                        onChange={handleDimensionChange}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#717972] uppercase mb-1">
                        Height (cm)
                      </label>
                      <input
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-3 py-2 text-sm"
                        placeholder="0"
                        type="number"
                        name="height"
                        value={formData.dimensions.height}
                        onChange={handleDimensionChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Section: Service & Logistics --> */}
            <section className="bg-[#ffffff] p-8 rounded-xl shadow-sm border border-[#c0c9c1]/10">
              <h3 className="font-headline font-bold text-xl mb-6">
                Logistics Configuration
              </h3>
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-4">
                    Service Level
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="relative flex flex-col p-4 border-2 border-[#006d36] rounded-xl cursor-pointer bg-[#9effc5]/20 transition-all">
                      <input
                        className="absolute top-4 right-4 text-[#006d36] focus:ring-[#006d36]"
                        type="radio"
                        name="serviceLevel"
                        value="priority"
                        checked={formData.serviceLevel === "priority"}
                        onChange={handleChange}
                      />
                      <span
                        className="material-symbols-outlined text-[#006d36] mb-2"
                        data-icon="bolt"
                      >
                        bolt
                      </span>
                      <span className="font-bold text-[#191c1d]">Priority</span>
                      <span className="text-[11px] text-[#717972] font-medium">
                        1-2 Business Days
                      </span>
                    </label>
                    <label className="relative flex flex-col p-4 border border-[#c0c9c1] rounded-xl cursor-pointer hover:border-[#006d36]/40 transition-all">
                      <input
                        className="absolute top-4 right-4 text-[#006d36] focus:ring-[#006d36]"
                        type="radio"
                        name="serviceLevel"
                        value="standard"
                        checked={formData.serviceLevel === "standard"}
                        onChange={handleChange}
                      />
                      <span
                        className="material-symbols-outlined text-[#717972] mb-2"
                        data-icon="schedule"
                      >
                        schedule
                      </span>
                      <span className="font-bold text-[#191c1d]">Standard</span>
                      <span className="text-[11px] text-[#717972] font-medium">
                        3-5 Business Days
                      </span>
                    </label>
                    <label className="relative flex flex-col p-4 border border-[#c0c9c1] rounded-xl cursor-pointer hover:border-[#006d36]/40 transition-all">
                      <input
                        className="absolute top-4 right-4 text-[#006d36] focus:ring-[#006d36]"
                        type="radio"
                        name="serviceLevel"
                        value="flash_priority"
                        checked={formData.serviceLevel === "flash_priority"}
                        onChange={handleChange}
                      />
                      <span
                        className="material-symbols-outlined text-[#717972] mb-2"
                        data-icon="schedule"
                      >
                        schedule
                      </span>
                      <span className="font-bold text-[#191c1d]">
                        Flash_Priority
                      </span>
                      <span className="text-[11px] text-[#717972] font-medium">
                        6-8 Business Days
                      </span>
                    </label>
                    <label className="relative flex flex-col p-4 border border-[#c0c9c1] rounded-xl cursor-pointer hover:border-[#006d36]/40 transition-all">
                      <input
                        className="absolute top-4 right-4 text-[#006d36] focus:ring-[#006d36]"
                        type="radio"
                        name="serviceLevel"
                        value="first_class"
                        checked={formData.serviceLevel === "first_class"}
                        onChange={handleChange}
                      />
                      <span
                        className="material-symbols-outlined text-[#717972] mb-2"
                        data-icon="schedule"
                      >
                        schedule
                      </span>
                      <span className="font-bold text-[#191c1d]">
                        First Class
                      </span>
                      <span className="text-[11px] text-[#717972] font-medium">
                        9-11 Business Days
                      </span>
                    </label>
                    <label className="relative flex flex-col p-4 border border-[#c0c9c1] rounded-xl cursor-pointer hover:border-[#006d36]/40 transition-all">
                      <input
                        className="absolute top-4 right-4 text-[#006d36] focus:ring-[#006d36]"
                        type="radio"
                        name="serviceLevel"
                        value="economy"
                        checked={formData.serviceLevel === "economy"}
                        onChange={handleChange}
                      />
                      <span
                        className="material-symbols-outlined text-[#717972] mb-2"
                        data-icon="savings"
                      >
                        savings
                      </span>
                      <span className="font-bold text-[#191c1d]">Economy</span>
                      <span className="text-[11px] text-[#717972] font-medium">
                        12-15 Business Days
                      </span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-2">
                      Assign Courier
                    </label>

                    <div className="relative">
                      <select
                        name="courier"
                        value={formData.courier}
                        onChange={handleChange}
                        className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-[#006d36]/20"
                      >
                        <option value="">Auto-assign (Recommended)</option>

                        {courierLoading ? (
                          <option disabled>Loading couriers...</option>
                        ) : (
                          couriers
                            .filter((c) => c.status === "active")
                            .map((courier) => (
                              <option key={courier._id} value={courier._id}>
                                {courier.fullName} (
                                {courier.email || "No email"})
                              </option>
                            ))
                        )}
                      </select>

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-[#717972]">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#717972] uppercase tracking-wider mb-2">
                      Shipment Reference
                    </label>
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm font-mono text-[#006d36] font-bold"
                      type="text"
                      value="*****************"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <!-- Sticky Estimator Sidebar --> */}
          <aside className="lg:col-span-4 sticky top-24 space-y-6">
            {/* <!-- Price Estimator Card --> */}
            <div className="bg-[#001736] text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-900 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-600 rounded-full blur-3xl opacity-10"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <h4 className="font-headline font-bold text-lg">
                    Price Estimator
                  </h4>
                  <span className="bg-white/10 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                    Live Quote
                  </span>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-emerald-100/60 text-sm">
                      Base Rate
                    </span>
                    <span className="font-bold">
                      ${(price.baseRate || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-emerald-100/60 text-sm">
                      Weight Surcharge
                    </span>
                    <span className="font-bold">
                      {" "}
                      ${(price.weightSurcharge || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-emerald-100/60 text-sm">
                      Priority Fee
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {" "}
                      ${(price.priorityFee || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-100/60 text-sm">
                      Fuel Adjustment
                    </span>
                    <span className="font-bold">
                      {" "}
                      ${(price.fuelAdjustment || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="text-[10px] text-emerald-100/60 uppercase font-bold tracking-widest mb-1">
                    Total Estimated Cost
                  </div>
                  <div className="text-4xl font-headline font-extrabold text-emerald-400">
                    ${(price.total || 0).toFixed(2)}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#006d36] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-[#006d36]/20"
                >
                  <span
                    className="material-symbols-outlined"
                    data-icon="add_circle"
                  >
                    add_circle
                  </span>
                  {isLoading ? "PROCESSING..." : "CREATE SHIPMENT"}
                </button>
              </div>
            </div>
            {/* <!-- Live Map Mockup Widget --> */}
            <div className="bg-[#ffffff] p-4 rounded-2xl shadow-sm border border-[#c0c9c1]/10 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 px-2">
                <span
                  className="material-symbols-outlined text-emerald-600 text-lg"
                  data-icon="route"
                >
                  route
                </span>
                <span className="font-bold text-sm">Projected Route</span>
              </div>
              <div className="h-48 bg-slate-200 rounded-xl relative overflow-hidden group">
                <img
                  alt="Map Route"
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                  data-location="Chicago"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3PWvnwUp9ktshgzISGudF0PCgWRs1RgvFCVGpqQfSyW-5KhlsclivkCtAHCGoW_pjXVP-dwnAUSi4yg18aaKcxrm5ZcF6XA2bWseFI9QspLlEgFhqO-IQzTGFE9Qo6Eyf3ZViDwhzg3bqdF_cHJeAfUnhgj6SPMDAqQe7I8noa9HAskXvzFbDvyRe4xBMBLtaJfpqAT2H7l4FycqWaNJdjxTTPAluvncLnlizLrQTT3EBJKIMbRF5p-jHLtolb59QD9ko-DBH-xFE"
                />
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emerald-600 rounded-full ring-4 ring-emerald-600/20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-[#001736] rounded-full ring-4 ring-[#001736]/20"></div>
                <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-[#c0c9c1]/20">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                  <span className="text-[10px] font-bold text-[#191c1d]">
                    18.4 km Total
                  </span>
                </div>
              </div>
            </div>
            {/* <!-- Quick Action Footer for Sidebar --> */}
            <div className="flex items-center gap-4 px-2">
              <button
                onClick={() => toast.info("Draft saved locally")}
                className="flex-1 py-3 border border-[#717972] text-[#717972] rounded-lg text-xs font-bold hover:bg-[#717972]/5 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-3 text-[#ba1a1a] bg-[#ffdad6]/20 rounded-lg text-xs font-bold hover:bg-[#ffdad6]/40 transition-colors"
              >
                Discard
              </button>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
