import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { getMaxCitiesJobs } from "../api/auth";

const QuickLinksSection = () => {
  // const [quickLinks, setQuickLinks] = useState([]);

  const quickLinks = [
    {
      title: 'Uttar Pradesh Jobs'
    }, {
      title: 'Maharashtra Jobs'
    }, {
      title: 'TGT Jobs'
    }, {
      title: 'PGT Jobs'
    }, {
      title: 'PRT Jobs'
    }, {
      title: 'NTT Jobs'
    }, {
      title: 'Haryana Jobs'
    }];

  useEffect(() => {
      const fetchJobsList = async () => {
        try {
          const res = await getMaxCitiesJobs();
          console.log(res.data.data);
        } catch (err) {
        }
      };
  
      fetchJobsList();
    }, []);
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Heading Section */}
      <div className="text-center mb-8">
        <h1 className="font-sf font-semibold text-[48px] leading-[65px] tracking-[0px] text-gray-900 mb-2">
          Opportunities handpicked for you
        </h1>

        <p className="font-sf font-normal text-[18px] leading-[29.25px] tracking-[0px] text-gray-600">
          Discover the most in-demand teaching and school leadership roles curated specially for you.
        </p>
        <p className="font-sf font-normal text-[18px] leading-[29.25px] tracking-[0px] text-gray-600">
          Find the position that matches your skills, passion, and experience.
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="mb-6">
        <h2 className="flex items-center justify-center font-sf font-semibold text-[22px] text-red-500 mb-4">Quick Links</h2>
        
        {/* Buttons Container */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {/* Buttons Grid */}
          <div className="flex flex-wrap gap-6 justify-center flex-1">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                className={`
                  px-8 py-6 rounded-lg font-medium text-lg
                  transition-all duration-200 
                  min-w-[200px] text-center
                  bg-white text-gray-800 border border-gray-200 hover:border-blue-400 hover:shadow-sm hover:bg-blue-600 hover:text-white
                `}
              >
                {link.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksSection;
