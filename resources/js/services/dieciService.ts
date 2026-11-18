import { DIECI_THEMES, type DieciTheme } from "@/data/dieciThemes";

export const DL_MIN_PLAYERS = 3;
export const DL_MAX_PLAYERS = 10;
/** La "lode": bonus al capitano quando ogni giocatore è nella posizione esatta. */
export const DL_PERFECT_BONUS = 2;

export interface DieciRound {
  /** Indice del capitano tra i giocatori. */
  captain: number;
  theme: DieciTheme;
  /** Numero segreto per giocatore (0 per il capitano, che non pesca). */
  numbers: number[];
}

export interface DieciState {
  players: string[];
  scores: number[];
  /** Punti presi nell'ultima manche chiusa, per giocatore. */
  lastDeltas: number[];
  /** Se attivo, ogni posizione sbagliata toglie 1 punto al capitano. */
  penalty: boolean;
  totalRounds: number;
  roundIndex: number;
  deck: DieciTheme[];
  round: DieciRound;
  finished: boolean;
}

export interface DieciResult {
  /** Ordine vero, dal numero più basso al più alto. */
  truth: number[];
  /** Per ogni posizione scelta dal capitano: il giocatore è proprio lì? */
  exact: boolean[];
  hits: number;
  perfect: boolean;
  captainDelta: number;
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function deal(players: number, captain: number, theme: DieciTheme): DieciRound {
  const pool = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const numbers = Array.from({ length: players }, (_, i) => (i === captain ? 0 : pool.pop()!));
  return { captain, theme, numbers };
}

/** Pesca il prossimo tema; a mazzo finito lo rimescola. */
function draw(deck: DieciTheme[], avoid?: string): [DieciTheme, DieciTheme[]] {
  const rest = deck.length > 0 ? deck : shuffle(DIECI_THEMES.filter((t) => t.id !== avoid));
  return [rest[0], rest.slice(1)];
}

export function createDieci(players: string[], laps: number, penalty: boolean): DieciState {
  const [theme, deck] = draw(shuffle(DIECI_THEMES));
  return {
    players,
    scores: players.map(() => 0),
    lastDeltas: players.map(() => 0),
    penalty,
    totalRounds: players.length * laps,
    roundIndex: 0,
    deck,
    round: deal(players.length, 0, theme),
    finished: false,
  };
}

/** I giocatori da ordinare: tutti tranne il capitano. */
export function guestsOf(state: DieciState): number[] {
  return state.players.map((_, i) => i).filter((i) => i !== state.round.captain);
}

/** Cambia il tema della manche (prima di distribuire i numeri). */
export function changeTheme(state: DieciState): DieciState {
  const [theme, deck] = draw(state.deck, state.round.theme.id);
  return { ...state, deck, round: { ...state.round, theme } };
}

export function scoreRound(round: DieciRound, order: number[], penalty: boolean): DieciResult {
  const truth = [...order].sort((a, b) => round.numbers[a] - round.numbers[b]);
  const exact = order.map((p, i) => truth[i] === p);
  const hits = exact.filter(Boolean).length;
  const perfect = hits === order.length;
  const captainDelta = hits + (perfect ? DL_PERFECT_BONUS : 0) - (penalty ? order.length - hits : 0);
  return { truth, exact, hits, perfect, captainDelta };
}

/** Chiude la manche: +1 a ogni giocatore in posizione esatta, il resto al capitano. */
export function commitRound(state: DieciState, order: number[]): DieciState {
  const result = scoreRound(state.round, order, state.penalty);
  const lastDeltas = state.players.map(() => 0);
  order.forEach((p, i) => {
    if (result.exact[i]) lastDeltas[p] = 1;
  });
  lastDeltas[state.round.captain] = result.captainDelta;
  return { ...state, lastDeltas, scores: state.scores.map((s, i) => s + lastDeltas[i]) };
}

export function nextRound(state: DieciState): DieciState {
  const roundIndex = state.roundIndex + 1;
  if (roundIndex >= state.totalRounds) return { ...state, finished: true };
  const [theme, deck] = draw(state.deck, state.round.theme.id);
  return {
    ...state,
    roundIndex,
    deck,
    round: deal(state.players.length, roundIndex % state.players.length, theme),
  };
}

/** Classifica: indici dei giocatori dal punteggio più alto. */
export function ranking(state: DieciState): number[] {
  return state.players.map((_, i) => i).sort((a, b) => state.scores[b] - state.scores[a]);
}
