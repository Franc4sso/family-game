import React from "react";
import { Button } from "../shared/Button";
import type { Team, Round } from "@/types/game.types";
import type { GameAction } from "@/types";

interface PlayOrPassProps {
  teamA: Team;
  teamB: Team;
  currentRound: Round;
  dispatch: React.Dispatch<GameAction>;
}

export function PlayOrPass({ teamA, teamB, currentRound, dispatch }: PlayOrPassProps) {
  const winner = currentRound.faceOffWinner;
  if (!winner) return null;

  const winningTeam = winner === "A" ? teamA : teamB;
  const losingTeam = winner === "A" ? teamB : teamA;

  // Trova le due risposte rivelate
  const revealedAnswers = currentRound.answers
    .map((answer, index) => ({ answer, index }))
    .filter(({ answer }) => answer.revealed);

  const winnerAnswer = revealedAnswers.find(({ answer }) =>
    currentRound.faceOffWinner === "A" ? answer.rank <= revealedAnswers[1]?.answer.rank : answer.rank < revealedAnswers[0]?.answer.rank
  );
  const loserAnswer = revealedAnswers.find(({ answer }) =>
    currentRound.faceOffWinner === "A" ? answer.rank > revealedAnswers[0]?.answer.rank : answer.rank >= revealedAnswers[0]?.answer.rank
  );

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-amber-400 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-6 text-center drop-shadow-lg">
          🎉 {winningTeam.name.toUpperCase()} VINCE! 🎉
        </h2>

        <div className="space-y-3 mb-6">
          {/* Risposta vincente */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 border-2 border-green-400 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center">
                <span className="text-2xl font-black text-black">
                  {revealedAnswers[0]?.answer.rank < revealedAnswers[1]?.answer.rank
                    ? revealedAnswers[0]?.answer.rank
                    : revealedAnswers[1]?.answer.rank}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-100 uppercase tracking-wider mb-0.5">
                  {winningTeam.name}
                </p>
                <p className="text-base md:text-lg font-bold text-white">
                  {revealedAnswers[0]?.answer.rank < revealedAnswers[1]?.answer.rank
                    ? revealedAnswers[0]?.answer.value
                    : revealedAnswers[1]?.answer.value}
                </p>
              </div>
            </div>
          </div>

          {/* Risposta perdente */}
          <div className="bg-gray-800/50 border-2 border-gray-600 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-2xl font-black text-gray-300">
                  {revealedAnswers[0]?.answer.rank > revealedAnswers[1]?.answer.rank
                    ? revealedAnswers[0]?.answer.rank
                    : revealedAnswers[1]?.answer.rank}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                  {losingTeam.name}
                </p>
                <p className="text-base md:text-lg font-bold text-gray-300">
                  {revealedAnswers[0]?.answer.rank > revealedAnswers[1]?.answer.rank
                    ? revealedAnswers[0]?.answer.value
                    : revealedAnswers[1]?.answer.value}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-4 mb-6">
          <p className="text-center text-base md:text-lg text-white font-semibold">
            <span className="text-amber-400">{winningTeam.name}</span>, volete <strong>giocare</strong> o <strong>passare</strong>?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="success"
            size="lg"
            onClick={() => dispatch({ type: "CHOOSE_PLAY" })}
          >
            ▶️ Giocare
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => dispatch({ type: "CHOOSE_PASS" })}
          >
            ⏭️ Passare
          </Button>
        </div>
      </div>
    </div>
  );
}
