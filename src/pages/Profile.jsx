import React, { useEffect, useRef, useState } from "react";
import { getProfile, logoutUser, updateAvatarBanner } from "../api/auth";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileModal from "../components/EditProfileModal";
import ImageUploadModal from "../components/ImageUploadModal";
import durationIcon from "../assets/icons/duration.svg";
import locationIcon from "../assets/icons/location.svg";
import aboutUsIcon from "../assets/icons/about-us.svg";
import teachingExpertiseIcon from "../assets/icons/teaching-expertise.svg";
import schoolStatisticIcon from "../assets/icons/school-statistic.svg"
import schoolVacanciesIcon from "../assets/icons/school-vacancies.svg"
import teacherBannerImage from "../assets/images/teacher-banner.png";
import schoolBannerImage from "../assets/images/school-banner.png";
import recruiterBannerImage from "../assets/images/recruiter-banner.png";
import defaultAvatarImage from "../assets/images/default-avatar.png";

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
  const [userType, setUserType] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageType, setImageType] = useState(null); // 'avatar' | 'banner'


  const USER_FORM_CONFIG = {
    1: { // Teacher
      tabs: ["overview", "experience", "education", "jobs"],
      status: [
        "Unavailable",
        "Available",
      ],
    },

    2: { // School
      tabs: ["overview", "vacancies"],
      status: [
        "Unverified",
        "Verified",
      ],
    },

    3: { // Recruiter
      tabs: ["overview"],
      status: [
        "Unavailable",
        "Available",
      ],
    },
  };

  const currentUser = USER_FORM_CONFIG[userType];

  const FETCH_BANNER_AVATAR = {
    1: { // Teacher
      bannerImage: teacherBannerImage,
      avatarImage: defaultAvatarImage,
    },

    2: { // School
      bannerImage: schoolBannerImage,
      avatarImage: defaultAvatarImage,
    },

    3: { // Recruiter
      bannerImage: recruiterBannerImage,
      avatarImage: defaultAvatarImage,
    },
  };

  const getBannerAvatar = (url, userType, urlType) => {
    if (url) return url;

    return FETCH_BANNER_AVATAR[userType][urlType];
  };

  const formateExpectedSalary = (min, max) => {
    if (!min && !max) return "--"
    return '₹' + min + ' - ₹' + max + '/month';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Present';
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.data);
        setUserType(res.data.data.user_type);
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
      const res = await logoutUser(); // ✅ Using auth.js
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

  const getTotalDurationCount = (totalExperience) => {
    const currentYear = new Date().getFullYear();
    if (!totalExperience || totalExperience > currentYear) return "";

    const years = currentYear - totalExperience;
    return `${totalExperience} (${years} years)`;
  };

  const getFormattedAddress = (address) => {
    if (! address?.address) return "--";
    
    return `${address?.address}, ${address?.city}, ${address?.state}, ${address?.pincode}, ${address?.country}`;
  }

  const handleImageUpload = async (file, type) => {
    const fd = new FormData();
    fd.append(type, file);

    const res = await updateAvatarBanner(fd);
    
    console.log(res);

    if (res.data.status) {
      setProfile(prev => ({
        ...prev,
        avatar_url:
          type === "avatar_url" ? res.data.data.avatar_url : prev.avatar_url,
        banner_image_url:
          type === "banner_image_url" ? res.data.data.banner_image_url : prev.banner_image_url,
      }));
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
      <div className="mx-auto px-4 sm:px-8 lg:px-28 py-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* PROFILE CARD */}
            <div className="rounded-2xl relative shadow-md">
              <div className="relative">
                <img
                  src={getBannerAvatar(profile.banner_image_url, userType, 'bannerImage')}
                  alt="cover"
                  className="w-full h-32 rounded-t-2xl"
                />

                <button
                  onClick={() => {
                    setImageType("banner_image_url");
                    setImageModalOpen(true);
                  }}
                  className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                >
                  ✏️
                </button>
              </div>

              <div className="flex items-start gap-4 mx-8 pb-8 relative">
                <div className="relative">
                  <img
                    src={getBannerAvatar(profile.avatar_url, userType, 'avatarImage')}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full -mt-16 object-cover"
                  />

                  <button
                    onClick={() => {
                      setImageType("avatar_url");
                      setImageModalOpen(true);
                    }}
                    className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                  >
                    ✏️
                  </button>
                </div>

                <div className="flex-1 mt-6">
                  <h2 className="text-xl sm:text-3xl font-semibold mb-3">{profile.first_name} {userType == 1 ? profile.last_name : ''}</h2>
                  <p className="text-m text-gray-500">
                    {userType == 2 ? profile?.board : profile?.position}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <img src={locationIcon} alt="Duration" />
                      
                      {profile?.addresses ? profile.addresses.city + ", " + profile.addresses.state : 'Location not specified'}
                    </span>
                    <span className="flex items-center gap-1">
                      <img src={durationIcon} alt="Duration" />
                      
                      {profile?.total_experience ?  (userType == 1 ? `${profile.total_experience} years experience` : `Est. ${getTotalDurationCount(profile.total_experience)}`) : '----'}
                    </span>
                  </div>
                </div>

                <span className={`flex items-center gap-2 px-4 py-2 mt-2 text-sm rounded-full ${
                  profile.status 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    profile.status 
                    ? 'bg-green-600' 
                    : 'bg-red-600'
                    }`}
                  ></span>
                  {userType == 1 ? currentUser?.status[profile.status] : ''}
                </span>
              </div>
            </div>

            {/* TABS */}
            <div className="bg-white rounded-xl shadow p-2 flex flex-wrap gap-3 sm:gap-6">
              {currentUser.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition
                    ${
                      activeTab === tab
                        ? "bg-blue-500 text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  {tab === "jobs" ? "Jobs Applied" : tab}
                </button>
              ))}
            </div>

            {/* OVERVIEW */}
            {activeTab === "overview" && (
              <>
                {/* ABOUT US */}
                <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
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

                {userType == 1 && (
                  <>
                    {/* TEACHING EXPERTISE */}
                    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
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
                          {profile?.additional_info?.subjects ? (Array.isArray(profile?.additional_info?.subjects)
                            ? profile.additional_info.subjects
                            : ["No Subject Selected"]
                          ).map((s, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                            >
                              {s.name}
                            </span>
                          )) : "----"}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm mb-2">Grade Levels</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {profile?.additional_info?.grade_levels ? (Array.isArray(profile?.additional_info?.grade_levels)
                            ? profile.additional_info.grade_levels
                            : []
                          ).map((s, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full"
                            >
                              {s.name}
                            </span>
                          )) : "----"}
                        </div>
                      </div>
                    </div>

                    {/* CERTIFICATIONS & ACHIEVEMENTS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                        <h1 className="flex items-center font-semibold mb-5">
                          <span className="inline-flex items-center w-10 h-10">
                            📜
                          </span>

                          Certifications
                        </h1>
                        
                        <ul className="text-sm text-gray-600 space-y-2">
                          {profile?.additional_info?.certification ? (profile?.additional_info?.certification)
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
                            )) : "----"}
                        </ul>
                      </div>

                      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                        <h1 className="flex items-center font-semibold mb-5">
                          <span className="inline-flex items-center w-10 h-10">
                            🏆
                          </span>

                          Achievements
                        </h1>

                        <ul className="text-sm text-gray-600 space-y-2">
                          {profile?.additional_info?.achievement ? (profile?.additional_info?.achievement)
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
                            )) : "----"}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {userType == 2 && (
                  <>
                    {/* School Statistics */}
                    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
                      <h3 className="flex items-center gap-3 font-semibold mb-5">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-green-100">
                          <img
                            src={schoolStatisticIcon}
                            alt="School Statistics"
                            className="w-6 h-6"
                          />
                        </span>

                        School Statistics
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border p-6 bg-[#EFF6FF] text-xs rounded-xl">
                          <div className="text-blue-500 text-2xl font-semibold">
                            {profile?.additional_info?.students || 0}+
                          </div>
                            Students
                        </div>
                        <div className="border p-6 bg-[#F0FDF4] text-xs rounded-xl">
                          <div className="text-green-500 text-2xl font-semibold">
                            {profile?.additional_info?.teachers || 0}+
                          </div>
                          Teachers
                        </div>
                        <div className="border p-6 bg-[#FEF2F2] text-xs rounded-xl">
                          <div className="text-red-500 text-2xl font-semibold">
                            {profile?.additional_info?.length || 0}
                          </div>
                          Open Positions
                        </div>
                      </div>
                    </div>

                    {/* Why Join US */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                        <h1 className="flex items-center font-semibold mb-5">
                          <span className="inline-flex items-center w-10 h-10">
                            🌟
                          </span>

                          Why Join Us
                        </h1>
                        
                        <ul className="text-sm text-gray-600 space-y-2">
                          {profile?.additional_info?.why_join_us ? (profile?.additional_info?.why_join_us)
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
                            )) : "----"}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <>
                {profile?.additional_info?.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition mb-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-5 mb-2">
                            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                              🏫
                            </div>
                            <div>
                              <h3 className="text-xl text-gray-800">
                                {exp.position}
                              </h3>
                              <p className="text-blue-500 font-medium">{exp.school}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="px-2 py-1 rounded-lg text-sm text-blue-500 bg-blue-50">
                              {exp.to ? "Past" : "Current"}
                            </h3>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 pl-20">
                          {formatDate(exp.from)} - {formatDate(exp.to)}
                          {typeof exp.to === "string" &&
                            exp.to.toLowerCase() === "present" && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Current
                              </span>
                            )}
                        </p>
                      </div>
                    </div>

                    <div className="pl-20">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Key Responsibilities:
                      </p>
                      <ul className="space-y-3">
                        {Array.isArray(exp.key_responsibilities) &&
                          exp.key_responsibilities.map((resp, idx) => (
                            <li
                              key={idx}
                              className="text-gray-700 text-sm flex items-start"
                            >
                              <span className="text-blue-500 mr-2">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Education */}
            {activeTab === "education" && (
              <>
                {profile?.additional_info?.education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition mb-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-5 mb-2">
                            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                              🎓
                            </div>
                            <div>
                              <h3 className="text-xl text-gray-800">
                                {edu.degree}
                              </h3>
                              <p className="text-green-500 font-medium">{edu.college_university}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 pl-20">
                          {formatDate(edu.from)} - {formatDate(edu.to)}
                          {typeof edu.to === "string" &&
                            edu.to.toLowerCase() === "present" && (
                              <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Current
                              </span>
                            )}

                            <span className="text-black-500 mx-5">•</span>
                            <span className="text-blue-400">{edu.percentage}%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Jobs Applied */}
            {activeTab === "jobs" && (
              <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
                <h3 className="font-semibold mb-4">Jobs Applied</h3>
                <p className="text-sm text-gray-600">
                  List of jobs applied would be displayed here.
                </p>
              </div>
            )}

            {activeTab === "vacancies" && (
              <>
                <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                  <h3 className="flex items-center gap-3 font-semibold mb-5">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                      <img
                        src={schoolVacanciesIcon}
                        alt="About Us"
                        className="w-6 h-6"
                      />
                    </span>

                    School Vacancies
                  </h3>
                </div>
              </>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow p-4 sm:p-6">
              {userType == 1 && (
                <>
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
                        {formateExpectedSalary(profile?.additional_info?.min_salary, profile?.additional_info?.max_salary)}
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
                </>
              )}

              {(userType == 2 || userType == 3) && (
                <>
                  <h3 className="font-semibold mb-4">Contact Information</h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-xs">
                        {profile?.email ?? '--'}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-xs">
                        {'+91 ' + profile.phone}
                      </p>
                    </div>

                    {userType == 2 && (
                      <div>
                        <p className="text-gray-400">Website</p>
                        {profile?.additional_info?.website ? (
                          <a
                            href={
                              profile?.additional_info?.website.startsWith('http')
                                ? profile.additional_info.website
                                : `https://${profile?.additional_info?.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline break-all"
                          >
                            {profile?.additional_info?.website}
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

                  <button onClick={handleLogout} className="w-full mt-4 border rounded-lg py-2 text-sm">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={profile}
        onUpdate={(updatedProfile) => setProfile(updatedProfile)}
      />

      <ImageUploadModal
        open={imageModalOpen}
        type={imageType}
        onClose={() => {
          setImageModalOpen(false);
          setImageType(null);
        }}
        onUpload={handleImageUpload}
      />
    </>
  );
};

export default Profile;
