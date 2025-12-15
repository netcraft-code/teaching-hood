import React, { useState } from 'react';
import { Users, TrendingUp, Target, Award, Check, Bell, Megaphone, FileText, Sparkles, Shield, Star, ChevronDown, ChevronUp, Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

// 1. Our Mission Section
const OurMissionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-blue-600 font-medium">Our Mission</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transforming education hiring in India
            </h2>

            {/* Description */}
            <div className="space-y-4 text-gray-600 mb-8">
              <p className="text-lg leading-relaxed">
                We are on a mission to transform school Teacher / Principal hiring in India. We connect passionate candidates with the right schools while empowering them through training, upskilling, and community support.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you're a teacher/principal looking for a career move or a school/ recruiter in search of skilled educators, Teachinghood has got you covered.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Active Teachers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">200+</div>
                <div className="text-sm text-gray-600">Partner Schools</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">4000+</div>
                <div className="text-sm text-gray-600">Jobs Posted</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop" 
                alt="Teacher in classroom"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              
              {/* Success Rate Badge */}
              <div className="absolute top-6 right-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="text-yellow-500" size={20} />
                  <span className="text-xs text-gray-600 font-medium">Success Rate</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">95%</div>
              </div>

              {/* Community Badge */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="text-green-500" size={20} />
                  <span className="text-xs text-gray-600 font-medium">Community</span>
                </div>
                <div className="text-lg font-bold text-gray-900">Growing Daily</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 bg-green-100 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. Quick Links Section (Opportunities)
const QuickLinksSection = () => {
  const quickLinks = [
    { title: 'Uttar Pradesh Jobs', highlighted: true },
    { title: 'Maharashtra Jobs', highlighted: false },
    { title: 'TGT Jobs', highlighted: false },
    { title: 'PGT Jobs', highlighted: false },
    { title: 'PRT Jobs', highlighted: false },
    { title: 'NTT Jobs', highlighted: false },
    { title: 'Haryana Jobs', highlighted: false },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Opportunities handpicked for you
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            Discover the most in-demand teaching and school leadership roles curated specially for you.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the position that matches your skills, passion, and experience.
          </p>
          <div className="mt-6">
            <span className="text-red-500 font-semibold text-lg">Quick Links</span>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {quickLinks.slice(0, 2).map((link, index) => (
              <button
                key={index}
                className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
                  link.highlighted
                    ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
                    : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-600 hover:shadow-md'
                }`}
              >
                {link.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {quickLinks.slice(2, 5).map((link, index) => (
              <button
                key={index}
                className="py-4 px-6 bg-white rounded-xl font-semibold text-lg text-gray-900 border-2 border-gray-200 hover:border-blue-600 hover:shadow-md transition-all"
              >
                {link.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {quickLinks.slice(5, 7).map((link, index) => (
              <button
                key={index}
                className="py-4 px-6 bg-white rounded-xl font-semibold text-lg text-gray-900 border-2 border-gray-200 hover:border-blue-600 hover:shadow-md transition-all"
              >
                {link.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. Tired of Posting Section
const TiredOfPostingSection = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-red-500" />,
      title: 'Better Reach',
      description: 'Access thousands of verified educators'
    },
    {
      icon: <Award className="w-8 h-8 text-red-500" />,
      title: 'Better Candidates',
      description: 'Pre-screened and qualified teachers'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
      title: 'Better Outcomes',
      description: 'Hire 3x faster than traditional methods'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Tired of posting jobs on Facebook groups without results?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting the best teachers is now easier and faster with Teachinghood's free plan
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white border-2 border-gray-100 rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Subject Dropdown */}
            <div className="flex-1">
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option>Subject (e.g., Mathematics)</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Social Studies</option>
                </select>
              </div>
            </div>

            {/* Grade Dropdown */}
            <div className="flex-1">
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option>Grade (e.g., Primary)</option>
                  <option>Primary (1-5)</option>
                  <option>Middle (6-8)</option>
                  <option>Secondary (9-10)</option>
                  <option>Senior Secondary (11-12)</option>
                </select>
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="flex-1">
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white">
                  <option>Location (e.g., Delhi)</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                  <option>Kolkata</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap">
              Search Profiles
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 4. For Teachers Section
const ForTeachersSection = () => {
  const features = [
    {
      icon: <Check className="w-5 h-5 text-blue-600" />,
      text: 'Simply apply filters by your subject, grade, and location & hit apply.'
    },
    {
      icon: <Bell className="w-5 h-5 text-yellow-500" />,
      text: 'Stay in the loop with interview feedback and application updates. We bridge the gap so you\'re never left waiting.'
    },
    {
      icon: <Users className="w-5 h-5 text-green-500" />,
      text: 'Join free community trainings, improve communication, confidence, and tech use.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Teacher Image 1 */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=500&fit=crop" 
                    alt="Teacher teaching"
                    className="w-full h-[320px] object-cover"
                  />
                </div>
              </div>

              {/* Teacher Image 2 with Stats Card */}
              <div className="relative mt-8">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" 
                    alt="Female teacher"
                    className="w-full h-[320px] object-cover"
                  />
                </div>

                {/* Stats Card Overlay */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-4 border-2 border-gray-100">
                  <div className="text-xs text-gray-600 mb-1">Active Now</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">47</div>
                  <div className="text-xs text-gray-500">Teachers Online</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-blue-600 font-semibold">For Teachers</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your teaching journey starts here.
            </h2>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-100">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-2">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Pro Tip Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                </div>
                <div>
                  <div className="text-blue-600 font-semibold text-sm mb-1">Pro Tip:</div>
                  <p className="text-gray-700 text-sm">
                    Complete your profile to get 3x more interview calls from top schools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. For Schools Section
const ForSchoolsSection = () => {
  const features = [
    {
      icon: <Megaphone className="w-6 h-6 text-red-500" />,
      text: 'Post unlimited teaching vacancies and reach hundreds of active job-seeking teachers.'
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      text: 'Get free access to candidate pool and contact matching profiles.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-yellow-500" />,
      text: 'Find the right fit faster with smart filtering and easy onboarding.'
    }
  ];

  const recentApplications = [
    { name: 'Priya Sharma', role: 'Math Teacher', status: 'New', statusColor: 'bg-blue-100 text-blue-600', avatar: 'P' },
    { name: 'Rahul Verma', role: 'Science Teacher', status: 'Screening', statusColor: 'bg-yellow-100 text-yellow-600', avatar: 'R' },
    { name: 'Anjali Patel', role: 'English Teacher', status: 'Shortlisted', statusColor: 'bg-green-100 text-green-600', avatar: 'A' }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-green-600 font-semibold">For Schools</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Make your life easy, simplify your hiring process.
            </h2>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-3">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Avg. Time to Hire</div>
                  <div className="text-2xl font-bold text-gray-900">7 Days</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Dashboard</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Manage all your vacancies</span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                      12 Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600 mb-1">247</div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">18</div>
                  <div className="text-sm text-gray-600">Shortlisted</div>
                </div>
              </div>

              {/* Recent Applications */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-3">Recent Applications</div>
                <div className="space-y-3">
                  {recentApplications.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                          {app.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{app.name}</div>
                          <div className="text-xs text-gray-500">{app.role}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.statusColor}`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -top-4 -right-4 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 6. For Recruiters Section
const ForRecruitersSection = () => {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-green-500" />,
      text: 'Now promote vacancies for your partner schools and reach relevant candidates more effectively.'
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      text: 'Teachinghood understands what teachers want and what schools need.'
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      text: 'Build trust with both schools and teachers, while we take care of your hiring needs.'
    }
  ];

  const stats = [
    { value: '50+', label: 'Partner Schools', color: 'text-blue-600' },
    { value: '95%', label: 'Satisfaction', color: 'text-green-600' },
    { value: '24/7', label: 'Support', color: 'text-orange-600' }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image with Stats */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" 
                alt="Recruiter meeting"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />

              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow-xl p-4">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-yellow-100 rounded-full opacity-50"></div>
            <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-orange-100 rounded-full opacity-50"></div>
          </div>

          {/* Right Side - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-yellow-700 font-semibold">For Recruiters</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Speed up hiring for your partner schools
            </h2>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-3">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Partner CTA Box */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Become a Partner</h3>
              <p className="text-gray-700 mb-4">
                Get premium access to advanced analytics, dedicated support, and priority candidate matching.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center space-x-2">
                <span>Learn More</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. Testimonials Section - Loved by Teachers
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Teachinghood helped me find the perfect role in less than two weeks.",
      name: "Ritu B.",
      role: "English Teacher",
      avatar: "R",
      color: "bg-blue-500",
      borderColor: "border-blue-400"
    },
    {
      quote: "We filled multiple vacancies quickly. The candidate quality is unmatched.",
      name: "Sandeep M.",
      role: "Principal",
      avatar: "S",
      color: "bg-green-500",
      borderColor: "border-green-400"
    },
    {
      quote: "The free trainings boosted my confidence. Very smooth experience.",
      name: "Anjali P.",
      role: "Primary Teacher",
      avatar: "A",
      color: "bg-yellow-500",
      borderColor: "border-yellow-400"
    },
    {
      quote: "Shortlisting candidates is now faster and far more effective.",
      name: "Rajesh T.",
      role: "HR Manager",
      avatar: "R",
      color: "bg-red-500",
      borderColor: "border-red-400"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-yellow-700 font-semibold">Testimonials</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by teachers and schools alike
          </h2>
          <p className="text-lg text-gray-600">
            See what our community has to say
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 ${testimonial.borderColor}`}
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg className={`w-10 h-10 ${testimonial.color.replace('bg-', 'text-')} opacity-20`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Stars */}
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 8. FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is Teachinghood free for teachers?",
      answer: "Yes! Teachinghood is completely free for teachers. You can create your profile, browse jobs, and apply to positions without any charges. We believe in empowering educators and making quality opportunities accessible to all."
    },
    {
      question: "Can schools track applications?",
      answer: "Absolutely! Schools get a comprehensive dashboard to track all applications, view candidate profiles, manage interview schedules, and communicate with applicants. You can filter candidates, shortlist profiles, and monitor the entire hiring pipeline in real-time."
    },
    {
      question: "What makes Teachinghood different?",
      answer: "Teachinghood is built specifically for the education sector in India. We pre-screen candidates, provide free training for teachers, offer smart matching algorithms, and maintain quality through community feedback. Unlike general job portals, we understand the unique needs of schools and educators."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is simple! For teachers: Sign up, complete your profile with qualifications and experience, and start applying to jobs. For schools: Register your institution, post job vacancies with detailed requirements, and start receiving applications. Our team is here to help you through the process."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-600 font-semibold">FAQ</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Teachinghood
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions Box */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center border-2 border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get the answers you need.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// 9. Contact Us Section
const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full mb-6">
            <MessageCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-semibold">Get in Touch</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form and Info */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div className="font-semibold text-gray-900">support@teachinghood.com</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <div className="font-semibold text-gray-900">+91-9923803204</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Location</div>
                    <div className="font-semibold text-gray-900">Gurgaon, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Box */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Quick Response</h4>
                  <p className="text-sm text-gray-600">
                    We typically respond within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 10. CTA Section - Start Hiring
const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-sm text-white font-semibold">Join 500+ educators today</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Start hiring smarter or find your next teaching opportunity today.
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join the fastest-growing education hiring platform in India. It's time to make better connections.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
              Get Started
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition font-semibold text-lg backdrop-blur-sm">
              Post A Job
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-sm">4.8/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <span className="text-sm">500+ Active Teachers</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <span className="text-sm">Trusted by 200+ Schools</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Demo Component - All 3 Sections Together
const AllNewSections = () => {
  return (
    <div>
      <OurMissionSection />
      <QuickLinksSection />
      <TiredOfPostingSection />
      <ForTeachersSection />
      <ForSchoolsSection />
      <ForRecruitersSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactUsSection />
      <CTASection />
    </div>
  );
};

export default AllNewSections;