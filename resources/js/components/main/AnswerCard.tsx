import React from "react";
import type { Answer } from "@/types/game.types";

interface AnswerCardProps {
  answer: Answer;
}

export function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <div
      className={`rounded-xl transition-all duration-300 active:scale-95 shadow-lg
        ${answer.revealed
          ? "bg-gradient-to-br from-green-600 to-green-700 border-2 border-green-400"
          : "bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-600"
        }`}
    >
      {answer.revealed ? (
        <div className="flex items-center gap-2 p-3 min-h-[52px]">
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center font-black text-base text-black shadow-md">
            {answer.rank}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white leading-tight">{answer.value}</div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[52px] p-3">
          <span className="text-lg text-gray-500 font-black">???</span>
        </div>
      )}
    </div>
  );
}
