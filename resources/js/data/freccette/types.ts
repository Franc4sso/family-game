/** Freccette Challenge: ogni categoria è una lista chiusa di risposte con un valore numerico verificato. */
export interface FrecceAnswer {
  /** Nome mostrato, in italiano. */
  name: string;
  /** Valore intero (> 0) che viene tolto dal totale. */
  value: number;
  /** Altri modi in cui i giocatori possono dirla (nomi alternativi, sigle, nomi inglesi diffusi). */
  aliases?: string[];
}

export interface FrecceCategory {
  id: string;
  /** Titolo breve della categoria, es. "Abitanti degli Stati". */
  title: string;
  /** Unità del valore, es. "milioni di abitanti". */
  unit: string;
  /** Spiegazione da leggere ad alta voce prima di iniziare (cosa conta, come si arrotonda). */
  rule: string;
  /** Numero di partenza. */
  start: number;
  /** Tetto del bersaglio: una risposta che vale di più è "fuori bersaglio" e fa perdere il turno. */
  max: number;
  /** Cifre decimali da mostrare: i valori restano interi (92 con decimals 1 si legge "9,2"). */
  decimals?: number;
  /** Fonte dei valori (nome + URL) e data di riferimento. */
  source: string;
  answers: FrecceAnswer[];
}
