import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getMaxCitiesJobs,
  getMaxSubjectsJobs,
  getMaxGradeJobs,
} from "../api/auth";

const QuickLinksSection = () => {
  const [citiesQuickLinks, setCitiesQuickLinks] = useState([]);
  const [subjectsQuickLinks, setSubjectsQuickLinks] = useState([]);
  const [gradesQuickLinks, setGradesQuickLinks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsList = async () => {
      try {
        const res = await getMaxCitiesJobs();
        setCitiesQuickLinks(res.data.data);
      } catch (err) {}
    };

    fetchJobsList();
  }, []);

  useEffect(() => {
    const fetchJobsList = async () => {
      try {
        const res = await getMaxSubjectsJobs();
        setSubjectsQuickLinks(res.data.data);
      } catch (err) {}
    };

    fetchJobsList();
  }, []);

  useEffect(() => {
    const fetchJobsList = async () => {
      try {
        const res = await getMaxGradeJobs();
        setGradesQuickLinks(res.data.data);
      } catch (err) {}
    };

    fetchJobsList();
  }, []);

  const isLoggedIn = !!localStorage.getItem("auth_token");

  const goTo = (path) => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate(path);
    }
    // setIsMenuOpen(false);
  };

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Heading Section */}
      <div className="text-center mb-4">
        <h1 className="font-semibold text-[48px] leading-[65px] tracking-[0px] text-gray-900 mb-2">
          Opportunities handpicked for you
        </h1>

        <p className="font-normal text-[18px] leading-[29.25px] tracking-[0px] text-gray-600">
          Discover the most in-demand teaching and school leadership roles
          curated specially for you.
        </p>
        <p className="font-normal text-[18px] leading-[29.25px] tracking-[0px] text-gray-600">
          Find the position that matches your skills, passion, and experience.
        </p>
      </div>

      <p className="font-medium flex justify-center text-[28px] leading-[29.25px] tracking-[0px] text-blue-500 mb-5 mt-10">
        Quick Links
      </p>

      {/* Quick Links Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="overflow-x-auto">
          <div
            className="
            grid grid-rows-1 grid-flow-col
            lg:auto-cols-[320px]
            auto-cols-[200px]
            gap-6
            w-max
          "
          >
            {citiesQuickLinks.map((link, index) => {
              const isActive = link.active;

              return (
                <button
                  onClick={() => goTo(`/find-job?state_id=${link.state_id}`)}
                  key={index}
                  className={`
                  h-[90px]
                  flex items-center justify-center
                  rounded-xl border text-xl font-semibold
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-900 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }
                `}
                >
                  {link.state_name} Jobs
                </button>
              );
            })}
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <div
            className="
            grid grid-rows-1 grid-flow-col
            lg:auto-cols-[320px]
            auto-cols-[200px]
            gap-6
            w-max
          "
          >
            {subjectsQuickLinks.map((link, index) => {
              const isActive = link.active;

              return (
                <button
                  onClick={() => goTo(`/find-job?subject=${link.subject_id}`)}
                  key={index}
                  className={`
                    h-[90px]
                    flex items-center justify-center
                    rounded-xl border text-xl font-semibold
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-gray-900 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >
                  {link.subject_name} Jobs
                </button>
              );
            })}
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <div
            className="
            grid grid-rows-1 grid-flow-col
            lg:auto-cols-[320px]
            auto-cols-[200px]
            gap-6
            w-max
          "
          >
            {gradesQuickLinks.map((link, index) => {
              const isActive = link.active;

              return (
                <button
                  onClick={() => goTo(`/find-job?grade=${link.grade_id}`)}
                  key={index}
                  className={`
                    h-[90px]
                    flex items-center justify-center
                    rounded-xl border text-xl font-semibold
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-gray-900 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }
                  `}
                >
                  {link.grade_name} Jobs
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksSection;
