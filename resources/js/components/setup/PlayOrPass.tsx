import React from "react";
import { RankBadge } from "../master/parts";
import type { Team, Round, Answer } from "@/types/game.types";
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

  // Le risposte del face-off sono le uniche rivelate: la più alta è del vincitore
  const [best, other] = currentRound.answers
    .filter((answer) => answer.revealed)
    .sort((a, b) => a.rank - b.rank);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-[#05081A]/85 p-3 font-ui text-ff-text backdrop-blur-sm sm:items-center">
      <div role="dialog" aria-modal="true" aria-labelledby="play-or-pass-title" className="flex w-full max-w-md flex-col gap-3.5 rounded-[26px] border border-ff-line bg-ff-bg p-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="flex h-[26px] items-center rounded-full bg-ff-gold px-3 text-[11px] font-extrabold tracking-[0.12em] text-ff-gold-ink">
            FACE-OFF VINTO
          </span>
          <h2 id="play-or-pass-title" className="font-display text-[30px] uppercase leading-[1.05] text-ff-gold break-words">
            {winningTeam.name}
          </h2>
        </div>

        <div className="flex flex-col gap-1.5">
          <FaceOffAnswer answer={best} teamName={winningTeam.name} winner />
          <FaceOffAnswer answer={other} teamName={losingTeam.name} />
        </div>

        <p className="text-center text-base font-bold">
          <span className="text-ff-gold">{winningTeam.name}</span>, giocate o passate?
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "CHOOSE_PLAY" })}
            className="h-[60px] rounded-[18px] bg-ff-gold text-[17px] font-extrabold text-ff-gold-ink active:scale-95"
          >
            Giochiamo
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "CHOOSE_PASS" })}
            className="h-[60px] rounded-[18px] border border-ff-line bg-ff-surface text-[17px] font-extrabold active:scale-95"
          >
            Passiamo
          </button>
        </div>
      </div>
    </div>
  );
}

function FaceOffAnswer({ answer, teamName, winner = false }: { answer?: Answer; teamName: string; winner?: boolean }) {
  return (
    <div
      className={`flex min-h-[58px] items-center gap-3 rounded-[14px] py-2 pl-2 pr-3.5 ${
        winner ? "bg-ff-text text-ff-bg" : "border border-ff-line-soft bg-ff-surface text-ff-muted"
      }`}
    >
      {answer ? (
        <RankBadge rank={answer.rank} className={winner ? "bg-ff-bg text-ff-gold" : "bg-ff-surface-2 text-ff-muted"} />
      ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-ff-surface-2 text-ff-muted">–</span>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className={`truncate text-[11px] font-extrabold uppercase tracking-[0.1em] ${winner ? "text-ff-gold-ink-soft" : ""}`}>
          {teamName}
        </span>
        <span className={`text-base font-extrabold leading-tight ${winner ? "" : "text-ff-text"}`}>
          {answer ? answer.value : "Nessuna risposta sul tabellone"}
        </span>
      </div>
    </div>
  );
}
