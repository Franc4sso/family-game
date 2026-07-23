import { HL_ITEMS, type HLItem, type HLCategory } from "@/data/higherLowerItems";

export const HL_CATEGORIES: HLCategory[] = [
  "Mondo",
  "Social",
  "Natura",
  "Sport",
  "Cinema",
  "Curiosità",
];

/** Numero di confronti in una catena. */
export const HL_CHAIN_LENGTH = 20;

/**
 * Rapporto minimo tra i due valori di una coppia.
 * Sotto questa soglia il confronto diventa una monetina: se due elementi
 * differiscono di meno del 15% nessuno può ragionarci sopra.
 */
const MIN_RATIO = 1.15;

/** Mescola un array (Fisher-Yates) senza mutare l'originale. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface HLPair {
  left: HLItem;
  right: HLItem;
}

/** Due elementi sono confrontabili se condividono l'unità e non sono quasi uguali. */
function comparable(a: HLItem, b: HLItem): boolean {
  if (a.unit !== b.unit) return false;
  if (a.id === b.id) return false;
  if (a.value === b.value) return false;

  // Con valori negativi (temperature sotto zero) il rapporto non ha senso:
  // in quel caso basta che siano diversi, cosa già verificata sopra.
  if (a.value <= 0 || b.value <= 0) return true;

  const ratio = Math.max(a.value, b.value) / Math.min(a.value, b.value);
  return ratio >= MIN_RATIO;
}

/** Elementi disponibili per la categoria scelta (`null` = tutte). */
function itemsForCategory(category: HLCategory | null): HLItem[] {
  return category === null
    ? HL_ITEMS
    : HL_ITEMS.filter((i) => i.category === category);
}

/**
 * Costruisce una catena di coppie da confrontare.
 *
 * Ogni coppia usa elementi non ancora apparsi nella catena, così la partita
 * non ripropone mai lo stesso confronto. Se gli elementi si esauriscono la
 * catena viene restituita più corta: lo schermo di setup mostra quanti
 * confronti sono davvero disponibili.
 */
export function buildHLChain(
  category: HLCategory | null,
  length: number = HL_CHAIN_LENGTH
): HLPair[] {
  const pool = shuffle(itemsForCategory(category));
  const used = new Set<string>();
  const pairs: HLPair[] = [];

  for (const left of pool) {
    if (pairs.length >= length) break;
    if (used.has(left.id)) continue;

    const partner = pool.find(
      (candidate) => !used.has(candidate.id) && comparable(left, candidate)
    );
    if (!partner) continue;

    used.add(left.id);
    used.add(partner.id);
    pairs.push({ left, right: partner });
  }

  return pairs;
}

/** Quanti confronti si riescono a costruire con la categoria scelta. */
export function countHLPairs(category: HLCategory | null): number {
  return buildHLChain(category, Number.MAX_SAFE_INTEGER).length;
}

/** `true` se la risposta data è quella corretta per la coppia. */
export function isGuessCorrect(pair: HLPair, guess: "higher" | "lower"): boolean {
  const rightIsHigher = pair.right.value > pair.left.value;
  return guess === "higher" ? rightIsHigher : !rightIsHigher;
}

/** Formatta un valore in modo leggibile: 1410000000 → "1,41 miliardi". */
export function formatValue(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000_000) {
    return `${sign}${trimZeros((abs / 1_000_000_000).toFixed(2))} miliardi`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${trimZeros((abs / 1_000_000).toFixed(1))} milioni`;
  }
  return value.toLocaleString("it-IT");
}

function trimZeros(text: string): string {
  return text.replace(/[.,]?0+$/, "").replace(".", ",");
}
