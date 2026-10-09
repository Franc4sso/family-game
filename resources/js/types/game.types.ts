export interface Answer {
  rank: number;          // 1-8
  value: string;
  revealed: boolean;
  burned: boolean;
  aliases?: string[];    // Sinonimi per matching automatico (modalità no-master)
  revealedInSteal?: boolean; // Svelata dal master durante lo steal, non indovinata
}

export interface Round {
  category: string;
  answers: Answer[];
  activeTeam: "A" | "B";
  livesRemaining: number;
  state: "faceoff" | "choose" | "playing" | "steal" | "ended";
  faceOffWinner?: "A" | "B";
  passedToOpponent?: boolean; // true se il vincitore del face-off ha scelto di passare
  stealRevealed?: boolean; // true se il master sta svelando le risposte prima del verdetto dello steal
  stealOutcome?: "success" | "fail"; // come è finito lo steal, se c'è stato
  stealAnswerIndex?: number; // risposta data dalla squadra che ha rubato
}

export interface Team {
  name: string;
  score: number;
}

// ─── Modalità di gioco ───
import type { RuboQuestion } from "@/data/ruboQuestions";
import type { MysteryCharacter } from "@/data/charactersQuestions";
import type { HLItem } from "@/data/higherLowerItems";

export type GameMode =
  | "master"
  | "no-master"
  | "rubo"
  | "mystery"
  | "higher-lower"
  | "guess-number"
  | "top100"
  | "asta";

export type RuboOutcome = "correct" | "wrong" | "steal_success" | "steal_fail";

export interface RuboState {
  deck: RuboQuestion[];
  currentIndex: number;
  answerRevealed: boolean;
  outcomeA: RuboOutcome | null;
  outcomeB: RuboOutcome | null;
}

export interface MysteryState {
  deck: MysteryCharacter[];
  currentIndex: number;
  cluesRevealed: number;        // parte da 1
  solvedBy: "A" | "B" | null;
}

/**
 * Stato di "Più alto o più basso".
 *
 * La catena è una sequenza di elementi: ogni elemento va confrontato col
 * precedente. Quando la risposta è giusta l'elemento indovinato diventa il
 * nuovo riferimento e ne entra un altro, così la catena scorre in avanti.
 *
 * Non ci sono round: si va a morte immediata. Le squadre si alternano e la
 * prima che sbaglia perde la partita.
 */
export interface HigherLowerState {
  /** Elementi in sequenza: si confrontano a coppie consecutive. */
  chain: HLItem[];
  /** Posizione del riferimento attuale nella catena. */
  currentIndex: number;
  /** Squadra che deve rispondere al confronto corrente. */
  activeTeam: "A" | "B";
  /** Risposta data, in attesa di far scorrere la catena. */
  lastGuess: { team: "A" | "B"; correct: boolean } | null;
  /** Confronti indovinati di fila dall'inizio della partita. */
  streak: number;
  /** Risposte giuste date da ciascuna squadra. */
  correctByTeam: { A: number; B: number };
  /** Squadra che ha sbagliato e ha perso la partita. */
  loser: "A" | "B" | null;
  /** `true` quando la catena è esaurita senza errori. */
  exhausted: boolean;
}

// ─── TOP 100 ───

export type Top100Scoring = "classic" | "expert";

export interface Top100Team {
  name: string;
  color: string;
  score: number;
}

export interface Top100Answer {
  team: number;          // indice in teams
  said: string;          // cosa ha detto la squadra (testo del master)
  rank: number | null;   // posizione in classifica, null se fuori
  points: number;
  skipped?: boolean;
}

/**
 * Stato di "TOP 100": più squadre, a turno nominano una voce della
 * classifica e prendono punti in base alla posizione.
 */
export interface Top100State {
  teams: Top100Team[];
  scoring: Top100Scoring;
  roundsPerCategory: number;
  phase: "choose" | "playing" | "result" | "end";
  categoryId: string | null;
  /** Squadra che apre la classifica corrente: ruota a ogni classifica. */
  startTeam: number;
  answers: Top100Answer[];
  playedCategoryIds: string[];
}

// ─── ASTA FOLLE ───

export interface AstaLot {
  id: string;
  name: string;
  category: string;
  description: string;
  clues: string[];
  value: number;         // euro, segreto fino alla rivelazione
  image: string;         // url (catalogo) o data URL (foto del master)
  custom?: boolean;      // aggiunto dal master
}

export interface AstaTeam {
  name: string;
  color: string;
  credits: number;
}

export interface AstaSale {
  lot: number;           // indice in lots
  team: number;          // indice in teams
  price: number;         // crediti pagati
}

/**
 * Stato di "Asta Folle": le squadre rilanciano a voce, il master registra
 * solo chi si aggiudica il lotto e a quanto.
 */
export interface AstaState {
  teams: AstaTeam[];
  bonuses: { affare: boolean; bidone: boolean };
  lots: AstaLot[];
  current: number;       // lotto all'asta
  cluesShown: number;    // note del banditore già svelate per il lotto corrente
  sales: AstaSale[];
  unsold: number[];
  phase: "auction" | "sold" | "reveal" | "final";
  revealIndex: number;   // indice in sales durante la rivelazione
}

export interface GameState {
  gameMode: GameMode | null;
  teamA: Team;
  teamB: Team;
  rubo: RuboState | null;
  mystery: MysteryState | null;
  higherLower: HigherLowerState | null;
  top100: Top100State | null;
  asta: AstaState | null;
  currentRound: Round | null;
  roundHistory: Round[];
}

export const initialGameState: GameState = {
  gameMode: null,
  teamA: { name: "", score: 0 },
  teamB: { name: "", score: 0 },
  rubo: null,
  mystery: null,
  higherLower: null,
  top100: null,
  asta: null,
  currentRound: null,
  roundHistory: [],
};
