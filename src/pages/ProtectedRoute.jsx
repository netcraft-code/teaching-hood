import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProtectedRoute = ({ children, notAllowedUserType }) => {
  const token = localStorage.getItem("auth_token");
  const userType = localStorage.getItem("user_type"); // assume user stored

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  // ❌ Logged in but not authorized
  if (notAllowedUserType && userType == notAllowedUserType) {
    return (
      <>
        <Header />
          <div className="min-h-[60vh] flex items-center justify-center">
            <h2 className="text-xl font-semibold text-red-600">
              You are not authorized to access this route
            </h2>
          </div>
        <Footer />
      </>
    );
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
