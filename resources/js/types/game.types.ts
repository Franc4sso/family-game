export interface Answer {
  rank: number;          // 1-8
  value: string;
  revealed: boolean;
  burned: boolean;
  aliases?: string[];    // Sinonimi per matching automatico (modalità no-master)
}

export interface Round {
  category: string;
  answers: Answer[];
  activeTeam: "A" | "B";
  livesRemaining: number;
  state: "faceoff" | "choose" | "playing" | "steal" | "ended";
  faceOffWinner?: "A" | "B";
  passedToOpponent?: boolean; // true se il vincitore del face-off ha scelto di passare
}

export interface Team {
  name: string;
  score: number;
}

// ─── Modalità di gioco ───
import type { RuboQuestion } from "@/data/ruboQuestions";
import type { MysteryCharacter } from "@/data/charactersQuestions";
import type { HLItem } from "@/data/higherLowerItems";

export type GameMode = "master" | "no-master" | "rubo" | "mystery" | "higher-lower" | "guess-number";

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

export interface GameState {
  gameMode: GameMode | null;
  teamA: Team;
  teamB: Team;
  rubo: RuboState | null;
  mystery: MysteryState | null;
  higherLower: HigherLowerState | null;
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
  currentRound: null,
  roundHistory: [],
};
