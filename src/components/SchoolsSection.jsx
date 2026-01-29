import React, { useState } from 'react';
import { Users, TrendingUp, Target, Award, Check, Bell, Megaphone, FileText, Sparkles, Shield, Star, ChevronDown, ChevronUp, Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

// 5. For Schools Section
const SchoolsSection = () => {
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-6">
              <span className="text-lg text-green-600 font-bold text-[21.39px]">For Schools</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              Make your life easy, simplify your hiring process.
            </h2>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-2 font-semibold text-[18px]">
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
                {/* <div>
                  <div className="text-sm text-gray-500 mb-1">Avg. Time to Hire</div>
                  <div className="text-2xl font-bold text-gray-900">7 Days</div>
                </div> */}
                <div className="flex items-center justify-between w-full">
                  {/* Left content */}
                  <div className='justify-start'>
                    <div className="text-sm font-medium text-gray-700">
                      Dashboard
                    </div>
                    <div className="text-xs text-gray-500">
                      Manage all your vacancies
                    </div>
                  </div>

                  {/* Right badge */}
                  <span className="justify-end px-4 py-2 bg-green-100 text-green-600 text-xs font-semibold rounded-lg whitespace-nowrap">
                    12 Active
                  </span>
                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-normal text-blue-600 mb-1">247</div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-3xl font-normal text-green-600 mb-1">18</div>
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

export default SchoolsSection;