import { HL_ITEMS, type HLItem, type HLCategory } from "@/data/higherLowerItems";

export const HL_CATEGORIES: HLCategory[] = [
  "Mondo",
  "Social",
  "Natura",
  "Sport",
  "Cinema",
  "Musica",
  "Cibo",
  "Storia",
  "Curiosità",
];

/**
 * Fascia di distanza fra due valori consecutivi della catena.
 *
 * Il gioco è divertente quando la risposta non è ovvia: due valori che
 * differiscono di dieci volte si indovinano senza pensare. La catena cerca
 * quindi coppie dentro `TIGHT`, e solo se non ne trova nessuna allarga fino a
 * `LOOSE`. Sotto `MIN_RATIO` invece è una monetina e va scartata.
 */
const MIN_RATIO = 1.03;
const TIGHT_RATIO = 1.7;
const LOOSE_RATIO = 4;

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
 * Rapporto fra due valori, sempre >= 1.
 *
 * Con valori negativi o nulli (temperature sotto zero) il rapporto non ha
 * senso: si usa la distanza rapportata alla scala dei due valori, così un
 * confronto -18 / -63 resta valutabile come "vicino" o "lontano".
 */
function distanceRatio(a: number, b: number): number {
  if (a === b) return 1;
  if (a > 0 && b > 0) return Math.max(a, b) / Math.min(a, b);

  const span = Math.abs(a - b);
  const scale = Math.max(Math.abs(a), Math.abs(b), 1);
  return 1 + span / scale;
}

/** Due elementi sono confrontabili se condividono l'unità e non sono quasi pari. */
function comparable(a: HLItem, b: HLItem, maxRatio: number): boolean {
  if (a.unit !== b.unit) return false;
  if (a.id === b.id) return false;
  if (a.value === b.value) return false;

  const ratio = distanceRatio(a.value, b.value);
  return ratio >= MIN_RATIO && ratio <= maxRatio;
}

/** Elementi disponibili per le categorie scelte (lista vuota = tutte). */
function itemsForCategories(categories: HLCategory[]): HLItem[] {
  if (categories.length === 0) return HL_ITEMS;
  const wanted = new Set(categories);
  return HL_ITEMS.filter((i) => wanted.has(i.category));
}

/**
 * Costruisce la catena di elementi da confrontare a coppie consecutive.
 *
 * L'elemento indovinato resta a schermo come nuovo riferimento e ne entra un
 * altro: la catena è quindi una sequenza in cui ogni elemento va confrontato
 * col precedente. Nessun elemento si ripete, così una partita non ripropone
 * mai lo stesso confronto.
 *
 * A ogni passo si preferisce un vicino dentro `TIGHT_RATIO`; solo se il pool
 * non ne offre nessuno si allarga a `LOOSE_RATIO` e infine a qualunque
 * elemento della stessa unità. La catena si ferma quando l'unità corrente non
 * ha più elementi liberi: proseguire con un'unità diversa produrrebbe un
 * confronto senza senso (abitanti contro chilogrammi).
 *
 * Il punto di partenza viene scelto fra i gruppi di unità più ricchi, così la
 * catena non muore dopo tre confronti solo perché è partita da un'unità con
 * pochi elementi.
 */
export function buildHLChain(
  categories: HLCategory[],
  maxLength: number = 400
): HLItem[] {
  const pool = shuffle(itemsForCategories(categories));
  if (pool.length === 0) return [];

  const remaining = new Map(pool.map((i) => [i.id, i]));
  const chain: HLItem[] = [];

  let current = pickStart(pool);
  remaining.delete(current.id);
  chain.push(current);

  while (chain.length < maxLength) {
    const candidates = [...remaining.values()];

    const next =
      pickNeighbour(current, candidates, TIGHT_RATIO) ??
      pickNeighbour(current, candidates, LOOSE_RATIO) ??
      pickNeighbour(current, candidates, Number.POSITIVE_INFINITY);

    if (!next) break;

    remaining.delete(next.id);
    chain.push(next);
    current = next;
  }

  return chain;
}

/**
 * Sceglie l'elemento iniziale pesando i gruppi di unità per dimensione.
 *
 * Le unità con molti elementi generano catene lunghe, quindi partire da lì è
 * quasi sempre preferibile. Fra i gruppi più grandi si pesca a caso per non
 * iniziare ogni partita dalla stessa unità.
 */
function pickStart(pool: HLItem[]): HLItem {
  const byUnit = new Map<string, HLItem[]>();
  for (const item of pool) {
    const group = byUnit.get(item.unit);
    if (group) group.push(item);
    else byUnit.set(item.unit, [item]);
  }

  const groups = [...byUnit.values()].sort((a, b) => b.length - a.length);
  const best = groups.filter((g) => g.length >= groups[0].length * 0.6);
  const group = best[Math.floor(Math.random() * best.length)];
  return group[Math.floor(Math.random() * group.length)];
}

/**
 * Sceglie fra i candidati confrontabili quello più vicino al riferimento.
 *
 * Fra i vicini validi ne prende uno dei tre più stretti a caso: prendere
 * sempre il più stretto renderebbe ogni partita quasi identica alle altre.
 */
function pickNeighbour(
  current: HLItem,
  candidates: HLItem[],
  maxRatio: number
): HLItem | null {
  const valid = candidates
    .filter((c) => comparable(current, c, maxRatio))
    .sort(
      (a, b) =>
        distanceRatio(current.value, a.value) - distanceRatio(current.value, b.value)
    );

  if (valid.length === 0) return null;
  const window = valid.slice(0, 3);
  return window[Math.floor(Math.random() * window.length)];
}

/**
 * Confronti tipici di una partita con le categorie scelte.
 *
 * La lunghezza dipende dall'unità di partenza, quindi varia fra una catena e
 * l'altra: si costruiscono più catene e si prende la mediana, così il numero
 * mostrato a setup è stabile e realistico.
 */
export function countHLComparisons(categories: HLCategory[]): number {
  const lengths = Array.from({ length: 7 }, () => buildHLChain(categories).length - 1)
    .map((n) => Math.max(0, n))
    .sort((a, b) => a - b);
  return lengths[Math.floor(lengths.length / 2)];
}

/** `true` se la risposta data è quella corretta per il confronto. */
export function isGuessCorrect(
  reference: HLItem,
  challenger: HLItem,
  guess: "higher" | "lower"
): boolean {
  const isHigher = challenger.value > reference.value;
  return guess === "higher" ? isHigher : !isHigher;
}

/** Quanto sono vicini due valori, per marcare i confronti al fotofinish. */
export function isTightCall(a: HLItem, b: HLItem): boolean {
  return distanceRatio(a.value, b.value) < 1.15;
}

/** Formatta un valore in modo leggibile: 1410000000 → "1,41 miliardi". */
export function formatValue(value: number, unit?: string): string {
  // Gli anni non vanno abbreviati né puntati: 1969, non "1.969".
  if (unit === "anno") return String(value);

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
