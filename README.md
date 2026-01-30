RUOLO

Agisci come Senior Software Engineer + Game Systems Designer con esperienza in:

web app da palco / live show

party game

UX per schermi condivisi

logica di gioco deterministica

Devi costruire una web app pronta per l’uso reale, non un PoC.

OBIETTIVO

Sviluppare una web app party game in modalità CONDUTTORE, stile Family Feud, pensata per essere:

aperta da browser

proiettata su TV / schermo

controllata da un solo conduttore

usata da persone non tecniche

L’app deve essere robusta, chiara, senza ambiguità di gioco.

STACK TECNICO (OBBLIGATORIO)

React + TypeScript
(Next.js ammesso ma NON necessario)

Stato locale (useState / useReducer)

Nessuna autenticazione

Nessun database

UI semplice, leggibile da 3–5 metri

Codice modulare e commentato

PRINCIPI NON NEGOZIABILI

Il conduttore controlla tutto

I giocatori non inseriscono input

Il gioco non decide mai al posto del conduttore

L’app deve prevenire errori evidenti

Tutto deve essere difendibile a voce durante il gioco

MODELLO DI GIOCO – REGOLE VINCOLANTI
Squadre

Sempre 2 squadre

Ogni squadra ha:

name: string

score: number (persistente tra round)

Round

Ogni round ha:

1 categoria

1 classifica Top 8

1 squadra che inizia (Squadra Attiva)

Vite

3 vite per round

Le vite:

appartengono SOLO alla Squadra Attiva

vengono perse SOLO dalla Squadra Attiva

La squadra che ruba NON ha vite

FLUSSO DI GIOCO (OBBLIGATORIO)
1️⃣ Determinazione Squadra Attiva

Il conduttore inserisce:

risposta capitano Squadra A

risposta capitano Squadra B

L’app confronta le due risposte con la classifica Top 8

La risposta con rank più alto vince

La squadra vincente:

diventa Squadra Attiva

riceve 3 vite

2️⃣ Turno Squadra Attiva

Per ogni risposta data da un giocatore (fuori app):

Il conduttore deve poter scegliere:

✅ Risposta corretta

❌ Risposta sbagliata

Risposta corretta

Se la risposta è presente nella classifica:

viene rivelata la casella corretta

la risposta diventa bruciata

non può essere usata nella rubata

il round continua

Risposta sbagliata

viene persa 1 vita

a 0 vite → fine turno Squadra Attiva

3️⃣ Rubata (Squadra Avversaria)

Dopo che la Squadra Attiva perde 3 vite:

la Squadra Avversaria discute liberamente

fornisce UNA sola risposta

il conduttore la valuta

Se la risposta:

è presente nella classifica

NON è già bruciata
→ vince la Squadra Avversaria

Altrimenti:
→ vince la Squadra Attiva

CONDIZIONI DI VITTORIA ROUND
Vince la Squadra Attiva se:

vengono rivelate tutte le 8 risposte
OPPURE

la rubata fallisce

Vince la Squadra Avversaria se:

la rubata riesce

INTERFACCIA UTENTE – DUE VISTE SEPARATE
🖥️ VISTA PUBBLICA (PROIETTATA)

Deve mostrare chiaramente:

Categoria (testo grande)

Griglia 8 caselle:

“???” se non rivelata

rank + risposta se rivelata

Squadra Attiva evidenziata visivamente

Vite rimanenti (solo Squadra Attiva)

Punteggio totale squadre

❌ NON deve mai mostrare:

risposte non rivelate

classifica completa

stato “bruciata”

🎙️ VISTA CONDUTTORE (PRIVATA)

Accessibile tramite:

tab

drawer laterale

shortcut visivo

Deve mostrare:

classifica Top 8 completa

per ogni risposta:

rank

valore

stato: hidden | revealed | burned

controlli manuali:

segna risposta corretta

segna risposta sbagliata

togli vita

rivela manualmente una risposta

undo ultima azione (1 step)

⚠️ Questa vista non deve MAI essere visibile nella vista pubblica.

STRUTTURE DATI (OBBLIGATORIE)
type Answer = {
  rank: number
  value: string
  revealed: boolean
  burned: boolean
}

type Round = {
  category: string
  answers: Answer[]
  activeTeam: "A" | "B"
  livesRemaining: number
  state: "playing" | "steal" | "ended"
}

type Team = {
  name: string
  score: number
}

GENERAZIONE CATEGORIE E CLASSIFICHE (PRODUZIONE)
REGOLE ANTI-ALLUCINAZIONE – OBBLIGATORIE

Le classifiche devono:

Essere globalmente riconosciute

Essere intuitivamente indovinabili

Evitare:

nicchie

regionalismi

brand oscuri

sinonimi

Usare:

sostantivi semplici

max 2 parole

Rappresentare popolarità percepita globale

Essere difendibili a voce da un conduttore

⚠️ Se una categoria NON permette 8 risposte solide:

deve essere scartata

STRATEGIA PRODUZIONE

Usare una lista curata di categorie

Classifiche generate una volta

Caching / validazione manuale consigliata

EDGE CASE DA GESTIRE

Risposta già rivelata → considerata sbagliata

Risposta già bruciata → non valida per rubata

Errore del conduttore → undo

Squadra Attiva completa le 8 risposte con vite > 0 → vittoria immediata

OUTPUT ATTESO

Codice completo frontend

Componenti separati e leggibili

Logica di gioco chiara e commentata

Nessuna feature extra non richiesta

DEFINIZIONE DI “PRONTO PER PRODUZIONE”

L’app è pronta quando:

un conduttore reale può usarla senza spiegazioni

il gioco scorre senza decisioni automatiche ambigue

tutto è leggibile su TV

nessuna regola è interpretabile