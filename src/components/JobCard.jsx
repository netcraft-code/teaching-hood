import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, X, Menu } from "lucide-react";
import AsyncSelect from "react-select/async";
import { Link, useSearchParams } from "react-router-dom";
import { HeroImages } from "../assets/images/HeroImages";
import { getCities, getJobs, likeUnlikeJobApi, applyJobApi } from "../api/auth";
import { findJobIcons } from "./../assets/icons/findJobIcons";

const JobCard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [newJobs, setNewJobs] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // ── Filter states ──────────────────────────────────────────────────────────
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [postedDate, setPostedDate] = useState("any");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("all");
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  // ── Mirror refs — fetchJobs inhe padhta hai, state nahi ──────────────────
  // Problem: setX ke baad turant fetchJobs call karo toh purani value milti hai.
  // Solution: har filter ka ref bhi rakho, fetchJobs ref se padhe.
  const cityRef = useRef(null);
  const jobTypeRef = useRef("all");
  const experienceRef = useRef("all");
  const postedRef = useRef("any");
  const searchRef = useRef("");
  const boardRef = useRef("all");
  const salaryRef = useRef(null);
  const subjectRef = useRef("");
  const gradeRef = useRef("");
  const pageRef = useRef(1);

  // Helper: state + ref dono update karo ek saath
  const setCity = (v) => {
    cityRef.current = v;
    setSelectedCity(v);
  };
  const setJobType = (v) => {
    jobTypeRef.current = v;
    setSelectedJobType(v);
  };
  const setExperience = (v) => {
    experienceRef.current = v;
    setSelectedExperience(v);
  };
  const setPosted = (v) => {
    postedRef.current = v;
    setPostedDate(v);
  };
  const setSearch = (v) => {
    searchRef.current = v;
    setSearchQuery(v);
  };
  const setBoard = (v) => {
    boardRef.current = v;
    setSelectedBoard(v);
  };
  const setSalary = (v) => {
    salaryRef.current = v;
    setSelectedSalary(v);
  };
  const setSubject = (v) => {
    subjectRef.current = v;
    setSelectedSubject(v);
  };
  const setGrade = (v) => {
    gradeRef.current = v;
    setSelectedGrade(v);
  };
  const setPage = (v) => {
    pageRef.current = v;
    setCurrentPage(v);
  };

  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);

  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get("subject");
  const gradeParam = searchParams.get("grade");
  const cityParam = searchParams.get("city");
  const stateParam = searchParams.get("state_id");

  const BOARDS = [
    "CBSE",
    "CISCE",
    "ISC",
    "NIOS",
    "BSB",
    "IB",
    "CAIE",
    "State Board",
  ];

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

  // ── Init guard ─────────────────────────────────────────────────────────────
  const initDoneRef = useRef(false);
  const fetchTimerRef = useRef(null);
  const params = new URLSearchParams(window.location.search);

  // ── buildFilters — SIRF refs padhta hai, state nahi ──────────────────────
  const buildFilters = ({ page } = {}) => {
    const range =
      salaryRef.current !== null ? SALARY_RANGES[salaryRef.current] : null;
    return {
      page: page ?? pageRef.current,
      city_name: params.get("city_name"),
      city_id: cityRef.current?.value || "all",
      job_type: jobTypeRef.current !== "all" ? jobTypeRef.current : "all",
      experience:
        experienceRef.current !== "all" ? experienceRef.current : "all",
      posted: postedRef.current !== "any" ? postedRef.current : "any",
      search: searchRef.current || "",
      radius: 0,
      subject_id: subjectRef.current || "all",
      grade_id: gradeRef.current || "all",
      state_id: stateParam || "all",
      board: boardRef.current !== "all" ? boardRef.current : "all",
      min_salary: range?.min ?? 0,
      max_salary: range?.max ?? 0,
    };
  };

  // ── fetchJobs — always latest values use karta hai refs ki wajah se ──────
  const fetchJobs = async ({ page } = {}) => {
    setLoading(true);
    try {
      const response = await getJobs(buildFilters({ page }));
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

  // ── Init: master data + URL params pre-select + first fetch ───────────────
  useEffect(() => {
    const init = async () => {
      // 1. Subjects + grades parallel
      const [subRes, gradeRes] = await Promise.all([
        fetch(
          "https://teaching-hood-backend.netcraftglobal.com/api/subjects",
        ).then((r) => r.json()),
        fetch(
          "https://teaching-hood-backend.netcraftglobal.com/api/gradelevels",
        ).then((r) => r.json()),
      ]);
      const subList = subRes.data || [];
      const gradeList = gradeRes.data || [];
      setSubjects(subList);
      setGrades(gradeList);

      // 2. URL params — ref + state dono set karo
      if (subjectParam) {
        const exists = subList.some(
          (s) => String(s.id) === String(subjectParam),
        );
        if (exists) setSubject(String(subjectParam));
      }
      if (gradeParam) {
        const exists = gradeList.some(
          (g) => String(g.id) === String(gradeParam),
        );
        if (exists) setGrade(String(gradeParam));
      }

      // 3. City param — city_id directly bhejo, unnecessary search call nahi
      if (cityParam) {
        try {
          const res = await getCities({ id: cityParam, limit: 1 });
          const list =
            res?.data?.data?.data?.map((c) => ({
              value: c.id,
              label: c.name,
            })) || [];
          if (list[0]) {
            // setCity → ref bhi update hoga, state bhi
            setCity(list[0]);
          }
        } catch (e) {
          console.error("City pre-select error", e);
        }
      }

      // 4. Sab refs set ho gaye, ab fetch karo — refs se latest values milenge
      initDoneRef.current = true;
      fetchJobs({ page: 1 });
    };

    init();
  }, []); // sirf ek baar on mount

  // ── Debounced filter watcher — user filter change kare toh ───────────────
  // initDone nahi hua toh kuch nahi karta (init apna fetchJobs khud call karta hai)
  useEffect(() => {
    if (!initDoneRef.current) return;
    clearTimeout(fetchTimerRef.current);
    fetchTimerRef.current = setTimeout(() => {
      setPage(1);
      fetchJobs({ page: 1 });
    }, 300);
    return () => clearTimeout(fetchTimerRef.current);
  }, [
    selectedCity,
    selectedJobType,
    selectedExperience,
    postedDate,
    searchQuery,
    selectedBoard,
    selectedSubject,
    selectedGrade,
    selectedSalary,
  ]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!initDoneRef.current) return;
    fetchJobs({ page: currentPage });
  }, [currentPage]);

  // ── City async search — AsyncSelect ke liye (defaultOptions=false rakha) ──
  // defaultOptions=true hone se page load pe hi city API call hoti thi unnecessarily
  const loadCities = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return [];
    try {
      const res = await getCities({ search: inputValue, limit: 20 });
      return (
        res?.data?.data?.data?.map((c) => ({ value: c.id, label: c.name })) ||
        []
      );
    } catch {
      return [];
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const isWithin30Days = (createdAt) => {
    const diffDays = (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  };

  const getTimeAgo = (dateString) => {
    const diffDays = Math.ceil(
      Math.abs(new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24),
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const w = Math.floor(diffDays / 7);
      return `${w} week${w > 1 ? "s" : ""} ago`;
    }
    const m = Math.floor(diffDays / 30);
    return `${m} month${m > 1 ? "s" : ""} ago`;
  };

  const formatSalary = (min, max) => {
    if (min === null || max === null)
      return "Salary: As per industry standards";
    const found = SALARY_RANGES.find(
      (r) => r.min === Number(min) && r.max === Number(max),
    );
    return found
      ? `Salary: ${found.label}/month`
      : `Salary: ₹${min} - ₹${max}/month`;
  };

  const getJobTitle = (job) => {
    if (job.subject_name && job.grade_name)
      return `${job.grade_name} ${job.subject_name} Teacher`;
    if (job.subject_name) return `${job.position} - ${job.subject_name}`;
    if (job.grade_name) return `${job.position} - ${job.grade_name}`;
    return job.position;
  };

  const clearAllFilters = () => {
    setCity(null);
    setJobType("all");
    setExperience("all");
    setPosted("any");
    setSearch("");
    setBoard("all");
    setSalary(null);
    setSubject("");
    setGrade("");
    setPage(1);
  };

  const likeUnlikedJob = async (jobId) => {
    try {
      const response = await likeUnlikeJobApi({ job_post_id: jobId });
      if (response.data.status)
        setJobs((prev) =>
          prev.map((j) =>
            j.id === jobId ? { ...j, is_liked: !j.is_liked } : j,
          ),
        );
    } catch (e) {
      console.error(e);
    }
  };

  const applyJob = async (jobId) => {
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
        setJobs((prev) =>
          prev.map((j) =>
            j.id === jobId ? { ...j, is_applied: !j.is_applied } : j,
          ),
        );
      }
    } catch {
      setPopupMessage("Something went wrong. Please try again.");
      setShowPopup(true);
    }
  };

  // ── Filter Sidebar ─────────────────────────────────────────────────────────
  const FilterSidebar = ({ isMobile = false }) => (
    <div
      className={`bg-white rounded-[24px] shadow-sm p-6 ${isMobile ? "" : "sticky top-6"}`}
    >
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

      {/* Location — defaultOptions=false: sirf type karne pe search hoga */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={findJobIcons.findJobLocation} className="w-5 h-5" />
          <h3 className="font-medium">City</h3>
        </div>
        <AsyncSelect
          loadOptions={loadCities}
          value={selectedCity}
          onChange={setCity}
          isClearable
          defaultOptions={false}
          placeholder="City (e.g., Delhi)"
          className="w-full"
          noOptionsMessage={({ inputValue }) =>
            inputValue.length < 2 ? "Type your city here" : "No cities found"
          }
        />
      </div>

      {/* Subject */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={findJobIcons.subject} className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Subject</h3>
        </div>
        {/* <h3 className="font-medium mb-2">Subject</h3> */}
        <select
          value={selectedSubject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl bg-gray-50"
        >
          <option value="">All Subjects</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grade */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={findJobIcons.grade} className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Grade</h3>
        </div>
        {/* <h3 className="font-medium mb-2">Grade</h3> */}
        <select
          value={selectedGrade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl bg-gray-50"
        >
          <option value="">All Grades</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={findJobIcons.jobType} className="w-5 h-5" />
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
                className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border ${isActive ? "border-blue-600" : "border-gray-300"}`}
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
                  onChange={(e) => setJobType(e.target.value)}
                  className="hidden"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={findJobIcons.experience} className="w-5 h-5" />
          <h3 className="font-medium">Experience</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Any", value: "all" },
            { label: "Fresher", value: "0-1" },
            { label: "1-3 Years", value: "1-3" },
            { label: "3-5 Years", value: "3-5" },
            { label: "5-10 Years", value: "5-10" },
            { label: "10+ Years", value: "10+" },
          ].map((item) => {
            const isActive = selectedExperience === item.value;
            return (
              <label
                key={item.value}
                className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 flex items-center justify-center rounded-full border ${isActive ? "border-blue-600" : "border-gray-300"}`}
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
                  name="experience"
                  value={item.value}
                  checked={isActive}
                  onChange={(e) => setExperience(e.target.value)}
                  className="hidden"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={findJobIcons.salary} className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Salary Expectation</h3>
        </div>
        <select
          value={selectedSalary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl bg-gray-50"
        >
          <option value="">All Salary Ranges</option>
          {SALARY_RANGES.map((sub, index) => (
            <option key={sub.id} value={index}>
              {sub.label}
            </option>
          ))}
        </select>
        {/* <div className="space-y-3">
          {SALARY_RANGES.map((item, index) => {
            const isActive = selectedSalary === index;
            return (
              <div
                key={index}
                onClick={() => setSalary(isActive ? null : index)}
                className={`p-2 border rounded-lg cursor-pointer ${isActive ? "bg-blue-50 border-blue-500" : ""}`}
              >
                {item.label}
              </div>
            );
          })}
        </div> */}
      </div>

      {/* Posted Date */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <img src={findJobIcons.postedDate} className="w-5 h-5" />
          <h3 className="font-medium">Posted Date</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Any Time", value: "any" },
            { label: "Past 24 Hours", value: "24h" },
            { label: "Past Week", value: "week" },
            { label: "Past Month", value: "month" },
          ].map((item) => {
            const isActive = postedDate === item.value;
            return (
              <label
                key={item.value}
                className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
              >
                <span className="text-gray-800 font-medium">{item.label}</span>
                <input
                  type="radio"
                  name="postedDate"
                  value={item.value}
                  checked={isActive}
                  onChange={(e) => setPosted(e.target.value)}
                  className="hidden"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Board */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Board</h3>
        <select
          value={selectedBoard}
          onChange={(e) => setBoard(e.target.value)}
          className="w-full px-4 py-3 border rounded-xl bg-gray-50"
        >
          <option value="">All Boards</option>
          {BOARDS.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
        {/* <div className="space-y-3">
          {BOARDS.map((b) => {
            const isActive = selectedBoard === b;
            return (
              <div
                key={b}
                onClick={() => setBoard(isActive ? "all" : b)}
                className={`p-2 border rounded-lg cursor-pointer ${isActive ? "bg-blue-50 border-blue-500" : ""}`}
              >
                {b}
              </div>
            );
          })}
        </div> */}
      </div>

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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div>
      <section
        className="py-12 md:py-16 lg:py-4 min-h-[15vh] bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(${HeroImages.bg})` }}
      >
        <div className="mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* <div className="inline-flex items-center space-x-2 bg-white backdrop-blur-sm px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs md:text-sm text-gray-600">
                <span className="text-blue-500">
                  {newJobs} new job{newJobs > 1 ? "s" : ""}
                </span>{" "}
                posted this week
              </span>
            </div> */}
            {/* <h2
              className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
              style={{ textShadow: "0px 4px 4px #00000040" }}
            >
              Discover Your Next
            </h2>
            <p
              className="text-3xl md:text-4xl lg:text-6xl text-white mb-6 md:mb-10 max-w-2xl mx-auto"
              style={{ textShadow: "0px 4px 4px #00000040" }}
            >
              Teaching Opportunity
            </p> */}
            <div className="w-full max-w-5xl mx-auto px-2 md:px-4">
              <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-3 gap-3">
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
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search via any keyword"
                    className="w-full outline-none text-sm md:text-base"
                  />
                </div>
                <button
                  onClick={() => {
                    setPage(1);
                    fetchJobs({ page: 1 });
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
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar />
            </div>

            {isFilterOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setIsFilterOpen(false)}
                />
                <div className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white overflow-y-auto">
                  <div className="p-4">
                    <FilterSidebar isMobile={true} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {totalJobs} Position{totalJobs !== 1 ? "s" : ""} Available
                </h1>
                <p className="text-sm md:text-base text-gray-600">
                  Find your perfect teaching role
                </p>
              </div>

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
                      className="bg-white rounded-2xl border-t-8 border-blue-400 shadow-lg p-4 md:p-6"
                    >
                      <div className="flex sm:flex-row items-start justify-between gap-4">
                        <Link to={`/job/${job.id}`}>
                          <div className="flex items-start gap-3 md:gap-4">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <img
                                src={findJobIcons.schoolIcon}
                                className="w-6 h-6 md:w-8 md:h-8"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-semibold">
                                {getJobTitle(job)}
                              </h3>
                              <p className="text-sm md:text-base text-gray-600 mt-1">
                                {job.school_name}
                              </p>
                              <div className="flex items-center gap-1 mt-1 text-xs md:text-sm text-gray-600">
                                <img
                                  src={findJobIcons.applicant}
                                  className="w-4 h-4"
                                />
                                <span>
                                  {job.total_applicants} applicant
                                  {job.total_applicants > 1 ? "s" : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                        {/* <button
                          onClick={() => likeUnlikedJob(job.id)}
                          className="transition-colors self-start"
                        >
                          <img
                            src={findJobIcons.like}
                            className={`w-6 h-6 ${job.is_liked ? "filter-red" : "opacity-40"}`}
                          />
                        </button> */}
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.board && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs md:text-sm rounded-full">
                              {job.board}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 mb-4 text-xs md:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <img
                              src={findJobIcons.findJobLocation}
                              className="w-4 h-4 flex-shrink-0"
                            />
                            <span className="truncate">
                              {job.city_name}, {job.city?.state?.name}
                            </span>
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
                            <span className="truncate">
                              {getTimeAgo(job.created_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <img
                              src={findJobIcons.totalExperience}
                              className="w-4 h-4 flex-shrink-0"
                            />
                            <span className="truncate">
                              {job.experience_required} years
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* <img
                              src={findJobIcons.totalExperience}
                              className="w-4 h-4 flex-shrink-0"
                            /> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#2563eb"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M3 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"></path>
                              <path d="M13 9h4a4 4 0 0 1 4 4v2H3v-2a4 4 0 0 1 4-4h6z"></path>
                              <path d="M3 15v4"></path>
                              <path d="M21 15v4"></path>
                            </svg>
                            <span className="truncate">
                              {job.accommodation == 1
                                ? "Available"
                                : "Not Available"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {/* <img
                              src={findJobIcons.totalExperience}
                              className="w-4 h-4 flex-shrink-0"
                            /> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#2563eb"
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
                            <span className="truncate">
                              {job.food == 1 ? "Available" : "Not Available"}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div
                            className="font-semibold text-gray-900"
                            style={{ fontSize: "19px" }}
                          >
                            {formatSalary(job.min_salary, job.max_salary)}
                          </div>
                          {job.is_applied ? (
                            <span className="bg-red-100 text-red-500 px-4 py-2 rounded-full text-sm">
                              Applied
                            </span>
                          ) : (
                            <div>
                              <button
                                onClick={() => applyJob(job.id)}
                                className="w-full sm:w-auto px-4 md:px-6 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                              >
                                {isWithin30Days(job.created_at)
                                  ? "Apply Now"
                                  : "Express Interest"}
                                <ChevronRight className="w-4 h-4" />
                              </button>
                              {/* <p className="text-center text-xs mt-1">
                                {isWithin30Days(job.created_at)
                                  ? "Apply Now"
                                  : "Express Interest"}
                              </p> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {!loading && jobs.length > 0 && totalJobs > 10 && (
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm md:text-base"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-gray-700 text-sm md:text-base">
                    Page {currentPage} of {Math.ceil(totalJobs / 10)}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
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
            <p className="text-gray-800 text-sm mb-6">{popupMessage}</p>
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
