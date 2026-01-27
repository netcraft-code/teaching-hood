import React, { useState } from 'react';
import { ChevronDown, Home, User, FileText, HelpCircle, Users, Briefcase, Calendar } from 'lucide-react';

const PostJob = () => {
  const isLoggedIn = !!localStorage.getItem("auth_token");

  if (!isLoggedIn) {
    window.location.href = '/signin';
  }

  const [formData, setFormData] = useState({
    subject: [],
    grade: [],
    location: [],
    jobType: [],
    subjectCategory: '',
    gradeLevel: '',
    salaryMin: '',
    salaryMax: '',
    experienceRequired: '',
    jobDescription: '',
    qualifications: '',
    applicationDeadline: '',
    benefitsFoodProvided: false,
    benefitsAccommodation: false,
    contactEmail: '',
    contactPhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Post a Job
            </h1>
          </div>
          <div className="flex space-x-2 sm:space-x-3">
            <button className="px-4 py-2 text-sm sm:text-base text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium">
              Save Draft
            </button>
            <button 
              onClick={handleSubmit}
              className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/30 text-sm sm:text-base"
            >
              Publish
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
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
              </div>
              
              <div className="space-y-5">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., English / Hindi"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Grade */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grade <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      placeholder="e.g., 1-2 (1st)"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Greater Noida"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Job Type - Tabs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Full-Time', 'Part-Time', 'Contract'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFormData(prev => ({ ...prev, jobType: type }))}
                        className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                          formData.jobType === type
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Job Details Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Job Details</h2>
              </div>
              
              <div className="space-y-5">
                <p className="text-sm text-gray-600">Collect job details information</p>

                {/* Subject/Department */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject/Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="subjectCategory"
                      value={formData.subjectCategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none"
                    >
                      <option value="">Select subject</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="math">Mathematics</option>
                      <option value="science">Science</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Grade Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Grade Level <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none"
                    >
                      <option value="">Select grade level</option>
                      <option value="1-2">Grade 1-2</option>
                      <option value="3-5">Grade 3-5</option>
                      <option value="6-8">Grade 6-8</option>
                      <option value="9-10">Grade 9-10</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Salary Range (yearly) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      placeholder="e.g., ₹25,000 - ₹45,000"
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                    <input
                      type="text"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      placeholder="Max"
                      className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Tip: We usually charge 10% on candidates.</p>
                </div>

                {/* Experience Required */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience Required <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="experienceRequired"
                      value={formData.experienceRequired}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Benefits/Perks/Accommodation
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          name="benefitsFoodProvided"
                          checked={formData.benefitsFoodProvided}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Home className="w-5 h-5 text-orange-500" />
                          <span className="font-medium text-gray-800">Food Provided</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Fresh breakfast & lunch</p>
                      </div>
                    </label>

                    <label className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          name="benefitsAccommodation"
                          checked={formData.benefitsAccommodation}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Home className="w-5 h-5 text-purple-500" />
                          <span className="font-medium text-gray-800">Accommodation</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">On-site or nearby housing</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements & Description Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Requirements & Description</h2>
              </div>
              
              <div className="space-y-5">
                <p className="text-sm text-gray-600">Explain the requirements for the job</p>

                {/* Job Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe the role, responsibilities, and your needs for this opportunity (e.g., ..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  />
                </div>

                {/* Qualifications & Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Qualifications & Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="List required qualifications, skills, certificates, and any conditions (e.g., B.Ed, ..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
                  />
                </div>

                {/* Application Deadline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleInputChange}
                    placeholder="dd/dd/yyyy"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sm:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Contact Information</h2>
              </div>
              
              <div className="space-y-5">
                <p className="text-sm text-gray-600">Help candidates contact you</p>

                {/* Contact Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="info@school.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                </div>

                {/* Contact Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+91 (12345) 67890"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile */}
            <div className="lg:hidden flex space-x-3">
              <button className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-medium">
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-blue-500/30"
              >
                Publish Job Post
              </button>
            </div>
          </div>

          {/* Right Column - Tips & Stats */}
          <div className="space-y-6">
            {/* Tips for Success Card */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white sticky top-24">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Tips for Success</h3>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  <p className="text-white/90">Be specific about requirements</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  <p className="text-white/90">Include salary/CTCB (optional)</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  <p className="text-white/90">Highlight school culture & benefits</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  <p className="text-white/90">Use clear, professional language</p>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Need Help?</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                Our team is here to help you find the perfect candidate
              </p>
              
              <button className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium shadow-lg shadow-pink-500/30">
                Contact Support
              </button>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Why Post on Teachingclass?</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-gray-800">5,000+</div>
                    <div className="text-sm text-gray-600">Active Teachers</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-gray-800">1,200+</div>
                    <div className="text-sm text-gray-600">Schools Trust Us</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-2xl text-gray-800">7 Days</div>
                    <div className="text-sm text-gray-600">Avg. Time to Hire</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;