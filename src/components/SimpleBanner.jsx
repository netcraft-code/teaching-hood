import React from 'react';

const SimpleBanner = () => {
  return (
    <div className="w-full bg-gray-400 text-black overflow-hidden h-12">
      <div className="flex items-center h-full animate-scroll whitespace-nowrap">
        <span className="text-lg font-medium px-4">
          📢 Post jobs for free, Get Enterprise plan at 0 cost till March 31st, 2026 --- Chargeable @ INR 14999 per year
        </span>
        <span className="text-lg font-medium px-4">
          📢 Post jobs for free, Get Enterprise plan at 0 cost till March 31st, 2026 --- Chargeable @ INR 14999 per year
        </span>
        <span className="text-lg font-medium px-4">
          📢 Post jobs for free, Get Enterprise plan at 0 cost till March 31st, 2026 --- Chargeable @ INR 14999 per year
        </span>
        <span className="text-lg font-medium px-4">
          📢 Post jobs for free, Get Enterprise plan at 0 cost till March 31st, 2026 --- Chargeable @ INR 14999 per year
        </span>
        <span className="text-lg font-medium px-4">
          📢 Post jobs for free, Get Enterprise plan at 0 cost till March 31st, 2026 --- Chargeable @ INR 14999 per year
        </span>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SimpleBanner;