import React from "react";
import { IconSliders, MasterScreen, SectionLabel } from "../master/parts";
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

  const foundBy = new Map<number, string>();
  state.answers.forEach((a) => {
    if (a.rank !== null) foundBy.set(a.rank, state.teams[a.team].color);
  });

  return (
    <MasterScreen>
      <div className="flex h-11 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[22px] text-ff-gold">TOP 100</span>
          <span className="flex h-6 items-center rounded-full bg-ff-surface-2 px-2.5 text-xs font-extrabold text-[#C9CFEA]">
            Giro {top100CurrentRound(state)} di {state.roundsPerCategory}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenControls}
          aria-label="Apri pannello master"
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-ff-line bg-ff-surface text-ff-gold active:scale-95"
        >
          <IconSliders />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 rounded-[22px] bg-ff-gold px-[18px] pb-[18px] pt-4 text-ff-gold-ink">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-gold-ink-soft">La classifica</span>
        <h1 className="font-display text-[23px] uppercase leading-[1.12]">{category.name}</h1>
      </div>

      <TurnBanner team={team} subtitle={isLastTurn ? "Ultima risposta" : `Poi: ${next.name}`} />

      <Standings teams={state.teams} />

      <SectionLabel left="Posizioni trovate" right={`${foundBy.size} su ${category.items.length}`} />

      <div className="grid grid-cols-10 gap-1" aria-label={`Posizioni trovate: ${[...foundBy.keys()].sort((a, b) => a - b).join(", ") || "nessuna"}`}>
        {category.items.map((item) => {
          const color = foundBy.get(item.rank);
          return color ? (
            <span key={item.rank} className="flex h-[30px] items-center justify-center rounded-[7px] text-xs font-extrabold text-ff-bg" style={{ background: color }}>
              {item.rank}
            </span>
          ) : (
            <span key={item.rank} className="flex h-[30px] items-center justify-center rounded-[7px] bg-ff-surface text-[11px] font-bold text-[#5B6386]">
              {item.rank}
            </span>
          );
        })}
      </div>
    </MasterScreen>
  );
}

export function TurnBanner({ team, subtitle, label = "Tocca a" }: { team: Top100Team; subtitle?: string; label?: string }) {
  return (
    <div className="flex h-14 items-center gap-3 rounded-2xl bg-[#1B2045] pl-2.5 pr-3.5" style={{ boxShadow: `0 0 0 2px ${team.color}` }}>
      <TeamBadge team={team} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-muted">{label}</span>
        <span className="truncate text-[17px] font-extrabold">{team.name}</span>
      </span>
      {subtitle && <span className="shrink-0 text-xs font-bold text-[#C9CFEA]">{subtitle}</span>}
    </div>
  );
}

export function TeamBadge({ team, size = 36 }: { team: Top100Team; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[10px] font-display text-ff-bg"
      style={{ background: team.color, width: size, height: size, fontSize: size * 0.44 }}
    >
      {team.name[0]?.toUpperCase()}
    </span>
  );
}

/** Punteggi ordinati dal primo all'ultimo. */
export function Standings({ teams, deltas }: { teams: Top100Team[]; deltas?: Map<string, number> }) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  return (
    <ol className="grid grid-cols-2 gap-2">
      {sorted.map((team, i) => {
        const delta = deltas?.get(team.name);
        return (
          <li key={team.name} className="flex h-[50px] items-center gap-2 rounded-[14px] border border-ff-line-soft bg-ff-surface pl-2 pr-3">
            <span className="w-[22px] text-center text-xs font-extrabold text-ff-muted">{i + 1}°</span>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: team.color }} />
            <span className="min-w-0 flex-1 truncate text-sm font-extrabold">{team.name}</span>
            {delta ? <span className="text-xs font-extrabold" style={{ color: team.color }}>+{delta}</span> : null}
            <span className="font-display text-lg">{team.score}</span>
          </li>
        );
      })}
    </ol>
  );
}
