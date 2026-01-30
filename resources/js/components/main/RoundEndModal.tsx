import React from "react";
import { Button } from "../shared/Button";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RoundEndModalProps {
  winningTeam: "A" | "B";
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
  onClose: () => void;
}

export function RoundEndModal({ winningTeam, teamA, teamB, dispatch, onClose }: RoundEndModalProps) {
  const winner = winningTeam === "A" ? teamA : teamB;

  const handleNextRound = () => {
    dispatch({ type: "END_ROUND", payload: { winningTeam } });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-amber-400 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-pulse">
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 mb-4 drop-shadow-lg">
          🎉 {winner.name.toUpperCase()} VINCE! 🎉
        </h2>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 mb-6 shadow-xl">
          <p className="text-4xl font-black text-white drop-shadow-lg">
            {winner.score} {winner.score === 1 ? 'PUNTO' : 'PUNTI'}
          </p>
        </div>
        <Button variant="primary" size="lg" fullWidth onClick={handleNextRound}>
          Prossimo Round 🎮
        </Button>
      </div>
    </div>
  );
}
