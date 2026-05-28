import React from "react";
import Pagination from "./Pagination";
import schoolVacanciesIcon from "./../../assets/icons/about-us.svg";
import schoolIcon from "./../../assets/icons/school-icon.svg";
import { Link } from "react-router-dom";

const AppliedTab = ({
  jobs,
  totalJobs,
  loading,
  currentPage,
  onPageChange,
  onSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const getJobTitle = (job) => {
    console.log("Job data:", job);
    if (job.subject_name && job.grade_name) {
      return `${job.grade_name} ${job.subject_name} Teacher`;
    } else if (job.subject_name) {
      return `${job.position} - ${job.subject_name}`;
    } else if (job.grade_name) {
      return `${job.position} - ${job.grade_name}`;
    }
    return job.position;
  };

  // Get human readable time
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 mb-8">
        {/* LEFT - Title with Icon */}
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
            <img
              src={schoolVacanciesIcon}
              alt="Vacancies"
              className="w-6 h-6"
            />
          </span>
          <span className="text-lg font-medium">Jobs Applied</span>
        </div>

        {/* RIGHT - Active Positions Badge */}
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(); // parent se aayega
              }
            }}
            className="border rounded-lg px-3 py-2 text-sm w-60"
          />
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No Applied Jobs Found</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border-2 border-[#E5E7EB] overflow-hidden"
            >
              {/* HEADER */}
              <div className="p-6">
                <Link to={`/job/${job.job_post_id}`}>
                  <div className="flex items-center justify-between gap-4">
                    {/* LEFT SIDE - Job Info */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center rounded-xl bg-blue-100 w-12 h-12">
                        <img src={schoolIcon} className="w-8 h-8" />
                      </div>

                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {getJobTitle(job.job_posted)}
                        </h3>

                        {/* School */}
                        <p className="text-sm text-gray-600">
                          {job.job_posted.school_name}
                          {job?.job_posted?.city_name
                            ? ", " + job?.job_posted?.city_name
                            : ""}
                        </p>

                        {/* Applied Date */}
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                          <span className="text-gray-900">
                            Applied on: {getTimeAgo(job.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* ACCORDION */}
              {/* <details className="border-t border-gray-200">
                <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition">
                  <span className="font-medium text-gray-800">
                    View Candidate Details
                  </span>

                  <span className="text-sm text-blue-600">Open</span>
                </summary>

                <div className="px-6 py-5 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Candidate Name
                      </p>
                      <h4 className="font-semibold text-gray-900">
                        {job?.user?.name || "N/A"}
                      </h4>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Experience</p>
                      <h4 className="font-semibold text-gray-900">
                        {job?.user?.experience || "0"} Years
                      </h4>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={`/view-profile/${job?.user?.id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </details> */}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {!loading && jobs.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalJobs}
          itemsPerPage={10}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default AppliedTab;
