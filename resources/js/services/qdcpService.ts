import { QDCP_CARDS, type QdcpCard, type QdcpCategory } from "@/data/qdcpCards";
import type { QdcpState } from "@/types/game.types";

export const QDCP_MIN_TEAMS = 2;
export const QDCP_MAX_TEAMS = 6;

/** Colori delle squadre, leggibili sul verde e distinti dal lime della grafica. */
export const QDCP_TEAM_COLORS = ["#FFD166", "#FF8FA3", "#8FD3FF", "#C9A7FF", "#FFB067", "#F2F2F2"];

/** Gli indizi si svelano sempre in quest'ordine. */
export const QDCP_CLUE_LABELS = ["QUANDO", "DOVE", "COME", "PERCHÉ"] as const;
export const QDCP_MAX_CLUES = QDCP_CLUE_LABELS.length;

/** Scelte di lunghezza partita; `null` = tutte le carte. */
export const QDCP_DECK_SIZES: (number | null)[] = [10, 15, 20, null];

/** Mescola un array (Fisher-Yates) senza mutare l'originale. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Categorie nell'ordine in cui compaiono nel setup. */
export const QDCP_CATEGORIES: QdcpCategory[] = [
  "Film",
  "Canzone",
  "Personaggio",
  "Luogo",
  "Evento",
  "Oggetto",
  "Sport",
  "TV",
  "Cibo",
  "Concetto",
  "Cartone",
  "Videogioco",
  "Animale",
  "Libro",
  "Marchio",
  "Modo di dire",
  "Mestiere",
];

/** Mazzo mescolato con le sole categorie scelte, al massimo `size` carte (tutte se `null`). */
export function buildQdcpDeck(size: number | null, categories: QdcpCategory[]): QdcpCard[] {
  const deck = shuffle(QDCP_CARDS.filter((c) => categories.includes(c.category)));
  return size === null ? deck : deck.slice(0, size);
}

/** Carte disponibili con le categorie scelte. */
export function countQdcpCards(categories: QdcpCategory[] = QDCP_CATEGORIES): number {
  return QDCP_CARDS.filter((c) => categories.includes(c.category)).length;
}

export function countQdcpCategory(category: QdcpCategory): number {
  return QDCP_CARDS.filter((c) => c.category === category).length;
}

/** 1 indizio = 4 punti, 2 = 3, 3 = 2, 4 = 1. */
export function qdcpPoints(cluesShown: number): number {
  return QDCP_MAX_CLUES + 1 - cluesShown;
}

/** Squadre che possono ancora rispondere alla carta corrente. */
export function qdcpTeamsInPlay(state: QdcpState): number[] {
  return state.teams.map((_, i) => i).filter((i) => !state.out.includes(i));
}
