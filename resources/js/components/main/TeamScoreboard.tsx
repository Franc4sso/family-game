import React from "react";
import type { Team } from "@/types/game.types";

interface TeamScoreboardProps {
  teamA: Team;
  teamB: Team;
  activeTeam: "A" | "B";
  livesRemaining?: number;
  isStealPhase?: boolean;
}

export function TeamScoreboard({ teamA, teamB, activeTeam, livesRemaining = 0, isStealPhase = false }: TeamScoreboardProps) {
  const renderTeam = (team: Team, side: "A" | "B") => {
    const isActive = activeTeam === side;
    const bgColor = side === 'A' ? 'bg-blue-900/40' : 'bg-red-900/40';
    const borderColor = side === 'A' ? 'border-blue-500' : 'border-red-500';
    const textColor = side === 'A' ? 'text-blue-400' : 'text-red-400';

    return (
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all border-2 ${bgColor} ${borderColor}
          ${isActive ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/30' : 'shadow-md'}`}
      >
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">
            {side === 'A' ? 'Squadra A' : 'Squadra B'}
          </div>
          <div className={`text-sm font-bold ${textColor} truncate`}>
            {team.name}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isActive && !isStealPhase && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i < livesRemaining ? 'bg-red-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}
          {isStealPhase && isActive && (
            <div className="text-xs text-amber-400 font-bold animate-pulse">
              STEAL
            </div>
          )}

          <div className="flex flex-col items-center justify-center bg-gray-800/50 rounded-lg px-3 py-2 min-w-[3rem]">
            <div className="text-2xl font-black text-white leading-none">
              {team.score}
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider">
              {team.score === 1 ? 'punto' : 'punti'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {renderTeam(teamA, 'A')}
      {renderTeam(teamB, 'B')}
    </div>
  );
}
