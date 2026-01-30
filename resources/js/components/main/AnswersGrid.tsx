import React from "react";
import { AnswerCard } from "./AnswerCard";
import type { Answer } from "@/types/game.types";

interface AnswersGridProps {
  answers: Answer[];
}

export function AnswersGrid({ answers }: AnswersGridProps) {
  return (
    <div className="grid-answers-mobile px-4">
      {answers.map((answer, index) => (
        <AnswerCard key={index} answer={answer} />
      ))}
    </div>
  );
}
