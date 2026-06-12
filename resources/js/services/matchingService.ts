import type { Answer } from "@/types/game.types";

function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ");
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      dp[j] = a[i - 1] === b[j - 1]
        ? prev
        : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[n];
}

/**
 * Considera un match valido se la distanza di modifica è entro soglia:
 * - <= 4 caratteri: corrispondenza esatta
 * - 5-7 caratteri: 1 errore tollerato
 * - >= 8 caratteri: 2 errori tollerati
 */
function isMatch(input: string, target: string): boolean {
  if (input === target) return true;
  const maxLen = Math.max(input.length, target.length);
  const tolerance = maxLen <= 4 ? 0 : maxLen <= 7 ? 1 : 2;
  return tolerance > 0 && levenshteinDistance(input, target) <= tolerance;
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

    const normalizedValue = normalizeString(answer.value);
    if (isMatch(normalizedInput, normalizedValue)) {
      return i;
    }

    if (answer.aliases) {
      for (const alias of answer.aliases) {
        if (isMatch(normalizedInput, normalizeString(alias))) {
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

    const normalizedValue = normalizeString(answer.value);
    if (isMatch(normalizedInput, normalizedValue)) {
      return { index: i, rank: answer.rank };
    }

    if (answer.aliases) {
      for (const alias of answer.aliases) {
        if (isMatch(normalizedInput, normalizeString(alias))) {
          return { index: i, rank: answer.rank };
        }
      }
    }
  }

  return null;
}
