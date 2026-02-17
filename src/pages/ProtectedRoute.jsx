import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProtectedRoute = ({ children, notAllowedUserTypes = [] }) => {
  const token = localStorage.getItem("auth_token");
  const userType = Number(localStorage.getItem("user_type")); // convert to number

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
console.log(notAllowedUserTypes, (userType));
  // ❌ Logged in but not authorized
  if (notAllowedUserTypes.includes(userType)) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <h2 className="text-xl font-semibold text-red-600">
            You are not authorized to access this Service
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
