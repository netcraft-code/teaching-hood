import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("auth_token");

  return isLoggedIn ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
