import React from "react";
import colors from "@/app/data/colors.json";
import { ThumbsUp, MailPlus } from "lucide-react";

function QuestionCard({ userName, lang, question, likes, reviews }) {
  const shadowColor = colors[lang] || "#ffffff";

  return (
    <div
      className="p-6 rounded-2xl bg-[#0B0B09] text-white space-y-4 transition-all duration-300 hover:scale-[1.015]"
      style={{ boxShadow: `0px 2px 10px 2px ${shadowColor}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{userName}</h2>
        <span
          className="text-sm px-3 py-1 rounded-full font-medium"
          style={{ backgroundColor: shadowColor, color: "#0B0B09" }}
        >
          {lang}
        </span>
      </div>

      <p className="text-base text-[#e0dfdc] italic mb-8 mr-1">"{question}"</p>

      <div className="flex  border border-[#1f1f1f] rounded-b-2xl">
        <div className="flex-1 flex items-center justify-center gap-2 cursor-pointer p-3 ">
          <span>
            <ThumbsUp />
          </span>
          <span>{likes}</span>
        </div>
        <div className="h-12 w-[2px] bg-[#1f1f1f]" />
        <div className="flex-1 flex items-center justify-center gap-2 cursor-pointer p-3">
          <span>
            <MailPlus />
          </span>
          <span>{reviews}</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
