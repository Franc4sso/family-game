import React from "react";
import type { GameState, Team } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { IconArrowRight, IconUndo, MasterScreen, RankBadge, SectionLabel } from "./parts";

interface RoundEndViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

/** Riepilogo del round: il punto viene assegnato con "Prossimo round". */
export function RoundEndView({ gameState, dispatch, onUndo, canUndo }: RoundEndViewProps) {
  const { teamA, teamB, currentRound: round, roundHistory } = gameState;
  if (!round) return null;

  const winner = round.activeTeam;
  const winnerName = winner === "A" ? teamA.name : teamB.name;
  const stealAnswer = round.stealAnswerIndex !== undefined ? round.answers[round.stealAnswerIndex] : undefined;

  // Le svelate durante lo steal restano comunque non indovinate
  const missed = round.answers.filter((a) => (!a.revealed || a.revealedInSteal) && !a.burned);

  const badge =
    round.stealOutcome === "success"
      ? { label: "STEAL RIUSCITO", className: "bg-ff-orange text-ff-orange-ink" }
      : round.stealOutcome === "fail"
        ? { label: "STEAL FALLITO", className: "bg-ff-red text-white" }
        : { label: `ROUND ${roundHistory.length + 1} CONCLUSO`, className: "bg-ff-surface-2 text-[#C9CFEA]" };

  const headline = round.stealOutcome === "success" ? "ruba il round" : "vince il round";

  return (
    <MasterScreen>
      <div className="flex flex-col items-center gap-2.5 pt-6 text-center">
        <span className={`flex h-[26px] items-center rounded-full px-3 text-[11px] font-extrabold tracking-[0.12em] ${badge.className}`}>
          {badge.label}
        </span>
        <h2 className="font-display text-[40px] uppercase leading-[1.02] text-ff-gold break-words">
          {winnerName}
          <br />
          {headline}
        </h2>
        {stealAnswer && (
          <span className="text-sm font-bold text-[#C9CFEA]">
            Hanno detto “{stealAnswer.value}” · n. {stealAnswer.rank}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <FinalScore side="A" team={teamA} won={winner === "A"} />
        <FinalScore side="B" team={teamB} won={winner === "B"} />
      </div>

      {missed.length > 0 ? (
        <div className="flex flex-col gap-1.5">
          <div className="pb-0.5">
            <SectionLabel left="Quelle che nessuno ha detto" />
          </div>
          {missed.map((answer, i) => (
            <div key={i} className="flex min-h-11 items-center gap-2.5 rounded-xl border border-dashed border-[#3A4370] bg-ff-surface px-1.5 py-1">
              <RankBadge rank={answer.rank} className="h-8 w-8 bg-ff-surface-2 text-sm text-ff-gold" />
              <span className="text-[15px] font-bold">{answer.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-ff-green-line bg-ff-green-bg p-4 text-center text-base font-extrabold text-ff-green-text">
          Tabellone completo: trovate tutte!
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "END_ROUND", payload: { winningTeam: winner } })}
          className="flex h-[60px] items-center justify-center gap-2.5 rounded-[18px] bg-ff-gold text-[17px] font-extrabold text-ff-gold-ink active:scale-[0.98]"
        >
          Prossimo round
          <IconArrowRight />
        </button>
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className="flex h-[46px] items-center justify-center gap-2 rounded-[14px] border border-ff-line bg-ff-surface text-sm font-bold active:scale-95 disabled:opacity-40"
        >
          <IconUndo />
          Annulla verdetto
        </button>
      </div>
    </MasterScreen>
  );
}

function FinalScore({ side, team, won }: { side: "A" | "B"; team: Team; won: boolean }) {
  const base = side === "A" ? "bg-ff-team-a" : "bg-ff-team-b";
  const nameColor = side === "A" ? "text-ff-team-a-text" : "text-ff-team-b-text";
  const ring = won ? "ring-2 ring-ff-gold" : side === "A" ? "ring-1 ring-[#2A3D78]" : "ring-1 ring-[#4A2C22]";

  return (
    <div className={`flex flex-col items-center gap-1 rounded-[18px] p-3.5 ${base} ${ring}`}>
      <span className={`max-w-full truncate text-sm font-extrabold ${nameColor}`}>{team.name}</span>
      {/* Il punto si somma davvero al passaggio al round successivo */}
      <span className="font-display text-[40px] leading-none">{won ? team.score + 1 : team.score}</span>
      <span className={`text-xs font-extrabold ${won ? "text-ff-gold" : "text-ff-muted"}`}>
        {won ? "+1 punto" : "invariato"}
      </span>
    </div>
  );
}
