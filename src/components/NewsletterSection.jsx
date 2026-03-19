import React, { useState } from 'react';

const BASE_PATH = '/src/assets/pdfs/weekly-newsletters/';

const pdfFiles = [
  { id: 1,  week: "2025 · W47", name: "Teachinghood Newsletter 2025-W47",                         file: "Teachinghood Newsletter 2025-W47.pdf" },
  { id: 2,  week: "2025 · W48", name: "Teachinghood Newsletter 2025-W48",                         file: "Teachinghood Newsletter 2025-W48.pdf" },
  { id: 3,  week: "2025 · W49", name: "How to Handle Mixed Ability Classrooms",                   file: "2025-W49  How to handle mixed ability classrooms.pdf" },
  { id: 4,  week: "2025 · W50", name: "Strategies for Student Engagement and Attention",          file: "2025-W50 Strategies for student engagement and attention.pdf" },
  { id: 5,  week: "2025 · W53", name: "Creative Lesson Planning Using Limited Resources",         file: "2025-W53  Creative lesson planning using limited resources.pdf" },
  { id: 6,  week: "2025 · W54", name: "How to Use Storytelling to Teach Any Subject",             file: "2025-W54  How to use storytelling to teach any subject.pdf" },
  { id: 7,  week: "2026 · W01", name: "21st-Century Teaching Skills Every Teacher Must Master",   file: "2026-W01  21st-century teaching skills every teacher must master.pdf" },
  { id: 8,  week: "2026 · W02", name: "Building Critical Thinking Among Students",                file: "2026-W02  Building critical thinking among students.pdf" },
  { id: 9,  week: "2026 · W03", name: "Using AI Tools to Make Lesson Prep Faster and Smarter",   file: "2026-W03  Using AI Tools to Make Lesson Prep Faster and Smarter.pdf" },
  { id: 10, week: "2026 · W04", name: "Teacher Time Management Hacks",                            file: "2026-W04  Teacher time management hacks.pdf" },
  { id: 11, week: "2026 · W05", name: "How to Conduct Effective Parent-Teacher Meetings",         file: "2026-W05  How to Conduct Effective Parent-Teacher Meetings.pdf" },
  { id: 12, week: "2026 · W06", name: "Motivating Underperforming Students Through Conversation", file: "2026-W06  Motivating Underperforming Students Through Conversation.pdf" },
  { id: 13, week: "2026 · W07", name: "Handling Conflicts or Discipline Issues In School",        file: "2026-W07  Handling Conflicts or Discipline Issues In School .pdf" },
  { id: 14, week: "2026 · W08", name: "Peer Collaboration – How Teachers Can Support Each Other", file: "2026-W08  Peer Collaboration – How Teachers Can Support Each Other Better .pdf" },
  { id: 15, week: "2026 · W09", name: "Project-Based Learning in Indian Classrooms",              file: "2026-W09  Project-Based Learning in Indian Classrooms.pdf" },
  { id: 16, week: "2026 · W10", name: "Experiential Learning Ideas for All Age Groups",           file: "2026-W10  Experiential learning ideas for all age groups.pdf" },
  { id: 17, week: "2026 · W11", name: "Using Technology for Blended Learning",                    file: "2026-W11  Using Technology for Blended Learning.pdf" },
];

const PDFIcon = () => (
  <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <rect width="36" height="44" rx="5" fill="#FEE2E2" />
    <path d="M7 3h15l9 9v27a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" fill="#FECACA" />
    <path d="M21 3l9 9h-7a2 2 0 01-2-2V3z" fill="#EF4444" />
    <text x="18" y="32" textAnchor="middle" fontSize="8" fontWeight="700" fill="#DC2626" fontFamily="sans-serif">PDF</text>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const NewsletterSection = () => {
  const [downloading, setDownloading] = useState(null);

  const handleDownload = (pdf) => {
    setDownloading(pdf.id);
    const link = document.createElement('a');
    link.href = `${BASE_PATH}${pdf.file}`;
    link.download = pdf.file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(null), 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* ── Heading ── */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Weekly Newsletter
          </h1>
          <div className="w-12 h-0.5 bg-red-500 mb-5" />
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            Every week, Teachinghood publishes a focused newsletter for educators — covering
            classroom strategies, teaching tools, professional growth, and real-world insights.
            Browse all past editions below and download any issue for free.
          </p>
        </div>

        {/* ── Stats Row ── */}
        <div className="flex gap-8 mb-10 pb-8 border-b border-gray-100">
          <div>
            <p className="text-2xl font-semibold text-gray-900">17</p>
            <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Editions</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div>
            <p className="text-2xl font-semibold text-gray-900">Weekly</p>
            <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Cadence</p>
          </div>
          <div className="w-px bg-gray-200" />
          <div>
            <p className="text-2xl font-semibold text-gray-900">Free</p>
            <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wide">Always</p>
          </div>
        </div>

        {/* ── List Header ── */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            All Editions
          </h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            17 files
          </span>
        </div>

        {/* ── Scrollable PDF List ── */}
        <div
          className="flex flex-col gap-2 overflow-y-auto pr-1"
          style={{ maxHeight: '520px' }}
        >
          {pdfFiles.map((pdf) => (
            <div
              key={pdf.id}
              className="flex items-center gap-4 px-4 py-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 transition-all duration-150"
            >
              {/* PDF Icon */}
              <PDFIcon />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <span className="inline-block text-xs font-medium text-red-500 bg-red-50 border border-red-100 rounded px-2 py-0.5 mb-1">
                  {pdf.week}
                </span>
                <p className="text-sm font-medium text-gray-800 truncate leading-snug">
                  {pdf.name}
                </p>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(pdf)}
                disabled={downloading === pdf.id}
                className={`
                  flex-shrink-0 flex items-center gap-2 text-xs font-semibold
                  px-4 py-2 rounded-lg border transition-all duration-150
                  ${downloading === pdf.id
                    ? 'bg-red-50 border-red-200 text-red-400 cursor-not-allowed'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-red-500 hover:border-red-500 hover:text-white cursor-pointer'
                  }
                `}
              >
                {downloading === pdf.id ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="hidden sm:inline">Downloading…</span>
                  </>
                ) : (
                  <>
                    <DownloadIcon />
                    <span className="hidden sm:inline">Download</span>
                  </>
                )}
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NewsletterSection;