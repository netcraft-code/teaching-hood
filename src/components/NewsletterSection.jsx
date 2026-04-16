import React, { useEffect, useState } from "react";
import { HeroImages } from "../assets/images/HeroImages";
import { backendURL } from "../api/auth";

const BASE_PATH = "/src/assets/pdfs/weekly-newsletters/";
const ITEMS_PER_PAGE = 10;

const PDFIcon = () => (
  <svg
    width="36"
    height="44"
    viewBox="0 0 36 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <rect width="36" height="44" rx="5" fill="#96b2ee" />
    <path
      d="M7 3h15l9 9v27a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
      fill="#fe5e56"
    />
    <path d="M21 3l9 9h-7a2 2 0 01-2-2V3z" fill="white" />
    <text
      x="18"
      y="32"
      textAnchor="middle"
      fontSize="8"
      fontWeight="700"
      fill="white"
      fontFamily="sans-serif"
    >
      PDF
    </text>
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronLeft = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const NewsletterSection = () => {
  const [downloading, setDownloading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfFiles, setPdfFiles] = useState([]);

  const totalPages = Math.ceil(pdfFiles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const currentItems = pdfFiles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const BackendURL = backendURL();
  const [sortType, setSortType] = useState("latest");

  const sortedFiles = [...pdfFiles].sort((a, b) => {
    if (sortType === "latest") {
      return b.id - a.id;
    }
    if (sortType === "oldest") {
      return a.id - b.id;
    }
    if (sortType === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const currentItems = sortedFiles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    fetch(`${BackendURL}/api/newsletters`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.data.map((item) => ({
          id: item.id,
          week: item.week,
          name: item.name,
          file: item.file_path,
        }));

        setPdfFiles(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDownload = (pdf) => {
    setDownloading(pdf.id);
    const link = document.createElement("a");
    link.href = `${BackendURL}/storage/${pdf.file}`;
    link.download = `${BackendURL}/storage/${pdf.file}`;
    document.body.appendChild(link);
    link.target = "_blank";
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(null), 1500);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Build page number array e.g. [1, 2, 3]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full">
        {/* Background Image Container */}
        <div
          className="relative w-full bg-cover bg-center overflow-hidden h-[190px]"
          style={{ backgroundImage: `url(${HeroImages.bg})` }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-12">
            {/* Heading */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-2 sm:mb-4 tracking-tight px-4"
                style={{
                  textShadow: `
                      0px 0px 0px rgba(0, 0, 0, 0.10),
                      3px 3px 3px rgba(0, 0, 0, 0.10),
                      3px 4px 4px rgba(0, 0, 0, 0.10),
                      3px 4px 4px rgba(0, 0, 0, 0.10)
                  `,
                }}
              >
                Weekly Newsletters
              </h1>
              <div className="mb-10" style={{ textAlign: "-webkit-center" }}>
                <p className="text-[14px] text-gray-600 leading-relaxed max-w-2xl">
                  Every week, Teachinghood publishes a focused newsletter for
                  educators covering classroom strategies, teaching tools,
                  professional growth, and real-world insights. Browse all past
                  editions below and download any issue for free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* ── Heading ── */}
        {/* <div className="mb-10" style={{ textAlign: "-webkit-center" }}>
          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            Every week, Teachinghood publishes a focused newsletter for
            educators covering classroom strategies, teaching tools,
            professional growth, and real-world insights. Browse all past
            editions below and download any issue for free.
          </p>
        </div> */}

        {/* ── Sorting ── */}
        <div className="flex justify-end mb-4">
          <select
            value={sortType}
            onChange={(e) => {
              setSortType(e.target.value);
              setCurrentPage(1); // reset page
            }}
            className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>

        {/* ── PDF List ── */}
        <div className="flex flex-col gap-2 mb-8">
          {currentItems.map((pdf) => (
            <div
              key={pdf.id}
              className="flex items-center gap-4 px-4 py-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200 transition-all duration-150"
            >
              {/* PDF Icon */}
              <PDFIcon />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <span className="inline-block text-xs font-medium text-[#0077ff] bg-white border border-[#0077ff] rounded px-2 py-0.5 mb-1">
                  {pdf.week}
                </span>
                <p className="text-sm font-medium text-gray-800 leading-snug">
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
                  ${
                    downloading === pdf.id
                      ? "bg-red-50 border-red-200 text-red-400 cursor-not-allowed"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-[#2563eb] hover:border-[#2563eb] hover:text-white cursor-pointer"
                  }
                `}
              >
                {downloading === pdf.id ? (
                  <>
                    <svg
                      className="animate-spin w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
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

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 pt-4 border-t border-gray-100">
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-500 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            >
              <ChevronLeft />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 mx-2">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`
                    w-9 h-9 text-xs font-semibold rounded-lg border transition-all duration-150 cursor-pointer
                    ${
                      currentPage === page
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-gray-500 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSection;