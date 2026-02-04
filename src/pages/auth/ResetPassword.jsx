import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../services/endpoints/authApi";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [show, setShow] = useState({ new: false, confirm: false });
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const email = sessionStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please verify OTP first");
      return;
    }

    if (form.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        email,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      }).unwrap();
      sessionStorage.removeItem("resetEmail");
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-md rounded-3xl p-8
        bg-white/10 backdrop-blur-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-gray-300 text-sm mb-6">
          Create a new password for your account.
        </p>

        {!email && (
          <p className="text-sm text-red-300 mb-4">
            Email not found. Please verify OTP again.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="text-sm text-gray-300 mb-1 block">
              New Password
            </label>
            <input
              type={show.new ? "text" : "password"}
              value={form.newPassword}
              onChange={(e) =>
                setForm({ ...form, newPassword: e.target.value })
              }
              placeholder="At least 8 characters"
              className="w-full px-4 py-2 rounded-full
              bg-white/20 text-white text-sm
              placeholder-gray-300 focus:outline-none
              focus:ring-2 focus:ring-[#309689] pr-12"
            />
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, new: !s.new }))}
              className="absolute right-3 top-[34px] text-gray-300 hover:text-[#309689]"
              aria-label={show.new ? "Hide password" : "Show password"}
            >
              {show.new ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="relative">
            <label className="text-sm text-gray-300 mb-1 block">
              Confirm Password
            </label>
            <input
              type={show.confirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              placeholder="Re-enter password"
              className="w-full px-4 py-2 rounded-full
              bg-white/20 text-white text-sm
              placeholder-gray-300 focus:outline-none
              focus:ring-2 focus:ring-[#309689] pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setShow((s) => ({ ...s, confirm: !s.confirm }))
              }
              className="absolute right-3 top-[34px] text-gray-300 hover:text-[#309689]"
              aria-label={show.confirm ? "Hide password" : "Show password"}
            >
              {show.confirm ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-full
            bg-[#309689] text-white font-medium
            hover:bg-[#257d73] transition-all duration-300"
          >
            {isLoading ? "Saving..." : "Reset Password"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          <Link to="/login" className="text-[#309689] hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
