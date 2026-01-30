import React from "react";
import { Button } from "../shared/Button";
import type { Answer } from "@/types/game.types";
import type { GameAction } from "@/types";

interface AnswerControlItemProps {
  answer: Answer;
  index: number;
  dispatch: React.Dispatch<GameAction>;
}

export function AnswerControlItem({ answer, index, dispatch }: AnswerControlItemProps) {
  return (
    <div className={`rounded-xl p-3 border-2 transition-all ${
      answer.revealed
        ? 'bg-green-900/30 border-green-500/50'
        : answer.burned
          ? 'bg-orange-900/30 border-orange-500/50'
          : 'bg-gray-800/50 border-gray-600/50'
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${
          answer.revealed
            ? 'bg-green-600 text-white'
            : answer.burned
              ? 'bg-orange-600 text-white'
              : 'bg-amber-500 text-black'
        }`}>
          {answer.rank}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{answer.value}</p>
          <p className={`text-xs font-semibold ${
            answer.revealed ? 'text-green-400' : answer.burned ? 'text-orange-400' : 'text-gray-400'
          }`}>
            {answer.revealed ? '✓ Rivelata' : answer.burned ? '✗ Bruciata' : '● Nascosta'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="success"
          size="sm"
          disabled={answer.revealed || answer.burned}
          onClick={() => dispatch({ type: "MARK_ANSWER_CORRECT", payload: { answerIndex: index } })}
        >
          ✓ Corretta
        </Button>

        <Button
          variant="danger"
          size="sm"
          disabled={answer.burned}
          onClick={() => dispatch({ type: "MARK_ANSWER_WRONG", payload: { answerIndex: index } })}
        >
          ✗ Sbagliata
        </Button>
      </div>
    </div>
  );
}
