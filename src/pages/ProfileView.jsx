import React, { useEffect, useRef, useState } from "react";
import { viewProfile } from "../api/auth";
import durationIcon from "../assets/icons/duration.svg";
import locationIcon from "../assets/icons/location.svg";
import aboutUsIcon from "../assets/icons/about-us.svg";
import teachingExpertiseIcon from "../assets/icons/teaching-expertise.svg";
import schoolStatisticIcon from "../assets/icons/school-statistic.svg";
import teacherBannerImage from "../assets/images/teacher-banner.png";
import schoolBannerImage from "../assets/images/school-banner.png";
import recruiterBannerImage from "../assets/images/recruiter-banner.png";
import defaultAvatarImage from "../assets/images/default-avatar.png";
import Header from "../components/Header";
import { useParams } from 'react-router-dom';

// Constants
const ROUTES = {
  SIGNIN: "/signin",
  PROFILE: "/profile",
};

const USER_FORM_CONFIG = {
  1: {
    // Teacher
    tabs: ["overview", "experience", "education"],
    status: ["Unavailable", "Available"],
  },
  2: {
    // School
    tabs: ["overview"],
    status: ["Unverified", "Verified"],
  },
  3: {
    // Recruiter
    tabs: ["overview"],
    status: ["Unavailable", "Available"],
  },
};

const BANNER_AVATAR_CONFIG = {
  1: { bannerImage: teacherBannerImage, avatarImage: defaultAvatarImage },
  2: { bannerImage: schoolBannerImage, avatarImage: defaultAvatarImage },
  3: { bannerImage: recruiterBannerImage, avatarImage: defaultAvatarImage },
};

