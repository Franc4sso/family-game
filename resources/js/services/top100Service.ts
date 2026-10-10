import { TOP100_CATEGORIES } from "@/data/top100";
import type { Top100Category, Top100Item } from "@/data/top100";
import type { Top100Scoring, Top100State } from "@/types/game.types";

export const TOP100_MIN_TEAMS = 2;
export const TOP100_MAX_TEAMS = 6;

/** Colori delle squadre, ben distinguibili anche tra loro. */
export const TOP100_TEAM_COLORS = ["#4C8DFF", "#FF7A45", "#2BB673", "#B79CFF", "#F472B6", "#22D3EE"];

export function getTop100Category(id: string | null): Top100Category | undefined {
  return TOP100_CATEGORIES.find((c) => c.id === id);
}

/**
 * Classico: la n. 1 vale 100 punti, la n. 100 vale 1.
 * Esperti: la n. 100 vale 100, premia le risposte meno ovvie.
 */
export function top100Points(rank: number | null, scoring: Top100Scoring): number {
  if (rank === null) return 0;
  return scoring === "classic" ? 101 - rank : rank;
}

/** Squadra di turno: si parte da startTeam e si gira in ordine. */
export function top100CurrentTeam(state: Top100State): number {
  return (state.startTeam + state.answers.length) % state.teams.length;
}

export function top100TotalTurns(state: Top100State): number {
  return state.teams.length * state.rounds;
}

export function top100CurrentRound(state: Top100State): number {
  return Math.min(Math.floor(state.answers.length / state.teams.length) + 1, state.rounds);
}

export const TOP100_MIN_ROUNDS = 1;
export const TOP100_MAX_ROUNDS = 10;

/** Giri minimi della classifica in corso: non si scende sotto quello già iniziato. */
export function top100MinRounds(state: Top100State): number {
  return Math.max(TOP100_MIN_ROUNDS, Math.ceil(state.answers.length / state.teams.length));
}

export const normalizeTop100 = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Voci che contengono il testo cercato nel nome o in un alias, dalla più alta. */
export function searchTop100(category: Top100Category, query: string, limit = 8): Top100Item[] {
  const q = normalizeTop100(query);
  if (!q) return [];
  return category.items
    .filter((item) => [item.value, ...(item.aliases ?? [])].some((name) => normalizeTop100(name).includes(q)))
    .slice(0, limit);
}
