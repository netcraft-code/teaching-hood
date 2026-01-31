import React from "react";
import { Users, Check, Bell } from "lucide-react";
import teacherSectionLeftImage from "./../assets/images/teacher-section-left.png";
import teacherSectionRightImage from "./../assets/images/teacher-section-right.png";
import { homePageIcons } from "../assets/icons/HomePageIcons";

const TeachersSection = () => {
  const features = [
    {
      icon: (
        <img
          src={homePageIcons.teacherSimplyApply}
          className="w-5 h-5 text-blue-600 bg-blue-50"
          alt="Join Free Icon"
        />
      ),
      text: "Simply apply filters by your subject, grade, and location & hit apply.",
      bgColor: "bg-blue-50",
    },
    {
      icon: (
        <img
          src={homePageIcons.teacherStayLoop}
          className="w-5 h-5 text-yellow-500 bg-yellow-50"
          alt="Simply Apply Icon"
        />
      ),
      text: "Stay in the loop with interview feedback and application updates. We bridge the gap so you're never left waiting.",
      bgColor: "bg-red-50",
    },
    {
      icon: (
        <img
          src={homePageIcons.teacherJoinFree}
          className="w-5 h-5 text-green-500 bg-green-50"
          alt="Stay in Loop Icon"
        />
      ),
      text: "Join free community trainings, improve communication, confidence, and tech use.",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section className="py-16 md:py-24 mx-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Teacher Image 1 */}
              <div className="relative mt-12">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={teacherSectionLeftImage}
                    alt="Teacher teaching"
                    className="w-full h-[440px] object-cover"
                  />
                </div>
              </div>

              {/* Teacher Image 2 with Stats Card */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={teacherSectionRightImage}
                    alt="Female teacher"
                    className="w-full h-[440px] object-cover"
                  />
                </div>

                {/* Stats Card Overlay */}
                <div className="absolute -bottom-6 -left-0 bg-white rounded-xl shadow-2xl p-4 border-2 border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Green dot */}
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400 flex-shrink-0"></span>

                    {/* Text */}
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      Active Now
                    </span>
                  </div>

                  <div className="text-3xl font-normal text-gray-900 mb-1">
                    47
                  </div>
                  <div className="text-xs text-gray-500">Teachers Online</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full mb-6">
              <span className="text-lg text-red-600 font-bold text-[21.39px]">
                For Teachers
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-xl md:text-3xl lg:text-5xl font-semibold text-gray-900 mb-6">
              Your teaching journey starts here.
            </h2>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 ${feature.bgColor} rounded-lg shadow-sm flex items-center justify-center border border-gray-100`}
                  >
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-2 pr-2 font-normal text-[18px]">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Pro Tip Box */}
            <a
              href="/signup"
              class="bg-blue-500 hover:bg-blue-700 text-white px-8 py-4 rounded-lg
            font-sf font-bold text-[16px] whitespace-nowrap"
            >
              Create Profile
            </a>
            {/* <div className="bg-blue-50 rounded-lg p-6 w-[90%]">
              <div className="flex items-start space-x-3">
                <div>
                  <div className="text-blue-500 font-semibold text-sm mb-1">
                    💡 Pro Tip:
                  </div>
                  <p className="text-gray-700 text-sm">
                    Complete your profile to increase your chance of receiving
                    interview calls from top schools
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;
