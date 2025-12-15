import React, { useState } from 'react';
import { Book, MapPin } from 'lucide-react';
import { HeroImages } from "../assets/images/HeroImages";

// Hero Section Component
const HeroSection = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section
      className="relative py-12 md:py-20 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `
          url(${HeroImages.bg})
        `,
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 md:w-64 md:h-64 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 md:w-64 md:h-64 bg-cyan-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Top Left */}
      <div className="absolute top-20 left-24 w-20 h-20 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img
          src={HeroImages.leftTop}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* Top Right */}
      <div className="absolute top-32 right-4 w-24 h-24 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img
          src={HeroImages.rightTop}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* Bottom Left */}
      <div className="absolute bottom-20 left-8 w-24 h-24 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img
          src={HeroImages.rightBottom}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-10 right-24 w-20 h-20 rounded-full overflow-hidden shadow-lg hidden lg:block">
        <img
          src={HeroImages.rightBottom}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
            <span className="text-blue-600">✨</span>
            <span className="text-sm text-gray-600">Connecting educators with opportunities</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-white font-bold">Hiring</span>{' '}
            <span className="text-white">Simplified</span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12">
            Find your next job by simply entering Subject, Grade and Location below
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-xl p-2 md:p-4 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-1 md:gap-2">
              {/* Subject Input */}
              <div className="flex-1 relative">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Subject (e.g., Mathematics)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Grade Input */}
              <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Location Input */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Location (e.g., Delhi)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Search Button */}
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold whitespace-nowrap">
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