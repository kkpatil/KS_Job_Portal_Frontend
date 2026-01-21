import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const role = localStorage.getItem("role"); // plain string

  // Not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (allowedRoles.length && !allowedRoles.includes(role)) {
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "employer") return <Navigate to="/employer" replace />;
    if (role === "candidate") return <Navigate to="/candidate" replace />;

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
