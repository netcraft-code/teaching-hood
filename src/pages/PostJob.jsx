import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Users, Briefcase } from "lucide-react";
import {
  getCities,
  getGradeLevels,
  getSubjects,
  getProfile,
  postJob,
} from "../api/auth";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { postJobIcons } from "../assets/icons/postJobIcons";

const PostJob = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [profile, setProfile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDropdowns();
  }, []);

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
      
      // Pre-fill contact info
      setFormData((prev) => ({
        ...prev,
        contact_email: profileRes?.data?.data?.email || "",
        contact_phone: profileRes?.data?.data?.phone || "",
        school_name: profileRes?.data?.data?.first_name || "",
        board: profileRes?.data?.data?.board || "",
      }));
    } catch (error) {
      console.error("Dropdown API error", error);
    } finally {
      setLoading(false); // ✅ VERY IMPORTANT
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // 👇 Clear subject/grade when switching away from Teacher
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

      // 🔥 SPECIAL CASE: salary range
      if (name === "min_salary" || name === "max_salary") {
        newErrors.salary = "";
      }

      // 👇 Clear subject/grade errors when switching position
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
        res?.data?.data?.map((city) => ({
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

    if (!formData.position) newErrors.position = "Position type is required"; // 👈 New validation

    if (formData.position === "Teacher") {
      if (!formData.subject_id) newErrors.subject_id = "Subject is required";
      if (!formData.grade_id) newErrors.grade_id = "Grade is required";
    }

    if (profile.user_type == 3) {
      if (!formData.board) newErrors.board = "Board is required";
    }

    if (!formData.city_id) newErrors.city_id = "Location is required";
    if (!formData.job_type) newErrors.job_type = "Job type is required";

    if (!formData.min_salary || !formData.max_salary) {
      newErrors.salary = "Salary range is required";
    } else if (Number(formData.min_salary) > Number(formData.max_salary)) {
      newErrors.salary = "Min salary cannot be greater than max salary";
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

      const response = await postJob(payload);

      console.log("Job saved successfully:", response.data);

      // ✅ Success UX
      alert(
        status === 1 ? "Job published successfully!" : "Job saved as draft!",
      );

      if (response?.data?.status === true) {
        navigate("/profile"); // 👈 redirect here
      } else {
        alert("Job saved but something looks wrong.");
      }
    } catch (error) {
      console.error("Job save failed:", error);

      // ✅ Backend validation handling (Laravel)
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading ...
      </div>
    );
  }

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-regular">
              Post a Job
            </h1>
          </div>
          <div className="flex space-x-2 sm:space-x-3">
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
              {submitting ? "Publishing..." : "Publish"}
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.basicInformation}
                    className="w-5 h-5 text-blue-600"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Basic Information
                </h2>
              </div>

              <div className="space-y-5">
                <p className="text-sm text-gray-600">
                  Tell us about the position
                </p>

                {profile.user_type == 3 && (
                  <div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        School Name
                      </label>

                      <input
                        type="text"
                        name="school_name"
                        value={formData.school_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 mb-6 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Board
                      </label>

                      <input
                        type="text"
                        name="board"
                        value={formData.board}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                      />

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

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Teacher",
                      "Principal",
                      "Coordinator",
                      "Vice Principal",
                    ].map((position) => (
                      <label
                        key={position}
                        className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
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
                          className={`font-regular ${
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

                {/* 👇 CONDITIONAL: Subject - Only show for Teacher */}
                {formData.position === "Teacher" && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>

                    <Select
                      options={subjects.map((s) => ({
                        value: s.id,
                        label: s.name,
                      }))}
                      value={
                        subjects.find((s) => s.id === formData.subject_id)
                          ? {
                              value: formData.subject_id,
                              label: subjects.find(
                                (s) => s.id === formData.subject_id,
                              ).name,
                            }
                          : null
                      }
                      onChange={(selected) => {
                        setFormData((prev) => ({
                          ...prev,
                          subject_id: selected.value,
                        }));
                        setErrors((prev) => ({ ...prev, subject_id: "" }));
                      }}
                      placeholder="Select subject"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />

                    {errors.subject_id && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.subject_id}
                      </p>
                    )}
                  </div>
                )}

                {/* 👇 CONDITIONAL: Grade - Only show for Teacher */}
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
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
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
                    placeholder="Search city"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />

                  {errors.city_id && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.city_id}
                    </p>
                  )}
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.jobDeatail}
                    className="w-5 h-5 text-green-600"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Job Details</h2>
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
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="min_salary"
                      value={formData.min_salary}
                      onChange={handleInputChange}
                      placeholder="₹25,000"
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                    <input
                      type="text"
                      name="max_salary"
                      value={formData.max_salary}
                      onChange={handleInputChange}
                      placeholder="₹35,000"
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>
                  {/* <p className="text-xs text-gray-500 mt-2">💡 Tip: Jobs with salary info get 3x more applications.</p> */}

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
                      <option value="5+">5+ years</option>
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
                    <label className="flex items-start p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200 grid grid-cols-1 md:grid-cols-2 items-center border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="bg-orange-50 flex items-center justify-center w-10 h-10 rounded-full">
                            <img src={postJobIcons.food} className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-gray-800">
                            Food Provided
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
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

                    <label className="flex items-start p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200 grid grid-cols-1 md:grid-cols-2 gap-3 items-center border">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 rounded-full">
                          <div className="bg-purple-100 flex items-center justify-center w-10 h-10 rounded-full">
                            <img
                              src={postJobIcons.accommodation}
                              className="w-5 h-5"
                            />
                          </div>
                          <span className="font-medium text-gray-800">
                            Accommodation
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.requirementDescription}
                    className="w-5 h-5"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
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
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <img
                    src={postJobIcons.contactInformation}
                    className="w-5 h-5"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
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
                    Contact Phone
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
            <div className="grid grid-cols-2 gap-12">
              <button
                onClick={() => navigate("/")}
                className="flex-1 px-2 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(1)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/30"
              >
                {submitting ? "Publishing..." : "Publish Job Post"}
              </button>
            </div>
          </div>

          {/* Right Column - Tips & Stats */}
          <div className="space-y-6">
            {/* Tips for Success Card */}
            <div className="bg-blue-50 rounded-3xl p-6 top-24">
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
                    Include salary for better response
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
                Why Post on Teachingclass?
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-normal text-xl text-blue-400">
                      500+
                    </div>
                    <div className="text-sm font-normal text-gray-600">
                      Active Teachers
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <img src={postJobIcons.hireTime} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-normal text-xl text-green-400">
                      7 Days
                    </div>
                    <div className="text-sm font-normal text-gray-600">
                      Avg. Time to Hire
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
    </div>
  );
};

export default PostJob;
