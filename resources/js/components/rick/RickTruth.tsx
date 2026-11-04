import React from "react";
import { FactText, Kicker, PrimaryButton, RickShell } from "./RickParts";
import { RICK_POINTS, joinNames, rickBalanced, rickGuessRight, rickTruthIndex, rickVotersOf, rickWriters } from "@/services/rickService";
import type { RickState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickTruthProps {
  state: RickState;
  dispatch: React.Dispatch<GameAction>;
}

/** La verità per ultima, con la spiegazione, poi la classifica del giro. */
export function RickTruth({ state, dispatch }: RickTruthProps) {
  const fact = state.fact!;
  const truth = rickTruthIndex(state);
  const guessed = rickVotersOf(state, truth).map((p) => (state.knew?.[p] ? `${state.players[p].name} (lo sapeva già)` : state.players[p].name));
  const everyone = guessed.length === rickWriters(state).length;
  const balanced = rickBalanced(state);
  const guessRight = rickGuessRight(state);
  const lastRound = state.round + 1 >= state.rounds || state.deck.length === 0;
  const nextRick = state.players[(state.round + 1) % state.players.length];

  const ranking = state.players.map((p, i) => ({ ...p, i, delta: state.deltas[i] ?? 0 })).sort((a, b) => b.score - a.score);

  const rickLine = balanced
    ? `Rick: ${guessed.length} su ${rickWriters(state).length}, fatto ben scelto`
    : everyone
      ? "Rick: l'hanno indovinata tutti, troppo facile"
      : "Rick: nessuno ci è arrivato, troppo difficile";

  return (
    <RickShell>
      <div className="rick-card flex -rotate-1 flex-col gap-2 rounded-3xl bg-rick-lime px-5 py-5 text-rick-plum">
        <Kicker>La {truth + 1} era vera</Kicker>
        <span className="font-rick text-[clamp(30px,10vw,40px)] leading-[1.05] break-words [overflow-wrap:anywhere]">{fact.answer}</span>
        <FactText text={fact.text} fill={fact.answer} className="text-[15px] leading-snug font-semibold" />
        <p className="m-0 border-t border-rick-plum/20 pt-2 text-sm leading-snug font-medium">{fact.explanation}</p>
      </div>

      <div className="flex flex-col gap-2 rounded-2xl bg-rick-panel px-3.5 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[15px] font-bold">
            {guessed.length === 0
              ? "Nessuno ha indovinato"
              : everyone
                ? "Hanno indovinato tutti"
                : `${joinNames(guessed)} ${guessed.length === 1 ? "ha indovinato" : "hanno indovinato"}`}
          </span>
          {guessed.length > 0 && <span className="font-rick text-[22px] text-rick-lime">+{RICK_POINTS.truth}</span>}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-rick-line pt-2">
          <span className="text-[15px] font-bold">{rickLine}</span>
          <span className={`font-rick text-[22px] ${balanced ? "text-rick-lime" : "text-rick-dim"}`}>
            +{balanced ? RICK_POINTS.rickBalance : 0}
          </span>
        </div>
        {guessRight && (
          <div className="flex items-center justify-between gap-3 border-t border-rick-line pt-2">
            <span className="text-[15px] font-bold">Rick ha indovinato l'autore</span>
            <span className="font-rick text-[22px] text-rick-lime">+{RICK_POINTS.rickAuthor}</span>
          </div>
        )}
      </div>

      <Kicker className="mt-1 text-rick-pink-soft">Classifica dopo il giro {state.round + 1}</Kicker>
      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        {ranking.map((p, pos) => {
          const first = pos === 0;
          return (
            <li
              key={p.i}
              className={`flex h-[52px] items-center gap-2.5 rounded-[14px] px-3.5 ${first ? "bg-rick-pink text-rick-plum" : "bg-rick-panel"}`}
            >
              <span className={`w-5 text-[15px] font-extrabold ${first ? "" : "text-rick-muted"}`}>{pos + 1}</span>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: p.color, boxShadow: first ? "0 0 0 1.5px var(--color-rick-plum)" : undefined }} aria-hidden />
              <span className="min-w-0 flex-1 truncate text-[17px] font-bold">
                {p.name}
                {p.i === state.rick && <span className={`ml-1.5 text-xs font-extrabold ${first ? "" : "text-rick-pink-soft"}`}>RICK</span>}
              </span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[13px] font-extrabold ${
                  p.delta > 0 ? "bg-rick-lime text-rick-plum" : first ? "" : "text-rick-muted"
                }`}
              >
                +{p.delta}
              </span>
              <span className="w-10 text-right font-rick text-2xl">{p.score}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto pt-1">
        <PrimaryButton onClick={() => dispatch({ type: "RICK_NEXT_ROUND" })}>
          {lastRound ? "Classifica finale" : `Prossimo giro · Rick: ${nextRick.name}`}
        </PrimaryButton>
      </div>
    </RickShell>
  );
}
