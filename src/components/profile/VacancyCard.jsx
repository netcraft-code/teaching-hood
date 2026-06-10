import React from "react";
import { Link } from "react-router-dom";

const VacancyCard = ({ job, onEdit, onClose }) => {
  const getJobTitle = (job) => {
    if (job.subject_name && job.grade_name) {
      return `${job.grade_name}  ${job.subject_name} Teacher`;
    } else if (job.subject_name) {
      return `${job.position} - ${job.subject_name}`;
    } else if (job.grade_name) {
      return `${job.position} - ${job.grade_name}`;
    }
    return job.position;
  };

  const formatSalary = (min, max) => {
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

    return found ? `${found.label}/month` : `₹${min} - ₹${max}/month`;
  };

  return (
    <div>
      <div className="bg-[#F9FAFB] rounded-xl border-2 border-[#E5E7EB] p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          {/* LEFT SIDE - Job Info */}
          <div className="flex-1">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {getJobTitle(job)}
            </h3>

            {/* Grade & Experience */}
            <p className="text-sm text-gray-600 flex items-center mb-1">
              {job.grade_name}
              {job.grade_name && (
                <span className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
              )}
              {job.experience_required} years experience
            </p>

            {/* Salary & Applicants */}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span className="font-regular text-gray-900">
                {formatSalary(job.min_salary, job.max_salary)}
              </span>
              <div className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
              <span>{job.total_applicants} applicants</span>
            </div>
          </div>

          {/* RIGHT SIDE - Urgent Badge & Buttons */}
          <div className="flex flex-col items-start md:items-end gap-3">
            {/* Urgent Badge */}
            {job.status ? (
              <span className="text-xs font-regular text-green-400 bg-green-100 px-2 py-1 rounded-full">
                Active
              </span>
            ) : (
              <span className="text-xs font-regular text-yellow-400 bg-yellow-100 px-2 py-1 rounded-full">
                Draft
              </span>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(job)}
                className="flex items-center gap-1.5 px-2 py-1 border border-gray-300 rounded-lg text-sm font-regular text-gray-700 hover:bg-gray-50 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </button>

              {job.is_closed ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium bg-red-50 text-red-600 px-3 py-1 rounded-full border border-red-200">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Closed
                </span>
              ) : (
                <button
                  onClick={() => onClose(job)}
                  className="flex items-center gap-1.5 px-2 py-1 bg-red-500 rounded-lg text-sm font-medium text-white hover:bg-red-700 transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {job?.applied_jobs?.length > 0 && (
        <details className="border-t border-gray-200">
          {/* HEADER */}
          <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition">
            <div>
              <h3 className="font-semibold text-gray-800">Candidates Names</h3>
            </div>

            <span className="text-sm text-blue-600">View Details</span>
          </summary>

          {job.applied_jobs.map((appliedJob, index) => {
            const candidate = appliedJob?.user;

            const candidateDetails = [
              {
                label: "Candidate Name",
                value: candidate?.first_name || "N/A",
              },
              {
                label: "Experience",
                value: `${candidate?.total_experience || 0} Years`,
              },
            ];

            return (
              <div key={appliedJob?.id || index} className="px-6 py-5 bg-white">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {candidateDetails.map((item, idx) => (
                    <div key={idx}>
                      <p className="text-sm text-gray-500 mb-1">{item.label}</p>

                      <h4 className="font-semibold text-gray-900 break-words">
                        {item.value}
                      </h4>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/view-profile/${candidate?.id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
                    >
                      View Profile
                    </Link>

                    {candidate?.resume && (
                      <a
                        href={candidate.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                      >
                        View Resume
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </details>
      )}
    </div>
  );
};

export default VacancyCard;
