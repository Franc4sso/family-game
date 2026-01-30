import type { Round, Answer } from "@/types/game.types";

export function areAllAnswersRevealed(answers: Answer[]): boolean {
  return answers.every((ans) => ans.revealed);
}

export function calculateRoundPoints(answers: Answer[]): number {
  return answers
    .filter((ans) => ans.revealed)
    .reduce((sum, ans) => sum + (9 - ans.rank), 0);
}

export function determineRoundWinner(
  round: Round,
  stealSuccessful: boolean
): "A" | "B" {
  if (areAllAnswersRevealed(round.answers)) {
    return round.activeTeam;
  }
  if (round.state === "steal") {
    return stealSuccessful ? getOpponentTeam(round.activeTeam) : round.activeTeam;
  }
  return round.activeTeam;
}

export function getOpponentTeam(team: "A" | "B"): "A" | "B" {
  return team === "A" ? "B" : "A";
}
