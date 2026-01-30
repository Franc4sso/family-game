import React, { useRef } from "react";
import { AnswerControlItem } from "./AnswerControlItem";
import { useSwipeGestures } from "@/hooks/useSwipeGestures";
import type { Answer } from "@/types/game.types";
import type { GameAction } from "@/types";

interface AnswerControlListProps {
  answers: Answer[];
  dispatch: React.Dispatch<GameAction>;
  onSwipeLeft?: () => void;
}

export function AnswerControlList({ answers, dispatch, onSwipeLeft }: AnswerControlListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useSwipeGestures(listRef, {
    onSwipeLeft,
  });

  return (
    <div ref={listRef} className="space-y-3">
      <div className="flex items-center justify-between sticky top-0 bg-gradient-to-b from-gray-900 to-slate-900 py-2 z-10 -mx-4 px-4">
        <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider">
          Risposte ({answers.filter(a => !a.revealed).length} nascoste)
        </h3>
        <span className="text-xs text-gray-500">swipe ← undo</span>
      </div>
      <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
        {answers.map((answer, index) => (
          <AnswerControlItem
            key={index}
            answer={answer}
            index={index}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}
