import React from "react";
import { Users } from "lucide-react";
import { HomeImages } from "../assets/images/HomeImages";
import { homePageIcons } from "../assets/icons/HomePageIcons";

const OurMissionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto px-4 px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              {/* Indicator */}
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full border-2 border-blue-500"></div>
                </div>
              </div>

              {/* Text */}
              <span className="font-sf text-sm font-medium text-blue-600">
                Our Mission
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-gray-900 font-sf font-semibold text-[48px] leading-[65px] mb-6">
              Transforming education hiring in India
            </h2>

            {/* Description */}
            <p className="font-sf font-normal text-[18px] leading-[29.25px] text-[#4A5565] mb-8 md:mb-12">
              We are on a mission to transform school Teacher / Principal hiring
              in India. We connect passionate candidates with the right schools
              while empowering them through training, upskilling, and community
              support.
              <br />
              Whether you're a teacher/principal looking for a career move or a
              school/recruiter in search of skilled educators, Teachinghood has
              got you covered.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-sf font-normal text-[30px] leading-[36px] text-orange-600 mb-2">
                  6000+
                </div>
                <div className="font-sf font-normal text-[14px] leading-[20px] text-gray-900">
                  Jobs Posted
                </div>
              </div>
              <div>
                <div className="font-sf font-normal text-[30px] leading-[36px] text-green-600 mb-2">
                  200+
                </div>
                <div className="font-sf font-normal text-[14px] leading-[20px] text-gray-900">
                  Partner Schools
                </div>
              </div>
              <div>
                <div className="font-sf font-normal text-[30px] leading-[36px] text-blue-600 mb-2">
                  500+
                </div>
                <div className="font-sf font-normal text-[14px] leading-[20px] text-gray-900">
                  Active Teachers
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Main Image */}
            <div className="relative w-full lg:w-[95%]">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={HomeImages.ourMission}
                  alt="Teacher in classroom"
                  className="w-full h-[400px] md:h-[550px] object-cover"
                />
              </div>

              {/* Community Badge */}
              <div className="absolute bottom-1 -left-2 md:-left-6 transform -translate-y-1/2 -translate-x-1/4 bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3 z-10">
                <div
                  className={`flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg shadow-sm flex items-center justify-center border border-gray-100`}
                >
                  <img
                    src={homePageIcons.teacherJoinFree}
                    className="w-5 h-5 text-green-500"
                    alt="Stay in Loop Icon"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-medium text-gray-600">
                    Community
                  </span>
                  <span className="font-normal text-sm md:text-lg text-gray-900">
                    Growing Daily
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMissionSection;
