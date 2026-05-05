import React from "react";
import {
  CheckCircle2,
  ArrowRight,
  PlusSquare,
  Truck,
  Copy,
  MapPin,
  Flag,
  Rocket,
  Globe,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import axiosClient from "../utils/axiosClient";
import { toast } from "sonner";

export default function ShipmentCreatedSuccessfully() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: shipment, isLoading } = useQuery({
    queryKey: ["shipment", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosClient.get(`/api/v1/shipments/${id}`);
      return res.data.data;
    },
  });
  shipment?.courier;

  if (isLoading) {
    return <div className="p-10">Loading shipment...</div>;
  }

  if (!shipment) {
    return (
      <div className="p-10">
        <p>No shipment data found</p>
        <button
          onClick={() => navigate("/admin/create-shipment")}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shipment.trackingId);
    toast.success("Tracking ID copied!");
  };

  const handleAssignCourier = () => {
    navigate("/admin/select-courier", {
      state: { shipmentId: shipment._id },
    });
  };

  const handleShipmentDetail = (shipment) => {
    navigate(`/admin/shipment-detail/${shipment._id}`);
  };

  return (
    <div className="bg-[#e2fffe] text-[#002020] min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#006d36]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#001736]/5 rounded-full blur-[120px]"></div>
        <div className="w-full max-w-4xl z-10 flex flex-col md:flex-row gap-8 items-stretch">
          <div className="flex-1 flex flex-col justify-center items-start space-y-8">
            <div className="flex flex-col space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#83fba5] text-[#006d36] mb-2">
                <CheckCircle2 className="w-12 h-12 text-[#006d36]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#001736] tracking-tighter leading-none">
                Shipment <br />
                Manifest Created
              </h1>
              <p className="text-[#001736]/60 font-medium max-w-md">
                The transit protocol has been initiated. Velocity logs have
                updated across all regional hubs.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={handleAssignCourier}
                disabled={!!shipment?.courier}
                className={`w-full md:w-auto px-10 py-4 font-bold rounded-xl shadow-2xl flex items-center justify-center gap-3 transition-transform ${
                  shipment?.courier
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-br from-[#001736] to-[#002b5b] text-white hover:scale-[0.98]"
                }`}
              >
                Assign Courier for this Shipment
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleShipmentDetail}
                className="w-full md:w-auto px-10 py-4 bg-[#c6e9e9] text-[#001736] font-bold rounded-xl hover:bg-[#bfe0e0] transition-colors flex items-center justify-center gap-3"
              >
                <PlusSquare className="w-4 h-4" />
                View Shipment
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-[#ffffff] p-8 md:p-10 rounded-[2rem] shadow-[0_24px_48px_rgba(0,32,32,0.04)] border-[#c4c6d0]/10 relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 p-6 opacity-5 select-none">
                <Truck className="w-24 h-24" />
              </div>
              <div className="mb-10">
                <span className="text-[10px] uppercase tracking-[0.2rem] font-bold text-[#001736]/40 block mb-2">
                  Tracking Identity
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-[#001736] tracking-tight">
                    {shipment.trackingId}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-[#d2f5f4] rounded-full text-[#001736]/40 transition-colors"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15rem] font-bold text-[#001736]/40 block mb-3">
                      Origin Hub
                    </span>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#006d36]" />
                      <span className="font-bold text-[#001736]">
                        {shipment.pickupAddress}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15rem] font-bold text-[#001736]/40 block mb-3">
                      Destination
                    </span>
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-[#ba1a1a]" />
                      <span className="font-bold text-[#001736]">
                        {shipment.deliveryAddress}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-[#ccefee] w-full"></div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15rem] font-bold text-[#001736]/40 block mb-3">
                      Service Level
                    </span>
                    <div className="inline-flex px-3 py-1 bg-[#83fba5] text-[#00743a] rounded-full text-xs font-black tracking-wide">
                      {shipment.serviceLevel}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15rem] font-bold text-[#001736]/40 block mb-3">
                      Total Cost
                    </span>
                    <span className="text-2xl font-black text-[#001736] tracking-tighter">
                      ${Number(shipment?.cost || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-dashed border-[#c4c6d0]/30">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] uppercase tracking-[0.15rem] font-bold text-[#001736]/40">
                      Transit Blueprint
                    </span>
                    <span className="text-[10px] font-bold text-[#006d36]">
                      AERODYNAMIC-V3
                    </span>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <div className="h-2 w-full bg-[#006d36] rounded-full"></div>
                    <div className="h-2 w-full bg-[#c6e9e9] rounded-full"></div>
                    <div className="h-2 w-full bg-[#c6e9e9] rounded-full"></div>
                    <div className="h-2 w-full bg-[#c6e9e9] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="w-full flex items-center justify-between px-8 py-6 opacity-40 select-none">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#001736] rounded-lg flex items-center justify-center">
            <Rocket className="w-4 h-4 text-[#ffffff]" />
          </div>
          <span className="text-xs font-black tracking-widest text-[#001736] uppercase">
            Velocity Transit System
          </span>
        </div>
        <span className="text-xs font-medium text-[#001736]">
          ADMIN CONSOLE V2.4
        </span>
      </div>
    </div>
  );
}
