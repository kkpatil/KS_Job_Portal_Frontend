import { Navigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const role = JSON.parse(localStorage.getItem("role"));

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#ededed] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg flex overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
