import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import PostJob from "../pages/PostJob";
import FindJob from "../pages/FindJob";
import ProtectedRoute from "../pages/ProtectedRoute";
import AboutUs from "../pages/AboutUs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about-us" element={<AboutUs />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/post-job"
        element={
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/find-job"
        element={
          <ProtectedRoute>
            <FindJob />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
