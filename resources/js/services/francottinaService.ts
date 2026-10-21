import {
  FRANCOTTINA_WORDS,
  type FrancottinaCategory,
  type FrancottinaWord,
} from "@/data/francottinaWords";

/** Punti in base agli indizi visti: 1 parola = 3, 2 parole = 2, 3 parole = 1. */
export const FR_POINTS = [3, 2, 1] as const;
/** Tentativi a turno: uno per indizio, poi la parola è aperta a tutti. */
export const FR_TURNS = 3;
export const FR_MIN_TEAMS = 2;
export const FR_MAX_TEAMS = 6;
export const FR_TEAM_COLORS = ["#4f8cff", "#ff6b6b", "#3dd193", "#f5b83d", "#b07cff", "#ff8fd1"];

export interface FrTeam {
  name: string;
  score: number;
}

/**
 * - `guess`: una squadra alla volta, con 1, 2 o 3 indizi
 * - `open`: la terza squadra ha sbagliato, può rispondere chiunque altro (1 pt)
 * - `solved` / `failed`: round chiuso, soluzione visibile
 */
export type FrPhase = "guess" | "open" | "solved" | "failed";

export interface FrancottinaState {
  teams: FrTeam[];
  deck: FrancottinaWord[];
  round: number;
  /** Tentativo a turno corrente, da 0 a FR_TURNS - 1. */
  attempt: number;
  phase: FrPhase;
  winner: number | null;
  gained: number;
  finished: boolean;
}

export type FrAction =
  | { type: "right" }
  | { type: "wrong" }
  | { type: "steal"; team: number }
  | { type: "reveal" }
  | { type: "next" };

/** Mescola un array (Fisher-Yates) senza mutare l'originale. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export const FR_CATEGORIES: FrancottinaCategory[] = ["Classiche", "Film", "Serie TV", "Cartoni", "Musica"];

export function countFrancottinaWords(categories: FrancottinaCategory[] = FR_CATEGORIES): number {
  return FRANCOTTINA_WORDS.filter((w) => categories.includes(w.category)).length;
}

/** Mazzo mescolato delle categorie scelte, senza due parole con la stessa soluzione. */
function buildDeck(categories: FrancottinaCategory[], rounds: number): FrancottinaWord[] {
  const seen = new Set<string>();
  return shuffle(FRANCOTTINA_WORDS.filter((w) => categories.includes(w.category)))
    .filter((w) => !seen.has(w.answer) && seen.add(w.answer))
    .slice(0, rounds);
}

export function createFrancottina(names: string[], rounds: number, categories: FrancottinaCategory[]): FrancottinaState {
  return {
    teams: names.map((name) => ({ name, score: 0 })),
    deck: buildDeck(categories, rounds),
    round: 0,
    attempt: 0,
    phase: "guess",
    winner: null,
    gained: 0,
    finished: false,
  };
}

/** A ogni parola parte una squadra diversa. */
export function teamAt(s: FrancottinaState, attempt: number): number {
  return (s.round + attempt) % s.teams.length;
}

export function cluesAt(attempt: number): number {
  return Math.min(attempt + 1, 3);
}

export function pointsAt(attempt: number): number {
  return FR_POINTS[cluesAt(attempt) - 1];
}

export function isLive(s: FrancottinaState): boolean {
  return s.phase === "guess" || s.phase === "open";
}

/** Squadra che ha sbagliato con tutti e tre gli indizi: non può rispondere nella fase aperta. */
export function lastMissTeam(s: FrancottinaState): number {
  return teamAt(s, FR_TURNS - 1);
}

function award(s: FrancottinaState, team: number, points: number): FrancottinaState {
  return {
    ...s,
    teams: s.teams.map((t, i) => (i === team ? { ...t, score: t.score + points } : t)),
    phase: "solved",
    winner: team,
    gained: points,
  };
}

export function francottinaReducer(s: FrancottinaState, action: FrAction): FrancottinaState {
  switch (action.type) {
    case "right":
      if (s.phase !== "guess") return s;
      return award(s, teamAt(s, s.attempt), pointsAt(s.attempt));

    case "wrong":
      if (s.phase === "open") return { ...s, phase: "failed" };
      if (s.phase !== "guess") return s;
      if (s.attempt + 1 >= FR_TURNS) return { ...s, phase: "open" };
      return { ...s, attempt: s.attempt + 1 };

    case "steal":
      if (s.phase !== "open" || action.team === lastMissTeam(s)) return s;
      return award(s, action.team, FR_POINTS[FR_POINTS.length - 1]);

    case "reveal":
      return isLive(s) ? { ...s, phase: "failed" } : s;

    case "next":
      if (isLive(s)) return s;
      if (s.round + 1 >= s.deck.length) return { ...s, finished: true };
      return { ...s, round: s.round + 1, attempt: 0, phase: "guess", winner: null, gained: 0 };
  }
}
