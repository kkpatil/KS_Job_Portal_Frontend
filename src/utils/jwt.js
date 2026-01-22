export const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = token.split(".")[1]; // middle part
    const decoded = JSON.parse(atob(payload)); // base64 decode
    return decoded.role; // ADMIN | EMPLOYER | CANDIDATE
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
