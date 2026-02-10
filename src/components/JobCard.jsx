import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  X,
  Menu,
} from "lucide-react";
import { Link } from 'react-router-dom';
import { HeroImages } from "../assets/images/HeroImages";
import { getCities, getJobs, likeUnlikeJobApi, applyJobApi } from "../api/auth";
import { findJobIcons } from "./../assets/icons/findJobIcons";
import { Range, getTrackBackground } from "react-range";

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [newJobs, setNewJobs] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("0-1");
  const [salaryRange, setSalaryRange] = useState([0, 0]);
  const [postedDate, setPostedDate] = useState("any");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRadius, setSearchRadius] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

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

  const isWithin30Days = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();

    const diffTime = today - createdDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 30;
  };

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
      console.error("Error fetching cities:", error);
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
    searchRadius,
  ]);

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

  const likeUnlikedJob = async (jobId) => {
    try {
      const response = await likeUnlikeJobApi({
        job_post_id: jobId,
      });

      if (response.data.status) {
        setJobs((jobs) =>
          jobs.map((job) =>
            job.id === jobId
              ? { ...job, is_liked: !job.is_liked }
              : job
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const applyJob = async (jobId) => {
    try {
      if (!localStorage.getItem("auth_token")) {
        setPopupMessage("You need to login first");
        setShowPopup(true);

        return;
      }

      try {
        const response = await applyJobApi(jobId);

        if (response.data.status) {
          setPopupMessage(response.data.data.message);
          setShowPopup(true);

          setJobs((jobs) =>
            jobs.map((job) =>
              job.id === jobId
                ? { ...job, is_applied: !job.is_applied }
                : job
            )
          );
        }
      } catch (err) {
        setPopupMessage("Something went wrong. Please try again.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter Sidebar Component
  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`bg-white rounded-[24px] shadow-sm p-6 ${isMobile ? '' : 'sticky top-6'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Filters</h2>
        {isMobile && (
          <button
            onClick={() => setIsFilterOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={findJobIcons.findJobLocation}
            className="w-5 h-5 text-blue-600"
          />
          <h3 className="font-medium">Location</h3>
        </div>
        <div className="relative w-full">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="
              w-full appearance-none
              bg-white
              px-4 py-3
              pr-10
              border border-gray-200
              rounded-xl
              text-gray-700
              text-sm
              shadow-sm
              focus:outline-none
              focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
            "
          >
            <option value="all">All Cities</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id.toString()}>
                {city.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Job Type Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={findJobIcons.jobType}
            className="w-5 h-5 text-blue-600"
          />
          <h3 className="font-medium">Job Type</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "All Types", value: "all" },
            { label: "Full-time", value: "Full-Time" },
            { label: "Part-time", value: "Part-Time" },
            { label: "Contract", value: "Contract" },
          ].map((item) => {
            const isActive = selectedJobType === item.value;

            return (
              <label
                key={item.value}
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition
                  ${
                    isActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border
                      ${isActive ? "border-blue-600" : "border-gray-300"}`}
                  >
                    {isActive && (
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                    )}
                  </span>

                  <span className="text-gray-800 font-medium">
                    {item.label}
                  </span>
                </div>

                <input
                  type="radio"
                  name="jobType"
                  value={item.value}
                  checked={isActive}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="hidden"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={findJobIcons.experience}
            className="w-5 h-5 text-blue-600"
          />
          <h3 className="font-medium">Experience</h3>
        </div>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="experience"
              value="fresher"
              checked={selectedExperience === "0-1"}
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
              checked={selectedExperience === "1-3"}
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
              checked={selectedExperience === "3-5"}
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
              checked={selectedExperience === "5+"}
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
              checked={postedDate === "any"}
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
              checked={postedDate === "24h"}
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
              checked={postedDate === "week"}
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
              checked={postedDate === "month"}
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
          <span className="text-blue-600 font-semibold">
            {searchRadius}km
          </span>
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
        onClick={() => {
          clearAllFilters();
          if (isMobile) setIsFilterOpen(false);
        }}
        className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div>
      <section
        className="py-12 md:py-16 lg:py-24 min-h-[40vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${HeroImages.bg})` }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-sm px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm text-gray-600 font-regular">
                <span className="text-blue-500">
                  {newJobs} new job{newJobs > 1 ? 's' : ''}
                </span> posted this week
              </span>
            </div>

            {/* Main Heading */}
            <h2
              className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
              style={{
                textShadow: "0px 4px 4px #00000040",
              }}
            >
              Discover Your Next
            </h2>

            {/* Subheading */}
            <p
              className="font-light text-3xl md:text-4xl lg:text-6xl text-white mb-6 md:mb-10 max-w-2xl mx-auto"
              style={{
                textShadow: "0px 4px 4px #00000040",
              }}
            >
              Teaching Opportunity
            </p>

            <div className="w-full max-w-5xl mx-auto px-2 md:px-4">
              <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-3 gap-3">
                {/* Search Icon + Input */}
                <div className="flex items-center flex-1 w-full gap-3 px-2 md:px-4">
                  <svg
                    className="w-5 h-5 text-gray-400 flex-shrink-0"
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
                  className="w-full md:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 rounded-xl text-sm md:text-base"
                >
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen px-4 md:px-8 lg:px-12 py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md w-full justify-center"
            >
              <Menu className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar - Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar />
            </div>

            {/* Mobile Sidebar - Filters */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setIsFilterOpen(false)}
                ></div>

                {/* Sidebar */}
                <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white overflow-y-auto">
                  <div className="p-4">
                    <FilterSidebar isMobile={true} />
                  </div>
                </div>
              </div>
            )}

            {/* Right Section - Job Listings */}
            <div className="flex-1">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {totalJobs} Position{totalJobs !== 1 ? "s" : ""} Available
                </h1>
                <p className="text-sm md:text-base text-gray-600">Find your perfect teaching role</p>
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
                    <p className="text-gray-600 text-base md:text-lg">
                      No jobs found matching your filters
                    </p>
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
                      className="bg-white rounded-2xl border-t-8 border-blue-400 shadow-lg transition-shadow p-4 md:p-6"
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                        {/* LEFT SIDE */}
                        <Link to={`/job/${job.id}`}>
                          <div className="flex items-start gap-3 md:gap-4 w-full sm:w-auto">
                            {/* School Icon */}
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <img
                                src={findJobIcons.schoolIcon}
                                className="w-6 h-6 md:w-8 md:h-8"
                              />
                            </div>

                            {/* Job Info */}
                            <div className="flex-1">
                              {/* Title + Verified */}
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-lg md:text-xl font-semibold">
                                  {getJobTitle(job)}
                                </h3>

                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs flex items-center gap-1 font-medium rounded-full">
                                  <img
                                    src={findJobIcons.verified}
                                    className="w-4 h-4"
                                  />
                                  Verified
                                </span>
                              </div>

                              {/* School Name */}
                              <p className="text-sm md:text-base text-gray-600 mt-1">
                                {job.school_name}
                              </p>

                              {/* Applicants */}
                              <div className="flex items-center gap-1 mt-1 text-xs md:text-sm text-gray-600">
                                <img
                                  src={findJobIcons.applicant}
                                  className="w-4 h-4"
                                />
                                <span>
                                  {job.total_applicants} applicant{job.total_applicants > 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* RIGHT SIDE */}
                        <button
                          onClick={() => likeUnlikedJob(job.id)}
                          className="transition-colors self-start sm:self-auto"
                        >
                          <img
                            src={findJobIcons.like}
                            className={`w-6 h-6 ${
                              job.is_liked ? "filter-red" : "opacity-40"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 mt-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.board && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs md:text-sm rounded-full">
                              {job.board}
                            </span>
                          )}
                        </div>

                        {/* Job Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 text-xs md:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <img
                              src={findJobIcons.findJobLocation}
                              className="w-4 h-4 flex-shrink-0"
                            />
                            <span className="truncate">{job.city_name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src={findJobIcons.availableJobType}
                              className="w-4 h-4 flex-shrink-0"
                            />
                            <span className="truncate">{job.job_type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src={findJobIcons.timeDuration}
                              className="w-4 h-4 flex-shrink-0"
                            />
                            <span className="truncate">{getTimeAgo(job.created_at)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src={findJobIcons.totalExperience}
                              className="w-4 h-4 flex-shrink-0"
                            />
                            <span className="truncate">{job.experience_required} years</span>
                          </div>
                        </div>

                        {/* Salary and Apply Button */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="text-xl md:text-2xl font-semibold text-gray-900">
                            {formatSalary(job.min_salary, job.max_salary)}
                          </div>
                          {job.is_applied ? (
                            <span className="font-regular bg-red-100 text-red-500 px-4 py-2 rounded-full text-sm">
                              Applied
                            </span>
                          ) : (
                            <button
                              className="w-full sm:w-auto px-4 md:px-6 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                              onClick={() => applyJob(job.id)}
                            >
                              {isWithin30Days(job.created_at) ? "Apply Now" : "Express Interest"}
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              {!loading && jobs.length > 0 && totalJobs > 10 && (
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm md:text-base"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700 text-sm md:text-base">
                    Page {currentPage} of {Math.ceil(totalJobs / 10)}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage >= Math.ceil(totalJobs / 10)}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm md:text-base"
                  >
                    Next
                  </button>
                </div>
              )}
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
  );
};

export default JobCard;