import React from "react";
import { AstaScreen, IconHammer, LotPhoto, MonoLabel, Paddle } from "./parts";
import { ASTA_CATEGORY_LABELS } from "@/data/asta";
import type { AstaCategory } from "@/data/asta";
import { ASTA_LOTS_PER_TEAM, ASTA_MIN_BID, astaMaxBid, astaMissing } from "@/services/astaService";
import type { AstaState } from "@/types/game.types";

interface AstaBoardProps {
  state: AstaState;
  onOpenBanco: () => void;
  onExpandPhoto: () => void;
}

export const categoryLabel = (c: string) => ASTA_CATEGORY_LABELS[c as AstaCategory] ?? c;
export const lotLabel = (state: AstaState, lot: number) =>
  `LOTTO ${String(lot + 1).padStart(2, "0")}/${String(state.lots.length).padStart(2, "0")}`;

/** Tabellone per tutti: la foto intera, la scheda del lotto e le palette. */
export function AstaBoard({ state, onOpenBanco, onExpandPhoto }: AstaBoardProps) {
  const lot = state.lots[state.current];

  return (
    <AstaScreen padded={false}>
      <div className="flex h-[60px] items-center justify-between px-3.5">
        <span className="text-[22px] font-extrabold tracking-[-0.02em] text-asta-red">ASTA FOLLE</span>
        <span className="flex items-center gap-2">
          <MonoLabel className="text-xs">{lotLabel(state, state.current)}</MonoLabel>
          <button
            type="button"
            onClick={onOpenBanco}
            aria-label="Apri il banco del banditore"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-asta-line bg-asta-surface text-asta-mustard active:scale-95"
          >
            <IconHammer size={20} />
          </button>
        </span>
      </div>

      <LotPhoto src={lot.image} alt={lot.name} onExpand={onExpandPhoto} />

      {/* La scheda sta sotto la foto, senza coprirla: l'immagine resta intera */}
      <div className="mx-3 mt-3 flex flex-col gap-2 rounded-b-[20px] rounded-t-md bg-asta-cream px-4 pb-4 pt-3.5 text-asta-ink">
        <span className="font-asta-mono text-[11px] font-bold tracking-[0.1em] text-asta-brown">
          {categoryLabel(lot.category).toUpperCase()} · LOTTO {String(state.current + 1).padStart(2, "0")}
        </span>
        <h1 className="text-[23px] font-extrabold leading-[1.05] tracking-[-0.01em]">{lot.name}</h1>
        {lot.description && <p className="text-[13px] font-semibold leading-snug text-asta-ink-soft">{lot.description}</p>}
        {lot.clues.length > 0 && (
          <ul className="flex flex-col gap-1.5 border-t border-dashed border-[#C9B9A4] pt-2">
            {lot.clues.map((clue, i) => {
              const shown = i < state.cluesShown;
              return (
                <li key={i} className={`flex gap-2 text-sm font-bold ${shown ? "" : "text-[#A8988A]"}`}>
                  <span className={`font-asta-mono ${shown ? "text-asta-red" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                  {shown ? clue : "— nota ancora segreta —"}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mx-3 mt-3 flex h-[76px] items-center gap-3 rounded-full bg-asta-red pl-3 pr-[22px] text-asta-red-ink">
        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-asta-red-ink text-asta-red">
          <IconHammer size={26} />
        </span>
        <span className="flex flex-1 flex-col">
          <span className="font-asta-mono text-[11px] font-bold tracking-[0.1em] text-asta-red-soft">BASE D'ASTA</span>
          <span className="text-[19px] font-extrabold">Rilanciate a voce!</span>
        </span>
        <span className="text-5xl font-extrabold tracking-[-0.03em]">
          {ASTA_MIN_BID}
          <span className="ml-1 font-asta-mono text-sm font-bold">CR</span>
        </span>
      </div>

      <ul className={`mt-auto grid gap-x-2 gap-y-3 px-3 pb-4 pt-4 ${state.teams.length > 4 ? "grid-cols-3" : "grid-cols-4"}`}>
        {state.teams.map((team, i) => {
          const owned = ASTA_LOTS_PER_TEAM - astaMissing(state, i);
          const done = owned >= ASTA_LOTS_PER_TEAM;
          return (
            <li key={team.name} className={`flex flex-col items-center gap-1 ${done ? "opacity-60" : ""}`}>
              <Paddle team={team} index={i} size={40} />
              <span className="max-w-full truncate text-[13px] font-extrabold">{team.name}</span>
              <span className="font-asta-mono text-xs font-bold text-asta-mustard">{team.credits} cr</span>
              <span className="font-asta-mono text-[10px] text-asta-muted">{done ? "completa" : `max ${astaMaxBid(state, i)}`}</span>
              <span className="flex gap-[3px]" aria-label={`${owned} lotti su ${ASTA_LOTS_PER_TEAM}`}>
                {Array.from({ length: ASTA_LOTS_PER_TEAM }).map((_, s) => (
                  <span key={s} className={`h-1.5 w-3.5 rounded-full ${s < owned ? "bg-asta-cream" : "bg-asta-line"}`} />
                ))}
              </span>
            </li>
          );
        })}
      </ul>
    </AstaScreen>
  );
}