const ProfileView = () => {
  const { id } = useParams(); // Get job ID from URL

  // State Management
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");
  

  const hasFetched = useRef(false);

  // Helper Functions
  const getBannerAvatar = (url, userType, urlType) => {
    if (url) return url;
    return BANNER_AVATAR_CONFIG[userType][urlType];
  };

  const formatExpectedSalary = (min, max) => {
    if (!min && !max) return "--";
    return `₹${min} - ₹${max}/month`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Present";
    const [year, month] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const getTotalDurationCount = (totalExperience) => {
    const currentYear = new Date().getFullYear();
    if (!totalExperience || totalExperience > currentYear) return "";
    const years = currentYear - totalExperience;
    return `${totalExperience} (${years} years)`;
  };

  const getFormattedAddress = (address) => {
    if (!address?.address) return "--";
    return `${address?.address}, ${address?.city}, ${address?.state}, ${address?.pincode}, ${address?.country}`;
  };

  // API Calls
  const fetchProfile = async (id) => {
    try {
      const res = await viewProfile(id);
      setProfile(res.data.data);
      setUserType(Number(res.data.data.user_type));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchProfile(id);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Get current user config
  const currentUser = USER_FORM_CONFIG[userType];

  // Loading & Error States
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="mx-auto py-6 mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">
            {/* PROFILE CARD */}
            <div className="rounded-2xl relative shadow-md">
              {/* Banner Image */}
              <div className="relative">
                <img
                  src={getBannerAvatar(profile?.banner_image_url, userType, "bannerImage")}
                  alt="cover"
                  className="w-full h-32 rounded-t-2xl object-cover"
                />
              </div>

              {/* Profile Info */}
              <div className="flex items-start gap-4 mx-8 pb-8 relative">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={getBannerAvatar(profile.avatar_url, userType, "avatarImage")}
                    alt="avatar"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full -mt-16 object-cover shadow-lg"
                  />
                </div>

                {/* Name & Details */}
                <div className="flex-1 mt-6">
                  <h2 className="text-xl sm:text-3xl font-semibold mb-3">
                    {profile.first_name} {userType === 1 ? profile.last_name : ""}
                  </h2>
                  <p className="text-m text-gray-500">
                    {userType === 2 ? profile?.board : profile?.position}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <img src={locationIcon} alt="Location" />
                      {profile?.addresses
                        ? `${profile.addresses.city}, ${profile.addresses.state}`
                        : "Location not specified"}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={durationIcon} alt="Duration" />
                      {profile?.total_experience
                        ? userType === 1
                          ? `${profile.total_experience} years experience`
                          : `Est. ${getTotalDurationCount(profile.total_experience)}`
                        : "----"}
                    </span>
                  </div>
                </div>

                {/* Status Badge (Teacher only) */}
                {userType === 1 && (
                  <span
                    className={`flex items-center gap-2 px-4 py-2 mt-2 text-sm rounded-full ${
                      profile.status
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        profile.status ? "bg-green-600" : "bg-red-600"
                      }`}
                    ></span>
                    {currentUser?.status[profile.status] ?? ""}
                  </span>
                )}
              </div>
            </div>

            {/* TABS */}
            <div className="bg-white rounded-xl shadow p-2 flex flex-wrap gap-3 sm:gap-6">
              {currentUser?.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
                    activeTab === tab
                      ? "bg-blue-500 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab === "jobs" ? "Jobs Applied" : tab}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            {activeTab === "overview" && (
              <>
                {/* About Section */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="flex items-center gap-3 font-semibold mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                      <img src={aboutUsIcon} alt="About" className="w-6 h-6" />
                    </span>
                    About
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {profile?.additional_info?.about_us || "No description provided."}
                  </p>
                </div>

                {/* Teacher Specific Sections */}
                {userType === 1 && (
                  <>
                    {/* Teaching Expertise */}
                    <div className="bg-white rounded-xl shadow p-6">
                      <h3 className="flex items-center gap-3 font-semibold mb-5">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                          <img src={teachingExpertiseIcon} alt="Expertise" className="w-6 h-6" />
                        </span>
                        Teaching Expertise
                      </h3>

                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Subjects</p>
                        <div className="flex flex-wrap gap-2">
                          {profile?.additional_info?.subjects
                            ? (Array.isArray(profile?.additional_info?.subjects)
                                ? profile.additional_info.subjects
                                : []
                              ).map((s, i) => (
                                <span key={i} className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">
                                  {s.name}
                                </span>
                              ))
                            : "----"}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Grade Levels</p>
                        <div className="flex flex-wrap gap-2">
                          {profile?.additional_info?.grade_levels
                            ? (Array.isArray(profile?.additional_info?.grade_levels)
                                ? profile.additional_info.grade_levels
                                : []
                              ).map((s, i) => (
                                <span key={i} className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">
                                  {s.name}
                                </span>
                              ))
                            : "----"}
                        </div>
                      </div>
                    </div>

                    {/* Certifications & Achievements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Certifications */}
                      <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="flex items-center font-semibold mb-5">
                          <span className="text-2xl mr-2">📜</span>
                          Certifications
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {profile?.additional_info?.certification
                            ? profile.additional_info.certification
                                .split(",")
                                .filter(Boolean)
                                .map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>{item.trim()}</span>
                                  </li>
                                ))
                            : "----"}
                        </ul>
                      </div>

                      {/* Achievements */}
                      <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="flex items-center font-semibold mb-5">
                          <span className="text-2xl mr-2">🏆</span>
                          Achievements
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {profile?.additional_info?.achievement
                            ? profile.additional_info.achievement
                                .split(",")
                                .filter(Boolean)
                                .map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-yellow-500">★</span>
                                    <span>{item.trim()}</span>
                                  </li>
                                ))
                            : "----"}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {/* School Specific Sections */}
                {userType === 2 && (
                  <>
                    {/* School Statistics */}
                    <div className="bg-white rounded-xl shadow p-6">
                      <h3 className="flex items-center gap-3 font-semibold mb-5">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                          <img src={schoolStatisticIcon} alt="Statistics" className="w-6 h-6" />
                        </span>
                        School Statistics
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border p-6 bg-blue-50 rounded-xl">
                          <div className="text-blue-500 text-2xl font-semibold">
                            {profile?.additional_info?.students || 0}+
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Students</p>
                        </div>
                        <div className="border p-6 bg-green-50 rounded-xl">
                          <div className="text-green-500 text-2xl font-semibold">
                            {profile?.additional_info?.teachers || 0}+
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Teachers</p>
                        </div>
                        {/* <div className="border p-6 bg-red-50 rounded-xl">
                          <div className="text-red-500 text-2xl font-semibold">
                            {totalCreatedJobs || 0}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Open Positions</p>
                        </div> */}
                      </div>
                    </div>

                    {/* Why Join Us */}
                    <div className="bg-white rounded-xl shadow p-6">
                      <h3 className="flex items-center font-semibold mb-5">
                        <span className="text-2xl mr-2">🌟</span>
                        Why Join Us
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-2">
                        {profile?.additional_info?.why_join_us
                          ? profile.additional_info.why_join_us
                              .split(",")
                              .filter(Boolean)
                              .map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-yellow-500">★</span>
                                  <span>{item.trim()}</span>
                                </li>
                              ))
                          : "----"}
                      </ul>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && profile?.additional_info?.experience && (
              <>
                {profile.additional_info.experience
                  .slice()
                  .sort((a, b) => new Date(b.from) - new Date(a.from))  // latest first
                  .map((exp, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                            🏫
                          </div>
                          <div>
                            <h3 className="text-xl text-gray-800">{exp.position}</h3>
                            <p className="text-blue-500 font-medium">{exp.school}</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-lg text-sm text-blue-500 bg-blue-50">
                          {exp.is_currently_working === "1" ? "Current" : "Past"}  {/* fix */}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 pl-20">
                        {formatDate(exp.from)} - {formatDate(exp.to)}
                      </p>

                      {exp.key_responsibilities && (
                        <div className="pl-20">
                          <p className="text-sm font-medium text-gray-700 mb-2">Key Responsibilities:</p>
                          <ul className="space-y-2">
                            {Array.isArray(exp.key_responsibilities) &&
                              exp.key_responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-gray-700 text-sm flex items-start">
                                  <span className="text-blue-500 mr-2">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}

            {/* Education Tab */}
            {activeTab === "education" && profile?.additional_info?.education && (
              <>
                {profile.additional_info.education
                  .slice()
                  .reverse()
                  .map((edu, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                      <div className="flex items-center gap-5 mb-3">
                        <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                          🎓
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl text-gray-800">{edu.degree}</h3>
                          <p className="text-green-500 font-medium">{edu.college_university}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {formatDate(edu.from)} - {formatDate(edu.to)}
                            <span className="text-gray-500 mx-3">•</span>
                            <span className="text-blue-400">{edu.percentage}%</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              {userType === 1 ? (
                <>
                  <h3 className="font-semibold mb-4">Quick Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-400">Availability</p>
                      <p>{profile?.additional_info?.availability ?? "--"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Expected Salary</p>
                      <p className="text-green-600 font-semibold">
                        {formatExpectedSalary(
                          profile?.additional_info?.min_salary,
                          profile?.additional_info?.max_salary
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Notice Period</p>
                      <p>{profile?.additional_info?.notice_period ?? "--"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Preferred Location</p>
                      <p>{profile?.additional_info?.preferred_location ?? "--"}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-xs break-all">{profile?.email ?? "--"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-xs">{"+91 " + profile.phone}</p>
                    </div>
                    {userType === 2 && (
                      <div>
                        <p className="text-gray-400">Website</p>
                        {profile?.additional_info?.website ? (
                          <a
                            href={
                              profile.additional_info.website.startsWith("http")
                                ? profile.additional_info.website
                                : `https://${profile.additional_info.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline break-all"
                          >
                            {profile.additional_info.website}
                          </a>
                        ) : (
                          <p className="text-xs text-gray-400">--</p>
                        )}
                      </div>
                    )}
                    <div>
                      <p className="text-gray-400">Address</p>
                      <p className="text-xs">{getFormattedAddress(profile?.addresses)}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileView;