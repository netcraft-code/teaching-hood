import React, { useEffect, useRef, useState } from "react";
import { getProfile, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileModal from "../components/EditProfileModal";
import durationIcon from "../assets/icons/duration.svg";
import locationIcon from "../assets/icons/location.svg";
import aboutUsIcon from "../assets/icons/about-us.svg";
import teachingExpertiseIcon from "../assets/icons/teaching-expertise.svg";
import teacherBannerImage from "../assets/images/teacher-banner.png";
import teacherAvatarImage from "../assets/images/teacher-avatar.png";
import schoolBannerImage from "../assets/images/school-banner.png";
import schoolAvatarImage from "../assets/images/school-avatar.png";
import recruiterBannerImage from "../assets/images/recruiter-banner.png";
import recruiterAvatarImage from "../assets/images/recruiter-avatar.png";

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
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const FETCH_BANNER_AVATAR = {
    1: { // Teacher
      bannerImage: teacherBannerImage,
      avatarImage: teacherAvatarImage,
    },

    2: { // School
      bannerImage: schoolBannerImage,
      avatarImage: schoolAvatarImage,
    },

    3: { // Recruiter
      bannerImage: recruiterBannerImage,
      avatarImage: recruiterAvatarImage,
    },
  };

  const getBannerAvatar = (url, userType, urlType) => {
    if (url) return url;

    return FETCH_BANNER_AVATAR[userType][urlType];
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.data);
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
      console.log("Logout response:", res);
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
      <ProfileHeader onEdit={() => setEditOpen(true)} profile={profile} />

      {/* Existing profile content */}
      <div className="mx-auto px-28 py-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* PROFILE CARD */}
            <div className="rounded-2xl relative shadow-md">
              <img
                src={getBannerAvatar(profile.banner_image_url, profile.user_type, 'bannerImage')}
                alt="cover"
                className="w-full h-32 rounded-t-2xl"
              />

              <div className="flex items-start gap-4 mx-8 pb-8">
                <img
                  src={getBannerAvatar(profile.avatar_url, profile.user_type, 'avatarImage')}
                  className="w-32 h-32 -mt-16"
                />

                <div className="flex-1 mt-6">
                  <h2 className="text-3xl font-semibold mb-2">{profile.name}</h2>
                  <p className="text-m text-gray-500">
                    {profile?.position || 'Position not specified'}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <img src={locationIcon} alt="Duration" />
                      
                      {profile?.addresses ? profile.addresses.city + ", " + profile.addresses.state : 'Location not specified'}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={durationIcon} alt="Duration" />
                      
                      {profile?.additional_info?.experience ? `${profile.additional_info.experience} years experience` : '0 year experience'}
                    </span>
                  </div>
                </div>

                <span className={`flex items-center gap-2 px-4 py-2 mt-2 text-sm rounded-full ${
                  profile?.additional_info?.availability 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    profile?.additional_info?.availability 
                    ? 'bg-green-600' 
                    : 'bg-red-600'
                    }`}
                  ></span>
                  {profile?.additional_info?.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            {/* TABS */}
            <div className="bg-white rounded-xl shadow p-2 flex gap-2">
              {["overview", "experience", "education", "jobs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition
                    ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  {tab === "jobs" ? "Jobs Applied" : tab}
                </button>
              ))}
            </div>

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <div>
                {/* ABOUT US */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                  <h3 className="flex items-center gap-3 font-semibold mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                      <img
                        src={aboutUsIcon}
                        alt="About Us"
                        className="w-6 h-6"
                      />
                    </span>

                    About
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {profile?.additional_info?.about_us || "No description provided."}
                  </p>
                </div>

                {/* TEACHING EXPERTISE */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                  <h3 className="flex items-center gap-3 font-semibold mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                      <img
                        src={teachingExpertiseIcon}
                        alt="Teaching Expertise"
                        className="w-6 h-6"
                      />
                    </span>

                    Teaching Expertise
                  </h3>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Subjects</p>

                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(profile?.additional_info?.subjects)
                        ? profile.additional_info.subjects
                        : []
                      ).map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm mb-2">Grade Levels</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(profile?.additional_info?.grade_level)
                        ? profile.additional_info.grade_level
                        : []
                      ).map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CERTIFICATIONS & ACHIEVEMENTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow p-6">
                    <h1 className="flex items-center font-semibold mb-5">
                      <span className="inline-flex items-center w-10 h-10">
                        📜
                      </span>

                      Certifications
                    </h1>
                    
                    <ul className="text-sm text-gray-600 space-y-2">
                      {(profile?.additional_info?.certification || "")
                        .split(",")
                        .filter(Boolean)
                        .map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span
                              className="text-green-600 relative"
                              style={{
                                width: "10.5px",
                                height: "21px",
                                top: "-0.38px",
                                opacity: 1,
                              }}
                            >
                              ✓
                            </span>
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow p-6">
                    <h1 className="flex items-center font-semibold mb-5">
                      <span className="inline-flex items-center w-10 h-10">
                        🏆
                      </span>

                      Achievements
                    </h1>

                    <ul className="text-sm text-gray-600 space-y-2">
                      {(profile?.additional_info?.achievement || "")
                        .split(",")
                        .filter(Boolean)
                        .map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span
                              className="text-yellow-500 relative"
                              style={{
                                width: "10.5px",
                                height: "21px",
                                top: "-0.38px",
                                opacity: 1,
                              }}
                            >
                              ★
                            </span>
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Experience</h3>
                <p className="text-sm text-gray-600">
                  Experience details would be displayed here.
                </p>
              </div>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Education</h3>
                <p className="text-sm text-gray-600">
                  Education details would be displayed here.
                </p>
              </div>
            )}

            {/* Jobs Applied */}
            {activeTab === "jobs" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Jobs Applied</h3>
                <p className="text-sm text-gray-600">
                  List of jobs applied would be displayed here.
                </p>
              </div>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold mb-4">Quick Information</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400">Availability</p>
                  <p>
                    {profile?.additional_info?.availability ?? '--'}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Expected Salary</p>
                  <p className="text-green-600 font-semibold">
                    {profile?.additional_info?.expected_salary ?? '--'}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Notice Period</p>
                  <p>{profile?.additional_info?.notice_period ?? '--'}</p>
                </div>

                <div>
                  <p className="text-gray-400">Preferred Location</p>
                  <p>{profile?.additional_info?.preferred_location ?? '--'}</p>
                </div>
              </div>

              <button className="w-full mt-4 border rounded-lg py-2 text-sm">
                Upload Latest Resume
              </button>

              <button onClick={handleLogout} className="w-full mt-4 border rounded-lg py-2 text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>

      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
      />
    </>
  );
};

export default Profile;
