import { MIN_TEAM_NAME_LENGTH, MAX_TEAM_NAME_LENGTH } from "./constants";

export function validateTeamName(name: string): string | null {
  const trimmed = name.trim();

  if (trimmed.length < MIN_TEAM_NAME_LENGTH) {
    return `Il nome deve contenere almeno ${MIN_TEAM_NAME_LENGTH} caratteri`;
  }

  if (trimmed.length > MAX_TEAM_NAME_LENGTH) {
    return `Il nome non può superare ${MAX_TEAM_NAME_LENGTH} caratteri`;
  }

  return null;
}

export function validateUniqueTeamNames(nameA: string, nameB: string): string | null {
  if (nameA.trim().toLowerCase() === nameB.trim().toLowerCase()) {
    return "Le squadre devono avere nomi diversi";
  }

  return null;
}
