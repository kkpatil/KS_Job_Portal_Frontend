import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { PiBagSimpleFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/endpoints/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSignup = async () => {
    try {
      await register(form).unwrap();
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden
                   bg-gradient-to-br from-black via-[#0f1f1c] to-black
                   shadow-[0_20px_60px_rgba(48,150,137,0.35)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
          {/* LEFT SECTION */}
          <div className="p-10 flex flex-col justify-center text-white">
            <div className="flex items-center gap-2 mb-10">
              <PiBagSimpleFill className="text-[#309689] text-3xl animate-spin-slow" />
              <span className="text-xl font-semibold">Job Portal</span>
            </div>

            <h2 className="text-4xl font-bold mb-3">SIGN UP</h2>

            <p className="text-gray-400 text-sm mb-8 max-w-sm">
              Create your account <br />
              and start your career journey.
            </p>

            <button
              className="flex items-center gap-3 w-fit px-6 py-3 rounded-full
                         border border-gray-600 text-sm
                         hover:border-[#309689] hover:text-[#309689]
                         transition-all duration-300"
            >
              <FaGoogle />
              Sign up with Google
            </button>

            <p className="text-sm text-gray-400 mt-8">
              Already have an account?
              <span className="text-[#309689] cursor-pointer ml-1 hover:underline">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>

          {/* RIGHT SIGNUP CARD */}
          <div className="flex items-center justify-center p-6">
            <div
              className="w-full max-w-sm rounded-2xl p-8
                         bg-white/10 backdrop-blur-xl
                         border border-white/20"
            >
              <h3 className="text-white font-semibold mb-6">Create Account</h3>

              {/* Name */}
              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-1 block">
                  Full Name
                </label>
                <input
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  type="text"
                  value={form.name}
                  placeholder="Eg. Ritika"
                  className="w-full px-4 py-2 rounded-full
                             bg-white/20 text-white text-sm
                             placeholder-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#309689]"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-1 block">
                  E-mail
                </label>
                <input
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  value={form.email}
                  type="email"
                  placeholder="Eg. jobportal@gmail.com"
                  className="w-full px-4 py-2 rounded-full
                             bg-white/20 text-white text-sm
                             placeholder-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#309689]"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-1 block">
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  value={form.password}
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-2 rounded-full
                             bg-white/20 text-white text-sm
                             placeholder-gray-300
                             focus:outline-none focus:ring-2 focus:ring-[#309689]"
                />
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-1 block">
                  Select Role
                </label>

                <select
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  value={form.role}
                  className="w-full px-4 py-2 rounded-full
               bg-white/20 text-white text-sm
               focus:outline-none focus:ring-2 focus:ring-[#309689]"
                >
                  <option value="" disabled className="text-black">
                    Choose role
                  </option>
                  <option value="CANDIDATE" className="text-black">
                    Candidate
                  </option>
                  <option value="EMPLOYER" className="text-black">
                    Employer
                  </option>
                 
                </select>
              </div>

              {/* Signup Button */}
              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full py-2 rounded-full bg-[#309689] text-white font-medium disabled:opacity-50"
              >
                {isLoading ? "Signing up..." : "SIGN UP"}
              </button>

              {error && (
                <p className="text-red-400 text-sm mt-3 text-center">
                  {error?.data?.message || "Signup failed"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
