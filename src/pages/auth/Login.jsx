import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { PiBagSimpleFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/endpoints/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData).unwrap();
      console.log("Login successful:", data);
      localStorage.setItem("token", data.data.token);
      // localStorage.setItem("user", JSON.stringify(data.data.user));

      alert("Login successful");
       navigate("/dashboard");
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Main Container */}
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden
                      bg-gradient-to-br from-black via-[#0f1f1c] to-black
                      shadow-[0_20px_60px_rgba(48,150,137,0.35)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-130">
          {/* LEFT SECTION */}
          <div className="p-10 flex flex-col justify-center text-white">
            <div className="flex items-center gap-2 mb-10">
              <PiBagSimpleFill className="text-[#309689] text-3xl animate-spin-slow" />
              <span className="text-xl font-semibold">Job Portal</span>
            </div>

            <h2 className="text-4xl font-bold mb-3">LOGIN</h2>
            <p className="text-gray-400 text-sm mb-8 max-w-sm">
              Hey, welcome back! <br />
              We hope you had a great day.
            </p>

            <button
              className="flex items-center gap-3 w-fit px-6 py-3 rounded-full
                         border border-gray-600 text-sm
                         hover:border-[#309689] hover:text-[#309689]
                         transition-all duration-300"
            >
              <FaGoogle />
              Login with Google
            </button>

            <p className="text-sm text-gray-400 mt-8">
              Not yet a member?
              <span className="text-[#309689] cursor-pointer ml-1 hover:underline">
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </div>

          {/* RIGHT LOGIN CARD */}
          <div className="flex items-center justify-center p-6">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm rounded-2xl p-8
               bg-white/10 backdrop-blur-xl
               border border-white/20"
            >
              <h3 className="text-white font-semibold mb-6">Login</h3>

              {/* Email */}
              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  placeholder="Eg. jobportal@gmail.com"
                  className="w-full px-4 py-2 rounded-full
                   bg-white/20 text-white text-sm
                   placeholder-gray-300
                   focus:outline-none focus:ring-2 focus:ring-[#309689]"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="text-sm text-gray-300 mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  placeholder="********"
                  className="w-full px-4 py-2 rounded-full
                   bg-white/20 text-white text-sm
                   placeholder-gray-300
                   focus:outline-none focus:ring-2 focus:ring-[#309689]"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-full
                 bg-[#309689] text-white font-medium
                 hover:bg-[#257d73] transition-all duration-300"
              >
                {isLoading ? "Logging in..." : "LOGIN"}
              </button>

              {error && (
                <p className="text-red-400 text-sm mt-3 text-center">
                  {error?.data?.message || "Login failed"}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
