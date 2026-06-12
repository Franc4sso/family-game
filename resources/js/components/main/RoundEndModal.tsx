import React from "react";
import { Button } from "../shared/Button";
import type { Team, Answer } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RoundEndModalProps {
  winningTeam: "A" | "B";
  teamA: Team;
  teamB: Team;
  answers: Answer[];
  dispatch: React.Dispatch<GameAction>;
  onClose: () => void;
}

export function RoundEndModal({ winningTeam, teamA, teamB, answers, dispatch, onClose }: RoundEndModalProps) {
  const winner = winningTeam === "A" ? teamA : teamB;

  // Separa le risposte non rivelate da quelle rivelate
  const missedAnswers = answers.filter(answer => !answer.revealed && !answer.burned);

  const handleNextRound = () => {
    dispatch({ type: "END_ROUND", payload: { winningTeam } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-amber-400 rounded-3xl p-8 max-w-2xl w-full text-center shadow-2xl my-8">
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-4 drop-shadow-lg animate-pulse">
          🎉 {winner.name.toUpperCase()} VINCE! 🎉
        </h2>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 mb-6 shadow-xl">
          <p className="text-4xl font-black text-white drop-shadow-lg">
            {winner.score} {winner.score === 1 ? 'PUNTO' : 'PUNTI'}
          </p>
        </div>

        {/* Risposte non indovinate */}
        {missedAnswers.length > 0 && (
          <div className="mb-6 bg-gray-900/50 rounded-2xl p-6 border-2 border-gray-700">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              ❌ Risposte non indovinate:
            </h3>
            <div className="grid gap-3">
              {missedAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-red-600/50 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 text-white font-black text-lg w-10 h-10 rounded-lg flex items-center justify-center">
                      {answer.rank}
                    </div>
                    <span className="text-white text-lg font-semibold">
                      {answer.value}
                    </span>
                  </div>
                  <span className="text-red-400 text-sm font-semibold">MANCATA</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {missedAnswers.length === 0 && (
          <div className="mb-6 bg-green-900/30 rounded-2xl p-4 border-2 border-green-600">
            <p className="text-green-400 text-xl font-bold">
              🎯 Tutte le risposte sono state indovinate!
            </p>
          </div>
        )}

        <Button variant="primary" size="lg" fullWidth onClick={handleNextRound}>
          Prossimo Round 🎮
        </Button>
      </div>
    </div>
  );
}
