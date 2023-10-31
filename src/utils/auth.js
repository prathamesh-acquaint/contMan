import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";

export const requireAuth = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }
  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();

  if (expirationTime <= currentTime) {
    // Token expired.
    localStorage.removeItem("accessToken");
    return false;
  }
  return true;
};
