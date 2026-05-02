import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import { toast } from "sonner";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import google from "../../assets/goolge.png";
import { useMutation } from "@tanstack/react-query";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await axiosClient.post("/api/v1/admin/login", {
        email,
        password,
      });
      return res.data.data;
    },

    onSuccess: (data) => {
      const { accessToken, admin } = data;

      localStorage.setItem("accessToken", accessToken);

      toast.success(`Welcome back, ${admin.name}`);

      setTimeout(() => {
        navigate("/admin");
      }, 300);
    },

    onError: (error) => {
      const msg = error?.response?.data?.message || "Login failed. Try again.";
      toast.error(msg);
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  /* =========================
     SUBMIT HANDLER (NO REACT QUERY)
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginMutation.isPending) return;

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    if (!email.includes("@")) {
      return toast.error("Enter a valid email");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="bg-[#e2fffe] font-body text-[#002020] min-h-screen flex flex-col">
      {/* <!-- Main Content: Split Screen --> */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* <!-- Left Side: Hero Brand --> */}
        <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-[#001736]">
          <div className="absolute inset-0 z-0">
            <img
              alt="Modern logistics hub with delivery trucks"
              className="w-full h-full object-cover"
              data-alt="Modern delivery trucks at a sleek warehouse loading bay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMytzBPQ8EPZXO0tXgJRA5P4WNNqLX_EIRMSH6qyqWKnUY-AkewH22r2Dj_DyIoYIc7RN6V4qwNah2ek422_sM_yRFzkQk4beDT4wrLbQ4TjK9jXAmliDg_dqzYqFdNr_k-FN3tJfrGVoKouPgiLmYgEPvKocejdgWIBJ9nuv-PJHE_J5XDpOIOL0a0AY7UdWRaZzn-TOi6wWANDYiO99gm7vdzWySGl4rG-G1oA6zcxIhpMUAGQ1WuG7PZGLdW0CKQ8Qg5eAc4cPc"
            />
            <div className="absolute inset-0 bg-[#001736]/60 backdrop-blur-sm"></div>
          </div>
          <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
            <div className="space-y-6 max-w-lg">
              <span className="inline-block px-4 py-1 rounded-full bg-[#83fba5] text-[#00743a] text-xs font-bold uppercase tracking-widest">
                Global Logistics
              </span>
              <h2 className="text-5xl xl:text-6xl font-extrabold text-[#ffffff] tracking-tighter leading-tight">
                Speed, Precision, Global Reach
              </h2>
              <p className="text-lg text-[#c6e9e9]/80 font-medium leading-relaxed max-w-md">
                Connecting the world through high-speed infrastructure and
                intelligent fleet management systems.
              </p>
              <div className="pt-8 flex gap-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#006d36]">
                    99.8%
                  </span>
                  <span className="text-xs uppercase tracking-tighter text-[#c6e9e9]">
                    On-Time Precision
                  </span>
                </div>
                <div className="w-[1px] h-12 bg-[#c4c6d0]/30"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#006d36]">
                    24/7
                  </span>
                  <span className="text-xs uppercase tracking-tighter text-[#c6e9e9]">
                    Live Monitoring
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Kinetic Accent --> */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#006d36]/10 rounded-tl-full -mr-20 -mb-20"></div>
        </section>
        {/* <!-- Right Side: Sign In Form --> */}
        <section className="flex-grow md:w-1/2 flex items-center justify-center p-8 bg-surface-container-low">
          <div className="w-full max-w-md space-y-10">
            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-[#001736] tracking-tight">
                Welcome back
              </h3>
              <p className="text-[#43474f] font-medium">
                Please enter your credentials to access the fleet dashboard.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* <!-- Email Field --> */}
                <div className="space-y-1">
                  <label
                    className="text-xs font-bold uppercase tracking-[0.05rem] text-[#001736]/70 block"
                    htmlFor="email"
                  >
                    Corporate Email
                  </label>
                  <div className="relative group">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-[#ffffff] border-0 border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 px-0 py-3 transition-all text-[#001736] font-medium placeholder:text-[#c4c6d0]/50"
                    />
                  </div>
                </div>
                {/* <!-- Password Field --> */}
                <div className="space-y-1">
                  <div className="flex justify-between items-end">
                    <label
                      className="text-xs font-bold uppercase tracking-[0.05rem] text-[#001736]/70 block"
                      htmlFor="password"
                    >
                      Secure Password
                    </label>
                    <Link
                      to="/reset-password"
                      className="text-xs font-bold text-[#006d36] hover:text-[#001736] hover:underline transition-all"
                      href="#"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handleChange}
                      className="w-full bg-[#ffffff] border-0 border-b-2 border-[#c4c6d0] focus:border-[#006d36] focus:ring-0 px-0 py-3 transition-all text-[#001736] font-medium placeholder:text-[#c4c6d0]/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-5 text-gray-500"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className={`w-full py-3 font-bold rounded-xl transition-all
    ${
      loginMutation.isPending
        ? "bg-[#006d36]/60 cursor-not-allowed"
        : "bg-[#006d36] hover:bg-[#005227]"
    }
  `}
                >
                  {loginMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="4"
                          fill="none"
                          className="opacity-25"
                        />
                        <path
                          fill="white"
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#c4c6d0]/30"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#ffffff] font-boldpx-4 text-xs font-bold text-[#001736] uppercase tracking-widest">
                      Enterprise Auth
                    </span>
                  </div>
                </div>
                <div className="items-center justify-center gap-2 w-full flex">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl"
                  >
                    <img src={google} alt="google" className="w-6 h-6" />
                    Continue with Google
                  </button>
                </div>
              </div>
            </form>
            <div className="flex justify-center items-center gap-3">
              <p className="text-center text-[#43474f] font-medium text-sm">
                Need an account?
              </p>
              <Link
                to="/signup"
                className="text-[#006d36] font-bold hover:underline"
                href="#"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- Footer --> */}
      <footer className="w-full py-8 mt-auto bg-[#e2fffe] dark:bg-[#001736]">
        <div className="border-t border-[#c4c6d0]/15 mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-7xl mx-auto">
          <p className="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b] dark:text-[#e2fffe] opacity-80">
            © 2026 Velocity Transit. Kinetic Precision Logistics.
          </p>
          <div className="flex gap-8">
            <a
              className="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b]/70 dark:text-[#c6e9e9]/70 hover:text-[#006d36] dark:hover:text-[#83fba5] transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b]/70 dark:text-[#c6e9e9]/70 hover:text-[#006d36] dark:hover:text-[#83fba5] transition-colors"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="font-['Manrope'] text-xs uppercase tracking-[0.05rem] font-medium text-[#002b5b]/70 dark:text-[#c6e9e9]/70 hover:text-[#006d36] dark:hover:text-[#83fba5] transition-colors"
              href="#"
            >
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
