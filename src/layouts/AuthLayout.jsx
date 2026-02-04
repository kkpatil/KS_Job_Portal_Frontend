import { Navigate } from "react-router-dom";
import { getTokenPayload } from "../utils/jwt";

const AuthLayout = ({ children }) => {
  const payload = getTokenPayload();

  if (payload?.role) {
    const { role, profileCompleted } = payload;
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    if (role === "EMPLOYER") {
      return (
        <Navigate
          to={profileCompleted ? "/employer" : "/employer/complete-profile"}
          replace
        />
      );
    }
    if (role === "CANDIDATE") {
      return (
        <Navigate
          to={profileCompleted ? "/candidate" : "/candidate/complete-profile"}
          replace
        />
      );
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-[#0b0f14] via-[#0f1f1c] to-[#0b0f14]">
      <div className="w-full max-w-5xl  overflow-hidden ">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
