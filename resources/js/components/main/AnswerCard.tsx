import React from "react";
import type { Answer } from "@/types/game.types";

interface AnswerCardProps {
  answer: Answer;
}

export function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <div
      className={`rounded-lg transition-all duration-300 shadow-md
        ${
          answer.revealed
            ? "bg-gradient-to-br from-green-600 to-green-700 border border-green-400"
            : "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
        }`}
    >
      <div className="flex items-center gap-2 px-2 py-2 sm:px-3 sm:py-2.5 min-h-[44px] sm:min-h-[52px]">
        {/* RANK */}
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 flex items-center justify-center font-black text-sm sm:text-base text-black shadow">
          {answer.rank}
        </div>

        {/* VALUE */}
        <div className="flex-1 min-w-0">
          {answer.revealed && (
            <div className="text-sm sm:text-base font-bold text-white leading-tight animate-fade-in">
              {answer.value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
