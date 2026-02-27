import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HeroImages } from "../assets/images/HeroImages";
import { homePageIcons } from "../assets/icons/HomePageIcons";
import { getCities, getGradeLevels, getSubjects } from "../api/auth";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import Select from "react-select";

const HeroSection = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [cities, setCities] = useState([]);

  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  const [open, setOpen] = useState({
    subject: false,
    grade: false,
    location: false,
  });

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const fetchDropdowns = async () => {
    try {
      const [subjectsRes, gradesRes, citiesRes] = await Promise.all([
        getSubjects(),
        getGradeLevels(),
        getCities(),
      ]);

      setSubjects(subjectsRes?.data?.data || []);
      setGrades(gradesRes?.data?.data || []);
      setCities(citiesRes?.data?.data || []);
    } catch (error) {
      console.error("Dropdown API error", error);
    }
  };

  const handleSearch = () => {
    navigate(
      `/find-job?subject=${subject}&grade=${grade}&city=${location.value}`,
    );
  };

  const loadCities = async (inputValue) => {
    try {
      const res = await getCities({
        search: inputValue,
        limit: 20,
      });

      return (
        res?.data?.data?.map((city) => ({
          value: city.id,
          label: city.name,
        })) || []
      );
    } catch (error) {
      console.error("City API error", error);
      return [];
    }
  };

  return (
    <>
      <section
        className="w-full bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${HeroImages.bg})` }}
      >
        <div
          className="
            relative
            py-20 md:py-28 lg:py-36
            min-h-[20vh]
            max-w-7xl mx-auto
            px-4 sm:px-6 lg:px-8
          "
        >
          {/* Decorative Images - Better positioning */}
          <div className="absolute top-24 left-8 xl:left-24 w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-lg hidden lg:block">
            <img
              src={HeroImages.leftTop}
              className="w-full h-full object-cover object-center"
              alt=""
            />
          </div>
          <div className="absolute top-20 right-8 xl:right-12 w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg hidden lg:block">
            <img
              src={HeroImages.rightTop}
              className="w-full h-full object-cover object-center"
              alt=""
            />
          </div>
          <div className="absolute bottom-28 left-4 xl:left-8 w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg hidden lg:block">
            <img
              src={HeroImages.leftBottom}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="absolute bottom-24 right-8 xl:right-[5rem] w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-lg hidden lg:block">
            <img
              src={HeroImages.rightBottom}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          {/* Main Content - Proper container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge / Connecting educators */}
              <div className="inline-flex items-center justify-center space-x-2 bg-white px-3 py-2 rounded-full shadow-sm mb-6">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-[14px] font-normal leading-[20px] text-center text-[#364153] font-sf">
                  Connecting educators with opportunities
                </span>
              </div>

              {/* Main Heading - Better shadow & responsive */}
              <h1 className="mb-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <span
                  className="text-white font-extrabold italic text-[50px] sm:text-[70px] md:text-[80px] lg:text-[90px] leading-[1] tracking-[0]"
                  style={{
                    textShadow: `
                      3px 2px 3px rgba(0, 0, 0, 0.10),
                      3px 3px 3px rgba(0, 0, 0, 0.10),
                      3px 4px 4px rgba(0, 0, 0, 0.10),
                      3px 4px 4px rgba(0, 0, 0, 0.10)
                    `,
                  }}
                >
                  Hiring
                </span>
                <span
                  className="text-white font-normal text-[48px] sm:text-[60px] md:text-[70px] lg:text-[90px] leading-[1] tracking-[0]"
                  style={{
                    textShadow: `
                      3px 2px 3px rgba(0, 0, 0, 0.10),
                      3px 3px 3px rgba(0, 0, 0, 0.10),
                      3px 4px 4px rgba(0, 0, 0, 0.10),
                      3px 4px 4px rgba(0, 0, 0, 0.10)
                    `,
                  }}
                >
                  Simplified
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-[16px] sm:text-[18px] md:text-[20px] font-medium font-sf leading-[28px] text-center text-[#404145] mb-8 md:mb-12 px-4">
                Find your next teaching job by simply entering Subject, Grade
                and Location below
              </p>

              {/* Search Form - Better responsive */}
              <div className="bg-white rounded-2xl shadow-xl p-2 md:p-3 w-full">
                <div className="flex flex-col md:flex-row gap-2">
                  {/* Subject */}
                  <div className="flex-1 relative">
                    {/* Left Icon */}
                    <img
                      src={homePageIcons.subjectIcon}
                      alt="subject"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-20 pointer-events-none"
                    />

                    <Select
                      options={subjects.map((s) => ({
                        value: s.id,
                        label: s.name,
                      }))}
                      value={subjects
                        .map((s) => ({ value: s.id, label: s.name }))
                        .find((option) => option.value === subject)}
                      onChange={(option) => setSubject(option.value)}
                      placeholder="Subject (e.g., Math)"
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),

                        control: (base) => ({
                          ...base,
                          minHeight: "52px",
                          backgroundColor: "#F5F6F7",
                          borderRadius: "8px",
                          paddingLeft: "40px", // 🔥 icon ke liye space
                          border: "1px solid #e5e7eb",
                        }),

                        input: (base) => ({
                          ...base,
                          color: "#111827",
                          textAlign: "left",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#6b7280",
                          textAlign: "left",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#9ca3af",
                          textAlign: "left",
                        }),
                      }}
                    />
                  </div>

                  {/* Grade */}
                  <div className="flex-1 relative">
                    {/* Left Icon */}
                    <img
                      src={homePageIcons.gradeIcon}
                      alt="grade"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-20 pointer-events-none"
                    />

                    <Select
                      options={grades.map((g) => ({
                        value: g.id,
                        label: g.name,
                      }))}
                      value={grades
                        .map((g) => ({ value: g.id, label: g.name }))
                        .find((option) => option.value === grade)}
                      onChange={(option) => setGrade(option.value)}
                      placeholder="Grade (e.g., PRT)"
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),

                        control: (base) => ({
                          ...base,
                          minHeight: "52px",
                          backgroundColor: "#F5F6F7",
                          borderRadius: "8px",
                          paddingLeft: "40px",
                          border: "1px solid #e5e7eb",
                        }),

                        input: (base) => ({
                          ...base,
                          color: "#111827",
                          textAlign: "left",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#6b7280",
                          textAlign: "left",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#9ca3af",
                          textAlign: "left",
                        }),
                      }}
                    />
                  </div>

                  {/* Location */}
                  <div className="flex-1 relative">
                    {/* Icon */}
                    <img
                      src={homePageIcons.locationIcon}
                      alt="location"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 z-10 pointer-events-none"
                    />

                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      loadOptions={loadCities}
                      value={location}
                      onChange={(option) => setLocation(option)}
                      placeholder="Search Location"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "#F5F6F7",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          minHeight: "52px",
                          paddingLeft: "40px",
                        }),
                        menu: (provided) => ({
                          ...provided,
                          backgroundColor: "#ffffff",
                        }),
                        input: (provided) => ({
                          ...provided,
                          color: "#111827",
                          textAlign: "left",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "#6b7280",
                          textAlign: "left",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: "#9ca3af",
                          textAlign: "left",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          textAlign: "left",
                          color: "#111827",
                          backgroundColor: state.isFocused
                            ? "#f3f4f6"
                            : state.isSelected
                              ? "#e5e7eb"
                              : "#ffffff",
                        }),
                      }}
                    />
                  </div>

                  {/* Button */}
                  <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-4 rounded-lg
                    font-sf font-bold text-[16px] whitespace-nowrap"
                  >
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>
            <p className="mt-4 text-[16px] sm:text-[18px] md:text-[18px] font-medium font-sf leading-[28px] text-center text-[#404145] mb-8 md:mb-12 px-4">
              If you are looking for a Principal / Vice Principal / Co-ordinator
              role, search in the Grade and Location sections
            </p>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="text-gray-800 text-sm mb-6">{popupMessage}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
