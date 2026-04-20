import React, { useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddCourier() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    vehicle: "",
    sector: "",
  });

  const navigate = useNavigate();

  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.email &&
    formData.vehicle &&
    formData.sector;

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.vehicle) {
      newErrors.vehicle = "Select a vehicle";
    }

    if (!formData.sector) {
      newErrors.sector = "Select a sector";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => axiosClient.post("/api/v1/couriers", data),

    onSuccess: (res) => {
      const courier = res?.data?.data ?? res?.data;

      if (!courier?._id) {
        toast.error("Invalid server response");
        return;
      }

      toast.success("Courier registered successfully");

      navigate("/admin/courier-success", {
        state: courier,
      });

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        vehicle: "",
        sector: "",
      });
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutate(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // remove error when typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div className="bg-[#f8fcf9] text-[#002020] min-h-screen flex flex-col overflow-x-hidden">
      <div className="flex flex-1">
        {/* <!-- Main Content  --> */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">
          {/* <!-- Breadcrumb / Status Header --> */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-label-sm uppercase tracking-[0.2rem] text-[#006d36] font-extrabold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#006d36] animate-pulse"></span>
                Personnel Onboarding
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-[#001736] tracking-tighter">
                Add New Courier
              </h1>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                Courier Status
              </span>
              <div className="bg-[#83fba5] text-on-[#006d36] px-4 py-2 rounded-full font-black text-sm tracking-tighter flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-lg"
                  data-icon="sync"
                >
                  sync
                </span>
                READY TO SYNC
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* <!-- Profile Section (Left Column) --> */}
            <div className="lg:col-span-4 space-y-8">
              {/* <div className="bg-[#d7fafa] rounded-xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#006d36]/5 to-transparent pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-48 h-48 rounded-full bg-[#ffffff] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="flex flex-col items-center text-slate-300">
                      <span
                        className="material-symbols-outlined text-6xl"
                        data-icon="add_a_photo"
                      >
                        add_a_photo
                      </span>
                      <span className="text-[0.6rem] font-black uppercase tracking-widest mt-2">
                        Upload Photo
                      </span>
                    </div>
                    <img
                      alt=""
                      className="hidden object-cover w-full h-full"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM3cM3bwzrO2eO98QLrdqVmn61JyUfGx8vmAibk_1GZ6YLy4yG45M56USn-vPnryAWm9O-qdZCMEczuRFvNmjchs-nBlMnVtWQUuG5OFiOXvetvrlQja7J3D2yYwhB05UGoHjp1gsZdmoKMLUV8RMxc_vmUmb0fKYsQLXWShZLvTKE1GJE6sDSywAf3XE7X0lyOoIsVFQAKmv6u5rW2iih59FvC-3M-yYEi_Way8t3Ei_Nd7ePGnkiQB8V0ArD4qXXwW41AVPfSvHS"
                    />
                  </div>
                  <h3 className="font-bold text-[#001736] text-center">
                    Profile Image
                  </h3>
                  <p className="text-xs text-slate-500 text-center mt-1 px-4">
                    Upload a clear front-facing portrait (JPG or PNG, max 5MB)
                  </p>
                  <button className="mt-6 px-6 py-2 bg-[#c6e9e9] text-[#001736] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-[#006d36] hover:text-white transition-all">
                    Select File
                  </button>
                </div>
              </div> */}
              <div className="bg-[#001736]  p-8 rounded-xl text-white relative overflow-hidden">
                <div className="absolute -right-8 -top-8 text-white/5 pointer-events-none">
                  <span
                    className="material-symbols-outlined text-[10rem]"
                    data-icon="badge"
                  >
                    badge
                  </span>
                </div>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2rem] opacity-60">
                  System Identity
                </span>
                <div className="mt-4 space-y-1">
                  <p className="text-xs opacity-80">Employee ID</p>
                  <p className="text-xl font-black tracking-tight">
                    VEL-NX-2024-882
                  </p>
                  <p className="text-[0.6rem] font-medium text-[#00210c] italic">
                    (Auto-generated)
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Form Section (Right Column) --> */}
            <div className="lg:col-span-8">
              <form className="space-y-10" onSubmit={handleSubmit}>
                {/* <!-- Full Name Input --> */}
                <div className="group">
                  <label className="block text-[0.65rem] font-black uppercase tracking-[0.2rem] text-slate-500 mb-2 group-focus-within:text-[#006d36]  transition-colors">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="e.g. John Doe"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#006d36] transition-all duration-500 group-focus-within:w-full"></div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#d1d1d1]/20 -z-10"></div>
                  </div>
                </div>
                {/* <!-- Phone Number Input --> */}
                <div className="group">
                  <label className="block text-[0.65rem] font-black uppercase tracking-[0.2rem] text-slate-500 mb-2 group-focus-within:text-[#006d36]  transition-colors">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="+1..."
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#006d36] transition-all duration-500 group-focus-within:w-full"></div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#d1d1d1]/20 -z-10"></div>
                  </div>
                </div>
                {/* <!-- Email Input --> */}
                <div className="group">
                  <label className="block text-[0.65rem] font-black uppercase tracking-[0.2rem] text-slate-500 mb-2 group-focus-within:text-[#006d36]  transition-colors">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-[#e7e9e7] border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006d36]/20"
                      placeholder="e.g. john.doe@example.com"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#006d36] transition-all duration-500 group-focus-within:w-full"></div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#d1d1d1]/20 -z-10"></div>
                  </div>
                </div>

                {/* <!-- Vehicle Assignment --> */}
                <div>
                  <label className="block text-[0.65rem] font-black uppercase tracking-[0.2rem] text-slate-500 mb-4">
                    Vehicle Assignment
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* <!-- E-Bike Card --> */}
                    <label className="cursor-pointer group">
                      <input
                        className="sr-only peer"
                        type="radio"
                        name="vehicle"
                        value="E-Bike"
                        checked={formData.vehicle === "E-Bike"}
                        onChange={handleInputChange}
                      />
                      <div className="p-6 bg-[#e7e9e7] rounded-xl flex flex-col items-center text-center gap-3 border-2 border-transparent peer-checked:border-[#006d36] peer-checked:bg-[#006d36]/5 transition-all hover:bg-[#d2f5f4] h-full">
                        <div className="w-14 h-14 rounded-lg bg-[#d2f5f4] flex items-center justify-center text-[#001736] group-hover:scale-110 transition-transform">
                          <span
                            className="material-symbols-outlined text-3xl"
                            data-icon="electric_bike"
                          >
                            electric_bike
                          </span>
                        </div>
                        <div>
                          <p className="font-black text-[#001736] uppercase tracking-tighter">
                            E-Bike
                          </p>
                          <p className="text-[0.65rem] text-slate-500">
                            Urban micro-delivery
                          </p>
                        </div>
                        <div className="mt-auto opacity-0 peer-checked:opacity-100 transition-opacity">
                          <span
                            className="material-symbols-outlined text-[#006d36]"
                            data-icon="check_circle"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                        </div>
                      </div>
                    </label>
                    {/* <!-- Van Card --> */}
                    <label className="cursor-pointer group">
                      <input
                        className="sr-only peer"
                        name="vehicle"
                        type="radio"
                        value="Van"
                        checked={formData.vehicle === "Van"}
                        onChange={handleInputChange}
                      />
                      <div className="p-6 bg-[#e7e9e7] rounded-xl flex flex-col items-center text-center gap-3 border-2 border-transparent peer-checked:border-[#006d36] peer-checked:bg-[#006d36]/5 transition-all hover:bg-[#d2f5f4] h-full">
                        <div className="w-14 h-14 rounded-lg bg-[#d2f5f4] flex items-center justify-center text-[#001736] group-hover:scale-110 transition-transform">
                          <span
                            className="material-symbols-outlined text-3xl"
                            data-icon="local_shipping"
                          >
                            local_shipping
                          </span>
                        </div>
                        <div>
                          <p className="font-black text-[#001736] uppercase tracking-tighter">
                            Transit Van
                          </p>
                          <p className="text-[0.65rem] text-slate-500">
                            Large parcel logistics
                          </p>
                        </div>
                        <div className="mt-auto opacity-0 peer-checked:opacity-100 transition-opacity">
                          <span
                            className="material-symbols-outlined text-[#006d36]"
                            data-icon="check_circle"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                        </div>
                      </div>
                    </label>
                    {/* <!-- Airplane Card --> */}
                    <label className="cursor-pointer group">
                      <input
                        className="sr-only peer"
                        name="vehicle"
                        type="radio"
                        value="Airplane"
                        checked={formData.vehicle === "Airplane"}
                        onChange={handleInputChange}
                      />
                      <div className="p-6 bg-[#e7e9e7] rounded-xl flex flex-col items-center text-center gap-3 border-2 border-transparent peer-checked:border-[#006d36] peer-checked:bg-[#006d36]/5 transition-all hover:bg-[#d2f5f4] h-full">
                        <div className="w-14 h-14 rounded-lg bg-[#d2f5f4] flex items-center justify-center text-[#001736] group-hover:scale-110 transition-transform">
                          <span
                            className="material-symbols-outlined text-3xl"
                            data-icon="flight"
                          >
                            flight
                          </span>
                        </div>
                        <div>
                          <p className="font-black text-[#001736] uppercase tracking-tighter">
                            Airplane
                          </p>
                          <p className="text-[0.65rem] text-slate-500">
                            Long-range transport
                          </p>
                        </div>
                        <div className="mt-auto opacity-0 peer-checked:opacity-100 transition-opacity">
                          <span
                            className="material-symbols-outlined text-[#006d36]"
                            data-icon="check_circle"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                {/* <!-- Sector Assignment --> */}
                <div className="group">
                  <label className="block text-[0.65rem] font-black uppercase tracking-[0.2rem] text-slate-500 mb-2">
                    Sector Assignment
                  </label>

                  <div className="relative">
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#e7e9e7] border-2 border-[#006d36] rounded-xl px-6 py-4 text-sm font-bold text-[#001736] focus:ring-2 focus:ring-[#006d36]/20 appearance-none"
                    >
                      <option value="">Select Sector</option>

                      <option value="A-1.1_MANUFACTURING">
                        Sector A-1.1: Manufacturing Zone
                      </option>

                      <option value="A-1.2_WAREHOUSE">
                        Sector A-1.2: Warehouse Cluster
                      </option>

                      <option value="A-1.3_TECH_PARK">
                        Sector A-1.3: Tech Park
                      </option>

                      <option value="A-1.4_DISTRIBUTION">
                        Sector A-1.4: Distribution Hub
                      </option>

                      <option value="A-1.5_RIVERSIDE">
                        Sector A-1.5: Riverside Cargo Terminals
                      </option>
                    </select>

                    {/* Dropdown Icon */}
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#006d36] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
                {/* <!-- Form Actions --> */}
                <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#c4c6d0]/10">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <img
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuANdV3-rTuuXRhzdZXAY9_lkpAoxIby2yzyquA-OdiGZFDtdZhdx6FXzt5ertMRrbRutAI5-v_LfYIMtCfJkDIFsfocRMAr2zvxPageWc6d3qiakLWkpPN5cMswwB8wjWwCgcKee9l5HeJYcTF4cEgdiBdDNnGu6h38NRqNYKXITSYSg3tKAyGtqHeJqzPfkrA3aIx6ojdP5ASfDB3XgzfFoFxDBeR5kXEabXHbTocoTukEDNPImiq9s0YlKTxUNMXuV5vmhmTqbsNN"
                      />
                      <img
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBcI-3YpSXdqjezUgbsgDdjsLZclDD650hWpnfrE7lCsaG0AfhLfefHnTjCnBV6HBJlwWj15H3DxfRtojmaArQWQsWLR7rQ1bphspS5BlFQK-ivha2Ilb3AUF8-Xj2rU_u5T8ZNJLaZA1dHk8IhAhJPRGrk-2yVJD8NbVOQYb8B7b9AreW4tmhdy-lP6DfnZrzE3WMxiqvkLCQ5Lk-2aafvZm6O9wQMUANZHp5hGcIJFja2_kU4pxLER18db-04Ry-DfJKe3BUUDLa"
                      />
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[0.6rem] font-black text-slate-400">
                        +12
                      </div>
                    </div>
                    <p className="text-xs font-bold text-slate-400">
                      Active dispatchers in this sector
                    </p>
                  </div>
                  <button
                    disabled={!isFormValid || isPending}
                    className={`w-full sm:w-auto px-10 py-5 rounded-xl font-black text-sm uppercase tracking-[0.15rem] flex items-center justify-center gap-3 transition-all shadow-xl
    ${
      isFormValid
        ? "bg-gradient-to-br from-[#006d36] to-[#004d26] text-white hover:scale-[1.03]"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
                  >
                    {isPending ? "Registering..." : "REGISTER COURIER"}
                    <span
                      className="material-symbols-outlined font-bold"
                      data-icon="arrow_forward"
                    >
                      arrow_forward
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- Kinetic Data Visualizer --> */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#ccefee]/50 backdrop-blur-md p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.6rem] font-black text-slate-500 uppercase tracking-widest">
                  Fleet Capacity
                </span>
                <span className="text-[#006d36] font-bold text-xs">88%</span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-[#006d36] w-[88%] rounded-full"></div>
              </div>
            </div>
            <div className="bg-[#ccefee]/50 backdrop-blur-md p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.6rem] font-black text-slate-500 uppercase tracking-widest">
                  Sector Load
                </span>
                <span className="text-[#001736] font-bold text-xs">
                  Moderate
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-[#001736] w-[45%] rounded-full"></div>
              </div>
            </div>
            <div className="bg-[#ccefee]/50 backdrop-blur-md p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.6rem] font-black text-slate-500 uppercase tracking-widest">
                  Est. Activation
                </span>
                <span className="text-[#1e1e74] font-bold text-xs">
                  &lt; 2 mins
                </span>
              </div>
              <div className="h-2 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-[#1e1e74] w-[95%] rounded-full"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
