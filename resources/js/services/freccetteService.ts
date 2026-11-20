import type { FrecceAnswer, FrecceCategory } from "@/data/freccette/types";

export const FC_MIN_PLAYERS = 2;
export const FC_MAX_PLAYERS = 10;

/** Un lancio: chi ha tirato, cosa ha detto (null = fuori lista, turno perso) e come è cambiato il totale. */
export interface FrecceThrow {
  player: number;
  /** Indice della risposta nella categoria; null se non era in lista. */
  answer: number | null;
  value: number;
  /** La risposta c'era ma valeva più del tetto: fuori bersaglio, turno perso. */
  offBoard?: boolean;
  before: number;
  after: number;
  /** Lancio di spareggio: non tocca il totale. */
  tiebreak?: boolean;
}

export interface FrecceState {
  players: string[];
  category: FrecceCategory;
  /** Quanto manca a ciascuno per arrivare a 0 (può andare sotto). */
  scores: number[];
  /** Giro in corso, da 1. */
  giro: number;
  /** Chi deve lanciare ora. */
  turn: number;
  throws: FrecceThrow[];
  /** Risposte già dette in questa partita → chi le ha dette. */
  used: Record<number, number>;
  /** Spareggio in corso: i giocatori a pari valore, in ordine di lancio. */
  tiebreak: { players: number[]; round: number; values: (number | null)[] } | null;
  winner: number | null;
}

/** Minuscole, senza accenti, apostrofi e punteggiatura: "Città  d'Italia" → "citta d italia". */
export function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export interface FrecceHit {
  index: number;
  answer: FrecceAnswer;
  /** Nome alternativo che ha fatto scattare la corrispondenza, se non è il nome principale. */
  via?: string;
  usedBy: number | null;
}

/**
 * Cerca tra le risposte della categoria. Prima chi inizia con il testo scritto,
 * poi chi ha una parola che inizia così, poi chi lo contiene da qualche parte.
 */
export function searchAnswers(state: FrecceState, query: string, limit = 6): FrecceHit[] {
  const q = normalize(query);
  if (!q) return [];
  const scored: { hit: FrecceHit; rank: number }[] = [];
  state.category.answers.forEach((answer, index) => {
    let best: { rank: number; via?: string } | null = null;
    for (const label of [answer.name, ...(answer.aliases ?? [])]) {
      const n = normalize(label);
      const rank = n === q ? 0 : n.startsWith(q) ? 1 : (" " + n).includes(" " + q) ? 2 : n.includes(q) ? 3 : -1;
      if (rank >= 0 && (!best || rank < best.rank)) best = { rank, via: label === answer.name ? undefined : label };
    }
    if (best) scored.push({ hit: { index, answer, via: best.via, usedBy: state.used[index] ?? null }, rank: best.rank });
  });
  scored.sort((a, b) => a.rank - b.rank || a.hit.answer.name.localeCompare(b.hit.answer.name, "it"));
  return scored.slice(0, limit).map((s) => s.hit);
}

export function createFreccette(players: string[], category: FrecceCategory): FrecceState {
  return {
    players,
    category,
    scores: players.map(() => category.start),
    giro: 1,
    turn: 0,
    throws: [],
    used: {},
    tiebreak: null,
    winner: null,
  };
}

/** Classifica: chi è più vicino allo 0 (o più sotto) davanti. */
export function ranking(state: FrecceState): number[] {
  return state.players.map((_, i) => i).sort((a, b) => state.scores[a] - state.scores[b] || a - b);
}

/** Chi resta da far lanciare in questo giro (o in questo spareggio), escluso chi tira adesso. */
export function upcoming(state: FrecceState): number[] {
  if (state.winner !== null) return [];
  if (state.tiebreak) {
    const pos = state.tiebreak.players.indexOf(state.turn);
    return state.tiebreak.players.slice(pos + 1);
  }
  return state.players.map((_, i) => i).slice(state.turn + 1);
}

/** Lo spareggio lo vince il valore più alto; se è ancora pari si ripete tra chi è rimasto pari. */
function settleTiebreak(state: FrecceState, tb: NonNullable<FrecceState["tiebreak"]>): FrecceState {
  const vals = tb.values.map((v) => v ?? 0);
  const top = Math.max(...vals);
  const still = tb.players.filter((_, k) => vals[k] === top);
  if (still.length === 1) return { ...state, tiebreak: null, winner: still[0] };
  return { ...state, tiebreak: { players: still, round: tb.round + 1, values: still.map(() => null) }, turn: still[0] };
}

/** Fine giro: se qualcuno è arrivato a 0 o sotto vince chi è andato più sotto; a pari valore, spareggio. */
function closeGiro(state: FrecceState): FrecceState {
  const down = state.players.map((_, i) => i).filter((i) => state.scores[i] <= 0);
  if (down.length === 0) return { ...state, giro: state.giro + 1, turn: 0 };
  const lowest = Math.min(...down.map((i) => state.scores[i]));
  const tied = down.filter((i) => state.scores[i] === lowest);
  if (tied.length === 1) return { ...state, winner: tied[0] };
  return { ...state, tiebreak: { players: tied, round: 1, values: tied.map(() => null) }, turn: tied[0] };
}

/** Registra il lancio di chi è di turno. `answer` null = risposta fuori lista. */
export function throwDart(state: FrecceState, answer: number | null): FrecceState {
  if (state.winner !== null) return state;
  const player = state.turn;
  const raw = answer === null ? 0 : state.category.answers[answer].value;
  const offBoard = raw > state.category.max;
  // fuori bersaglio: la freccia non conta, ma la risposta è bruciata
  const value = offBoard ? 0 : raw;
  const used = answer === null ? state.used : { ...state.used, [answer]: player };

  if (state.tiebreak) {
    const tb = state.tiebreak;
    const pos = tb.players.indexOf(player);
    const values = tb.values.map((v, k) => (k === pos ? value : v));
    const score = state.scores[player];
    const next: FrecceState = {
      ...state,
      used,
      throws: [...state.throws, { player, answer, value, offBoard, before: score, after: score, tiebreak: true }],
      tiebreak: { ...tb, values },
    };
    if (pos < tb.players.length - 1) return { ...next, turn: tb.players[pos + 1] };
    return settleTiebreak(next, { ...tb, values });
  }

  const before = state.scores[player];
  const after = before - value;
  const next: FrecceState = {
    ...state,
    used,
    scores: state.scores.map((s, i) => (i === player ? after : s)),
    throws: [...state.throws, { player, answer, value, offBoard, before, after }],
  };
  if (player < state.players.length - 1) return { ...next, turn: player + 1 };
  return closeGiro(next);
}
