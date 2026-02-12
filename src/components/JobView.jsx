import React, { useState } from 'react';
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
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const job = jobData;

  const userProfile = jobData.user;

  const formatSalary = (min, max) => {
    return `₹${(min / 1000).toFixed(0)},000 - ₹${(max / 1000).toFixed(0)},000`;
  };

  // const formatSalary = (minMonthly, maxMonthly) => {
  //   const minYearly = minMonthly * 12;
  //   const maxYearly = maxMonthly * 12;

  //   return `₹${minYearly}-₹${maxYearly}`;
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const humanReadableTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 10) return 'Just now';
    if (diff < 60) return `${diff} seconds ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;

    // fallback → full date
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
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
      return `${job.subject_name} (${job.grade_name})`;
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
        url: window.location.href
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

    <div className="w-full min-h-screen px-16 py-8">
      <div className="">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <img src={jobViewIcons.back} alt="Back" className="w-5 h-5" />
          <span className="text-sm font-medium">Back to Jobs</span>
        </button>

        <div className='grid grid-cols-8 justify-between gap-4'>
          {/* Left Section */}
          <div className="col-span-5">
            <div className="grid grid-cols-8 gap-6 justify-between rounded-3xl shadow-lg p-6 border-t-8 border-blue-500">
              <div className="col-span-1 w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-xl flex items-center justify-center">
                <img src={jobViewIcons.school} alt="School" className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              
              <div className="col-span-7 ml-8">
                <div className='flex justify-between'>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 inline">
                    {getJobTitle(job)}
                  </div>

                  <div className='inline text-xs text-green-600 bg-green-100 h-6 py-1 px-2 rounded-full'>
                    <img src={jobViewIcons.verified} alt="Applicant" className="w-4 h-4 inline" />
                    Verified
                  </div>
                </div>

                <p className="text-semibold md:text-lg text-gray-600 mb-4">
                  {job.school_name}
                </p>
                
                <div className="flex items-center flex-wrap gap-4 md:gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <img src={jobViewIcons.applicant} alt="Applicant" className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm text-gray-700">
                      {job.total_applicants} applicant{job.total_applicants > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-gray-400 h-1.5 w-1.5 rounded-full mx-1">
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={jobViewIcons.createdAt} alt="Posted At" className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm text-gray-700">{humanReadableTime(job.created_at)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 mb-4">
                  <div className="flex items-center gap-2 bg-red-100 py-1 px-3 rounded-full">
                    <img src={jobViewIcons.expired} alt="Experience" className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs font-regular text-red-600">Apply Before {formatDate(job.application_deadline)}</span>
                  </div>
                </div>
              </div>

              <div className='col-span-8'>
                <hr />
              </div>

              <div className="col-span-8 flex items-center w-full whitespace-nowrap">
                <div className='grid grid-cols-4 gap-2 w-full'>
                  <div className="flex items-center gap-2">
                    <div className='h-8 w-8 flex items-center justify-center bg-blue-100 rounded-xl'>
                      <img src={jobViewIcons.location} className="w-4 h-4" />
                    </div>
                    <span>
                      <div className="text-xs text-gray-400">Location</div>
                      <div className="text-xs text-gray-700">{job.city_name}</div>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className='h-8 w-8 flex items-center justify-center bg-green-100 rounded-xl'>
                      <img src={jobViewIcons.jobtype} className="w-4 h-4" />
                    </div>
                    <span>
                      <div className="text-xs text-gray-400">Job type</div>
                      <div className="text-xs text-gray-700">{job.job_type}</div>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className='h-8 w-8 flex items-center justify-center bg-yellow-100 rounded-xl'>
                      <img src={jobViewIcons.experience} className="w-4 h-4" />
                    </div>
                    <span>
                      <div className="text-xs text-gray-400">Experience</div>
                      <div className="text-xs text-gray-700">{job.experience_required} years</div>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className='h-8 w-8 flex items-center justify-center bg-red-100 rounded-xl'>
                      <img src={jobViewIcons.salary} className="w-4 h-4" />
                    </div>
                    <span>
                      <div className="text-xs text-gray-400">Salary</div>
                      <div className="text-xs text-gray-700">{ formatSalary(job.min_salary, job.max_salary) }</div>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="rounded-3xl shadow-lg p-6 mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-b from-[#1A73E8] to-[#34A853] rounded-lg flex items-center justify-center">
                  <img src={jobViewIcons.jobDescription} alt="Description" className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-medium text-gray-900">Job Description</h2>
              </div>
              <div className="pl-0">
                <p className="text-gray-700 text-sm leading-relaxed">{job.job_description}</p>
              </div>
            </div>

            {/* Key Responsibilities */}
            {/* <div className="rounded-3xl shadow-lg p-6 mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-b from-[#34A853] to-[#F6C23E] rounded-lg flex items-center justify-center">
                  <img src={jobViewIcons.keyResponsibility} alt="Description" className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-medium text-gray-900">Key Responsibilities</h2>
              </div>
              <div className="pl-0">
                <div className="space-y-3">
                  {job.key_responsibilities
                    ?.split('\n')
                    .filter(line => line.trim() !== '')
                    .map((line, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                          <img src={jobViewIcons.responsibilityTick} alt="School" className="w-4 h-4" />
                        </div>

                        <p className="text-gray-700 leading-relaxed text-sm">
                          {line}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div> */}

            {/* Job Requirement */}
            <div className="rounded-3xl shadow-lg p-6 mt-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-b from-[#F6C23E] to-[#EA4335] rounded-lg flex items-center justify-center">
                  <img src={jobViewIcons.requirement} alt="Description" className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-medium text-gray-900">Requirements</h2>
              </div>
              <div className="pl-0">
                <div className="space-y-3">
                  {job.qualification_requirements
                    ?.split('\n')
                    .filter(line => line.trim() !== '')
                    .map((line, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                          <img src={jobViewIcons.requirementTick} alt="School" className="w-4 h-4" />
                        </div>

                        <p className="text-gray-700 leading-relaxed text-sm">
                          {line}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className='col-span-3'>
            {/* Salary Card */}
            <div className="gap-4 w-full">
              <div className="shadow-lg p-6 rounded-xl rounded-xl">
                <h3 className="text-2xl font-semibold mb-1 flex items-center justify-center">
                  {formatSalary(job.min_salary, job.max_salary)}
                </h3>
                <p className="text-sm opacity-90 mb-5 flex items-center justify-center">per month</p>
                
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={isApplied || job.is_closed}
                  className={`hover:-translate-y-0.5 w-full py-3 px-6 rounded-3xl font-regular transition-all duration-300 mb-4 flex items-center justify-center hover:shadow-lg ${
                    isApplied
                      ? 'bg-green-100 text-green-600 cursor-default'
                      : 'bg-blue-400 text-white'
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {isApplied ? '✓ Applied' : 'Apply Now'}
                </button>

                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => handleLike(job.id)}
                    className={`flex-1 flex items-center border-gray-400  justify-center gap-2 py-2.5 px-3 rounded-lg transition-all duration-300 ${
                      isLiked
                        ? 'bg-red-500/30 border border-red-300'
                        : 'bg-white/20 border border-white/30 hover:bg-white/30'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm font-medium">Save</span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center border-gray-400 justify-center gap-2 py-2.5 px-3 bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>

                <hr />

                <div className="mt-4 rounded-lg">
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-600">Application Deadline</span>
                    <span className="text-sm font-semibold text-gray-900">{formatDate(job.application_deadline)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-600">Applicants</span>
                    <span className="text-sm font-semibold text-gray-900">{job.total_applicants} applied</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-gray-600">Posted</span>
                    <span className="text-sm font-semibold text-gray-900">{ humanReadableTime(job.created_at) }</span>
                  </div>
                </div>

                <div className='text-sm font-regular bg-blue-50 p-6 text-center rounded-xl'>
                  <span className='text-blue-500'>
                    Pro Tip: 
                  </span>
                    Applications with complete profiles get 3x more responses
                </div>
                
              </div>
            </div>

            <div className='mt-8 shadow-xl p-6 rounded-xl'>
              <span className='font-semibold'>About the School</span>

              <div className='w-16 h-16 my-4 flex items-center justify-center bg-blue-100 rounded-xl'>
                <img src={jobViewIcons.school} className='w-10 h-10' />
              </div>

              <span>
                {userProfile.first_name}
              </span>

              <p className='mb-6'>
                {userProfile?.additional_info?.about_us}
              </p>

              {userProfile.userType == 2 && (
                <div>
                  <div className='mb-2'>
                    {userProfile?.address?.students + ' ' + userProfile?.address?.city + ' ' + userProfile?.address?.state}
                  </div>

                  {userProfile?.additional_info?.students && (
                    <div className='mb-6'>
                      {userProfile?.additional_info?.students || 0}+
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() =>
                  navigate(`${routes.VIEW_PROFILE}${id ? `/${userProfile.id}` : ""}`)
                }
                className="w-full py-2 text-blue-500 rounded-xl border-2 border-blue-500"
              >
                View {userProfile.user_type == 2 ? "School" : "Recruiter"} Profile
              </button>
            </div>
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

    <Footer />

    </>
  );
};

export default JobView;