import React, { useState } from 'react';

const BASE_PATH = '/src/assets/pdfs/weekly-newsletters/';

const pdfFiles = [
  { id: 1,  week: "2025 · W47", name: "Teachinghood Newsletter 2025-W47",                          file: "Teachinghood Newsletter 2025-W47.pdf" },
  { id: 2,  week: "2025 · W48", name: "Teachinghood Newsletter 2025-W48",                          file: "Teachinghood Newsletter 2025-W48.pdf" },
  { id: 3,  week: "2025 · W49", name: "How to Handle Mixed Ability Classrooms",                    file: "2025-W49  How to handle mixed ability classrooms.pdf" },
  { id: 4,  week: "2025 · W50", name: "Strategies for Student Engagement and Attention",           file: "2025-W50 Strategies for student engagement and attention.pdf" },
  { id: 5,  week: "2025 · W53", name: "Creative Lesson Planning Using Limited Resources",          file: "2025-W53  Creative lesson planning using limited resources.pdf" },
  { id: 6,  week: "2025 · W54", name: "How to Use Storytelling to Teach Any Subject",              file: "2025-W54  How to use storytelling to teach any subject.pdf" },
  { id: 7,  week: "2026 · W01", name: "21st-Century Teaching Skills Every Teacher Must Master",    file: "2026-W01  21st-century teaching skills every teacher must master.pdf" },
  { id: 8,  week: "2026 · W02", name: "Building Critical Thinking Among Students",                 file: "2026-W02  Building critical thinking among students.pdf" },
  { id: 9,  week: "2026 · W03", name: "Using AI Tools to Make Lesson Prep Faster and Smarter",    file: "2026-W03  Using AI Tools to Make Lesson Prep Faster and Smarter.pdf" },
  { id: 10, week: "2026 · W04", name: "Teacher Time Management Hacks",                             file: "2026-W04  Teacher time management hacks.pdf" },
  { id: 11, week: "2026 · W05", name: "How to Conduct Effective Parent-Teacher Meetings",          file: "2026-W05  How to Conduct Effective Parent-Teacher Meetings.pdf" },
  { id: 12, week: "2026 · W06", name: "Motivating Underperforming Students Through Conversation",  file: "2026-W06  Motivating Underperforming Students Through Conversation.pdf" },
  { id: 13, week: "2026 · W07", name: "Handling Conflicts or Discipline Issues In School",         file: "2026-W07  Handling Conflicts or Discipline Issues In School .pdf" },
  { id: 14, week: "2026 · W08", name: "Peer Collaboration – How Teachers Can Support Each Other",  file: "2026-W08  Peer Collaboration – How Teachers Can Support Each Other Better .pdf" },
  { id: 15, week: "2026 · W09", name: "Project-Based Learning in Indian Classrooms",               file: "2026-W09  Project-Based Learning in Indian Classrooms.pdf" },
  { id: 16, week: "2026 · W10", name: "Experiential Learning Ideas for All Age Groups",            file: "2026-W10  Experiential learning ideas for all age groups.pdf" },
  { id: 17, week: "2026 · W11", name: "Using Technology for Blended Learning",                     file: "2026-W11  Using Technology for Blended Learning.pdf" },
];

