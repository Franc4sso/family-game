import React, { useState } from "react";
import { cluePoints, MYSTERY_MAX_CLUES } from "@/services/mysteryService";
import type { GameState, Top100Team } from "@/types/game.types";
import type { GameAction } from "@/types";
import { MystScreen, MystSilhouette } from "../mystery/parts";

interface MysteryScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const IconUndo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </svg>
);

export function MysteryScreen({ gameState, dispatch, onUndo, canUndo }: MysteryScreenProps) {
  const { mystery } = gameState;
  const [confirmExit, setConfirmExit] = useState(false);
  const [peek, setPeek] = useState(false);
  // "Nessuno ci arriva": si mostra comunque il nome a tutti prima di andare avanti
  const [nobody, setNobody] = useState(false);

  if (!mystery) return null;

  const { teams } = mystery;
  const finished = mystery.currentIndex >= mystery.deck.length;

  if (finished) {
    return <MysteryEnd teams={teams} played={mystery.deck.length} onNewGame={() => dispatch({ type: "CLEAR_MODE" })} />;
  }

  const character = mystery.deck[mystery.currentIndex];
  const n = mystery.cluesRevealed;
  const points = cluePoints(n);
  const allCluesRevealed = n >= MYSTERY_MAX_CLUES;
  const isLast = mystery.currentIndex + 1 >= mystery.deck.length;
  const current = character.clues[n - 1];
  const previous = character.clues.slice(0, n - 1).map((text, i) => ({ text, n: i + 1 })).reverse();

  const goNext = () => {
    setNobody(false);
    setPeek(false);
    dispatch({ type: "MYSTERY_NEXT" });
  };

  // ───────────────────────── Rivelazione ─────────────────────────
  if (mystery.solvedBy !== null || nobody) {
    const winner = mystery.solvedBy !== null ? teams[mystery.solvedBy] : null;
    return (
      <div
        className="myst-up min-h-dvh font-myst-ui text-myst-ink"
        style={{ background: winner ? winner.color : "var(--color-myst-text)" }}
      >
        <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 px-5 pt-3 pb-5">
          <div className="flex h-11 items-center justify-between gap-3 text-sm font-bold text-myst-ink/70">
            <span className="truncate">{winner ? `Indovinato da ${winner.name}` : "Nessuno l’ha indovinato"}</span>
            <span className="shrink-0">{character.category}</span>
          </div>
          <MystSilhouette size={120} body="#1A0B45" />
          <span className="text-xl font-bold">Era</span>
          <h1
            className={`m-0 -mt-2.5 font-myst leading-[0.95] font-normal break-words ${
              character.name.length > 18 ? "text-[46px]" : "text-[64px]"
            }`}
          >
            {character.name}
          </h1>
          {winner && (
            <span className="self-start rounded-2xl bg-myst-ink px-4 py-2.5 text-xl font-extrabold" style={{ color: winner.color }}>
              +{points} a {winner.name}
            </span>
          )}
          <span className="text-[15px] font-semibold text-myst-ink/70">
            {n === 1 ? "Al primo indizio." : `Con ${n} indizi su ${MYSTERY_MAX_CLUES}.`}
          </span>

          <div className="mt-auto flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={goNext}
              className="myst-press h-[58px] rounded-[18px] bg-myst-ink text-[17px] font-extrabold text-myst-text"
            >
              {isLast ? "Classifica finale" : "Prossimo personaggio"}
            </button>
            <button
              type="button"
              onClick={() => (nobody ? setNobody(false) : onUndo())}
              disabled={!nobody && !canUndo}
              className="myst-press h-[46px] rounded-[14px] border-2 border-myst-ink text-sm font-bold disabled:opacity-40"
            >
              Annulla, torna agli indizi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────── Indizi ─────────────────────────
  const twoRows = teams.length > 2;
  return (
    <MystScreen>
      <div className="flex h-11 items-center justify-between">
        <button
          type="button"
          aria-label="Esci dal gioco"
          onClick={() => setConfirmExit(true)}
          className="myst-press flex h-11 w-11 items-center justify-center rounded-full border-2 border-myst-line"
        >
          <IconClose />
        </button>
        <span className="text-sm font-bold text-myst-muted">
          Personaggio {mystery.currentIndex + 1} di {mystery.deck.length}
        </span>
        <button
          type="button"
          aria-label="Annulla l’ultima azione"
          onClick={onUndo}
          disabled={!canUndo}
          className="myst-press flex h-11 w-11 items-center justify-center rounded-full border-2 border-myst-line disabled:opacity-30"
        >
          <IconUndo />
        </button>
      </div>

      <div className={`grid gap-1.5 ${teams.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
        {teams.map((t) => (
          <div key={t.name} className={`flex items-center justify-between gap-2 rounded-xl bg-myst-panel px-3 ${twoRows ? "h-10" : "h-12"}`}>
            <span className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: t.color }} />
              <span className="truncate text-sm font-bold">{t.name}</span>
            </span>
            <span className="font-myst text-[22px] leading-none">{t.score}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Tieni premuto per vedere il personaggio"
        onPointerDown={() => setPeek(true)}
        onPointerUp={() => setPeek(false)}
        onPointerLeave={() => setPeek(false)}
        onPointerCancel={() => setPeek(false)}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && setPeek(true)}
        onKeyUp={() => setPeek(false)}
        onContextMenu={(e) => e.preventDefault()}
        className="myst-press flex w-full touch-none items-center gap-3.5 rounded-[22px] bg-myst-violet py-3 pr-4 pl-3 text-left [-webkit-touch-callout:none]"
      >
        <MystSilhouette size={60} body="#25106A" mark="?" markColor="#D9C6FF" />
        <span className="flex min-w-0 flex-col gap-1">
          <span className="self-start rounded-full bg-myst-deep px-2.5 py-0.5 text-xs font-bold text-myst-muted">{character.category}</span>
          {peek ? (
            <span className="font-myst text-[28px] leading-none">{character.name}</span>
          ) : (
            <>
              <span className="text-[15px] font-bold">Tieni premuto per vedere chi è</span>
              <span className="text-xs font-medium text-myst-muted">Solo tu: non girare il telefono</span>
            </>
          )}
        </span>
      </button>

      <div className="flex items-center gap-3.5 px-1">
        <span className="flex items-baseline gap-1.5">
          <span className="font-myst text-[72px] leading-[0.85]">{points}</span>
          <span className="text-[15px] font-bold text-myst-muted">{points === 1 ? "punto" : "punti"}</span>
        </span>
        <div className="grid flex-1 grid-cols-10 items-end gap-1" aria-hidden>
          {Array.from({ length: MYSTERY_MAX_CLUES }).map((_, i) => {
            const value = MYSTERY_MAX_CLUES - i;
            const bg = value > points ? "bg-myst-spent" : value === points ? "bg-myst-text" : "bg-myst-bar";
            return <span key={i} className={`rounded-[3px] ${bg}`} style={{ height: 12 + value * 3 }} />;
          })}
        </div>
      </div>

      <section key={`${mystery.currentIndex}-${n}`} aria-live="polite" className="myst-clue-in flex flex-col gap-2.5 rounded-[22px] bg-myst-text p-[18px] text-myst-ink">
        <span className="flex items-baseline justify-between">
          <span className="font-myst text-[22px]">Indizio {n}</span>
          <span className="text-[13px] font-bold text-myst-line-2">di {MYSTERY_MAX_CLUES}</span>
        </span>
        <p className="m-0 text-xl leading-[1.38] font-semibold">{current}</p>
      </section>

      {previous.length > 0 && (
        <ol className="m-0 flex list-none flex-col gap-2 px-1 py-0">
          {previous.map((p) => (
            <li key={p.n} className="flex gap-2.5 text-sm leading-snug text-myst-muted">
              <span className="w-[18px] shrink-0 font-myst text-myst-lilac">{p.n}</span>
              <span>{p.text}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="sticky bottom-0 -mx-4 mt-auto flex flex-col gap-2 bg-myst-night px-4 pt-2.5 pb-1">
        <button
          type="button"
          onClick={() => dispatch({ type: "MYSTERY_REVEAL_CLUE" })}
          disabled={allCluesRevealed}
          className="myst-press h-14 rounded-[18px] bg-myst-lilac text-[17px] font-extrabold text-myst-ink disabled:opacity-40"
        >
          {allCluesRevealed ? "Hai letto tutti gli indizi" : `Prossimo indizio · vale ${points - 1}`}
        </button>
        <span className="px-1 pt-0.5 text-[13px] font-bold text-myst-muted">Chi l’ha indovinato?</span>
        <div className={`grid gap-1.5 ${teams.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {teams.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => dispatch({ type: "MYSTERY_SOLVED", payload: { team: i } })}
              className="myst-press h-[46px] truncate rounded-[14px] border-2 px-2.5 text-[15px] font-extrabold"
              style={{ borderColor: t.color, color: t.color }}
            >
              {t.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setNobody(true)}
          className="myst-press h-11 text-sm font-bold text-myst-muted"
        >
          Nessuno ci arriva, svela chi è
        </button>
      </div>

      {confirmExit && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-myst-ink/70 sm:items-center">
          <div role="dialog" aria-modal="true" aria-labelledby="myst-exit" className="myst-up flex w-full max-w-md flex-col gap-3 rounded-t-[26px] bg-myst-panel px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:rounded-[26px]">
            <h2 id="myst-exit" className="m-0 font-myst text-[30px] leading-none font-normal">
              Uscire dal gioco?
            </h2>
            <p className="m-0 text-sm text-myst-muted">I punteggi di questa partita andranno persi.</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="myst-press h-[52px] rounded-2xl border-2 border-myst-line-2 text-[15px] font-bold"
              >
                Resta
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "CLEAR_MODE" })}
                className="myst-press h-[52px] rounded-2xl bg-myst-text text-[15px] font-extrabold text-myst-ink"
              >
                Esci
              </button>
            </div>
          </div>
        </div>
      )}
    </MystScreen>
  );
}

