import React from "react";
import { AstaScreen, AstaWordmark, IconHammer, LotPhoto, Paddle } from "./parts";
import { ASTA_CATEGORY_LABELS } from "@/data/asta";
import type { AstaCategory } from "@/data/asta";
import { ASTA_LOTS_PER_TEAM, astaMissing } from "@/services/astaService";
import type { AstaState } from "@/types/game.types";

interface AstaBoardProps {
  state: AstaState;
  onOpenBanco: () => void;
  onExpandPhoto: () => void;
}

export const categoryLabel = (c: string) => ASTA_CATEGORY_LABELS[c as AstaCategory] ?? c;
export const lotNumber = (lot: number) => String(lot + 1).padStart(2, "0");
export const lotLabel = (state: AstaState, lot: number) => `Lotto ${lotNumber(lot)} di ${state.lots.length}`;

/**
 * La sala, per tutti: una pagina del catalogo con la foto intera, la scheda
 * del lotto e le palette con i crediti. Gli indizi li dà il banditore a voce.
 */
export function AstaBoard({ state, onOpenBanco, onExpandPhoto }: AstaBoardProps) {
  const lot = state.lots[state.current];

  return (
    <AstaScreen tone="paper">
      <header className="flex h-11 items-center justify-between">
        <AstaWordmark />
        <span className="flex items-center gap-2.5">
          <span className="font-asta-mono text-xs font-bold text-asta-ink-muted">{lotLabel(state, state.current)}</span>
          <button
            type="button"
            onClick={onOpenBanco}
            aria-label="Apri il banco del banditore"
            className="asta-press flex h-11 w-11 items-center justify-center rounded-full bg-asta-ink text-asta-mustard"
          >
            <IconHammer size={20} />
          </button>
        </span>
      </header>

      <LotPhoto src={lot.image} alt={lot.name} onExpand={onExpandPhoto} className="rounded-2xl" />

      <section className="flex flex-col gap-1.5 px-0.5">
        <span className="flex items-center gap-2">
          <span className="rounded-[5px] bg-asta-red px-2 pt-[3px] pb-0.5 font-asta-mono text-[11px] font-bold text-asta-red-ink">
            LOTTO {lotNumber(state.current)}
          </span>
          <span className="font-asta-mono text-[11px] font-bold text-asta-brown">{categoryLabel(lot.category).toUpperCase()}</span>
        </span>
        <h1 className="m-0 text-[25px] leading-[1.05] font-extrabold tracking-[-0.02em]">{lot.name}</h1>
        {lot.description && <p className="m-0 text-sm leading-snug font-medium text-asta-ink-soft">{lot.description}</p>}
      </section>

      <ul
        className={`m-0 mt-auto grid list-none gap-x-1.5 gap-y-3 p-0 pt-2 ${state.teams.length > 4 ? "grid-cols-3" : "grid-cols-4"}`}
        aria-label="Palette in sala"
      >
        {state.teams.map((team, i) => {
          const owned = ASTA_LOTS_PER_TEAM - astaMissing(state, i);
          const done = owned >= ASTA_LOTS_PER_TEAM;
          return (
            <li key={team.name} className={`flex min-w-0 flex-col items-center gap-[3px] ${done ? "opacity-45" : ""}`}>
              <Paddle team={team} index={i} size={40} handle />
              <span className="max-w-full truncate text-[13px] font-extrabold">{team.name}</span>
              <span className="text-[17px] leading-none font-extrabold">
                {team.credits} <span className="font-asta-mono text-[10px] text-asta-ink-muted">CR</span>
              </span>
              <span className="flex gap-[3px]" role="img" aria-label={done ? "Ha tutti i suoi lotti" : `${owned} lotti su ${ASTA_LOTS_PER_TEAM}`}>
                {Array.from({ length: ASTA_LOTS_PER_TEAM }).map((_, s) => (
                  <span key={s} className={`h-1.5 w-[13px] rounded-full ${s < owned ? "bg-asta-ink" : "bg-asta-paper-line"}`} />
                ))}
              </span>
            </li>
          );
        })}
      </ul>
    </AstaScreen>
  );
}
