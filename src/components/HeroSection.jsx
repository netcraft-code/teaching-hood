import React, { useState } from 'react';
import { Book, MapPin } from 'lucide-react';
import { HeroImages } from "../assets/images/HeroImages";

const HeroSection = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section
      className="relative py-20 md:py-28 lg:py-36 min-h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImages.bg})` }}
    >
      {/* Decorative Images */}
      <div className="absolute top-24 left-24 w-24 h-24 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img src={HeroImages.leftTop} className="w-full h-full object-cover object-center" alt="" />
      </div>
      <div className="absolute top-20 right-12 w-32 h-32 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img src={HeroImages.rightTop} className="w-full h-full object-cover object-center" alt="" />
      </div>
      <div className="absolute bottom-28 left-8 w-32 h-32 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img src={HeroImages.leftBottom} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute bottom-24 right-24 w-20 h-20 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img src={HeroImages.rightBottom} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge / Connecting educators */}
          <div className="inline-flex items-center justify-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm mb-6">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-[14px] font-normal leading-[20px] text-center text-[#364153] font-sf">
              Connecting educators with opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-4 flex justify-center items-center gap-4">
            <span className="text-white font-sf font-extrabold italic text-[90px] leading-[1] tracking-[0]">
              Hiring
            </span>
            <span className="text-white font-sf font-medium text-[48px] sm:text-[64px] md:text-[80px] lg:text-[90px] leading-[1] tracking-[0]">
              Simplified
            </span>
          </h1>


          {/* Subheading */}
          <p className="text-[20px] font-medium font-sf leading-[28px] text-center text-[#404145] mb-8 md:mb-12">
            Find your next teaching job by simply entering Subject, Grade and Location below
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-2 md:p-3 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Subject Input */}
              <div className="flex-1 relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717182]" size={20} />
                <input
                  type="text"
                  placeholder="Subject (e.g., Mathematics)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg font-sf text-[14px] font-normal leading-[100%] tracking-[0] text-[#717182] bg-[#F5F6F7] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Grade Input */}
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717182]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Grade (e.g., Primary)"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg font-sf text-[14px] font-normal leading-[100%] tracking-[0] text-[#717182] bg-[#F5F6F7] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#717182]" size={20} />
                <input
                  type="text"
                  placeholder="Location (e.g., Delhi)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg font-sf text-[14px] font-normal leading-[100%] tracking-[0] text-[#717182] bg-[#F5F6F7] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Search Button */}
              <button className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-sf font-bold text-[16px] leading-[24px] tracking-[0] text-center align-middle whitespace-nowrap">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
