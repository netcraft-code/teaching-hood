import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  Target,
  Award,
  Check,
  Bell,
  Megaphone,
  FileText,
  Sparkles,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import trecruiterSectionLeftImage from "./../assets/images/recruiter-section-left.png";
import { homePageIcons } from "../assets/icons/HomePageIcons";

// 6. For Recruiters Section
const RecruitersSection = () => {
  const features = [
    {
      icon: (
        <img
          src={homePageIcons.recruiterNowPromote}
          className="w-6 h-6 text-green-500"
          alt="Promote Icon"
        />
      ),
      text: "Now promote vacancies for your partner schools and reach relevant candidates more effectively.",
      bgColor: "bg-green-50",
    },
    {
      icon: (
        <img
          src={homePageIcons.recruiterUnderstood}
          className="w-6 h-6 text-blue-500"
          alt="Understood Icon"
        />
      ),
      text: "Teachinghood understands what teachers want and what schools need.",
      bgColor: "bg-blue-50",
    },
    {
      icon: (
        <img
          src={homePageIcons.recruiterBuildTrust}
          className="w-6 h-6 text-red-500"
          alt="Build Trust Icon"
        />
      ),
      text: "Build trust with both schools and teachers, while we take care of your hiring needs.",
      bgColor: "bg-red-50",
    },
  ];

  const stats = [
    { value: "50+", label: "Partner Schools", color: "text-blue-600" },
  ];

  return (
    <section className="py-16 md:py-24 mx-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image with Stats */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={trecruiterSectionLeftImage}
                alt="Recruiter meeting"
                className="w-full object-cover h-[400px] sm:h-[500px] md:h-[640px]"
              />

              {/* Stats Overlay */}
              <div
                className="absolute left-1/2 bottom-8 md:bottom-16 transform -translate-x-1/2 translate-y-1/2 
                              bg-white rounded-xl shadow-xl p-3 sm:p-4 flex items-center justify-center"
              >
                <div className="grid grid-cols-1 gap-3 text-center">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center"
                    >
                      <div
                        className={`text-lg sm:text-xl md:text-2xl font-normal ${stat.color} mb-1`}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full mb-6">
              <span className="text-lg text-yellow-400 font-semibold text-[21.39px]">
                For Recruiters
              </span>
            </div>

            <a
              href="/signup"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 ml-4 font-bold bg-blue-500 text-white"
            >
              Post a Job
            </a>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
              Speed up hiring for your partner schools
            </h2>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 ${feature.bgColor} rounded-xl shadow-sm flex items-center justify-center border border-gray-100`}
                  >
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-2 font-semibold text-[18px]">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Partner CTA Box */}
            {/* <div className="bg-[linear-gradient(135deg,#FEFCE8_0%,#F0FDF4_100%)] border-2 border-yellow-100 rounded-2xl p-6">
              <h3 className="text-xl font-normal text-gray-900 mb-3">
                Become a Partner
              </h3>
              <p className="text-gray-700 mb-4">
                Get premium access to advanced analytics, dedicated support, and
                priority candidate matching.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center space-x-2">
                <span>Learn More</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitersSection;
