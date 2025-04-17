"use client";

import React from "react";
import clsx from "clsx";

const DAYS_IN_WEEK = 7;
const WEEKS_IN_MONTH = 54; 

const getColor = (count) => {
  if (count === 0) return "bg-gray-700";
  if (count === 1) return "bg-green-900";
  if (count === 2) return "bg-green-700";
  if (count === 3) return "bg-green-500";
  return "bg-green-300";
};

export default function ProfileGrid({
  data = Array(WEEKS_IN_MONTH)
    .fill()
    .map(() => Array(DAYS_IN_WEEK).fill(0)),
}) {
  return (
    <div className="min-w-[250px] flex gap-[4px] p-4 overflow-x-auto">
      {data.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-1">
          {week.map((count, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={clsx(
                "w-[10px] h-[10px] rounded-[2px] transition-colors",
                getColor(count)
              )}
              title={`Week ${weekIndex + 1}, Day ${
                dayIndex + 1
              } - ${count} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
