import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Clock, Award, ChevronRight, Heart } from 'lucide-react';
import { HeroImages } from "../assets/images/HeroImages";
import { getCities, getJobs } from "../api/auth";
import { findJobIcons } from "./../assets/icons/findJobIcons"
import { Range, getTrackBackground } from "react-range";

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [newJobs, setNewJobs] = useState(0);
  
  // Filter states
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('0-1');
  const [salaryRange, setSalaryRange] = useState([0, 0]);
  const [postedDate, setPostedDate] = useState('any');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRadius, setSearchRadius] = useState(0);

  const MIN = 0;
  const MAX = 50;
  const STEP = 1;

  const buildFilters = () => {
    return {
      page: currentPage,
      city_id: selectedCity !== "all" ? selectedCity : "all",
      job_type: selectedJobType !== "all" ? selectedJobType : "all",
      experience: selectedExperience !== "0-1" ? selectedExperience : "0-1",
      min_salary: salaryRange[0] > 0 ? salaryRange[0] * 100000 : 0,
      max_salary: salaryRange[1] > 0 ? salaryRange[1] * 100000 : 5000000,
      posted: postedDate !== "any" ? postedDate : "any",
      search: searchQuery || "",
      radius: searchRadius > 0 ? searchRadius : 0,
    };
  };

  // Fetch cities
  useEffect(() => {
    fetchCities();
  }, []);

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
  }, [currentPage]);

  const fetchCities = async () => {
    try {
      const response = await getCities();

      if (response.data.status) {
        setCities(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getJobs(buildFilters());

      if (response.data.status) {
        setJobs(response.data.data.data || []);
        setTotalJobs(response.data.data.total || 0);
        setNewJobs(response.data.new_jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchJobs();
  }, [
    selectedCity,
    selectedJobType,
    selectedExperience,
    salaryRange,
    postedDate,
    searchQuery,
    searchRadius
  ]);

  // Get human readable time
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  };

  // Format salary to LPA
  const formatSalary = (min, max) => {
    const minLPA = (min / 100000).toFixed(1);
    const maxLPA = (max / 100000).toFixed(1);
    return `₹${minLPA}-${maxLPA} LPA`;
  };

  // Get job title
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

  const clearAllFilters = () => {
    setSelectedCity("all");
    setSelectedJobType("all");
    setSelectedExperience("0-1");
    setSalaryRange([0, 0]);
    setPostedDate("any");
    setSearchQuery("");
    setSearchRadius(0);
    setCurrentPage(1);
    fetchJobs();
  };

  return (
    <div>
      <section
          className="py-16 md:py-24 min-h-[40vh] bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${HeroImages.bg})` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-600 font-regular"><span className='text-blue-500'>{newJobs} new jobs</span> posted this week</span>
            </div>

            {/* Main Heading */}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-[20px] leading-[28px]"
              style={{
                textShadow: "0px 4px 4px #00000040",
              }}
            >
              Discover Your Next
            </h2>

            {/* Subheading */}
            <p  
              className="font-light text-4xl md:text-5xl lg:text-6xl text-white text-[20px] leading-[28px] tracking-[0] text-center mb-10 max-w-2xl mx-auto"
              style={{
                textShadow: "0px 4px 4px #00000040",
              }}
            >
              Teaching Opportunity
            </p>
            
            <div className="w-full max-w-5xl mx-auto px-4">
              <div className="flex items-center bg-white rounded-2xl shadow-lg p-3 gap-3">
                
                {/* Search Icon + Input */}
                <div className="flex items-center flex-1 gap-3 px-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                    />
                  </svg>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Subject, Grade, Location...."
                    className="w-full outline-none text-sm md:text-base"
                  />
                </div>
                
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    fetchJobs();
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl"
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen px-12 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h2 className="text-2xl font-semibold mb-6">Filters</h2>

                {/* Location Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={findJobIcons.findJobLocation} className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">Location</h3>
                  </div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Cities</option>
                    {cities.map(city => (
                      <option key={city.id} value={city.id.toString()}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={findJobIcons.jobType} className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">Job Type</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="all"
                        checked={selectedJobType === 'all'}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">All Types</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="Full-Time"
                        checked={selectedJobType === 'Full-Time'}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Full-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="Part-Time"
                        checked={selectedJobType === 'Part-Time'}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Part-time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="jobType"
                        value="Contract"
                        checked={selectedJobType === 'Contract'}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Contract</span>
                    </label>
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={findJobIcons.experience} className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">Experience</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        value="fresher"
                        checked={selectedExperience === '0-1'}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Fresher</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        value="1-3"
                        checked={selectedExperience === '1-3'}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">1-3 Years</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        value="3-5"
                        checked={selectedExperience === '3-5'}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">3-5 Years</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        value="5+"
                        checked={selectedExperience === '5+'}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">5+ Years</span>
                    </label>
                  </div>
                </div>

                {/* Salary Range Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={findJobIcons.salaryRange} className="w-5 h-5" />
                    <h3 className="font-medium">Salary Range</h3>
                  </div>

                  <Range
                    values={salaryRange}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={(values) => setSalaryRange(values)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="h-2 w-full rounded-lg"
                        style={{
                          background: getTrackBackground({
                            values: salaryRange,
                            colors: ["#dbeafe", "#2563eb", "#dbeafe"],
                            min: MIN,
                            max: MAX,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => {
                      const { key, ...restProps } = props;

                      return (
                        <div
                          key={key}
                          {...restProps}
                          className="h-4 w-4 bg-blue-600 rounded-full shadow focus:outline-none"
                        />
                      );
                    }}
                  />

                  {/* Values */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={salaryRange[0]}
                        onChange={(e) =>
                          setSalaryRange([+e.target.value || 0, salaryRange[1]])
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-sm">LPA</span>
                    </div>

                    <span className="text-gray-500">-</span>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={salaryRange[1]}
                        onChange={(e) =>
                          setSalaryRange([salaryRange[0], +e.target.value || 0])
                        }
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-sm">LPA</span>
                    </div>
                  </div>
                </div>

                {/* Posted Date Filter */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={findJobIcons.postedDate} className="w-5 h-5" />
                    <h3 className="font-medium">Posted Date</h3>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="postedDate"
                        value="any"
                        checked={postedDate === 'any'}
                        onChange={(e) => setPostedDate(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Any Time</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="postedDate"
                        value="24h"
                        checked={postedDate === '24h'}
                        onChange={(e) => setPostedDate(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Past 24 Hours</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="postedDate"
                        value="week"
                        checked={postedDate === 'week'}
                        onChange={(e) => setPostedDate(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Past Week</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="postedDate"
                        value="month"
                        checked={postedDate === 'month'}
                        onChange={(e) => setPostedDate(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Past Month</span>
                    </label>
                  </div>
                </div>

                {/* Search Radius */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <img
                        src={findJobIcons.searchRadius}
                        className="w-5 h-5"
                        alt="Search Radius"
                      />
                      Search Radius
                    </h3>
                    <span className="text-blue-600 font-semibold">{searchRadius}km</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                    onMouseUp={fetchJobs}
                    onTouchEnd={fetchJobs}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 Km</span>
                    <span>100 Km</span>
                  </div>
                </div>

                {/* Clear All Filters */}
                <button
                  onClick={clearAllFilters}
                  className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Right Section - Job Listings */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">
                  {jobs.length} Position{jobs.length !== 1 ? 's' : ''} Available
                </h1>
                <p className="text-gray-600">Find your perfect teaching role</p>
              </div>

              {/* Job Cards */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading jobs...</p>
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-600 text-lg">No jobs found matching your filters</p>
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 text-blue-600 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        {/* LEFT SIDE */}
                        <div className="flex items-start gap-4">
                          
                          {/* School Icon */}
                          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <img src={findJobIcons.schoolIcon} className="w-8 h-8" />
                          </div>

                          {/* Job Info */}
                          <div>
                            {/* Title + Verified */}
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl font-semibold">
                                {getJobTitle(job)}
                              </h3>

                              <span className="px-2 py-1 bg-green-50 text-green-700 text-xs flex items-center gap-1 font-medium rounded-full">
                                <img src={findJobIcons.verified} className="w-4 h-4" />
                                Verified
                              </span>
                            </div>

                            {/* School Name */}
                            <p className="text-gray-600 mt-1">
                              {job.school_name}
                            </p>

                            {/* Applicants */}
                            <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                              <img src={findJobIcons.applicant} className="w-4 h-4" />
                              <span>{job.total_applicants} applicants</span>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <img src={findJobIcons.like} className="w-6 h-6" />
                        </button>
                      </div>


                      {/* Job Details */}
                      <div className="flex-1">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.board && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                              {job.board}
                            </span>
                          )}
                        </div>

                        {/* Job Info */}
                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <img src={findJobIcons.findJobLocation} className="w-4 h-4" />
                            <span>{job.city_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={findJobIcons.availableJobType} className="w-4 h-4" />
                            <span>{job.job_type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={findJobIcons.timeDuration} className="w-4 h-4" />
                            <span>{getTimeAgo(job.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img src={findJobIcons.totalExperience} className="w-4 h-4" />
                            <span>{job.experience_required} years</span>
                          </div>
                        </div>

                        {/* Salary and Apply Button */}
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-semibold text-gray-900">
                            {formatSalary(job.min_salary, job.max_salary)}
                          </div>
                          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            Apply Now
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {!loading && jobs.length > 0 && totalJobs > 10 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {Math.ceil(totalJobs / 10)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(totalJobs / 10)}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;