import React from "react";
import { Link } from "react-router-dom";
import singupIllustration from "../../assets/images/singupIllustration.webp";
const Register = () => {
  return (
    <div className="flex min-h-screen w-full"> {/* left section */}
        <div className="w-full md:w-1/2 px-10 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create account
          </h1>
          <p className="text-gray-500 mb-8">
            Join us and start managing your work efficiently
          </p>

          <form className="space-y-5">
            {/* Username */}
            <input
              type="text"
              placeholder="Username"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />

            {/* Role */}
            <select className="w-full px-5 py-3 rounded-full border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-black">
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Employer</option>
              <option value="user">Candidate</option>
            </select>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
            >
              Register
            </button>
          </form>

          {/* Social Signup */}
          {/* <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">or continue with</p>
            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-100">
                G
              </button>
              <button className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-100">
                
              </button>
              <button className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-100">
                f
              </button>
            </div>
          </div> */}

          {/* Footer */}
          <p className="text-sm text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <span className="text-black font-semibold cursor-pointer">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>

        {/* Right Section */}
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
            <p className="text-gray-500 mt-2">with our productivity app</p>
          </div>
        </div>
    </div>
  );
};

export default Register;
