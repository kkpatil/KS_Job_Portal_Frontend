import api from "../../api/axios";

// Login API
const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// Register API
const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Get Logged-in User
const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// Logout (frontend only)
const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  login,
  register,
  getMe,
  logout,
};

export default authService;
