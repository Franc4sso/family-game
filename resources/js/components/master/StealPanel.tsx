import React from "react";
import { MAX_LIVES } from "@/utils/constants";
import type { Round, Team } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { IconEye, IconUndo, RankBadge, SectionLabel, isGuessed } from "./parts";

interface StealPanelProps {
  round: Round;
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
  onShowBoard: () => void;
}

/**
 * Steal in due tempi: il master può svelare le risposte rimaste una alla
 * volta sul tabellone per creare suspense, e solo dopo dare il verdetto.
 */
export function StealPanel({ round, teamA, teamB, dispatch, onUndo, canUndo, onShowBoard }: StealPanelProps) {
  const stealing = round.activeTeam;
  const stealingName = stealing === "A" ? teamA.name : teamB.name;
  const defendingName = stealing === "A" ? teamB.name : teamA.name;

  const remaining = round.answers
    .map((answer, index) => ({ answer, index }))
    .filter(({ answer }) => !isGuessed(answer));

  const markGiven = (index: number) => dispatch({ type: "MARK_ANSWER_CORRECT", payload: { answerIndex: index } });
  const resolve = (success: boolean) => dispatch({ type: "STEAL_RESOLVE", payload: { success } });

  const answerRows = (
    <ul className="flex flex-col gap-1.5">
      {remaining.map(({ answer, index }) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => markGiven(index)}
            className={`flex min-h-[54px] w-full items-center gap-2.5 rounded-[14px] border px-2 py-1.5 text-left active:scale-[0.98] ${
              answer.revealedInSteal ? "border-ff-gold bg-[#1E2443]" : "border-ff-line bg-ff-surface"
            }`}
          >
            <RankBadge
              rank={answer.rank}
              className={answer.revealedInSteal ? "bg-ff-shown text-ff-gold" : "bg-ff-gold text-ff-gold-ink"}
            />
            <span className="flex flex-1 flex-col">
              <span className="text-[15px] font-bold leading-tight">{answer.value}</span>
              <span className={`text-[11px] font-bold ${answer.revealedInSteal ? "text-ff-gold-soft" : "text-ff-muted"}`}>
                {answer.revealedInSteal ? "Già svelata sul tabellone" : "Ancora coperta"}
              </span>
            </span>
            <span className="flex h-9 shrink-0 items-center rounded-[10px] bg-ff-green px-3 text-[13px] font-extrabold text-ff-green-ink">
              L’hanno detta
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  if (!round.stealRevealed) {
    return (
      <>
        <div className="flex flex-col gap-1.5 rounded-[22px] bg-ff-orange p-[18px] text-ff-orange-ink">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-orange-ink-soft">
              {MAX_LIVES} errori per {defendingName}
            </span>
            <div className="flex gap-1" aria-hidden>
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <span key={i} className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-ff-orange-ink text-[11px] font-extrabold text-ff-orange">
                  X
                </span>
              ))}
            </div>
          </div>
          <span className="font-display text-[32px] leading-none">STEAL!</span>
          <span className="text-sm font-bold leading-snug">
            Una sola risposta per {stealingName}. Fagliela dire, poi crea la suspense.
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            dispatch({ type: "STEAL_START_REVEAL" });
            onShowBoard();
          }}
          className="flex h-16 items-center gap-3 rounded-[18px] bg-ff-gold px-4 text-left text-ff-gold-ink active:scale-[0.98]"
        >
          <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-ff-gold-ink text-ff-gold">
            <IconEye size={20} />
          </span>
          <span className="flex flex-1 flex-col">
            <span className="text-base font-extrabold">Svela le risposte una alla volta</span>
            <span className="text-xs font-semibold text-ff-gold-ink-soft">Le tocchi tu sul tabellone, nell’ordine che vuoi</span>
          </span>
        </button>

        <div className="flex items-center gap-2.5 text-xs font-bold text-ff-muted">
          <span className="h-px flex-1 bg-ff-line-soft" />
          <span>oppure verdetto subito</span>
          <span className="h-px flex-1 bg-ff-line-soft" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => resolve(true)}
            className="h-12 rounded-[14px] border border-ff-green-line bg-ff-green-bg text-sm font-extrabold text-[#9BE8C0] active:scale-95"
          >
            Steal riuscito
          </button>
          <button
            type="button"
            onClick={() => resolve(false)}
            className="h-12 rounded-[14px] border border-ff-red-line bg-ff-red-bg text-sm font-extrabold text-[#FFB0B2] active:scale-95"
          >
            Steal fallito
          </button>
        </div>

        <div className="pt-1">
          <SectionLabel left="Ancora coperte · solo tu le vedi" right={String(remaining.length)} />
        </div>
        {answerRows}
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-1 rounded-[18px] bg-ff-team-b px-4 py-3.5 ring-2 ring-ff-orange">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#FFB08C]">
          Verdetto steal · {stealingName}
        </span>
        <span className="text-sm font-bold leading-snug text-[#F3E3DB]">
          Tocca la risposta che hanno dato. Se non è in lista, è fallito.
        </span>
      </div>

      {answerRows}

      <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-ff-bg pb-1 pt-2">
        <span className="text-center text-xs font-bold text-ff-muted">Il round va a chi vince lo steal</span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => resolve(true)}
            className="flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-[18px] bg-ff-green text-[15px] font-extrabold text-ff-green-ink active:scale-95"
          >
            Steal riuscito
            <span className="max-w-full truncate px-2 text-[11px] font-bold text-[#0B3A22]">round a {stealingName}</span>
          </button>
          <button
            type="button"
            onClick={() => resolve(false)}
            className="flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-[18px] bg-ff-red text-[15px] font-extrabold text-white active:scale-95"
          >
            Steal fallito
            <span className="max-w-full truncate px-2 text-[11px] font-bold text-[#FFE1E2]">round a {defendingName}</span>
          </button>
        </div>
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className="flex h-[46px] items-center justify-center gap-2 rounded-[14px] border border-ff-line bg-ff-surface text-sm font-bold active:scale-95 disabled:opacity-40"
        >
          <IconUndo />
          Annulla ultima azione
        </button>
      </div>
    </>
  );
}
