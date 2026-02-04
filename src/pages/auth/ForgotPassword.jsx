import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../services/endpoints/authApi";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      sessionStorage.setItem("resetEmail", email);
      toast.success("OTP sent to your email");
      navigate("/verify-otp");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div
        className="w-full max-w-md rounded-3xl p-8
        bg-white/10 backdrop-blur-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Forgot Password</h2>
        <p className="text-gray-300 text-sm mb-6">
          Enter your email to receive a 6-digit OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-2 rounded-full
              bg-white/20 text-white text-sm
              placeholder-gray-300 focus:outline-none
              focus:ring-2 focus:ring-[#309689]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-full
            bg-[#309689] text-white font-medium
            hover:bg-[#257d73] transition-all duration-300"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Remembered your password?{" "}
          <Link to="/login" className="text-[#309689] hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
