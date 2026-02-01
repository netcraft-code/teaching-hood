import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { getMaxCitiesJobs } from "../api/auth";

const QuickLinksSection = () => {
  const [quickLinks, setQuickLinks] = useState([]);

  useEffect(() => {
      const fetchJobsList = async () => {
        try {
          const res = await getMaxCitiesJobs();
          setQuickLinks(res.data.data);
        } catch (err) {
        }
      };
  
      fetchJobsList();
    }, []);
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Heading Section */}
      <div className="text-center mb-4">
        <h1 className="font-semibold text-[48px] leading-[65px] tracking-[0px] text-gray-900 mb-2">
          Opportunities handpicked for you
        </h1>

        <p className="font-normal text-[18px] leading-[29.25px] tracking-[0px] text-gray-600">
          Discover the most in-demand teaching and school leadership roles curated specially for you.
        </p>
        <p className="font-normal text-[18px] leading-[29.25px] tracking-[0px] text-gray-600">
          Find the position that matches your skills, passion, and experience.
        </p>
      </div>

      <p className="font-medium flex justify-center text-[20px] leading-[29.25px] tracking-[0px] text-red-500 mb-12">
        Quick Links
      </p>

      {/* Quick Links Section */}
      <div className="flex flex-wrap justify-center -mx-3 md:gap-6">
        {quickLinks.map((link, index) => (
          <div key={index} className="w-1/2 md:w-[200px]">
            <button
              className={`
                w-full p-6 rounded-lg font-medium text-lg
                bg-white text-gray-800 border border-gray-200
                text-center transition-all duration-200
                hover:border-blue-400 hover:shadow-sm hover:bg-blue-600 hover:text-white whitespace-nowrap
              `}
            >
              {link.city_name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinksSection;
