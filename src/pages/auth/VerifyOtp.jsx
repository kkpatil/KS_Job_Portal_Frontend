import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "../../services/endpoints/authApi";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resending }] = useForgotPasswordMutation();

  const email = sessionStorage.getItem("resetEmail");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please request an OTP first");
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    try {
      await verifyOtp({ email, otp }).unwrap();
      toast.success("OTP verified");
      navigate("/reset-password");
    } catch (err) {
      toast.error(err?.data?.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Please request an OTP first");
      return;
    }

    try {
      await resendOtp({ email }).unwrap();
      toast.success("OTP resent");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div
        className="w-full max-w-md rounded-3xl p-8
        bg-white/10 backdrop-blur-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Verify OTP</h2>
        <p className="text-gray-300 text-sm mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        {!email && (
          <p className="text-sm text-red-300 mb-4">
            Email not found. Please request a new OTP.
          </p>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300 mb-1 block">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              maxLength={6}
              className="w-full px-4 py-2 rounded-full
              bg-white/20 text-white text-sm
              placeholder-gray-300 focus:outline-none
              focus:ring-2 focus:ring-[#309689] tracking-widest text-center"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-full
            bg-[#309689] text-white font-medium
            hover:bg-[#257d73] transition-all duration-300"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-[#309689] hover:underline"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
          <Link to="/forgot-password" className="text-gray-300 hover:underline">
            Change email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
