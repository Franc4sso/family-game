import React from "react";
import { IconSliders, TopLabel, TopMark, TopScreen, TopStandings, teamInk } from "./parts";
import type { Top100Category } from "@/data/top100";
import { top100CurrentRound, top100CurrentTeam, top100TotalTurns } from "@/services/top100Service";
import type { Top100State, Top100Team } from "@/types/game.types";

interface Top100BoardProps {
  state: Top100State;
  category: Top100Category;
  onOpenControls: () => void;
}

/** Tabellone per tutti: chi tocca, punteggi e posizioni già trovate. */
export function Top100Board({ state, category, onOpenControls }: Top100BoardProps) {
  const current = top100CurrentTeam(state);
  const team = state.teams[current];
  const isLastTurn = state.answers.length + 1 >= top100TotalTurns(state);
  const next = state.teams[(current + 1) % state.teams.length];

  const foundBy = new Map<number, Top100Team>();
  state.answers.forEach((a) => {
    if (a.rank !== null) foundBy.set(a.rank, state.teams[a.team]);
  });

  return (
    <TopScreen>
      <header className="flex h-11 items-center justify-between">
        <span className="flex items-baseline gap-2">
          <TopMark />
          <span className="text-[13px] font-bold text-top-muted">
            Giro {top100CurrentRound(state)} di {state.rounds}
          </span>
        </span>
        <button
          type="button"
          onClick={onOpenControls}
          aria-label="Apri il pannello del master"
          className="top-press flex h-11 items-center gap-2 rounded-full border-[1.5px] border-top-line bg-top-panel px-3.5 text-sm font-extrabold text-top-gold"
        >
          <IconSliders />
          Master
        </button>
      </header>

      <section className="flex flex-col gap-1.5">
        <span className="text-xs font-extrabold tracking-[0.14em] text-top-gold uppercase">La classifica</span>
        <h1 className="m-0 font-top text-[26px] leading-[1.08] font-extrabold tracking-[-0.02em]">{category.name}</h1>
      </section>

      <TurnBanner team={team} subtitle={isLastTurn ? "Ultima risposta" : `Poi: ${next.name}`} />

      <TopStandings teams={state.teams} />

      <section className="flex flex-col gap-2">
        <TopLabel left="Posizioni trovate" right={`${foundBy.size} su ${category.items.length}`} />
        <div
          className="grid grid-cols-10 gap-[3px]"
          aria-label={`Posizioni trovate: ${[...foundBy.keys()].sort((a, b) => a - b).join(", ") || "nessuna"}`}
        >
          {category.items.map((item) => {
            const by = foundBy.get(item.rank);
            return (
              <span
                key={item.rank}
                className={`flex h-[27px] items-center justify-center rounded-md text-[10px] font-extrabold ${by ? "" : "bg-top-panel text-top-dim"}`}
                style={by ? { background: by.color, color: teamInk(by) } : undefined}
              >
                {item.rank}
              </span>
            );
          })}
        </div>
      </section>
    </TopScreen>
  );
}

/** La fascia di chi deve rispondere, nel colore della squadra. */
export function TurnBanner({ team, subtitle, label = "Tocca a" }: { team: Top100Team; subtitle?: string; label?: string }) {
  return (
    <div className="flex h-16 items-center gap-3 rounded-[18px] pr-4 pl-3.5" style={{ background: team.color, color: teamInk(team) }}>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-extrabold tracking-[0.1em] uppercase opacity-75">{label}</span>
        <span className="truncate font-top text-[22px] leading-tight font-extrabold">{team.name}</span>
      </span>
      {subtitle && <span className="max-w-[45%] shrink-0 truncate text-[13px] font-bold opacity-80">{subtitle}</span>}
    </div>
  );
}
