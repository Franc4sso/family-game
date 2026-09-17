import React, { useState } from "react";
import type { Dispatch } from "react";
import type { GameAction } from "@/types/actions.types";
import { GUESS_NUMBER_QUESTIONS } from "@/data/guessNumberQuestions";

interface GuessNumberScreenProps {
  dispatch: Dispatch<GameAction>;
}

export function GuessNumberScreen({ dispatch }: GuessNumberScreenProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const total = GUESS_NUMBER_QUESTIONS.length;
  const q = GUESS_NUMBER_QUESTIONS[index];
  const isLast = index === total - 1;
  const isFirst = index === 0;

  const goNext = () => {
    if (isLast) return;
    setIndex((i) => i + 1);
    setRevealed(false);
  };

  const goPrev = () => {
    if (isFirst) return;
    setIndex((i) => i - 1);
    setRevealed(false);
  };

  const progressPct = ((index + 1) / total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 flex flex-col p-3 sm:p-4">
      <div className="max-w-xl w-full mx-auto flex flex-col flex-1">
        <div className="text-center mt-2 mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">
            🔢 Indovina il Numero
          </h1>
          <p className="text-teal-100 text-sm sm:text-base">
            Rispondete a voce con una cifra, poi svelate.
          </p>
        </div>

        {/* Barra di progresso */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between text-teal-100 text-xs sm:text-sm font-semibold mb-1">
            <span>Domanda {index + 1} di {total}</span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Card domanda */}
        <div className="flex-1 flex items-center justify-center">
          <div
            key={q.id}
            className="w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-10 text-center animate-[fadeIn_0.25s_ease-out]"
          >
            <span className="inline-block bg-teal-100 text-teal-700 font-bold text-xs sm:text-sm rounded-full px-3 py-1 mb-4 sm:mb-6">
              #{index + 1}
            </span>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-snug mb-6 sm:mb-8 min-h-[4.5rem] flex items-center justify-center">
              {q.question}
            </p>

            <div className="min-h-[4rem] flex items-center justify-center">
              {revealed ? (
                <div className="bg-teal-50 border-2 border-teal-500 rounded-2xl px-6 py-3 sm:px-8 sm:py-4 animate-[fadeIn_0.2s_ease-out]">
                  <span className="text-teal-700 font-black text-2xl sm:text-3xl">
                    {q.answer}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setRevealed(true)}
                  className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-base sm:text-lg rounded-2xl px-8 py-3 sm:px-10 sm:py-4 shadow-lg transition-all"
                >
                  Svela risposta
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigazione */}
        <div className="flex items-center justify-between gap-3 mt-6 mb-4">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="flex-1 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-xl px-4 py-3 transition-all"
          >
            ← Indietro
          </button>
          <button
            onClick={goNext}
            disabled={isLast}
            className="flex-1 bg-white hover:bg-teal-50 disabled:opacity-30 disabled:cursor-not-allowed text-teal-700 font-bold rounded-xl px-4 py-3 shadow transition-all"
          >
            Avanti →
          </button>
        </div>

        <div className="text-center pb-4">
          <button
            onClick={() => dispatch({ type: "CLEAR_MODE" })}
            className="text-white/80 hover:text-white text-sm font-semibold underline underline-offset-2"
          >
            Torna al menù
          </button>
        </div>
      </div>
    </div>
  );
}
