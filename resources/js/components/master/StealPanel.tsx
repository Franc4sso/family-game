import React from "react";
import { MAX_LIVES } from "@/utils/constants";
import type { Round, Team } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { IconEye, isGuessed } from "./parts";
import { FeudX, RankOval } from "../feud/parts";

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
export function StealPanel({ round, teamA, teamB, dispatch, onShowBoard }: StealPanelProps) {
  const stealing = round.activeTeam;
  const stealingName = stealing === "A" ? teamA.name : teamB.name;
  const defendingName = stealing === "A" ? teamB.name : teamA.name;

  const remaining = round.answers
    .map((answer, index) => ({ answer, index }))
    .filter(({ answer }) => !isGuessed(answer));

  const markGiven = (index: number) => dispatch({ type: "MARK_ANSWER_CORRECT", payload: { answerIndex: index } });
  const resolve = (success: boolean) => dispatch({ type: "STEAL_RESOLVE", payload: { success } });

  const answerRows = (
    <ol className="flex flex-col gap-1.5">
      {remaining.map(({ answer, index }) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => markGiven(index)}
            className={`feud-press flex min-h-[54px] w-full items-center gap-2.5 rounded-xl py-1.5 pr-1.5 pl-1 text-left ${
              answer.revealedInSteal ? "border-2 border-feud-coral bg-feud-deep" : "bg-feud-panel"
            }`}
          >
            <RankOval
              rank={answer.rank}
              className={answer.revealedInSteal ? "bg-feud-coral text-feud-coral-ink" : "bg-feud-yellow text-feud-ink"}
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-base font-bold">{answer.value}</span>
              <span className={`text-xs font-bold ${answer.revealedInSteal ? "text-feud-coral-soft" : "text-feud-muted-2"}`}>
                {answer.revealedInSteal ? "Già svelata sul tabellone" : "Ancora coperta"}
              </span>
            </span>
            <span className="flex h-10 shrink-0 items-center rounded-[10px] bg-white px-3 text-[13px] font-extrabold text-feud-ink">
              L’hanno detta
            </span>
          </button>
        </li>
      ))}
    </ol>
  );

  const verdict = (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => resolve(true)}
        className="feud-press flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl bg-feud-coral text-[15px] font-extrabold text-feud-coral-ink"
      >
        Furto riuscito
        <span className="max-w-full truncate px-2 text-[11px] font-bold text-feud-coral-ink-soft">round a {stealingName}</span>
      </button>
      <button
        type="button"
        onClick={() => resolve(false)}
        className="feud-press flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl border-2 border-white text-[15px] font-extrabold"
      >
        Furto fallito
        <span className="max-w-full truncate px-2 text-[11px] font-bold text-feud-muted">round a {defendingName}</span>
      </button>
    </div>
  );

  if (!round.stealRevealed) {
    return (
      <>
        <section className="flex flex-col gap-2 rounded-[22px] bg-feud-coral p-[18px] text-feud-coral-ink">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-[13px] font-extrabold">
              {MAX_LIVES} errori per {defendingName}
            </span>
            <span className="flex gap-1" aria-hidden>
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <span key={i} className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-feud-coral-ink text-feud-coral">
                  <FeudX size={10} strokeWidth={4} />
                </span>
              ))}
            </span>
          </div>
          <span className="font-feud text-[64px] leading-[0.8] font-black uppercase">Ruba!</span>
          <span className="text-sm leading-snug font-bold">
            Una sola risposta per {stealingName}. Fagliela dire, poi crea la suspense.
          </span>
        </section>

        <button
          type="button"
          onClick={() => {
            dispatch({ type: "STEAL_START_REVEAL" });
            onShowBoard();
          }}
          className="feud-press flex h-16 items-center gap-3 rounded-[18px] bg-white px-4 text-left text-feud-ink"
        >
          <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-feud-ink text-white">
            <IconEye size={20} />
          </span>
          <span className="flex flex-1 flex-col">
            <span className="text-base font-extrabold">Svela le risposte una alla volta</span>
            <span className="text-xs font-semibold text-feud-ink/70">Le tocchi tu sul tabellone, nell’ordine che vuoi</span>
          </span>
        </button>

        <div className="flex items-center gap-2.5 text-xs font-bold text-feud-muted-2">
          <span className="h-px flex-1 bg-feud-line" />
          <span>oppure verdetto subito</span>
          <span className="h-px flex-1 bg-feud-line" />
        </div>

        {verdict}

        <div className="flex items-center justify-between pt-1 text-[13px] font-bold text-feud-muted-2">
          <span>Ancora coperte · solo tu le vedi</span>
          <span>{remaining.length}</span>
        </div>
        {answerRows}
      </>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-1 rounded-[18px] border-2 border-feud-coral px-4 py-3.5">
        <span className="truncate font-feud text-[30px] leading-none font-black text-feud-coral uppercase">
          Verdetto · {stealingName}
        </span>
        <span className="text-sm leading-snug font-bold text-feud-muted">
          Tocca la risposta che hanno dato. Se non è in lista, il furto è fallito.
        </span>
      </section>

      {answerRows}

      <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-feud-deep pt-2 pb-1">
        <span className="text-center text-xs font-bold text-feud-muted-2">Il round va a chi vince il furto</span>
        {verdict}
      </div>
    </>
  );
}
