import React, { useEffect, useRef, useState } from "react";
import { getProfile, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileModal from "../components/EditProfileModal";

// Router State Management
const routes = {
  SIGNIN: '/signin',
  PROFILE: '/profile',
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
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
      <ProfileHeader onEdit={() => setEditOpen(true)} id={profile?.id} />

      <hr className="border-t border-gray-200" />

      {/* Existing profile content */}
      <div className="mx-auto px-24 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SECTION */}
            <div className="lg:col-span-2 space-y-6">

              {/* PROFILE CARD */}
              <div className="bg-white rounded-xl shadow p-6 relative">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                  alt="cover"
                  className="w-full h-40 object-cover rounded-lg"
                />

                <div className="flex items-end gap-4 -mt-12">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    className="w-24 h-24 rounded-full border-4 border-white"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">Priya Sharma</h2>
                    <p className="text-sm text-gray-500">
                      PGT Mathematics Teacher
                    </p>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>📍 Gurgaon, Haryana</span>
                      <span>⏱ 8 years experience</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
                    Available
                  </span>
                </div>
              </div>

              {/* TABS */}
              <div className="bg-white rounded-xl shadow p-2 flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                  Overview
                </button>
                <button className="px-4 py-2 text-gray-500 text-sm">
                  Experience
                </button>
                <button className="px-4 py-2 text-gray-500 text-sm">
                  Education
                </button>
                <button className="px-4 py-2 text-gray-500 text-sm">
                  Jobs Applied
                </button>
              </div>

              {/* ABOUT */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Passionate mathematics educator with 8+ years of experience teaching
                  middle and high school students. Specialized in making complex concepts
                  simple and engaging through innovative teaching methods.
                </p>
              </div>

              {/* TEACHING EXPERTISE */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Teaching Expertise</h3>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {["Mathematics", "Physics", "Computer Science"].map(s => (
                      <span
                        key={s}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Grade Levels</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Middle School (6–8)",
                      "Secondary (9–10)",
                      "PYP, MYP, IGCSE",
                    ].map(g => (
                      <span
                        key={g}
                        className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-full"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CERTIFICATIONS & ACHIEVEMENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-semibold mb-3">Certifications</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✔ CTET Certified</li>
                    <li>✔ Google Certified Educator Level 2</li>
                    <li>✔ Advanced Excel Certification</li>
                    <li>✔ Child Psychology Certificate</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="font-semibold mb-3">Achievements</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>🏆 Best Teacher Award 2023</li>
                    <li>📈 Improved student results by 50%</li>
                    <li>📚 Published research on teaching methods</li>
                    <li>💯 100% board exam success rate</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="space-y-6">

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Quick Information</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400">Availability</p>
                    <p>Available for Full-time positions</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Expected Salary</p>
                    <p className="text-green-600 font-semibold">
                      ₹35,000 – ₹45,000 / month
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">Notice Period</p>
                    <p>Immediate / 30 days</p>
                  </div>

                  <div>
                    <p className="text-gray-400">Preferred Location</p>
                    <p>Gurgaon, Delhi NCR</p>
                  </div>
                </div>

                <button className="w-full mt-4 border rounded-lg py-2 text-sm">
                  Upload Latest Resume
                </button>
              </div>

              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-3">Share Profile</h3>
                <div className="flex gap-3">
                  <button className="w-9 h-9 bg-blue-600 text-white rounded-full">f</button>
                  <button className="w-9 h-9 bg-pink-500 text-white rounded-full">📸</button>
                  <button className="w-9 h-9 bg-yellow-400 text-white rounded-full">🔗</button>
                </div>
              </div>

            </div>
          </div>

      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
};

export default Profile;