const PDFIcon = () => (
  <svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="46" rx="6" fill="#FEE2E2" />
    <path d="M8 4h16l10 10v28a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" fill="#FCA5A5" />
    <path d="M22 4l10 10H24a2 2 0 01-2-2V4z" fill="#EF4444" />
    <text x="19" y="33" textAnchor="middle" fontSize="9" fontWeight="700" fill="#DC2626" fontFamily="Georgia, serif">PDF</text>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nl-wrapper {
          min-height: 100vh;
          background: #0d0d0d;
          padding: 60px 24px 80px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── HERO SECTION ── */
        .nl-hero {
          max-width: 720px;
          margin: 0 auto 56px;
          text-align: center;
          position: relative;
        }

        .nl-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 100px;
          padding: 6px 18px;
          margin-bottom: 28px;
        }

        .nl-badge-dot {
          width: 7px;
          height: 7px;
          background: #ef4444;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .nl-badge-text {
          font-size: 12px;
          font-weight: 600;
          color: #ef4444;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .nl-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(42px, 7vw, 72px);
          font-weight: 900;
          line-height: 1.05;
          color: #f5f5f0;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }

        .nl-title span {
          color: #ef4444;
          font-style: italic;
        }

        .nl-subtitle-line {
          width: 64px;
          height: 3px;
          background: linear-gradient(90deg, #ef4444, transparent);
          margin: 20px auto 24px;
          border-radius: 2px;
        }

        .nl-desc {
          font-size: 16px;
          line-height: 1.75;
          color: #a0a0a0;
          font-weight: 300;
          max-width: 560px;
          margin: 0 auto;
        }

        .nl-meta {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 32px;
        }

        .nl-meta-item {
          text-align: center;
        }

        .nl-meta-num {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #f5f5f0;
          line-height: 1;
        }

        .nl-meta-label {
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 4px;
        }

        /* ── PDF LISTING ── */
        .nl-list-container {
          max-width: 720px;
          margin: 0 auto;
        }

        .nl-list-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #1e1e1e;
        }

        .nl-list-title {
          font-size: 13px;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .nl-list-count {
          font-size: 12px;
          color: #444;
          background: #1a1a1a;
          padding: 4px 10px;
          border-radius: 100px;
        }

        .nl-scroll-area {
          max-height: 520px;
          overflow-y: auto;
          padding-right: 4px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nl-scroll-area::-webkit-scrollbar {
          width: 4px;
        }
        .nl-scroll-area::-webkit-scrollbar-track {
          background: #111;
          border-radius: 4px;
        }
        .nl-scroll-area::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 4px;
        }
        .nl-scroll-area::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }

        /* ── PDF CARD ── */
        .nl-pdf-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #111;
          border: 1px solid #1c1c1c;
          border-radius: 12px;
          padding: 16px 20px;
          transition: all 0.22s ease;
          cursor: default;
        }

        .nl-pdf-card:hover {
          border-color: #2a2a2a;
          background: #161616;
          transform: translateX(3px);
        }

        .nl-pdf-icon {
          flex-shrink: 0;
        }

        .nl-pdf-info {
          flex: 1;
          min-width: 0;
        }

        .nl-pdf-name {
          font-size: 14px;
          font-weight: 500;
          color: #e8e8e8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }

        .nl-pdf-meta {
          display: flex;
          gap: 12px;
        }

        .nl-pdf-meta span {
          font-size: 11px;
          color: #444;
        }

        .nl-pdf-week {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          color: #ef4444;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 4px;
          padding: 2px 7px;
          letter-spacing: 0.08em;
          margin-bottom: 5px;
        }

        .nl-download-btn {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          padding: 9px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #888;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }

        .nl-download-btn:hover {
          background: #ef4444;
          border-color: #ef4444;
          color: #fff;
        }

        .nl-download-btn.loading {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.3);
          color: #ef4444;
          pointer-events: none;
        }

        .nl-download-btn svg {
          transition: transform 0.18s ease;
        }

        .nl-download-btn:hover svg {
          transform: translateY(2px);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .nl-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(239,68,68,0.3);
          border-top-color: #ef4444;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @media (max-width: 520px) {
          .nl-pdf-meta { display: none; }
          .nl-download-btn span { display: none; }
          .nl-download-btn { padding: 9px 12px; }
          .nl-meta { gap: 20px; }
        }
      `}</style>

      <div className="nl-wrapper">

        {/* ── HERO ── */}
        <div className="nl-hero">
          <div className="nl-badge">
            <div className="nl-badge-dot" />
            <span className="nl-badge-text">New Edition Live</span>
          </div>

          <h1 className="nl-title">
            Weekly<br /><span>Newsletter</span>
          </h1>

          <div className="nl-subtitle-line" />

          <p className="nl-desc">
            Your curated dose of market intelligence, industry deep-dives, and
            forward-looking analysis — delivered every week. Stay sharp, stay ahead.
            Every edition is packed with insights you can act on.
          </p>

          <div className="nl-meta">
            <div className="nl-meta-item">
              <div className="nl-meta-num">17</div>
              <div className="nl-meta-label">Editions</div>
            </div>
            <div className="nl-meta-item">
              <div className="nl-meta-num">Weekly</div>
              <div className="nl-meta-label">Cadence</div>
            </div>
            <div className="nl-meta-item">
              <div className="nl-meta-num">Free</div>
              <div className="nl-meta-label">Always</div>
            </div>
          </div>
        </div>

        {/* ── PDF LISTING ── */}
        <div className="nl-list-container">
          <div className="nl-list-header">
            <span className="nl-list-title">All Editions</span>
            <span className="nl-list-count">17 files</span>
          </div>

          <div className="nl-scroll-area">
            {pdfFiles.map((pdf) => (
              <div className="nl-pdf-card" key={pdf.id}>

                <div className="nl-pdf-icon">
                  <PDFIcon />
                </div>

                <div className="nl-pdf-info">
                  <div className="nl-pdf-week">{pdf.week}</div>
                  <div className="nl-pdf-name">{pdf.name}</div>
                </div>

                <button
                  className={`nl-download-btn ${downloading === pdf.id ? 'loading' : ''}`}
                  onClick={() => handleDownload(pdf)}
                >
                  {downloading === pdf.id ? (
                    <>
                      <div className="nl-spinner" />
                      <span>Downloading…</span>
                    </>
                  ) : (
                    <>
                      <DownloadIcon />
                      <span>Download</span>
                    </>
                  )}
                </button>

              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default NewsletterSection;