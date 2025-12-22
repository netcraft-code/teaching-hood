import React, { useEffect, useRef, useState } from "react";
import { getProfile, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Router State Management
const routes = {
  SIGNIN: '/signin',
  PROFILE: '/profile',
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        setError("Unauthorized or session expired");
        localStorage.removeItem("auth_token");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ Send OTP - using auth.js
  const handleLogout = async () => {
    setError('');

    try {
      const res = await logout(); // ✅ Using auth.js

      if (res.data.status) {
        localStorage.removeItem("auth_token");
        navigate(routes.SIGNIN);
      } else {
        setError(res.data?.message || 'Issue in logout');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Issue in logout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>

          <div className="space-y-2">
            <p><strong>Name:</strong> {profile?.name || "N/A"}</p>
            <p><strong>Email:</strong> {profile?.email || "N/A"}</p>
            <p><strong>Role:</strong> {profile?.role || "N/A"}</p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
