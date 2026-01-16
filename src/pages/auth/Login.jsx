import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import singupIllustration from "../../assets/images/singupIllustration.webp";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
        {/* LEFT SECTION */}
        <div className="w-full md:w-1/2 px-10 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>

          <p className="text-gray-500 mb-8">
            Login to continue managing your work efficiently
          </p>

          <form className="space-y-5">
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="button"
                className="absolute right-5 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-500 hover:text-black"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="button"
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-8">
            Not a member?{" "}
            <Link
              to="/register"
              className="text-green-500 font-medium cursor-pointer"
            >
              Register now
            </Link>
          </p>
        </div>

        {/* RIGHT SECTION (SAME AS REGISTER) */}
        <div className="hidden md:flex w-1/2 bg-[#f3faef] items-center justify-center p-10">
          <div className="text-center">
            <img
              src={singupIllustration}
              alt="Illustration"
              className="mx-auto mb-6 max-w-sm"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              Make your work easier and organized
            </h2>
            <p className="text-gray-500 mt-2">
              with our productivity app
            </p>
          </div>
        </div>

    </>
  );
};

export default Login;
