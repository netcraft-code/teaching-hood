import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/icons/back.svg";
import editIcon from "../assets/icons/edit.svg";

const routes = {
  VIEW_PROFILE: "/view-profile",
};

const ProfileHeader = ({ onEdit, profile }) => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const USER_FORM_CONFIG = {
    1: { // Teacher
      title: "My Profile"
    },

    2: { // School
      title: "School Profile"
    },

    3: { // Recruiter
      title: "Profile"
    },
  };

  const handleShare = async () => {
    const profileRoute = `${window.location.origin}${routes.VIEW_PROFILE}/${profile.id}`;
    await navigator.clipboard.writeText(profileRoute);

    setPopupMessage("Profile link copied!");
    setShowPopup(true);
  };

  return (
    <div className="sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-200 bg-gray-100 rounded-xl"
          >
            <div className="">
              <img
                src={backIcon}
                alt="Back"
                className="h-4 sm:h-5 w-auto"
              />
            </div>
          </button>
          <h1 className="text-lg font-semibold">
            {USER_FORM_CONFIG[profile.user_type].title}
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center whitespace-nowrap gap-2 px-3 sm:px-6 py-1.5 sm:py-2 text-sm border rounded-full hover:bg-gray-50"
          >
            Share Profile
          </button>

          <button
            onClick={onEdit}
            className="flex items-center whitespace-nowrap gap-2 px-3 sm:px-6 py-1.5 sm:py-2 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-700"
          >
            <img
              src={editIcon}
              alt="Edit Profile"
              className="h-4 sm:h-5 w-auto"
            />

            Edit Profile
          </button>
        </div>

      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-gray-800 text-sm mb-6">
              {popupMessage}
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
