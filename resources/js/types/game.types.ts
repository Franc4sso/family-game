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
import type { HLPair } from "@/services/higherLowerService";

export type GameMode = "master" | "no-master" | "rubo" | "mystery" | "higher-lower";

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
 * Le due squadre si alternano sulla stessa catena: chi sbaglia interrompe
 * la catena e il round finisce. Il punto va a chi ha resistito.
 */
export interface HigherLowerState {
  chain: HLPair[];
  currentIndex: number;
  /** Squadra che deve rispondere al confronto corrente. */
  activeTeam: "A" | "B";
  /** Squadra che inizia il round successivo: si alterna a ogni round. */
  startingTeam: "A" | "B";
  /** Risposta data, in attesa di passare al confronto successivo. */
  lastGuess: { team: "A" | "B"; correct: boolean } | null;
  /** Risposte corrette consecutive nel round corrente. */
  streak: number;
  /** Catena più lunga raggiunta nella partita. */
  bestStreak: number;
  /** Round giocati finora. */
  roundsPlayed: number;
  /** Round totali previsti per la partita. */
  totalRounds: number;
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
