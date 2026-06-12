export interface Answer {
  rank: number;          // 1-8
  value: string;
  revealed: boolean;
  burned: boolean;
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

// ─── Modalità "Rubo" ───
import type { RuboQuestion } from "@/data/ruboQuestions";

export type GameMode = "feud" | "rubo";

export type RuboOutcome = "correct" | "wrong" | "steal_success" | "steal_fail";

export interface RuboState {
  deck: RuboQuestion[];
  currentIndex: number;
  answerRevealed: boolean;
  outcomeA: RuboOutcome | null;
  outcomeB: RuboOutcome | null;
}

export interface GameState {
  teamA: Team;
  teamB: Team;
  mode: GameMode | null;
  rubo: RuboState | null;
  currentRound: Round | null;
  roundHistory: Round[];
}

export const initialGameState: GameState = {
  teamA: { name: "", score: 0 },
  teamB: { name: "", score: 0 },
  mode: null,
  rubo: null,
  currentRound: null,
  roundHistory: [],
};
