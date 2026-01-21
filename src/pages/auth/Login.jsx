import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import singupIllustration from "../../assets/images/singupIllustration.webp";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    localStorage.setItem("role", "admin");
    navigate("/admin", { replace: true });
  };

  const handleEmployerLogin = () => {
    localStorage.setItem("role", "employer");
    navigate("/employer", { replace: true });
  };

  const handleCandidateLogin = () => {
    localStorage.setItem("role", "candidate");
    navigate("/candidate", { replace: true });
  }

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      navigate(`/${storedRole}`, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT */}
      <div className="w-full md:w-1/2 px-6 sm:px-10 py-10 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back!
        </h1>

        <p className="text-gray-500 mb-8">
          Login to continue managing your work efficiently
        </p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-3 rounded-full border"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-full border"
            />
            <button
              type="button"
              className="absolute right-5 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-gray-500">
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            onClick={handleAdminLogin}
            className="w-full bg-black text-white py-3 rounded-full"
          >
            Login Admin
          </button>

          <button
            type="button"
            onClick={handleCandidateLogin}
            className="w-full bg-black text-white py-3 rounded-full"
          >
            Login Candidate
          </button>

          <button
            type="button"
            onClick={handleEmployerLogin}
            className="w-full bg-black text-white py-3 rounded-full"
          >
            Login Employer
          </button>
        </form>

        <p className="text-sm text-center mt-8">
          Not a member?{" "}
          <Link to="/register" className="text-green-500">
            Register now
          </Link>
        </p>
      </div>

      {/* RIGHT */}
      <div className="hidden md:flex w-1/2 bg-[#f3faef] items-center justify-center">
        <img src={singupIllustration} alt="Illustration" />
      </div>
    </div>
  );
};

export default Login;
