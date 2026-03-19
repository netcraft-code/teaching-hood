import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  HelpCircle,
  Users,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import {
  getCities,
  getGradeLevels,
  getSubjects,
  getProfile,
  updateJob, // You'll need to create this API function
} from "../api/auth";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { postJobIcons } from "../assets/icons/postJobIcons";
import Header from "../components/Header";

const EditJob = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Get job ID from URL params
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Get job data from location state or fetch from API
  const jobData = location.state?.job;

  const [formData, setFormData] = useState({
    school_name: "",
    board: "",
    position: "",
    subject_id: "",
    grade_id: "",
    city_id: "",
    job_type: "",
    min_salary: "",
    max_salary: "",
    experience_required: "",
    food: false,
    accommodation: false,
    job_description: "",
    qualification_requirements: "",
    application_deadline: "",
    status: false,
    contact_email: "",
    contact_phone: "",
  });

  useEffect(() => {
    fetchDropdowns();
  }, []);

  // Pre-fill form with job data
  useEffect(() => {
    if (jobData) {
      const knownBoards = ["CBSE", "ISCE", "ISC", "NIOS", "BSB", "IB", "CAIE"];

      setFormData({
        school_name: jobData.school_name || "",
        board: knownBoards.includes(jobData.board) ? jobData.board : (jobData.board ? "Others" : ""),
        board_other: knownBoards.includes(jobData.board) ? "" : (jobData.board || ""),
        position: jobData.position || "",
        subject_id: jobData.subject_id || "",
        subject_id_other: jobData.subject_id_other || "",
        grade_id: jobData.grade_id || "",
        city_id: jobData.city_id || "",
        job_type: jobData.job_type || "",
        min_salary: jobData.min_salary ?? "",
        max_salary: jobData.max_salary ?? "",
        experience_required: jobData.experience_required || "",
        food: jobData.food === 1 || jobData.food === true,
        accommodation:
          jobData.accommodation === 1 || jobData.accommodation === true,
        job_description: jobData.job_description || "",
        qualification_requirements: jobData.qualification_requirements || "",
        application_deadline: jobData.application_deadline || "",
        status: jobData.status === 1 || jobData.status === true,
        contact_email: jobData.contact_email || "",
        contact_phone: jobData.contact_phone || "",
      });

      // Set selected city for AsyncSelect
      if (jobData.city) {
        setSelectedCity({
          value: jobData.city.id,
          label: jobData.city.name,
        });
      }
    }
  }, [jobData]);

  const fetchDropdowns = async () => {
    setLoading(true);

    try {
      const [subjectsRes, gradesRes, profileRes] = await Promise.all([
        getSubjects(),
        getGradeLevels(),
        getProfile(),
      ]);

      setSubjects(subjectsRes?.data?.data || []);
      setGrades(gradesRes?.data?.data || []);
      setProfile(profileRes?.data?.data || null);
    } catch (error) {
      console.error("Dropdown API error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Clear subject/grade when switching away from Teacher
      if (name === "position" && value !== "Teacher") {
        updated.subject_id = "";
        updated.grade_id = "";
      }

      return updated;
    });

    setErrors((prev) => {
      let newErrors = { ...prev };

      // clear field specific error
      newErrors[name] = "";

      // SPECIAL CASE: salary range
      if (name === "min_salary" || name === "max_salary") {
        newErrors.salary = "";
      }

      // Clear subject/grade errors when switching position
      if (name === "position") {
        newErrors.subject_id = "";
        newErrors.grade_id = "";
      }

      return newErrors;
    });
  };

  // Async load cities for searchable dropdown
  const loadCities = async (inputValue) => {
    try {
      const res = await getCities({
        search: inputValue,
        limit: 20,
      });

      return (
        res?.data?.data.data?.map((city) => ({
          value: city.id,
          label: city.name,
        })) || []
      );
    } catch (error) {
      console.error("City API error", error);
      return [];
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.position) newErrors.position = "Position type is required";

    if (formData.position === "Teacher") {
      if (!formData.subject_id) newErrors.subject_id = "Subject is required";
      if (!formData.grade_id) newErrors.grade_id = "Grade is required";
    }

    if (profile?.user_type == 3) {
      formData.board = formData.board === "Others" ? formData.board_other : formData.board;

      if (!formData.board) newErrors.board = "Board is required";
    }

    if (!formData.city_id) newErrors.city_id = "Location is required";
    if (!formData.job_type) newErrors.job_type = "Job type is required";

    if (!formData.min_salary || !formData.max_salary) {
      newErrors.salary = "Salary range is required";
    }

    if (!formData.experience_required)
      newErrors.experience_required = "Experience is required";

    if (!formData.job_description)
      newErrors.job_description = "Job description is required";

    if (!formData.contact_email)
      newErrors.contact_email = "Email field is required";

    if (!formData.contact_phone)
      newErrors.contact_phone = "Phone Number is required";

    if (!formData.qualification_requirements)
      newErrors.qualification_requirements =
        "Qualifications & requirements are required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status) => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        status, // 0 = draft, 1 = publish
      };

      // Call update API with job ID
      const response = await updateJob(jobData.id, payload);

      console.log("Job updated successfully:", response.data);

      // Success UX
      setPopupMessage(
        status === 1
          ? "Job updated and published successfully!"
          : "Job updated and saved as draft!",
      );

      setShowPopup(true);

      if (response?.data?.status === true) {
        navigate("/profile"); // redirect to profile or job listing page
      } else {
        setPopupMessage("Job updated but something looks wrong.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Job update failed:", error);

      // Backend validation handling (Laravel)
      if (error.response?.status === 422) {
        setErrors(error.response.data.data || {});
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setPopupMessage("Something went wrong. Please try again.");
        setShowPopup(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Job not found</p>
          <button
            onClick={() => navigate("/profile")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <header className="sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#2563eb]">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-regular">
              Edit Job Post
            </h1>
          </div>
          <div className="hidden sm:flex space-x-2 sm:space-x-3">
            <button
              onClick={() => handleSubmit(0)}
              disabled={submitting}
              className="px-4 py-2 text-gray-700 rounded-lg font-medium disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Draft"}
            </button>

            <button
              onClick={() => handleSubmit(1)}
              disabled={submitting}
              className="px-4 px-6 py-2 text-white rounded-lg disabled:opacity-50 rounded-[1000px] w-[117px] bg-[rgba(0,_127,_255,_1)]"
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.basicInformation}
                    className="w-5 h-5 text-blue-600"
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-5">
                <p className="text-sm text-gray-600">
                  Tell us about the position
                </p>

                {profile?.user_type == 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        School Name
                      </label>

                      <input
                        type="text"
                        name="school_name"
                        value={formData.school_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Board
                      </label>

                      <select
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        value={formData.board === "CBSE" || formData.board === "ISCE" || formData.board === "ISC" || formData.board === "NIOS" || formData.board === "BSB" || formData.board === "IB" || formData.board === "CAIE" ? formData.board : (formData.board ? "Others" : "")}
                        onChange={handleInputChange}
                        name="board"
                      >
                        <option value="">Select Board</option>
                        {["CBSE", "ISCE", "ISC", "NIOS", "BSB", "IB", "CAIE"].map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                        <option value="Others">Others</option>
                      </select>

                      {formData.board === "Others" && (
                        <input
                          type="text"
                          className="mt-2 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                          placeholder="Enter board name"
                          value={formData.board_other || ""}
                          onChange={handleInputChange}
                          name="board_other"
                        />
                      )}

                      {errors.board && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.board}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Position <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      "Teacher",
                      "Principal",
                      "Co-ordinator",
                      "Vice Principal",
                    ].map((position) => (
                      <label
                        key={position}
                        className={`flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.position === position
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="position"
                          value={position}
                          checked={formData.position === position}
                          onChange={handleInputChange}
                          className="w-3 h-3 text-blue-500 border-gray-300 focus:ring-blue-500 focus:ring-2"
                        />
                        <span
                          className={`font-regular text-sm ${
                            formData.position === position
                              ? "text-blue-700"
                              : "text-gray-700"
                          }`}
                        >
                          {position}
                        </span>
                      </label>
                    ))}
                  </div>

                  {errors.position && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.position}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* CONDITIONAL: Subject - Only show for Teacher */}
                  {formData.position === "Teacher" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>

                      <Select
                        options={[
                          ...subjects.map((s) => ({ value: s.id, label: s.name })),
                          { value: "other", label: "Other" },
                        ]}
                        value={
                          formData.subject_id === "other"
                            ? { value: "other", label: "Other" }
                            : subjects.find((s) => s.id === formData.subject_id)
                            ? { value: formData.subject_id, label: subjects.find((s) => s.id === formData.subject_id).name }
                            : null
                        }
                        onChange={(selected) => {
                          setFormData((prev) => ({
                            ...prev,
                            subject_id: selected.value,
                            subject_id_other: "",
                          }));
                          setErrors((prev) => ({ ...prev, subject_id: "" }));
                        }}
                        placeholder="Select subject"
                        className="w-full"
                      />

                      {formData.subject_id === "other" && (
                        <input
                          type="text"
                          value={formData.subject_id_other || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, subject_id_other: e.target.value }))
                          }
                          placeholder="Enter subject name"
                          className="mt-2 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        />
                      )}

                      {errors.subject_id && (
                        <p className="text-sm text-red-500 mt-1">{errors.subject_id}</p>
                      )}
                    </div>
                  )}

                  {/* CONDITIONAL: Grade - Only show for Teacher */}
                  {formData.position === "Teacher" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Grade <span className="text-red-500">*</span>
                      </label>

                      <Select
                        options={grades.map((g) => ({
                          value: g.id,
                          label: g.name,
                        }))}
                        value={
                          grades.find((g) => g.id === formData.grade_id)
                            ? {
                                value: formData.grade_id,
                                label: grades.find(
                                  (g) => g.id === formData.grade_id,
                                ).name,
                              }
                            : null
                        }
                        onChange={(selected) => {
                          setFormData((prev) => ({
                            ...prev,
                            grade_id: selected.value,
                          }));
                          setErrors((prev) => ({ ...prev, grade_id: "" }));
                        }}
                        placeholder="Select grade"
                        className="w-full"
                      />

                      {errors.grade_id && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.grade_id}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>

                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={loadCities}
                      value={selectedCity}
                      onChange={(option) => {
                        setSelectedCity(option);
                        setFormData((prev) => ({
                          ...prev,
                          city_id: option ? option.value : "",
                        }));
                        setErrors((prev) => ({ ...prev, city_id: "" }));
                      }}
                      placeholder="Search Location"
                      className="w-full"
                    />

                    {errors.city_id && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.city_id}
                      </p>
                    )}
                  </div>
                </div>

                {/* Job Type - Tabs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Full-Time", "Part-Time", "Contract"].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, job_type: type }));
                          setErrors((prev) => ({ ...prev, job_type: "" }));
                        }}
                        className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                          formData.job_type === type
                            ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {errors.job_type && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.job_type}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Details Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.jobDeatail}
                    className="w-5 h-5 text-green-600"
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Job Details</h2>
              </div>

              <div className="space-y-5">
                <p className="text-sm text-gray-600">
                  Subject and grade information
                </p>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Salary Range (per month){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  {(() => {
                    const SALARY_RANGES = [
                      { label: "Upto 10,000",          min: "0",       max: "10000"  },
                      { label: "10,000 - 20,000",      min: "10000",   max: "20000"  },
                      { label: "20,000 - 30,000",      min: "20000",   max: "30000"  },
                      { label: "30,000 - 40,000",      min: "30000",   max: "40000"  },
                      { label: "40,000 - 50,000",      min: "40000",   max: "50000"  },
                      { label: "50,000 - 75,000",      min: "50000",   max: "75000"  },
                      { label: "75,000 - 1,00,000",    min: "75000",   max: "100000" },
                      { label: "1,00,000 - 1,50,000",  min: "100000",  max: "150000" },
                      { label: "Above 1,50,000",       min: "150000",  max: "0"      },
                    ];
                    
                    const selectedValue = formData.min_salary !== undefined && formData.max_salary !== undefined
                      ? `${String(formData.min_salary ?? 0)}-${String(formData.max_salary ?? 0)}`
                      : "";
                      
                    return (
                      <div className="w-full">
                        <select
                          value={selectedValue}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (!val) {
                              handleInputChange({ target: { name: "min_salary", value: "" } });
                              handleInputChange({ target: { name: "max_salary", value: "" } });
                              return;
                            }
                            const found = SALARY_RANGES.find((r) => `${r.min}-${r.max}` === val);
                            if (found) {
                              handleInputChange({ target: { name: "min_salary", value: found.min } });
                              handleInputChange({ target: { name: "max_salary", value: found.max } });
                            }
                          }}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                        >
                          <option value="">Select Salary Range</option>
                          {SALARY_RANGES.map((r) => (
                            <option key={`${r.min}-${r.max}`} value={`${r.min}-${r.max}`}>
                              {r.label}
                            </option>
                          ))}
                        </select>

                        {(errors.min_salary || errors.max_salary) && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.min_salary || errors.max_salary}
                          </p>
                        )}
                      </div>
                    );
                  })()}

                  {errors.salary && (
                    <p className="text-sm text-red-500 mt-1">{errors.salary}</p>
                  )}
                </div>

                {/* Experience Required */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience Required <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="experience_required"
                      value={formData.experience_required}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none"
                    >
                      <option value="">Select experience level</option>
                      <option value="0">Fresher</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>

                  {errors.experience_required && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.experience_required}
                    </p>
                  )}
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Benefits (Food & Accommodation)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-start p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200 border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="bg-orange-50 flex items-center justify-center w-10 h-10 rounded-full">
                            <img src={postJobIcons.food} className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-gray-800 text-sm sm:text-base">
                            Food Provided
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 ml-12">
                          Meals included for staff
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <input
                          type="checkbox"
                          name="food"
                          checked={formData.food}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                    </label>

                    <label className="flex items-start p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200 border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 rounded-full">
                          <div className="bg-purple-100 flex items-center justify-center w-10 h-10 rounded-full">
                            <img
                              src={postJobIcons.accommodation}
                              className="w-5 h-5"
                            />
                          </div>
                          <span className="font-medium text-gray-800 text-sm sm:text-base">
                            Accommodation
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 ml-12">
                          Living Quarters available
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <input
                          type="checkbox"
                          name="accommodation"
                          checked={formData.accommodation}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements & Description Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.requirementDescription}
                    className="w-5 h-5"
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Requirements & Description
                </h2>
              </div>

              <div className="space-y-5">
                <p className="text-sm text-gray-600">
                  Detailed information about the role
                </p>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="job_description"
                    value={formData.job_description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  />

                  {errors.job_description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.job_description}
                    </p>
                  )}
                </div>

                {/* Qualifications & Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qualifications & Requirements{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="qualification_requirements"
                    value={formData.qualification_requirements}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="List required qualifications, skills, certifications, etc. (one per line)"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  />

                  {errors.qualification_requirements && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.qualification_requirements}
                    </p>
                  )}
                </div>

                {/* Application Deadline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Deadline
                  </label>

                  <input
                    type="date"
                    name="application_deadline"
                    value={formData.application_deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />

                  {errors.application_deadline && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.application_deadline}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.contactInformation}
                    className="w-5 h-5"
                  />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Contact Information
                </h2>
              </div>

              <div className="space-y-5">
                <p className="text-sm text-gray-600">
                  How candidates can reach you
                </p>

                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    placeholder="info@school.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                  {errors.contact_email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.contact_email}
                    </p>
                  )}
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />

                  {errors.contact_phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.contact_phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(1)}
                disabled={submitting}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/30 disabled:opacity-50"
              >
                {submitting ? "Updating..." : "Update Job"}
              </button>
            </div>
          </div>

          {/* Right Column - Tips & Stats */}
          <div className="hidden lg:block space-y-6">
            {/* Tips for Success Card */}
            <div className="bg-blue-50 rounded-3xl p-6 sticky top-24">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <img src={postJobIcons.tipsForSuccess} className="w-5 h-5" />
                </div>
                <h3 className="font-medium">Tips for Success</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex space-x-2">
                  <img src={postJobIcons.tipsTick} />
                  <p className="font-normal text-gray-700">
                    Be specific about requirements
                  </p>
                </div>
                <div className="flex space-x-2">
                  <img src={postJobIcons.tipsTick} />
                  <p className="font-normal text-gray-700">
                    Include Food and Accommodation for better response
                  </p>
                </div>
                <div className="flex space-x-2">
                  <img src={postJobIcons.tipsTick} />
                  <p className="font-normal text-gray-700">
                    Highlight school culture & benefits
                  </p>
                </div>
                <div className="flex space-x-2">
                  <img src={postJobIcons.tipsTick} />
                  <p className="font-normal text-gray-700">
                    Use clear, professional language
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Job Performance
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-normal text-xl text-blue-400">
                      {jobData.total_applicants || 0}
                    </div>
                    <div className="text-sm font-normal text-gray-600">
                      Total Applicants
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-normal text-xl text-green-400">
                      {jobData.status === 1 ? "Active" : "Draft"}
                    </div>
                    <div className="text-sm font-normal text-gray-600">
                      Job Status
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-800">
                  Need Help?
                </h3>
              </div>

              <p className="text-sm font-normal text-gray-600 mb-4">
                Our team is here to help you find the perfect candidate.
              </p>

              <button className="w-full px-4 py-3 bg-green-100 text-green-400 rounded-xl hover:bg-green-500 hover:text-white transition-all duration-200 font-medium">
                Contact Support
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
    </>
  );
};

export default EditJob;