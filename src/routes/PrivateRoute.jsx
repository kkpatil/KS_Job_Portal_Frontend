import { Navigate, useLocation } from "react-router-dom";
import { getTokenPayload } from "../utils/jwt";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const payload = getTokenPayload();
  const location = useLocation();

  if (!payload) {
    return <Navigate to="/login" replace />;
  }

  const { role, profileCompleted } = payload;

  // ✅ ALLOW employer to access complete-profile page
  if (
    role === "EMPLOYER" &&
    !profileCompleted &&
    location.pathname !== "/employer/complete-profile"
  ) {
    return <Navigate to="/employer/complete-profile" replace />;
  }

  // ❌ role not allowed
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    if (role === "EMPLOYER") return <Navigate to="/employer" replace />;
    if (role === "CANDIDATE") return <Navigate to="/candidate" replace />;

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
