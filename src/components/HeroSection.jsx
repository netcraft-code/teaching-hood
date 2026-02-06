import React, { useState, useEffect } from "react";
import { Book, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { HeroImages } from "../assets/images/HeroImages";
import { homePageIcons } from "../assets/icons/HomePageIcons";
import { getCities, getGradeLevels, getSubjects } from "../api/auth";

const HeroSection = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [cities, setCities] = useState([]);

  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");

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
    if (!subject || !grade || !location) {
      alert("Please select Subject, Grade and Location");
      return;
    }

    alert(
      `Searching profiles for:\nSubject: ${subject}\nGrade: ${grade}\nLocation: ${location}`,
    );
  };

  return (
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
              Find your next teaching job by simply entering Subject, Grade and
              Location below
            </p>

            {/* Search Form - Better responsive */}
            <div className="bg-white rounded-2xl shadow-xl p-2 md:p-3 w-full">
              <div className="flex flex-col md:flex-row gap-2">
                {/* Subject */}
                <div className="flex-1 relative">
                  <img
                    src={homePageIcons.subjectIcon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]"
                    size={20}
                  />

                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onFocus={() => setOpen({ ...open, subject: true })}
                    onBlur={() => setOpen({ ...open, subject: false })}
                    className="w-full pl-10 pr-10 py-4 bg-[#F5F6F7] text-gray-400 border border-gray-200 rounded-lg font-sf text-[14px] appearance-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Subject (e.g., Mathematics)
                    </option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name} className="text-black">
                        {s.name}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {open.subject ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </div>

                {/* Grade */}
                <div className="flex-1 relative">
                  <img
                    src={homePageIcons.gradeIcon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]"
                    size={20}
                  />

                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    onFocus={() => setOpen({ ...open, grade: true })}
                    onBlur={() => setOpen({ ...open, grade: false })}
                    className="w-full pl-10 pr-10 py-4 bg-[#F5F6F7] text-gray-400 border border-gray-200 rounded-lg
                    font-sf text-[14px] appearance-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Grade (e.g., Primary)
                    </option>
                    {grades.map((g) => (
                      <option key={g.id} value={g.name} className="text-black">
                        {g.name}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {open.grade ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex-1 relative">
                  <img
                    src={homePageIcons.locationIcon}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]"
                    size={20}
                  />

                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setOpen({ ...open, location: true })}
                    onBlur={() => setOpen({ ...open, location: false })}
                    className="w-full pl-10 pr-10 py-4 bg-[#F5F6F7] text-gray-400 border border-gray-200 rounded-lg
                    font-sf text-[14px] appearance-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Location (e.g., Delhi)
                    </option>
                    {cities.map((city) => (
                      <option
                        key={city.id}
                        value={city.name}
                        className="text-black"
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {open.location ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;