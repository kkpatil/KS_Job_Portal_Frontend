import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { PiBagSimpleFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/endpoints/authApi";
import { getTokenPayload } from "../../utils/jwt"; // ✅ IMPORT FIX

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
      const res = await login(formData).unwrap();
      const token = res.data.token;

      localStorage.setItem("token", token);

      const payload = getTokenPayload();

      if (!payload) {
        navigate("/login", { replace: true });
        return;
      }

      const { role, profileCompleted } = payload;

      // 🔥 DIRECT REDIRECT (NO /dashboard)
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
        return;
      }

      if (role === "EMPLOYER") {
        navigate(
          profileCompleted ? "/employer" : "/employer/complete-profile",
          { replace: true },
        );
        return;
      }

      if (role === "CANDIDATE") {
        navigate("/candidate", { replace: true });
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  //  const token = localStorage.getItem("token");
  //   useEffect(()=>{
  //     if(token){
  //      const {role, profileCompleted} = getTokenPayload();
  //      if(role === "ADMIN"){
  //       navigate("/admin", {replace: true});
  //      }
  //      if(role === "EMPLOYER"){
  //       navigate(profileCompleted ? "/employer" : "/employer/complete-profile", {replace: true});
  //      }
  //      if(role === "CANDIDATE"){
  //       navigate("/candidate", {replace: true});
  //      }
  //     }
  //   },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden
        bg-gradient-to-br from-black via-[#0f1f1c] to-black
        shadow-[0_20px_60px_rgba(48,150,137,0.35)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-130">
          {/* LEFT */}
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
              <span className="text-[#309689] ml-1 hover:underline">
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center p-6">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm rounded-2xl p-8
              bg-white/10 backdrop-blur-xl
              border border-white/20"
            >
              <h3 className="text-white font-semibold mb-6">Login</h3>

              <div className="mb-4">
                <label className="text-sm text-gray-300 mb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Eg. jobportal@gmail.com"
                  className="w-full px-4 py-2 rounded-full
                  bg-white/20 text-white text-sm
                  placeholder-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#309689]"
                />
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-300 mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="********"
                  className="w-full px-4 py-2 rounded-full
                  bg-white/20 text-white text-sm
                  placeholder-gray-300
                  focus:outline-none focus:ring-2 focus:ring-[#309689]"
                />
              </div>

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
