import { useSelector } from "react-redux";

const RoleRoute = ({ role, children }) => {
  const user = useSelector(state => state.auth.user);
  return user?.role === role ? children : <Navigate to="/" />;
};
