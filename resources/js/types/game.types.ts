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

export type GameMode = "master" | "no-master" | "rubo" | "mystery";

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

export interface GameState {
  gameMode: GameMode | null;
  teamA: Team;
  teamB: Team;
  rubo: RuboState | null;
  mystery: MysteryState | null;
  currentRound: Round | null;
  roundHistory: Round[];
}

export const initialGameState: GameState = {
  gameMode: null,
  teamA: { name: "", score: 0 },
  teamB: { name: "", score: 0 },
  rubo: null,
  mystery: null,
  currentRound: null,
  roundHistory: [],
};
