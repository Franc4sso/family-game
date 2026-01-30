import React from "react";
import { CategoryDisplay } from "./CategoryDisplay";
import { AnswersGrid } from "./AnswersGrid";
import { TeamScoreboard } from "./TeamScoreboard";
import { RoundEndModal } from "./RoundEndModal";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface MainViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onRoundEnd: () => void;
}

export function MainView({ gameState, dispatch, onRoundEnd }: MainViewProps) {
  const { teamA, teamB, currentRound } = gameState;

  if (!currentRound) return null;

  const isStealPhase = currentRound.state === "steal";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 pb-6 pt-3">
      <div className="px-3">
        <div className="sticky top-3 z-30 mb-4">
          <TeamScoreboard
            teamA={teamA}
            teamB={teamB}
            activeTeam={currentRound.activeTeam}
            livesRemaining={currentRound.livesRemaining}
            isStealPhase={isStealPhase}
          />
        </div>
      </div>

      <div className="mt-2">
        {isStealPhase && (
          <div className="mx-3 mb-3 p-4 bg-gradient-to-r from-amber-500/30 to-orange-500/30 border-2 border-amber-400 rounded-2xl shadow-2xl animate-pulse">
            <div className="text-center">
              <div className="text-2xl font-black text-amber-300 mb-1 drop-shadow-lg">
                💰 TENTATIVO DI STEAL!
              </div>
              <div className="text-sm font-semibold text-white">
                {currentRound.activeTeam === "A" ? teamA.name : teamB.name} ha UNA possibilità di rispondere
              </div>
            </div>
          </div>
        )}

        <CategoryDisplay category={currentRound.category} />

        <div className="mt-4 px-3">
          <AnswersGrid answers={currentRound.answers} />
        </div>
      </div>

      {currentRound.state === "ended" && (
        <RoundEndModal
          winningTeam={currentRound.activeTeam}
          teamA={teamA}
          teamB={teamB}
          dispatch={dispatch}
          onClose={onRoundEnd}
        />
      )}
    </div>
  );
}
