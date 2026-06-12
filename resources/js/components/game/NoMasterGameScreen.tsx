import React, { useState } from "react";
import { CategoryDisplay } from "../main/CategoryDisplay";
import { AnswersGrid } from "../main/AnswersGrid";
import { TeamScoreboard } from "../main/TeamScoreboard";
import { RoundEndModal } from "../main/RoundEndModal";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface NoMasterGameScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onRoundEnd: () => void;
}

export function NoMasterGameScreen({
  gameState,
  dispatch,
  onRoundEnd,
}: NoMasterGameScreenProps) {
  const { teamA, teamB, currentRound } = gameState;
  const [inputValue, setInputValue] = useState("");

  if (!currentRound) return null;

  const isStealPhase = currentRound.state === "steal";
  const activeTeamName =
    currentRound.activeTeam === "A" ? teamA.name : teamB.name;

  const handleSubmit = () => {
    if (inputValue.trim() === "") return;

    dispatch({
      type: "SUBMIT_ANSWER",
      payload: { input: inputValue },
    });

    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 pb-32 pt-3">
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
                {activeTeamName} ha UNA possibilità di rispondere
              </div>
            </div>
          </div>
        )}

        <CategoryDisplay category={currentRound.category} />

        <div className="mt-4 px-3">
          <AnswersGrid answers={currentRound.answers} />
        </div>
      </div>

      {/* Input per inserire risposte */}
      {currentRound.state !== "ended" && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent p-4 border-t-2 border-slate-700">
          <div className="max-w-2xl mx-auto">
            <div className="mb-2 text-center">
              <span className="text-sm font-semibold text-slate-300">
                Turno di:{" "}
              </span>
              <span
                className={`text-lg font-bold ${
                  currentRound.activeTeam === "A"
                    ? "text-blue-400"
                    : "text-red-400"
                }`}
              >
                {activeTeamName}
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Scrivi una risposta..."
                className="flex-1 px-4 py-3 text-lg bg-slate-800 text-white border-2 border-slate-600 rounded-xl focus:border-blue-500 focus:outline-none placeholder-slate-500"
                autoComplete="off"
              />
              <button
                onClick={handleSubmit}
                disabled={inputValue.trim() === ""}
                className="bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl text-lg transition-colors shadow-lg"
              >
                Invia
              </button>
            </div>

            {isStealPhase && (
              <div className="mt-2 text-center text-amber-400 text-xs font-semibold animate-pulse">
                ⚠️ Hai solo un tentativo!
              </div>
            )}
          </div>
        </div>
      )}

      {currentRound.state === "ended" && (
        <RoundEndModal
          winningTeam={currentRound.activeTeam}
          teamA={teamA}
          teamB={teamB}
          answers={currentRound.answers}
          dispatch={dispatch}
          onClose={onRoundEnd}
        />
      )}
    </div>
  );
}
