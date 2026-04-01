import React from "react";

const ProfileMeter = ({ value = 65 }) => {
  const radius = 90;
  const stroke = 15;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * Math.PI;

  // Convert value (0–100) to stroke offset
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height='50' width="90" viewBox="0 0 200 120">
        {/* Background Arc */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
          strokeLinecap="round"
        />

        {/* Red Zone */}
        <path
          d="M 10 100 A 90 90 0 0 1 60 30"
          fill="none"
          stroke="#ef4444"
          strokeWidth={stroke}
        />

        {/* Yellow Zone */}
        <path
          d="M 60 30 A 90 90 0 0 1 140 30"
          fill="none"
          stroke="#facc15"
          strokeWidth={stroke}
        />

        {/* Green Zone */}
        <path
          d="M 140 30 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#22c55e"
          strokeWidth={stroke}
        />

        {/* Needle */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          stroke="black"
          strokeWidth="3"
          transform={`rotate(${(value / 100) * 180 - 90}, 100, 100)`}
        />

        {/* Center Circle */}
        <circle cx="100" cy="100" r="5" fill="black" />
      </svg>

      {/* Value Text */}
      <div className="text-lg font-semibold">{value}%</div>
    </div>
  );
};

export default ProfileMeter;