function MysteryEnd({ teams, played, onNewGame }: { teams: Top100Team[]; played: number; onNewGame: () => void }) {
  const ranking = [...teams].sort((a, b) => b.score - a.score);
  const [first, ...rest] = ranking;
  const tie = ranking.length > 1 && ranking[1].score === first.score;

  return (
    <MystScreen>
      <span className="flex h-11 items-center text-sm font-bold text-myst-muted">Fine partita · {played} personaggi</span>

      <section className="flex flex-col gap-1.5">
        <span className="text-xl font-bold text-myst-muted">{tie ? "Finisce in parità" : "Il mistero più risolto è di"}</span>
        <h1 className="m-0 font-myst text-[64px] leading-[0.92] font-normal break-words" style={{ color: first.color }}>
          {tie ? "Pareggio!" : first.name}
        </h1>
      </section>

      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        <li className="flex items-center justify-between gap-3 rounded-[22px] px-5 py-[18px] text-myst-ink" style={{ background: first.color }}>
          <span className="flex min-w-0 flex-col gap-0.5">
            <span className="text-[13px] font-bold text-myst-ink/70">1° posto</span>
            <span className="truncate text-xl font-extrabold">{first.name}</span>
          </span>
          <span className="font-myst text-[72px] leading-[0.85]">{first.score}</span>
        </li>
        {rest.map((t) => {
          const place = ranking.findIndex((r) => r.score === t.score) + 1;
          return (
            <li key={t.name} className="flex h-[54px] items-center gap-3 rounded-2xl border-2 border-myst-line pr-[18px] pl-3">
              <span className="w-[18px] font-myst text-xl text-myst-muted">{place}</span>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: t.color }} />
              <span className="min-w-0 flex-1 truncate text-[17px] font-extrabold">{t.name}</span>
              <span className="font-myst text-[30px] leading-none">{t.score}</span>
            </li>
          );
        })}
      </ol>

      <div className="flex justify-center pt-2">
        <MystSilhouette size={110} body="#3D1E8C" mark="!" markColor="#B79CFF" />
      </div>

      <div className="mt-auto pt-2">
        <button
          type="button"
          onClick={onNewGame}
          className="myst-press h-[58px] w-full rounded-[18px] bg-myst-text text-[17px] font-extrabold text-myst-ink"
        >
          Nuova partita
        </button>
      </div>
    </MystScreen>
  );
}
