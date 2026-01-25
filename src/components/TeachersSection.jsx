import React from 'react';
import { Users, Check, Bell } from 'lucide-react';
import teacherSectionLeftImage from './../assets/images/teacher-section-left.png'
import teacherSectionRightImage from './../assets/images/teacher-section-right.png'

const TeachersSection = () => {
  const features = [
    {
      icon: <Check className="w-5 h-5 text-blue-600 bg-blue-50" />,
      text: 'Simply apply filters by your subject, grade, and location & hit apply.',
      bgColor: 'bg-blue-50'
    },
    {
      icon: <Bell className="w-5 h-5 text-yellow-500 bg-red-50" />,
      text: 'Stay in the loop with interview feedback and application updates. We bridge the gap so you\'re never left waiting.',
      bgColor: 'bg-red-50'
    },
    {
      icon: <Users className="w-5 h-5 text-green-500 bg-green-50" />,
      text: 'Join free community trainings, improve communication, confidence, and tech use.',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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

                  <div className="text-3xl font-normal text-gray-900 mb-1">47</div>
                  <div className="text-xs text-gray-500">Teachers Online</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full mb-6">
              <span className="text-sm text-red-500 font-semibold text-[21.39px] p-2">For Teachers</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 pr-36">
              Your teaching journey starts here.
            </h2>

            {/* Features List */}
            <div className="space-y-6 mb-8 pr-36">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 ${feature.bgColor} rounded-lg shadow-sm flex items-center justify-center border border-gray-100`}>
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 leading-relaxed pt-2 font-semibold text-[16px]">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Pro Tip Box */}
            <div className="bg-blue-50 rounded-lg p-6 w-[90%]">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                </div>
                <div>
                  <div className="text-blue-500 font-semibold text-sm mb-1">Pro Tip:</div>
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

export default TeachersSection;