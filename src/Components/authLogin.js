import { Navigate } from "react-router-dom";
function AuthLogin({ children }) {
  return localStorage.getItem("email") ? <Navigate to={"/"} /> : children;
}

export default AuthLogin;
