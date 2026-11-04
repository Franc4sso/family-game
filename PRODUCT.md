# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Gruppi di amici adulti durante una serata di giochi. Chi apre l'app è il **conduttore**: tiene il telefono in mano, sceglie il gioco, legge le domande, rivela le risposte e segna i punti. Gli altri giocano a voce e guardano poco lo schermo.

## Product Purpose

Una raccolta di giochi da salotto in stile quiz televisivo, tutti condotti da un telefono, per far partire una serata in pochi secondi senza carte, tabelloni o preparazione. Il successo è: si apre l'app, si sceglie il gioco e si inizia a giocare subito, senza spiegare l'interfaccia.

## Positioning

Un solo telefono basta a condurre tutta la serata: nove formati diversi (Family Feud con o senza master, Rubo, Personaggio Misterioso, Più alto o più basso, Indovina il Numero, TOP 100, Asta Folle, Quando/Dove/Come/Perché), con domande e classifiche già pronte in italiano.

## Operating Context

- Il conduttore usa l'app con una mano, in piedi o sul divano, spesso con luce bassa e in mezzo al rumore.
- Lo schermo guida chi conduce; non è pensato come tabellone da mostrare a tutti.
- Alcune modalità (Senza Master) prevedono che il telefono passi di mano fra due giocatori.
- Molte modalità supportano da 2 a 6 squadre.

## Capabilities and Constraints

- App web React + TypeScript (Laravel + Vite, Tailwind), distribuita come **PWA** installabile.
- Contenuti di gioco (domande, classifiche, personaggi) inclusi nel bundle come dati statici.
- Lingua: italiano.
- Da decidere: funzionamento completamente offline (service worker) e ripresa di una partita interrotta.

## Brand Commitments

- Nome: "Family Feud" (titolo attuale dell'app).
- Alcune modalità hanno già un'identità propria nel codice (UI del master, TOP 100, Asta Folle).

## Evidence on Hand

- Nessuna testimonianza, statistica d'uso o materiale stampa: non vanno inventati.

## Product Principles

1. Dall'apertura al primo round nel minor numero di tocchi possibile.
2. Il conduttore deve capire ogni gioco al volo: nome, quanti giocatori, se serve un conduttore.
3. Usabile con una mano sola e un'occhiata veloce, anche con poca luce.
4. Deve sembrare un'app installata, non un sito.
