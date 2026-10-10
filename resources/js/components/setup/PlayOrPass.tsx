import React from "react";
import { RankOval, TEAM } from "../feud/parts";
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
  const isA = winner === "A";

  // Le risposte del face-off sono le uniche rivelate: la più alta è del vincitore
  const [best, other] = currentRound.answers
    .filter((answer) => answer.revealed)
    .sort((a, b) => a.rank - b.rank);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-feud-navy/70 font-feud-ui sm:items-center sm:p-3">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="play-or-pass-title"
        className={`feud-up flex w-full max-w-md flex-col gap-3.5 rounded-t-[28px] px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:rounded-[28px] ${TEAM[winner].solid}`}
      >
        <span className={`text-sm font-extrabold ${TEAM[winner].soft}`}>Face-off vinto da</span>
        <h2 id="play-or-pass-title" className="m-0 -mt-2 font-feud text-[56px] leading-[0.85] font-black break-words uppercase">
          {winningTeam.name}
        </h2>

        <div className="flex flex-col gap-1.5">
          <FaceOffAnswer answer={best} teamName={winningTeam.name} winner isA={isA} />
          <FaceOffAnswer answer={other} teamName={losingTeam.name} isA={isA} />
        </div>

        <p className="m-0 text-lg font-extrabold">Giocate o passate?</p>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => dispatch({ type: "CHOOSE_PLAY" })}
            className={`feud-press h-[60px] rounded-[18px] text-lg font-extrabold ${isA ? "bg-feud-ink text-feud-yellow" : "bg-feud-coral-ink text-feud-coral"}`}
          >
            Giochiamo
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: "CHOOSE_PASS" })}
            className={`feud-press h-[60px] rounded-[18px] border-2 text-lg font-extrabold ${isA ? "border-feud-ink" : "border-feud-coral-ink"}`}
          >
            Passiamo
          </button>
        </div>
      </div>
    </div>
  );
}

function FaceOffAnswer({
  answer,
  teamName,
  winner = false,
  isA,
}: {
  answer?: Answer;
  teamName: string;
  winner?: boolean;
  isA: boolean;
}) {
  const dark = isA ? "bg-feud-ink text-white" : "bg-feud-coral-ink text-white";
  const ovalOn = isA ? "bg-feud-yellow text-feud-ink" : "bg-feud-coral text-feud-coral-ink";
  return (
    <div
      className={`flex min-h-[58px] items-center gap-3 rounded-[14px] py-2 pr-3.5 pl-1.5 ${
        winner ? dark : `border-2 ${isA ? "border-feud-ink/25" : "border-feud-coral-ink/25"}`
      }`}
    >
      {answer ? (
        <RankOval rank={answer.rank} className={winner ? ovalOn : isA ? "bg-feud-ink/10" : "bg-feud-coral-ink/10"} />
      ) : (
        <RankOval rank={9} className={isA ? "bg-feud-ink/10" : "bg-feud-coral-ink/10"} />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-xs font-extrabold opacity-75">{teamName}</span>
        <span className="font-feud text-[22px] leading-none font-extrabold uppercase">
          {answer ? answer.value : "Nessuna risposta sul tabellone"}
        </span>
      </div>
    </div>
  );
}
