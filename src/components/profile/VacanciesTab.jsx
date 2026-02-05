import React from 'react';
import VacancyCard from './VacancyCard';
import Pagination from './Pagination';
import schoolVacanciesIcon from './../../assets/icons/school-vacancies.svg';

const VacanciesTab = ({
  jobs,
  totalJobs,
  loading,
  currentPage,
  onPageChange,
  onEditJob,
  onCloseJob,
}) => {
  const handleEdit = (job) => {
    console.log('Edit job:', job);
    // Yaha edit functionality implement karenge
    if (onEditJob) onEditJob(job);
  };

  const handleClose = (job) => {
    console.log('Close job:', job);
    // Yaha close/delete functionality implement karenge
    if (onCloseJob) onCloseJob(job);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* Header */}
      <div className="grid grid-cols-2 items-center mb-8">
        {/* LEFT - Title with Icon */}
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-100">
            <img
              src={schoolVacanciesIcon}
              alt="Vacancies"
              className="w-6 h-6"
            />
          </span>
          <span className="text-lg font-medium">Current Vacancies</span>
        </div>

        {/* RIGHT - Active Positions Badge */}
        <div className="flex justify-end">
          <span className="inline-flex items-center bg-green-100 text-green-600 text-sm font-regular rounded-full px-4 py-1.5">
            {totalJobs} Active Position{totalJobs !== 1 ? 's' : ''}
          </span>
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
            <p className="text-gray-600 text-lg">No vacancies found</p>
          </div>
        ) : (
          jobs.map((job) => (
            <VacancyCard
              key={job.id}
              job={job}
              onEdit={handleEdit}
              onClose={handleClose}
            />
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

export default VacanciesTab;