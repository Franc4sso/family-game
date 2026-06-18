# Modalità "Indovina il Personaggio Misterioso" — Design

**Data:** 2026-06-18
**Modalità:** `mystery` (quarta modalità di gioco)

## Sommario

Quiz condotto dal master su un solo telefono, due squadre. Per ogni personaggio
ci sono **esattamente 10 indizi**, ordinati dal più difficile al più facile. Il
master rivela un indizio alla volta. Più indizi servono, meno punti vale: il
valore corrente è `11 - indiziRivelati` (1 indizio = 10 pt … 10 indizi = 1 pt).
Quando una squadra indovina, il master assegna i punti correnti a quella squadra
e avanza al personaggio successivo. Tentativi liberi: nessun turno rigido, è il
master a decidere chi ha indovinato.

## Decisioni di design

- **Tentativi:** entrambe le squadre libere, il master assegna l'esito.
- **Punteggio:** `11 - indiziRivelati`. Nessuno indovina dopo 10 indizi → 0 pt.
- **Flusso:** mazzo di personaggi (come Rubo). A fine mazzo, schermata finale
  con vincitore/pareggio.
- **Pool:** mazzo unico mescolato, 70+ personaggi. `category` salvata nei dati
  solo come hint mostrato al master.
- **UI gioco:** indizi a cascata + pulsante "Rivela prossimo indizio". Nome
  nascosto con toggle "mostra a me". Badge punti correnti. Due pulsanti
  "Indovinato" (A blu / B rosso). Tasto "Nessuno → prossimo".
- **Indizi per personaggio:** esattamente 10.

## Architettura (rispecchia il pattern Rubo)

### 1. Dati — `resources/js/data/charactersQuestions.ts`

```ts
export type MysteryCategory =
  | "Attori" | "Cantanti" | "Serie TV" | "Marvel" | "Disney" | "Sport" | "Personaggi storici";

export interface MysteryCharacter {
  id: string;
  name: string;
  category: MysteryCategory;
  clues: string[]; // esattamente 10, ordinati difficile → facile
}

export const MYSTERY_CHARACTERS: MysteryCharacter[] = [ /* 70+ */ ];
```

`clues[0]` = indizio più criptico, `clues[9]` = il più ovvio.

### 2. Tipi — `resources/js/types/game.types.ts`

- `GameMode = "master" | "no-master" | "rubo" | "mystery"`
- Nuova interfaccia:
  ```ts
  export interface MysteryState {
    deck: MysteryCharacter[];
    currentIndex: number;
    cluesRevealed: number;   // parte da 1
    solvedBy: "A" | "B" | null;
  }
  ```
- `GameState` aggiunge `mystery: MysteryState | null`; `initialGameState.mystery = null`.

### 3. Azioni — `resources/js/types/actions.types.ts`

- `{ type: "START_MYSTERY"; payload: { deck: MysteryCharacter[] } }`
- `{ type: "MYSTERY_REVEAL_CLUE" }`
- `{ type: "MYSTERY_SOLVED"; payload: { team: "A" | "B" } }`
- `{ type: "MYSTERY_NEXT" }`

### 4. Reducer — `resources/js/reducers/gameReducer.ts`

- `START_MYSTERY` → `gameMode: "mystery"`, `mystery: { deck, currentIndex: 0, cluesRevealed: 1, solvedBy: null }`.
- `MYSTERY_REVEAL_CLUE` → `cluesRevealed = min(cluesRevealed + 1, 10)`.
- `MYSTERY_SOLVED` → idempotente come `RUBO_ASSIGN_OUTCOME`: se `solvedBy` già
  impostato, prima annulla i punti della squadra precedente, poi assegna
  `cluePoints(cluesRevealed)` alla nuova. Aggiorna `solvedBy`. (I punti sono
  congelati al numero di indizi correnti; rivelare altri indizi dopo aver
  assegnato non cambia i punti già dati — il master assegna e poi va avanti.)
- `MYSTERY_NEXT` → `currentIndex++`, `cluesRevealed: 1`, `solvedBy: null`.
- `CLEAR_MODE` / `RESET_GAME` azzerano anche `mystery: null`.

### 5. Servizio — `resources/js/services/mysteryService.ts`

```ts
export function buildMysteryDeck(): MysteryCharacter[]; // Fisher-Yates shuffle
export function cluePoints(cluesRevealed: number): number; // 11 - cluesRevealed
export function countMysteryCharacters(): number;
```

### 6. UI

**`resources/js/components/setup/MysterySetup.tsx`** (stile neutro scuro, come RuboSetup):
nomi squadre, conteggio personaggi, tasto "Inizia", tasto "Cambia modalità".

**`resources/js/components/game/MysteryScreen.tsx`**:
- Scoreboard A (blu) / B (rosso) in cima, con barra progresso mazzo.
- Nome personaggio nascosto + tasto 👁 "mostra a me" (toggle locale `useState`).
- Badge categoria (hint master).
- Lista indizi a cascata: mostra `clues.slice(0, cluesRevealed)`, numerati.
- Badge prominente "Vale {cluePoints} pt".
- Pulsante "Rivela prossimo indizio" (disabilitato a `cluesRevealed === 10`).
- Due pulsanti "Indovinato" — `MYSTERY_SOLVED` con `team`.
- Tasto "Nessuno → prossimo" / dopo assegnazione "Prossimo personaggio" → `MYSTERY_NEXT`.
- Tasto Undo (riusa `onUndo`/`canUndo`).
- Fine mazzo (`currentIndex >= deck.length`): schermata finale vincitore/pareggio
  + "Nuova partita" (`CLEAR_MODE`). Riuso layout RuboScreen.

### 7. Routing

- **`App.tsx`**: blocco `if (state.gameMode === "mystery")` dopo TeamSetup, come Rubo:
  se `!state.mystery` → `MysterySetup`, altrimenti `MysteryScreen`.
- **`HomeScreen.tsx`**: quarta card, gradiente indaco/viola, icona 🕵️.

## Note implementative

- `MysteryCharacter` esportato da `data/charactersQuestions.ts`, importato nei
  tipi via `import type` (come `RuboQuestion`).
- Validazione dati: ogni personaggio deve avere `clues.length === 10`.
- Nessun nuovo test framework (il progetto non ne ha); correttezza verificata
  con `npm run build` (type-check Vite/TS).
