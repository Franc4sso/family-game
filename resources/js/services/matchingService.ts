import type { Answer } from "@/types/game.types";

/**
 * Normalizza una stringa per il confronto:
 * - lowercase
 * - trim
 * - rimuove accenti
 * - rimuove caratteri speciali
 */
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Rimuove diacritici/accenti
    .replace(/[^a-z0-9\s]/g, "") // Rimuove caratteri speciali
    .replace(/\s+/g, " "); // Normalizza spazi multipli
}

/**
 * Confronta l'input dell'utente con le risposte disponibili.
 * Ritorna l'indice della risposta se trovata, altrimenti null.
 *
 * @param input - La risposta scritta dall'utente
 * @param answers - Array delle risposte della categoria
 * @returns L'indice della risposta trovata, oppure null se non trovata
 */
export function matchAnswer(input: string, answers: Answer[]): number | null {
  const normalizedInput = normalizeString(input);

  if (normalizedInput === "") {
    return null;
  }

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];

    // Salta risposte già rivelate o bruciate
    if (answer.revealed || answer.burned) {
      continue;
    }

    // Confronta con il valore principale
    const normalizedValue = normalizeString(answer.value);
    if (normalizedInput === normalizedValue) {
      return i;
    }

    // Confronta con gli aliases (sinonimi)
    if (answer.aliases) {
      for (const alias of answer.aliases) {
        const normalizedAlias = normalizeString(alias);
        if (normalizedInput === normalizedAlias) {
          return i;
        }
      }
    }
  }

  return null;
}

/**
 * Trova la migliore risposta corrispondente per il face-off senza master.
 * Anche le risposte già rivelate vengono considerate (per il face-off).
 *
 * @param input - La risposta scritta dall'utente
 * @param answers - Array delle risposte della categoria
 * @returns Oggetto con l'indice della risposta e il rank, oppure null
 */
export function matchAnswerForFaceOff(
  input: string,
  answers: Answer[]
): { index: number; rank: number } | null {
  const normalizedInput = normalizeString(input);

  if (normalizedInput === "") {
    return null;
  }

  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];

    // Confronta con il valore principale
    const normalizedValue = normalizeString(answer.value);
    if (normalizedInput === normalizedValue) {
      return { index: i, rank: answer.rank };
    }

    // Confronta con gli aliases (sinonimi)
    if (answer.aliases) {
      for (const alias of answer.aliases) {
        const normalizedAlias = normalizeString(alias);
        if (normalizedInput === normalizedAlias) {
          return { index: i, rank: answer.rank };
        }
      }
    }
  }

  return null;
}
