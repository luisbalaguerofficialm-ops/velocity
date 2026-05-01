import React, { useState } from "react";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export default function CourierRegistrationSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const courier = location.state || {};

  const { id } = useParams();

  const courierId = id || courier?._id;

  const [image, setImage] = useState(null);

  const {
    data: courierData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courier", courierId],
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/couriers/${courierId}`);
      return res.data.data || res.data;
    },
    enabled: !!courierId,
    staleTime: 1000 * 60 * 5,
  });

  const handleImageUpload = async () => {
    if (!image) return toast.error("Select an image");
    if (!courierId) return toast.error("Courier not found");

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axiosClient.post(
        `/api/v1/couriers/${courierId}/profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Profile image uploaded");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  const handleViewInFleet = () => {
    navigate("/admin/view-in-fleet");
  };

  const handleShipmentDetail = () => {
    navigate(`/admin/shipment/${courierId}`);
  };

  if (isLoading) return <p>Loading courier...</p>;
  if (isError)
    return (
      <p className="text-red-500">Failed to load courier. Please retry.</p>
    );

  return (
    <div className="bg-[#e2fffe] font-body text-[#002020] min-h-screen flex items-center justify-center p-4">
      {/* <!-- Focused Success Canvas --> */}
      <main className="max-w-4xl w-full flex flex-col items-center">
        {/* <!-- Brand Logo Anchor --> */}
        <div className="mb-12 flex items-center gap-3">
          <div className="w-10 h-10 kinetic-gradient rounded-xl flex items-center justify-center text-[#83fba5]">
            <span
              className="material-symbols-outlined"
              data-icon="rocket_launch"
            >
              rocket_launch
            </span>
          </div>
          <span className="text-2xl font-extrabold tracking-tighter text-[#001736] font-headline uppercase">
            Velocity Transit
          </span>
        </div>
        {/* <!-- Success Animation/Icon Area --> */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#83fba5] blur-3xl opacity-10 rounded-full"></div>
          <div className="relative w-24 h-24 bg-[#83fba5] rounded-full flex items-center justify-center text-[#006d36]">
            <span
              className="material-symbols-outlined text-5xl"
              style={{ fontVariationSettings: "'wght' 600" }}
            >
              check_circle
            </span>
          </div>
        </div>
        {/* <!-- Headline --> */}
        <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-[#001736] mb-4 text-center tracking-tight">
          Courier Successfully Registered
        </h1>
        <p className="text-[#43474f] font-medium text-lg mb-12 text-center max-w-xl">
          {courierData?.fullName || "Courier"} has been added to the fleet...
          {courierData?.sector || "assigned"} hub.
        </p>
        {/* <!-- Asymmetric Detail Layout (Bento Style) --> */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mb-12">
          {/* <!-- Main Profile Card --> */}
          <div class="md:col-span-8 bg-[#ffffff] rounded-xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : courierData?.profileImage ||
                      "https://via.placeholder.com/150"
                }
                alt="profileImage"
                className="w-32 h-32 rounded-xl object-cover"
              />

              <div className="absolute -bottom-2 -right-2 bg-[#006d36] text-[#ffffff] px-3 py-1 rounded-lg text-xs font-bold tracking-wider uppercase">
                Active
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold text-[#001736] uppercase tracking-[0.15rem] mb-2 block">
                Courier Profile
              </span>
              <h2 className="text-3xl font-bold text-[#001736] mb-1">
                {courierData?.fullName}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-2 bg-[#d2f5f4] px-3 py-2 rounded-lg">
                  <span
                    className="material-symbols-outlined text-[#001736] text-lg"
                    data-icon="fingerprint"
                  >
                    fingerprint
                  </span>
                  <span className="text-sm font-semibold text-[#001736]">
                    {courierData?.employeeId || courierData?._id}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#d2f5f4] px-3 py-2 rounded-lg">
                  <span
                    className="material-symbols-outlined text-[#001736] text-lg"
                    data-icon="local_shipping"
                  >
                    local_shipping
                  </span>
                  <span className="text-sm font-semibold text-[#001736]">
                    {courierData?.vehicle}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Deployment Sector Card --> */}
          <div className="md:col-span-4 bg-[#001736] text-[#ffffff] rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
            <div className="relative z-10">
              <span className="text-xs font-bold text-[#83fba5] uppercase tracking-[0.15rem] mb-4 block">
                Sector Allocation
              </span>
              <h3 className="text-xl font-bold leading-tight">
                {courierData?.sector || "N/A"}
              </h3>
            </div>
            {/* <!-- Background Pattern --> */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <span
                className="material-symbols-outlined text-[120px]"
                data-icon="map"
              >
                map
              </span>
            </div>
            <div className="relative z-10 mt-6 flex items-center gap-2 text-[#83fba5]">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="verified_user"
              >
                verified_user
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">
                Priority Hub access
              </span>
            </div>
          </div>
          {/* <!-- Quick Stats Row (Tonal Shifts) --> */}
          <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#d7fafa] p-4 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#43474f] font-bold mb-1">
                Onboarding Status
              </p>
              <p className="text-lg font-bold text-[#006d36]">Complete</p>
            </div>
            <div className="bg-[#d7fafa] p-4 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#43474f] font-bold mb-1">
                Vetting Verified
              </p>
              <p className="text-lg font-bold text-[#001736]">100%</p>
            </div>
            <div className="bg-[#d7fafa] p-4 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#43474f] font-bold mb-1">
                Equipment Sync
              </p>
              <p className="text-lg font-bold text-[#001736]">Active</p>
            </div>
            <div className="bg-[#d7fafa] p-4 rounded-xl">
              <p className="text-[10px] uppercase tracking-widest text-[#43474f] font-bold mb-1">
                System Tier
              </p>
              <p className="text-lg font-bold text-[#001736]">Level 4 Admin</p>
            </div>
          </div>
        </div>
        {/* <!-- Action Section --> */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <button
            className="w-full md:w-auto px-8 py-4 bg-[#006d36] hover:bg-[#064e3b] text-[#ffffff] font-bold rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-[#006d36]/20"
            onClick={handleViewInFleet}
          >
            <span className="material-symbols-outlined" data-icon="visibility">
              visibility
            </span>
            View in Fleet
          </button>
          <button
            onClick={handleShipmentDetail}
            className="w-full md:w-auto px-8 py-4 border-2 border-[#c4c6d0] text-[#001736] font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-[#ccefee] transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined" data-icon="person_add">
              person_add
            </span>
            Shipment Details
          </button>
        </div>
        {/* <!-- Secondary Meta/Back Navigation --> */}
        <div className="mt-16 text-center">
          <Link
            to="/admin/dashboard"
            className="text-[#43474f] hover:text-[#001736] transition-colors font-semibold text-sm flex items-center gap-2 justify-center"
            href="#"
          >
            <span
              className="material-symbols-outlined text-base"
              data-icon="arrow_back"
            >
              arrow_back
            </span>
            Return to Dashboard
          </Link>
        </div>
      </main>
      {/* <!-- Background Decorative Element (Asymmetric) --> */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-screen bg-gradient-to-l from-[#d7fafa] to-transparent pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-64 h-64 bg-[#83fba5]/10 blur-[100px] pointer-events-none"></div>
    </div>
  );
}
