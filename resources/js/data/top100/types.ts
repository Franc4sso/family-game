/**
 * Una classifica del gioco TOP 100: le squadre nominano una voce e
 * prendono punti in base alla sua posizione (0 se non è in classifica).
 */
export interface Top100Item {
  rank: number;          // 1-100
  value: string;         // nome mostrato sul tabellone
  detail?: string;       // dato che giustifica la posizione, es. "671 mln follower"
  aliases?: string[];    // altri modi in cui i giocatori possono dirlo
}

export type Top100Group = "persone" | "nomi" | "cinema-giochi" | "cibo" | "animali" | "musica" | "oggetti" | "web" | "mondo";

export interface Top100Category {
  id: string;
  name: string;          // es. "Le persone più seguite su Instagram"
  group: Top100Group;
  source: string;        // fonte dei dati, es. "Wikipedia (en), List of most-followed Instagram accounts"
  updatedAt: string;     // data dei dati, es. "2026-09"
  items: Top100Item[];   // esattamente 100, ordinati per rank
}
