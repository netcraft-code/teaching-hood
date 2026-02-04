import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
const isLoggedIn = !!localStorage.getItem("auth_token");

  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default AuthRedirect;
