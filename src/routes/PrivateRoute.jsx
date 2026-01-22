import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwt";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = getRoleFromToken(); // 🔥 JWT se role
  console.log("PrivateRoute - role:", role);
  // Not logged in
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    if (role === "ADMIN") return <Navigate to="/admin" replace />;
    if (role === "EMPLOYER") return <Navigate to="/employer" replace />;
    if (role === "CANDIDATE") return <Navigate to="/candidate" replace />;

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
