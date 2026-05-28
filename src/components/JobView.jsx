import React, { useState } from "react";
import { jobViewIcons } from "./../assets/icons/view-job/ViewJob";
import Header from "./Header";
import Footer from "./Footer";
import { likeUnlikeJobApi, applyJobApi } from "../api/auth";
import { useNavigate } from "react-router-dom";

const routes = {
  VIEW_PROFILE: "/view-profile",
};

const JobView = ({ jobData }) => {
  const [isApplied, setIsApplied] = useState(jobData?.is_applied || false);
  const [isLiked, setIsLiked] = useState(jobData?.is_liked || false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const job = jobData;
  const userProfile = jobData.user;

  const formatSalary = (min, max) => {
    if (min === null || max === null)
      return "As per industry standards";

    const SALARY_RANGES = [
      { label: "Upto ₹10,000", min: 0, max: 10000 },
      { label: "₹10,000 - ₹20,000", min: 10000, max: 20000 },
      { label: "₹20,000 - ₹30,000", min: 20000, max: 30000 },
      { label: "₹30,000 - ₹40,000", min: 30000, max: 40000 },
      { label: "₹40,000 - ₹50,000", min: 40000, max: 50000 },
      { label: "₹50,000 - ₹75,000", min: 50000, max: 75000 },
      { label: "₹75,000 - ₹1,00,000", min: 75000, max: 100000 },
      { label: "₹1,00,000 - ₹1,50,000", min: 100000, max: 150000 },
      { label: "Above ₹1,50,000", min: 150000, max: 0 },
    ];

    const found = SALARY_RANGES.find(
      (r) => r.min === Number(min) && r.max === Number(max),
    );

    return found ? `${found.label}` : `₹${min} - ₹${max}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const humanReadableTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 10) return "Just now";
    if (diff < 60) return `${diff} seconds ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    // fallback → full date
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleApply = async (id) => {
    if (!isApplied) {
      if (!localStorage.getItem("auth_token")) {
        setPopupMessage("You need to login first");
        setShowPopup(true);

        return;
      }

      try {
        const response = await applyJobApi(id);

        if (response.data.status) {
          setPopupMessage(response.data.data.message);
          setIsApplied(true);
          setShowPopup(true);
        }
      } catch (err) {
        setPopupMessage("Something went wrong. Please try again.");

        setShowPopup(true);
      }
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await likeUnlikeJobApi({
        job_post_id: id,
      });

      if (response.data.status) {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getJobTitle = (job) => {
    if (job.subject_name && job.grade_name) {
      return `${job.grade_name} ${job.subject_name} Teacher`;
    } else if (job.subject_name) {
      return `${job.position} - ${job.subject_name}`;
    } else if (job.grade_name) {
      return `${job.position} - ${job.grade_name}`;
    }
    return job.position;
  };

  const handleShare = () => {
    // Add share functionality
    if (navigator.share) {
      navigator.share({
        title: job.position,
        text: `Check out this ${job.position} position at ${job.school_name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setPopupMessage("Link copied to clipboard!");

      setShowPopup(true);
    }
  };

  return (
    <>
      <Header />

      <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-6">
        <div className="">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <img src={jobViewIcons.back} alt="Back" className="w-5 h-5" />
            <span className="text-base font-medium">Back to Jobs</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-8 justify-between gap-4">
            {/* Left Section */}
            <div className="col-span-5">
              <div className="grid grid-cols-8 gap-6 justify-between rounded-3xl shadow-lg p-6 border-t-8 border-blue-500">
                <div className="col-span-1 w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-xl flex items-center justify-center">
                  <img
                    src={jobViewIcons.school}
                    alt="School"
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  />
                </div>

                <div className="col-span-7 ml-8">
                  <div className="flex justify-between">
                    {/* <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 inline">
                      {getJobTitle(job)}
                    </div> */}

                    {/* <div className="inline text-base text-green-600 bg-green-100 h-6 px-2 rounded-full">
                      <img
                        src={jobViewIcons.verified}
                        alt="Applicant"
                        className="w-4 h-4 inline"
                      />
                      Verified
                    </div> */}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight flex-1">
                        {getJobTitle(job)}
                      </div>
                      {/* <div className="flex items-center gap-1 text-xs sm:text-sm text-green-600 bg-green-100 py-1 px-3 rounded-full whitespace-nowrap shrink-0 self-start mt-1">
                        <img
                          src={jobViewIcons.verified}
                          className="w-3 h-3 sm:w-4 sm:h-4"
                        />
                        Verified
                      </div> */}
                    </div>

                    {/* School name */}
                    <p className="text-base md:text-lg text-gray-600 mb-1">
                      {job.school_name}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={jobViewIcons.applicant}
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <span className="text-sm md:text-base text-gray-700">
                          {job.total_applicants} Applicant
                          {job.total_applicants > 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="hidden sm:block h-1 w-1 bg-gray-400 rounded-full"></div>

                      <div className="flex items-center gap-2">
                        <img
                          src={jobViewIcons.createdAt}
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                        <span className="text-sm md:text-base text-gray-700">
                          {humanReadableTime(job.created_at)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-red-100 py-1 px-3 rounded-full">
                        <img
                          src={jobViewIcons.expired}
                          className="w-3 h-3 md:w-4 md:h-4"
                        />
                        <span className="text-sm md:text-base text-red-600">
                          Apply Before {formatDate(job.application_deadline)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-8">
                  <hr />
                </div>

                <div className="col-span-8 flex items-center w-full whitespace-nowrap">
                  <div className="flex gap-8 flex-wrap w-full">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center bg-blue-100 rounded-xl">
                        <img src={jobViewIcons.location} className="w-4 h-4" />
                      </div>
                      <span>
                        <div className="text-base text-gray-400">Location</div>
                        <div className="text-base text-gray-700">
                          {job.city_name}
                        </div>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center bg-yellow-100 rounded-xl">
                        <img
                          src={jobViewIcons.experience}
                          className="w-4 h-4"
                        />
                      </div>
                      <span>
                        <div className="text-base text-gray-400">
                          Experience
                        </div>
                        <div className="text-base text-gray-700">
                          {job.experience_required} years
                        </div>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center bg-red-100 rounded-xl">
                        <img src={jobViewIcons.salary} className="w-4 h-4" />
                      </div>
                      <span>
                        <div className="text-base text-gray-400">Salary</div>
                        <div className="text-base text-gray-700">
                          {formatSalary(job.min_salary, job.max_salary)}
                        </div>
                      </span>
                    </div>

                    {/* <div style={styles.metaRow}> */}
                    {/* Food */}
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          ...styles.metaItem,
                          color: job.food == 1 ? "#16a34a" : "#9ca3af", // green / gray
                        }}
                      >
                        <div className="h-8 w-8 flex items-center justify-center bg-yellow-100 rounded-xl">
                          <span style={{ opacity: job.food == 1 ? 1 : 0.5 }}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="grey"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M6 2v8"></path>
                              <path d="M4 2v4"></path>
                              <path d="M8 2v4"></path>
                              <path d="M6 10v12"></path>

                              <path d="M16 2a3 3 0 0 1 3 3c0 2-1.5 3.5-3 4v13"></path>
                            </svg>
                          </span>
                        </div>
                        <span>
                          <div className="text-base text-gray-400">Food</div>
                          <div className="text-base text-gray-700">
                            {job.food == 1 ? "Available" : "N/A"}
                          </div>
                        </span>
                        {/* <span style={styles.metaText}>
                            Food {job.food == 1 ? "Available" : "not available"}
                          </span> */}
                      </span>
                    </div>

                    {/* Accommodation */}
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          ...styles.metaItem,
                          color: job.accommodation == 1 ? "#2563eb" : "#9ca3af", // blue / gray
                        }}
                      >
                        <div className="h-8 w-8 flex items-center justify-center bg-yellow-100 rounded-xl">
                          <span
                            style={{
                              opacity: job.accommodation == 1 ? 1 : 0.5,
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="grey"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M3 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
                              <path d="M13 9h4a4 4 0 0 1 4 4v2H3v-2a4 4 0 0 1 4-4h6z"></path>
                              <path d="M3 15v4"></path>
                              <path d="M21 15v4"></path>
                            </svg>
                          </span>
                        </div>
                        <span>
                          <div className="text-base text-gray-400">
                            Accommodation
                          </div>
                          <div className="text-base text-gray-700">
                            {job.accommodation == 1 ? "Available" : "N/A"}
                          </div>
                        </span>
                        {/* <span style={styles.metaText}>
                          Accommodation{" "}
                          {job.accommodation == 1
                            ? "Available"
                            : "not available"}
                        </span> */}
                      </span>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="rounded-3xl shadow-lg p-6 mt-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-[6px] rounded-xl bg-green-500 text-white h-8 w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5 
                          5.015 5 3 6.567 3 8.5v10C3 16.567 5.015 15 
                          7.5 15c1.746 0 3.332.477 4.5 1.253m0-10.506
                          C13.168 5.477 14.754 5 16.5 5c2.485 0 4.5 
                          1.567 4.5 3.5v10c0-1.933-2.015-3.5-4.5-3.5
                          -1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Job Description
                  </h2>
                </div>
                <div className="pl-0">
                  <p className="text-gray-700 text-base leading-relaxed">
                    {job.job_description}
                  </p>
                </div>
              </div>

              {/* Job Requirement */}
              <div className="rounded-3xl shadow-lg p-6 mt-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-[6px] rounded-xl bg-green-500 text-white h-8 w-8">
                    <img
                      src={jobViewIcons.requirement}
                      alt="Description"
                      className="w-5 h-5"
                    />
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Requirements
                  </h2>
                </div>
                <div className="pl-0">
                  <div className="space-y-3">
                    {job.qualification_requirements
                      ?.split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((line, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                            <img
                              src={jobViewIcons.requirementTick}
                              alt="School"
                              className="w-4 h-4"
                            />
                          </div>

                          <p className="text-gray-700 leading-relaxed text-base">
                            {line}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="lg:col-span-3 col-span-5">
              {/* Salary Card */}
              <div className="gap-4 w-full">
                <div className="shadow-lg p-6 rounded-xl rounded-xl">
                  <h3 className="text-2xl font-semibold mb-1 flex items-center justify-center">
                    {formatSalary(job.min_salary, job.max_salary)}
                  </h3>
                  <p className="text-base opacity-90 mb-5 flex items-center justify-center">
                    Per Month
                  </p>

                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={isApplied || job.is_closed}
                    className={`hover:-translate-y-0.5 w-full py-3 px-6 rounded-3xl font-regular transition-all duration-300 mb-4 flex items-center justify-center hover:shadow-lg ${
                      isApplied
                        ? "bg-green-100 text-green-600 cursor-default"
                        : "bg-blue-400 text-white"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {isApplied ? "✓ Applied" : "Apply Now"}
                  </button>

                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => handleLike(job.id)}
                      className={`flex-1 flex items-center border-gray-400  justify-center gap-2 py-2.5 px-3 rounded-lg transition-all duration-300 ${
                        isLiked ? "filter-red" : "opacity-40"
                      }`}
                    >
                      <svg
                        className="w-6 h-6"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      {/* <span className="text-base font-medium">Save</span> */}
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex-1 flex items-center border-gray-400 justify-center gap-2 py-2.5 px-3 bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                      {/* <span className="text-base font-medium">Share</span> */}
                    </button>
                  </div>

                  <hr />

                  <div className="mt-4 rounded-lg">
                    {/* <div className="flex justify-between items-center py-3">
                      <span className="text-base text-gray-600">
                        Application Deadline
                      </span>
                      <span className="text-base font-semibold text-gray-900">
                        {formatDate(job.application_deadline)}
                      </span>
                    </div> */}
                    {/* <div className="flex justify-between items-center py-3">
                      <span className="text-base text-gray-600">
                        Applicants
                      </span>
                      <span className="text-base font-semibold text-gray-900">
                        {job.total_applicants} applied
                      </span>
                    </div> */}
                    <div className="flex justify-between items-center py-3">
                      <span className="text-base text-gray-600">Posted</span>
                      <span className="text-base font-semibold text-gray-900">
                        {humanReadableTime(job.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="text-base font-regular bg-blue-50 p-6 text-center rounded-xl">
                    <span className="text-blue-500 mr-2">Pro Tip:</span>
                    Applications with complete profiles get 3x more responses
                  </div>
                </div>
              </div>

              {userProfile ? (
                <div className="mt-8 shadow-xl p-6 rounded-xl">
                  <span className="font-semibold">About the School</span>

                  <div className="w-16 h-16 my-4 flex items-center justify-center bg-blue-100 rounded-xl">
                    <img src={jobViewIcons.school} className="w-10 h-10" />
                  </div>

                  <span>{userProfile.first_name}</span>

                  <p className="mb-6">
                    {userProfile?.additional_info?.about_us}
                  </p>

                  {userProfile.userType == 2 && (
                    <div>
                      <div className="mb-2">
                        {userProfile?.address?.students +
                          " " +
                          userProfile?.address?.city +
                          " " +
                          userProfile?.address?.state}
                      </div>

                      {userProfile?.additional_info?.students && (
                        <div className="mb-6">
                          {userProfile?.additional_info?.students || 0}+
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      navigate(`${routes.VIEW_PROFILE}${`/${userProfile.id}`}`)
                    }
                    className="w-full py-2 text-blue-500 rounded-xl border-2 border-blue-500"
                  >
                    View {userProfile.user_type == 2 ? "School" : "Recruiter"}{" "}
                    Profile
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
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

              <p className="text-gray-800 text-base mb-6">{popupMessage}</p>

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

      <Footer />
    </>
  );
};

const styles = {
  metaRow: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
    marginLeft: "5px",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    color: "#6b7280",
  },
  metaText: {
    fontSize: 14,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

export default JobView;
