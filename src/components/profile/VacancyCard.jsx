import React from "react";

const VacancyCard = ({ job, onEdit, onClose }) => {
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

  const formatSalary = (min, max) => {
    const SALARY_RANGES = [
      { label: "Upto ₹10,000",         min: 0,      max: 10000  },
      { label: "₹10,000 - ₹20,000",     min: 10000,  max: 20000  },
      { label: "₹20,000 - ₹30,000",     min: 20000,  max: 30000  },
      { label: "₹30,000 - ₹40,000",     min: 30000,  max: 40000  },
      { label: "₹40,000 - ₹50,000",     min: 40000,  max: 50000  },
      { label: "₹50,000 - ₹75,000",     min: 50000,  max: 75000  },
      { label: "₹75,000 - ₹1,00,000",   min: 75000,  max: 100000 },
      { label: "₹1,00,000 - ₹1,50,000", min: 100000, max: 150000 },
      { label: "Above ₹1,50,000",      min: 150000, max: 0      },
    ];

    const found = SALARY_RANGES.find(
      (r) => r.min === Number(min) && r.max === Number(max)
    );

    return found ? `${found.label}/month` : `₹${min} - ₹${max}/month`;
  };

  return (
    <div className="bg-[#F9FAFB] rounded-xl border-2 border-[#E5E7EB] p-6">
      <div className="flex items-start justify-between gap-4">
        {/* LEFT SIDE - Job Info */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {getJobTitle(job)}
          </h3>

          {/* Grade & Experience */}
          <p className="text-sm text-gray-600 flex items-center">
            {job.grade_name}
            {job.grade_name && (
              <span className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
            )}
            {job.experience_required} years exp
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
        <div className="flex flex-col items-end gap-3">
          {/* Urgent Badge */}
          { job.status
              ? <span className="text-xs font-regular text-green-400 bg-green-100 px-2 py-1 rounded-full">
                  Active
                </span>
              : <span className="text-xs font-regular text-yellow-400 bg-yellow-100 px-2 py-1 rounded-full">
                  Draft
                </span>
          }

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
              <span className="font-regular bg-red-100 text-red-500 p-1 rounded-full">
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
  );
};

export default VacancyCard;