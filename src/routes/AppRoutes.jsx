import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import PostJob from "../pages/PostJob";
import FindJob from "../pages/FindJob";
import ProtectedRoute from "../pages/ProtectedRoute";
import AboutUs from "../pages/AboutUs";
import TermCondition from "../pages/TermCondition";
import AuthRedirect from "../pages/AuthRedirect";
import EditJob from "../pages/EditJob";
import ContactUs from "../pages/ContactUs";
import JobViewPage from "../pages/JobViewPage";
import Pricing from "../pages/Pricing";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/term-condition" element={<TermCondition />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {/* Auth pages */}
      <Route
        path="/signin"
        element={
          <AuthRedirect>
            <SignIn />
          </AuthRedirect>
        }
      />

      <Route
        path="/signup"
        element={
          <AuthRedirect>
            <SignUp />
          </AuthRedirect>
        }
      />

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
          <ProtectedRoute notAllowedUserType={1}>
            <PostJob />
          </ProtectedRoute>
        }
      />

      <Route path="/edit-job/:id" element={<EditJob />} />

      <Route
        path="/find-job"
        element={
          <FindJob />
        }
      />

      {/* Job View Page - single job details */}
      <Route path="/job/:id" element={<JobViewPage />} />
      
      {/* Pricing Page - subscription plans */}
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
};

export default AppRoutes;
