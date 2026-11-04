import { RICK_FACTS, type RickFact } from "@/data/rickFacts";
import type { RickState } from "@/types/game.types";

export const RICK_MIN_PLAYERS = 3;
export const RICK_MAX_PLAYERS = 10;

/** Quante volte a testa si fa Rick: i giri totali sono sempre un multiplo dei giocatori. */
export const RICK_TURNS_EACH = [1, 2, 3] as const;

/** Fatti tra cui Rick sceglie a ogni giro. */
export const RICK_OPTIONS = 3;

export const RICK_MAX_ANSWER_LENGTH = 40;

/** Punti: verità indovinata, ogni amico ingannato, bonus di Rick. */
export const RICK_POINTS = { truth: 2, fooled: 1, rickBalance: 2, rickAuthor: 2 } as const;

/** Colori dei giocatori, leggibili sul prugna e distinti dal fucsia della grafica. */
export const RICK_PLAYER_COLORS = [
  "#D7F45B",
  "#7FD8FF",
  "#FFB067",
  "#C9A7FF",
  "#7CF0B0",
  "#FFE066",
  "#FF9E9E",
  "#9EB8FF",
  "#F2F2F2",
  "#E0B3FF",
];

/** Lo spazio vuoto nei testi dei fatti. */
export const RICK_BLANK = "______";

/** Mescola un array (Fisher-Yates) senza mutare l'originale. */
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Mazzo mescolato; i fatti +18 entrano solo se richiesti. */
export function buildRickDeck(spicy: boolean): RickFact[] {
  return shuffle(RICK_FACTS.filter((f) => spicy || !f.spicy));
}

export function countRickFacts(spicy: boolean): number {
  return RICK_FACTS.filter((f) => spicy || !f.spicy).length;
}

/** Testo confrontabile: minuscolo, senza accenti, punteggiatura e spazi doppi. */
export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/(\d)[.,](?=\d)/g, "$1") // 8.000 → 8000
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Parole che non dicono niente sul contenuto: articoli, preposizioni, possessivi. */
const FILLER_WORDS = new Set(
  (
    "il lo la i gli le l un uno una d di a da in con su per tra fra e ed o che " +
    "del dello della dei degli delle dell al allo alla ai agli alle all dal dallo dalla dai dagli dalle dall " +
    "nel nello nella nei negli nelle nell sul sullo sulla sui sugli sulle sull " +
    "suo sua suoi sue mio mia miei mie tuo tua tuoi tue loro proprio propria"
  ).split(" "),
);

const NUMBER_WORDS: Record<string, string> = {
  zero: "0", due: "2", tre: "3", quattro: "4", cinque: "5", sei: "6", sette: "7", otto: "8", nove: "9", dieci: "10",
  undici: "11", dodici: "12", tredici: "13", quattordici: "14", quindici: "15", sedici: "16", diciassette: "17",
  diciotto: "18", diciannove: "19", venti: "20", trenta: "30", quaranta: "40", cinquanta: "50", cento: "100", mille: "1000",
};

/** Le parole che contano, con i numeri scritti in lettere portati in cifre. */
function keyWords(text: string): string[] {
  return normalizeAnswer(text)
    .split(" ")
    .filter((w) => w && !FILLER_WORDS.has(w))
    .map((w) => NUMBER_WORDS[w] ?? w);
}

/** Stessa parola o una sua variante ("paese"/"paesino", "vita"/"vite"); i numeri devono coincidere. */
function sameWord(a: string, b: string): boolean {
  if (a === b) return true;
  if (/\d/.test(a) || /\d/.test(b)) return false;
  const shorter = Math.min(a.length, b.length);
  if (shorter < 4) return false;
  let common = 0;
  while (common < shorter && a[common] === b[common]) common++;
  return common >= Math.max(3, shorter - 1) || (common >= 4 && common >= shorter - 2 && shorter >= 5);
}

/**
 * La risposta è la verità, o ci va così vicino che conta come indovinata:
 * contiene quasi tutte le parole importanti della verità, e non è fatta
 * soprattutto di altro.
 */
export function isTruth(text: string, fact: RickFact): boolean {
  if (normalizeAnswer(text) === normalizeAnswer(fact.answer)) return true;
  const truth = keyWords(fact.answer);
  const guess = keyWords(text);
  if (truth.length === 0 || guess.length === 0) return false;
  const matched = truth.filter((t) => guess.some((g) => sameWord(t, g)));
  // Un numero sbagliato cambia la risposta: "tre volte" non è "sette volte"
  const guessHasNumber = guess.some((g) => /\d/.test(g));
  if (guessHasNumber && truth.some((t) => /\d/.test(t) && !matched.includes(t))) return false;
  const needed = truth.length <= 2 ? truth.length : Math.ceil(truth.length * 0.66);
  return matched.length >= needed && matched.length / guess.length > 0.5;
}

/** Chi scrive in questo giro, nell'ordine in cui riceve il telefono: tutti tranne Rick, a partire da chi gli siede dopo. */
export function rickWriters(state: Pick<RickState, "players" | "rick">): number[] {
  const n = state.players.length;
  return Array.from({ length: n - 1 }, (_, i) => (state.rick + 1 + i) % n);
}

/** Indici delle risposte inventate (la verità ha `authors` vuoto). */
export function rickFakeIndexes(state: RickState): number[] {
  return state.answers.map((_, i) => i).filter((i) => state.answers[i].authors.length > 0);
}

export function rickTruthIndex(state: RickState): number {
  return state.answers.findIndex((a) => a.authors.length === 0);
}

/** Chi ha votato la risposta `answer`. */
export function rickVotersOf(state: RickState, answer: number): number[] {
  return state.votes.map((v, p) => (v === answer ? p : -1)).filter((p) => p >= 0);
}

/** Le risposte inventate si scoprono dalla meno votata alla più votata; la verità per ultima. */
export function rickRevealOrder(state: RickState): number[] {
  return rickFakeIndexes(state)
    .map((i) => ({ i, votes: rickVotersOf(state, i).length }))
    .sort((a, b) => a.votes - b.votes || a.i - b.i)
    .map((x) => x.i);
}

export function rickGuessRight(state: RickState): boolean {
  const g = state.guess;
  return !!g && !!state.answers[g.answer]?.authors.includes(g.player);
}

/** La verità indovinata da qualcuno, ma non da tutti: il fatto era ben scelto. */
export function rickBalanced(state: RickState): boolean {
  const truthVotes = rickVotersOf(state, rickTruthIndex(state)).length;
  return truthVotes > 0 && truthVotes < rickWriters(state).length;
}

/** Punti del giro per ogni giocatore. */
export function rickRoundDeltas(state: RickState): number[] {
  const deltas = state.players.map(() => 0);
  const truth = rickTruthIndex(state);
  state.votes.forEach((vote, player) => {
    if (vote === null) return;
    if (vote === truth) deltas[player] += RICK_POINTS.truth;
    else state.answers[vote]?.authors.forEach((a) => (deltas[a] += RICK_POINTS.fooled));
  });
  if (rickBalanced(state)) deltas[state.rick] += RICK_POINTS.rickBalance;
  if (rickGuessRight(state)) deltas[state.rick] += RICK_POINTS.rickAuthor;
  return deltas;
}

/** Elenco di nomi all'italiana: "Marco", "Marco e Sara", "Marco, Luca e Sara". */
export function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`;
}

export const pointsLabel = (p: number) => `${p} ${p === 1 ? "punto" : "punti"}`;
