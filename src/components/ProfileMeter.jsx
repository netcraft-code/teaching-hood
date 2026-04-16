import React from "react";

const ProfileMeter = ({ percentage = 0, missingFields = [] }) => {
  console.log(missingFields);
  return (
    <div className="relative flex flex-col items-center group">
      <svg height="50" width="90" viewBox="0 0 200 120">
        {/* Red Zone */}
        <path
          d="M 10 110 A 90 90 0 0 1 60 30"
          fill="none"
          stroke="#ef4444"
          strokeWidth="35"
        />

        {/* Yellow Zone */}
        <path
          d="M 60 30 A 90 90 0 0 1 140 30"
          fill="none"
          stroke="#facc15"
          strokeWidth="35"
        />

        {/* Green Zone */}
        <path
          d="M 140 30 A 90 90 0 0 1 190 110"
          fill="none"
          stroke="#22c55e"
          strokeWidth="35"
        />

        {/* Needle Group (line + arrow) */}
        <g transform={`rotate(${(percentage / 100) * 180 - 90}, 100, 100)`}>
          {/* Needle Line */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="45"
            stroke="black"
            strokeWidth="5"
          />

          {/* Arrow Head */}
          <polygon points="100,35 95,45 105,45" fill="black" />
        </g>

        {/* Center Circle */}
        <circle cx="100" cy="100" r="5" fill="black" />
      </svg>

      {/* Percentage */}
      <div className="text-xs font-semibold">{percentage}%</div>

      <div className="text-xs font-semibold">Profile Completion Meter</div>

      {/* Tooltip */}
      {missingFields.length > 0 && (
        <div className="absolute mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-3 py-2 w-max max-w-[200px] z-10 shadow-lg">
          <div className="font-semibold mb-1">Complete your profile:</div>
          <ul className="list-disc list-inside">
            {missingFields.map((field, index) => (
              <li key={index} className="capitalize">
                {field.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMeter;
