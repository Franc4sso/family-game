# Modalità "Rubo" — Design

Data: 2026-06-12

## Obiettivo
Aggiungere una seconda modalità di gioco all'app (oggi solo "Family Feud"): il
**Rubo**, un quiz a bluff giocato in locale con l'host (il "master") che fa da
arbitro e tabellone su un unico dispositivo.

## Vincoli
- App 100% statica/locale (deploy Netlify), nessun backend, nessun database.
- Si gioca su un solo dispositivo (quello del master).
- Riuso delle 2 squadre già inserite in `TeamSetup`.

## Regole del gioco
1. L'app mostra una **domanda** di cultura/intrattenimento (visibile a tutti).
2. La **risposta corretta** è nota solo al master (nascosta, tap per sbirciare).
3. I giocatori scrivono la propria risposta sul telefono (fuori dall'app) e
   scelgono "Risposta" o "Rubo"; poi comunicano l'esito al master.
4. Il master assegna a ciascuna delle 2 squadre uno di 4 esiti:
   - Risposta corretta → **+1**
   - Risposta errata → **0**
   - Rubo riuscito → **+2**
   - Rubo fallito → **−1**
5. Passa alla domanda successiva (con reveal di risposta + spiegazione a tutti).

## Flusso schermate
```
TeamSetup → ModeSelect ─┬─ "Family Feud" → RoundSetup → … (flusso esistente)
                        └─ "Rubo" → RuboSetup → RuboScreen
```

## Banco domande
File statico `resources/js/data/ruboQuestions.ts`.
~300 domande in italiano (50 per categoria), struttura:
`{ id, question, answer, category, difficulty, explanation }`.
- Categorie: Cinema, Musica, Serie TV, Disney, Sport, Cultura Generale.
- Difficoltà: facile / media / difficile mescolate (il campo resta nei dati ma
  non è esposto come filtro all'utente).
- Ottimizzate per il bluff: una sola risposta corretta, breve, con trappole da
  "falsa sicurezza" (es. pianeta più caldo = Venere).
`RuboSetup` permette di filtrare per categoria (default: tutte) e costruisce un
mazzo mescolato.

## Stato e architettura
- `game.types.ts`: aggiunta di `mode: "feud" | "rubo" | null` e `rubo: RuboState | null`.
  ```ts
  type RuboOutcome = "correct" | "wrong" | "steal_success" | "steal_fail";
  interface RuboState {
    deck: RuboQuestion[];
    currentIndex: number;
    answerRevealed: boolean;
    outcomeA: RuboOutcome | null;
    outcomeB: RuboOutcome | null;
  }
  ```
- `actions.types.ts`: `SELECT_MODE`, `CLEAR_MODE`, `START_RUBO`, `RUBO_REVEAL_ANSWER`,
  `RUBO_ASSIGN_OUTCOME`, `RUBO_NEXT_QUESTION`.
- `gameReducer.ts`: i nuovi case. `RUBO_ASSIGN_OUTCOME` applica il delta punteggio
  alla squadra (gestendo la sostituzione di un esito già assegnato).
- L'undo globale (`useGameState`) copre anche le azioni Rubo (ogni dispatch è
  uno snapshot annullabile).
- Componenti nuovi: `setup/ModeSelect.tsx`, `setup/RuboSetup.tsx`,
  `game/RuboScreen.tsx`. Riuso di `Button`, `Card`, `TeamScoreboard`.
- `App.tsx`: routing aggiornato in base a `mode` e `rubo`.

## Fuori scope (eventuale fase 2)
Multiplayer realtime su più dispositivi, account, ranking online, anti-cheat,
generazione AI a runtime — richiederebbero un backend e sono un progetto separato.
