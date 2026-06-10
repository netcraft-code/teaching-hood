import React from "react";

const ProfileMeter = ({ percentage = 0, missingFields = [] }) => {
  return (
    <div className="relative flex flex-col items-center group">
      {/* <svg width="90" height="50" viewBox="0 0 200 120">
        <path
          d="M 10 100 A 90 90 0 0 1 55 22.5"
          fill="none"
          stroke="#ef4444"
          stroke-width="30"
          stroke-linecap="butt"
        />
        <path
          d="M 55 22.5 A 90 90 0 0 1 145 22.5"
          fill="none"
          stroke="#facc15"
          stroke-width="30"
          stroke-linecap="butt"
        />
        <path
          d="M 145 22.5 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#22c55e"
          stroke-width="30"
          stroke-linecap="butt"
        />

        <g transform={`rotate(${(percentage / 100) * 180 - 90}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="50"
            stroke="#111"
            stroke-width="3"
          />
          <polygon points="100,42 95,52 105,52" fill="#111" />
        </g>

        <circle cx="100" cy="100" r="5" fill="#111" />
      </svg> */}

      {/* <svg height="50" width="90" viewBox="0 0 200 120">
        <path
          d="M 10 110 A 90 90 0 0 1 60 30"
          fill="none"
          stroke="#ef4444"
          strokeWidth="35"
        />

        <path
          d="M 60 30 A 90 90 0 0 1 140 30"
          fill="none"
          stroke="#facc15"
          strokeWidth="35"
        />

        <path
          d="M 140 30 A 90 90 0 0 1 190 110"
          fill="none"
          stroke="#22c55e"
          strokeWidth="35"
        />

        <g transform={`rotate(${(percentage / 100) * 180 - 90}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="45"
            stroke="black"
            strokeWidth="5"
          />

          <polygon points="100,35 95,45 105,45" fill="black" />
        </g>

        <circle cx="100" cy="100" r="5" fill="black" />
      </svg> */}
      
      <svg height="50" width="90" viewBox="-10 -15 220 140">
        <path
          d="M 10 100 A 90 90 0 0 1 55 22.5"
          fill="none"
          stroke="#ef4444"
          stroke-width="30"
          stroke-linecap="butt"
        />
        <path
          d="M 55 22.5 A 90 90 0 0 1 145 22.5"
          fill="none"
          stroke="#facc15"
          stroke-width="30"
          stroke-linecap="butt"
        />
        <path
          d="M 145 22.5 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#22c55e"
          stroke-width="30"
          stroke-linecap="butt"
        />
        <g transform={`rotate(${(percentage / 100) * 180 - 90}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="50"
            stroke="#111"
            stroke-width="3"
          />
          <polygon points="100,42 95,52 105,52" fill="#111" />
        </g>
        <circle cx="100" cy="100" r="5" fill="#111" />
      </svg>

      {/* Percentage */}
      <div className="text-xs font-semibold">{percentage}%</div>

      <div className="text-xs font-semibold">Profile Completion</div>

      {/* Tooltip */}
      {/* {missingFields.length > 0 && (
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
      )} */}
    </div>
  );
};

export default ProfileMeter;
