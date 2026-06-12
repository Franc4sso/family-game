import {
  RUBO_QUESTIONS,
  type RuboQuestion,
  type RuboCategory,
  type RuboDifficulty,
} from "@/data/ruboQuestions";
import type { RuboOutcome } from "@/types/game.types";

export const RUBO_CATEGORIES: RuboCategory[] = [
  "Cinema",
  "Musica",
  "Serie TV",
  "Disney",
  "Sport",
  "Cultura Generale",
];

export const RUBO_DIFFICULTIES: RuboDifficulty[] = [
  "facile",
  "media",
  "difficile",
];

/** Punti assegnati per ciascun esito del Rubo. */
export const RUBO_POINTS: Record<RuboOutcome, number> = {
  correct: 1,
  wrong: 0,
  steal_success: 2,
  steal_fail: -1,
};

/** Mescola un array (Fisher-Yates) senza mutare l'originale. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Costruisce un mazzo di domande filtrato e mescolato.
 * `category` o `difficulty` a `null` significa "tutte".
 */
export function buildRuboDeck(
  category: RuboCategory | null,
  difficulty: RuboDifficulty | null
): RuboQuestion[] {
  const filtered = RUBO_QUESTIONS.filter(
    (q) =>
      (category === null || q.category === category) &&
      (difficulty === null || q.difficulty === difficulty)
  );
  return shuffle(filtered);
}

/** Numero di domande disponibili per i filtri scelti. */
export function countRuboQuestions(
  category: RuboCategory | null,
  difficulty: RuboDifficulty | null
): number {
  return RUBO_QUESTIONS.filter(
    (q) =>
      (category === null || q.category === category) &&
      (difficulty === null || q.difficulty === difficulty)
  ).length;
}
