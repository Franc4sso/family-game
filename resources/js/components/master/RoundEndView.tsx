import React from "react";
import type { GameState, Team } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { IconArrowRight, IconUndo } from "./parts";
import { FeudScreen, RankOval, type Side } from "../feud/parts";

interface RoundEndViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

/** Riepilogo del round, tutto nel colore di chi ha vinto: il punto viene assegnato con "Prossimo round". */
export function RoundEndView({ gameState, dispatch, onUndo, canUndo }: RoundEndViewProps) {
  const { teamA, teamB, currentRound: round, roundHistory } = gameState;
  if (!round) return null;

  const winner = round.activeTeam;
  const winnerName = winner === "A" ? teamA.name : teamB.name;
  const stealAnswer = round.stealAnswerIndex !== undefined ? round.answers[round.stealAnswerIndex] : undefined;
  const isA = winner === "A";

  // Le svelate durante lo steal restano comunque non indovinate
  const missed = round.answers.filter((a) => (!a.revealed || a.revealedInSteal) && !a.burned);

  const context =
    round.stealOutcome === "success"
      ? "Il furto è riuscito"
      : round.stealOutcome === "fail"
        ? "Il furto non è riuscito"
        : "Tabellone chiuso";
  const headline = round.stealOutcome === "success" ? "ruba il round" : "vince il round";

  const ink = isA ? "text-feud-ink" : "text-feud-coral-ink";
  const inkSoft = isA ? "text-feud-ink-soft" : "text-feud-coral-ink-soft";
  const dark = isA ? "bg-feud-ink" : "bg-feud-coral-ink";
  const accentText = isA ? "text-feud-yellow" : "text-feud-coral";
  const accentBg = isA ? "bg-feud-yellow text-feud-ink" : "bg-feud-coral text-feud-coral-ink";
  const border = isA ? "border-feud-ink" : "border-feud-coral-ink";

  return (
    <FeudScreen tone={isA ? "yellow" : "coral"}>
      <div className={`flex h-11 items-center justify-between text-sm font-extrabold ${inkSoft}`}>
        <span>Fine del round {roundHistory.length + 1}</span>
        <span>{context}</span>
      </div>

      <section className={`flex flex-col ${ink}`}>
        <span className="font-feud text-[200px] leading-[0.78] font-black tracking-[-0.02em]" aria-hidden>
          +1
        </span>
        <h1 className="m-0 mt-2.5 font-feud text-[62px] leading-[0.88] font-black break-words uppercase">{winnerName}</h1>
        <p className="m-0 mt-1.5 text-xl font-extrabold">{headline}</p>
        {stealAnswer && (
          <p className={`m-0 mt-1 text-sm font-bold ${inkSoft}`}>
            Hanno detto “{stealAnswer.value}” · n. {stealAnswer.rank}
          </p>
        )}
      </section>

      <div className={`grid grid-cols-2 gap-2 ${ink}`}>
        <FinalScore team={teamA} side="A" won={winner === "A"} dark={dark} accentText={accentText} border={border} />
        <FinalScore team={teamB} side="B" won={winner === "B"} dark={dark} accentText={accentText} border={border} />
      </div>

      {missed.length > 0 ? (
        <section className={`flex flex-col gap-2 rounded-[18px] px-4 py-3.5 ${dark}`}>
          <h2 className={`m-0 text-sm font-extrabold ${accentText}`}>Quelle che nessuno ha detto</h2>
          <ol className="grid grid-cols-2 gap-x-2.5 gap-y-1">
            {missed.map((answer) => (
              <li key={answer.rank} className="flex min-h-[34px] items-center gap-2.5">
                <RankOval rank={answer.rank} className={`h-6 w-[30px] text-base ${accentBg}`} />
                <span className="min-w-0 font-feud text-[22px] leading-none font-extrabold text-white uppercase">{answer.value}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : (
        <section className={`rounded-[18px] px-4 py-4 text-center font-feud text-[28px] font-black uppercase ${dark} ${accentText}`}>
          Tabellone completo!
        </section>
      )}

      <div className="mt-auto flex flex-col gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "END_ROUND", payload: { winningTeam: winner } })}
          className={`feud-press flex h-[60px] items-center justify-center gap-2.5 rounded-[18px] text-lg font-extrabold ${dark} ${accentText}`}
        >
          Prossimo round
          <IconArrowRight />
        </button>
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className={`feud-press flex h-[46px] items-center justify-center gap-2 rounded-[14px] border-2 text-sm font-bold disabled:opacity-40 ${border} ${ink}`}
        >
          <IconUndo />
          Annulla verdetto
        </button>
      </div>
    </FeudScreen>
  );
}

function FinalScore({
  team,
  won,
  dark,
  accentText,
  border,
}: {
  team: Team;
  side: Side;
  won: boolean;
  dark: string;
  accentText: string;
  border: string;
}) {
  // Il punto si somma davvero al passaggio al round successivo
  const score = won ? team.score + 1 : team.score;
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-[14px] px-3.5 py-2.5 ${
        won ? `${dark} ${accentText}` : `border-2 ${border}`
      }`}
    >
      <span className="truncate text-sm font-extrabold">{team.name}</span>
      <span className="font-feud text-[34px] leading-none font-black">{score}</span>
    </div>
  );
}
