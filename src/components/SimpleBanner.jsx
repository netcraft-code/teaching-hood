import React from "react";
import { useNavigate } from "react-router-dom";

const message =
  "⭐ Get Enterprise Plan worth INR 14,999 for FREE until 31st August, 2026! ⭐";

const SimpleBanner = () => {
  const navigate = useNavigate();

  const goToPricing = () => {
    navigate("/pricing");
  };

  return (
    <div className="w-full bg-[#dc5d55] text-white overflow-hidden h-12 flex items-center">
      <div className="flex whitespace-nowrap animate-scroll items-center">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            onClick={goToPricing}
            className="flex items-center gap-4 px-10 cursor-pointer"
          >
            <span className="text-lg font-medium">{message}</span>

            <button className="glow-btn">Click Here</button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
        }

        .glow-btn {
          background: white;
          color: #dc5d55;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          box-shadow: 0 0 10px rgba(255,255,255,0.8);
        }
      `}</style>
    </div>
  );
};

export default SimpleBanner;
