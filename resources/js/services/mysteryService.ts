import {
  MYSTERY_CHARACTERS,
  type MysteryCharacter,
} from "@/data/charactersQuestions";

/** Numero massimo di indizi per personaggio. */
export const MYSTERY_MAX_CLUES = 10;

/** Mescola un array (Fisher-Yates) senza mutare l'originale. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Costruisce un mazzo mescolato di tutti i personaggi. */
export function buildMysteryDeck(): MysteryCharacter[] {
  return shuffle(MYSTERY_CHARACTERS);
}

/**
 * Punti correnti in base al numero di indizi rivelati.
 * 1 indizio = 10 pt, 2 = 9 pt, … 10 indizi = 1 pt.
 */
export function cluePoints(cluesRevealed: number): number {
  return MYSTERY_MAX_CLUES + 1 - cluesRevealed;
}

/** Numero di personaggi disponibili nel pool. */
export function countMysteryCharacters(): number {
  return MYSTERY_CHARACTERS.length;
}
