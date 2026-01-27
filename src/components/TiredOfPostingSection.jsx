import React, { useState, useEffect } from 'react';
import { Book, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { getCities, getGradeLevels, getSubjects } from "../api/auth";

const TiredOfPostingSection = () => {
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [cities, setCities] = useState([]);

    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');
    const [location, setLocation] = useState('');

    const [open, setOpen] = useState({
        subject: false,
        grade: false,
        location: false,
    });

    const features = [
        { icon: "📈", title: 'Better Reach', description: 'Access thousands of verified educators' },
        { icon: "🎯", title: 'Better Candidates', description: 'Pre-screened and qualified teachers' },
        { icon: "⚡", title: 'Better Outcomes', description: 'Hire 3x faster than traditional methods' },
    ];

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
            `Searching profiles for:\nSubject: ${subject}\nGrade: ${grade}\nLocation: ${location}`
        );
    };

    return (
    <section className="py-16 md:py-24 bg-green-50">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Tired of posting jobs on Facebook <br /> groups without results?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting the best teachers is now easier and faster with Teachinghood's free plan
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:shadow-xl transition"
            >
              <div className="text-center text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-center mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-2 md:p-3 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2">

            {/* Subject */}
            <div className="flex-1 relative">
              <Book className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]" size={20} />

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onFocus={() => setOpen({ ...open, subject: true })}
                onBlur={() => setOpen({ ...open, subject: false })}
                className="w-full pl-10 pr-10 py-4 bg-[#F5F6F7] text-gray-400 border border-gray-200 rounded-lg font-sf text-[14px] appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Subject (e.g., Mathematics)</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                {open.subject ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {/* Grade */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]"
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>

              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                onFocus={() => setOpen({ ...open, grade: true })}
                onBlur={() => setOpen({ ...open, grade: false })}
                className="w-full pl-10 pr-10 py-4 bg-[#F5F6F7] text-gray-400 border border-gray-200 rounded-lg
                font-sf text-[14px] appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Grade (e.g., Primary)</option>
                {grades.map((g) => (
                  <option key={g.id} value={g.name}>{g.name}</option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                {open.grade ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {/* Location */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]" size={20} />

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setOpen({ ...open, location: true })}
                onBlur={() => setOpen({ ...open, location: false })}
                className="w-full pl-10 pr-10 py-4 bg-[#F5F6F7] text-gray-400 border border-gray-200 rounded-lg
                font-sf text-[14px] appearance-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Location (e.g., Delhi)</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                {open.location ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {/* Button */}
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-4 rounded-lg
              font-sf font-bold text-[16px] whitespace-nowrap"
            >
              Search Profiles
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TiredOfPostingSection;
