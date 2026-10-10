import React, { useMemo, useState } from "react";
import type { Dispatch } from "react";
import type { GameAction } from "@/types/actions.types";
import {
  GUESS_NUMBER_CATEGORIES,
  GUESS_NUMBER_QUESTIONS,
  type GuessNumberCategory,
  type GuessNumberQuestion,
} from "@/data/guessNumberQuestions";

interface GuessNumberScreenProps {
  dispatch: Dispatch<GameAction>;
}

/**
 * Indovina il Numero: un telefono, tutti contro tutti, risposte a voce.
 * Il master sceglie le categorie, poi legge le domande (mescolate) e svela
 * il numero sul contatore a tessere.
 */
export function GuessNumberScreen({ dispatch }: GuessNumberScreenProps) {
  const [deck, setDeck] = useState<GuessNumberQuestion[] | null>(null);
  const exit = () => dispatch({ type: "CLEAR_MODE" });

  if (!deck) return <GuessNumberStart onBack={exit} onStart={setDeck} />;
  return <GuessNumberPlay deck={deck} onExit={exit} onRestart={() => setDeck(null)} />;
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const countIn = (category: GuessNumberCategory) => GUESS_NUMBER_QUESTIONS.filter((q) => q.category === category).length;

// ─── Inizio: le categorie ───

function GuessNumberStart({ onBack, onStart }: { onBack: () => void; onStart: (deck: GuessNumberQuestion[]) => void }) {
  const [off, setOff] = useState<GuessNumberCategory[]>([]);
  const all = GUESS_NUMBER_CATEGORIES.map((c) => c.id);
  const chosen = GUESS_NUMBER_QUESTIONS.filter((q) => !off.includes(q.category));
  const none = chosen.length === 0;

  const toggle = (id: GuessNumberCategory) => setOff((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <GnScreen>
      <div className="flex h-11 items-center">
        <button
          type="button"
          aria-label="Indietro"
          onClick={onBack}
          className="gn-press flex h-11 w-11 items-center justify-center rounded-full bg-gn-deep"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex gap-1.5" aria-hidden>
        {["8", "8"].map((d, i) => (
          <span key={i} className="flex h-16 w-11 items-center justify-center rounded-lg bg-gn-deep font-gn text-[46px] leading-none">
            {d}
          </span>
        ))}
        {[0, 1].map((i) => (
          <span key={i} className="flex h-16 w-11 items-center justify-center rounded-lg bg-gn-flap font-gn text-[40px] leading-none text-gn-mint">
            ?
          </span>
        ))}
      </div>

      <h1 className="m-0 font-gn text-[52px] leading-[0.95] font-normal uppercase">
        Indovina
        <br />
        il numero
      </h1>
      <p className="m-0 -mt-0.5 text-[17px] leading-snug font-semibold text-gn-soft">
        Leggi la domanda ad alta voce, ognuno dice il suo numero. Vince chi ci va più vicino.
      </p>

      <section className="mt-1 flex flex-col gap-2">
        <span className="flex items-center justify-between">
          <span className="text-base font-extrabold">
            Categorie · {all.length - off.length} di {all.length}
          </span>
          <button
            type="button"
            onClick={() => setOff(off.length === 0 ? all : [])}
            className="gn-press h-11 px-2 text-sm font-extrabold text-gn-mint"
          >
            {off.length === 0 ? "Togli tutte" : "Scegli tutte"}
          </button>
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {GUESS_NUMBER_CATEGORIES.map((c) => {
            const on = !off.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(c.id)}
                className={`gn-press flex min-h-12 items-center justify-between gap-1.5 rounded-[14px] px-3 py-1.5 text-left text-[15px] leading-tight font-extrabold transition-colors ${
                  on ? "bg-gn-pale text-gn-ink" : "text-gn-soft shadow-[inset_0_0_0_1.5px_var(--color-gn-line)]"
                }`}
              >
                <span className="min-w-0">{c.label}</span>
                <span className="text-[13px] opacity-65">{countIn(c.id)}</span>
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        disabled={none}
        onClick={() => onStart(shuffle(chosen))}
        className="gn-press mt-auto h-[60px] shrink-0 rounded-[20px] bg-gn-mint text-lg font-extrabold text-gn-ink disabled:bg-gn-line"
      >
        {none ? "Scegli almeno una categoria" : `Inizia · ${chosen.length} domande`}
      </button>
    </GnScreen>
  );
}

// ─── Le domande ───

/** "≈12.500.000 L" → stima, numero da mettere sulle tessere, unità. */
function splitAnswer(answer: string): { approx: boolean; number: string; unit: string } {
  const m = answer.match(/^(≈)?\s*([\d.,–]+)\s*(.*)$/);
  if (!m) return { approx: false, number: "", unit: answer };
  return { approx: !!m[1], number: m[2], unit: m[3] };
}

function GuessNumberPlay({ deck, onExit, onRestart }: { deck: GuessNumberQuestion[]; onExit: () => void; onRestart: () => void }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const q = deck[index];
  const total = deck.length;
  const isLast = index === total - 1;
  const answer = useMemo(() => splitAnswer(q.answer), [q.answer]);
  const label = GUESS_NUMBER_CATEGORIES.find((c) => c.id === q.category)?.label ?? "";

  const go = (to: number) => {
    setIndex(to);
    setRevealed(false);
  };

  const next = () => {
    if (!revealed) return setRevealed(true);
    if (isLast) return onRestart();
    go(index + 1);
  };

  return (
    <GnScreen>
      <header className="flex h-11 items-center gap-3">
        <button
          type="button"
          aria-label="Torna ai giochi"
          onClick={onExit}
          className="gn-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gn-deep"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <span className="flex flex-1 flex-col gap-1.5">
          <span className="flex justify-between text-sm font-bold text-gn-soft">
            <span>
              Domanda {index + 1} di {total}
            </span>
            <span>a voce</span>
          </span>
          <span className="flex h-1 overflow-hidden rounded-full bg-gn-deep" aria-hidden>
            <span className="rounded-full bg-gn-pale transition-[width] duration-300" style={{ width: `${((index + 1) / total) * 100}%` }} />
          </span>
        </span>
      </header>

      <div key={q.id} className="gn-q mt-3.5 flex flex-col gap-3">
        <span className="self-start rounded-[10px] bg-gn-deep px-2.5 py-[5px] text-[13px] font-extrabold text-gn-mint">{label}</span>
        <p className="m-0 text-[31px] leading-[1.15] font-extrabold tracking-[-0.01em] text-balance">{q.question}</p>
      </div>

      <Counter key={`${q.id}-${revealed}`} answer={answer} revealed={revealed} />

      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Domanda precedente"
          disabled={index === 0}
          onClick={() => go(index - 1)}
          className="gn-press flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[20px] bg-gn-deep disabled:opacity-40"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className={`gn-press h-[60px] flex-1 rounded-[20px] text-lg font-extrabold text-gn-ink transition-colors ${revealed ? "bg-gn-pale" : "bg-gn-mint"}`}
        >
          {!revealed ? "Svela il numero" : isLast ? "Finite! Nuova partita" : "Prossima domanda"}
        </button>
      </div>
    </GnScreen>
  );
}

/**
 * Il contatore: coperto mostra sempre quattro tessere col punto di domanda
 * (così non si capisce quante cifre ha la risposta), svelato gira le tessere
 * vere una alla volta, da sinistra.
 */
function Counter({ answer, revealed }: { answer: { approx: boolean; number: string; unit: string }; revealed: boolean }) {
  const chars = answer.number.split("");
  const digits = chars.filter((c) => /\d/.test(c)).length || 1;
  const separators = chars.length - digits;
  const tile = Math.min(52, Math.floor((330 - separators * 14 - chars.length * 5) / digits));
  let order = 0;

  return (
    <section aria-live="polite" className="mt-auto flex flex-col items-center gap-3 rounded-[26px] bg-gn-deep px-3 pt-[22px] pb-5">
      <span className="text-[13px] font-extrabold tracking-[0.14em] text-gn-cap uppercase">
        {!revealed ? "Dite un numero a testa" : answer.approx ? "Circa" : "Esattamente"}
      </span>
      <span className="flex min-h-[76px] items-end justify-center gap-[5px]">
        {!revealed
          ? [0, 1, 2, 3].map((i) => (
              <span key={i} className="flex h-[75px] w-[52px] items-center justify-center rounded-lg bg-gn-flap font-gn text-[44px] leading-none text-gn-mint" aria-hidden>
                ?
              </span>
            ))
          : chars.map((ch, i) => {
              const isDigit = /\d/.test(ch);
              const delay = (isDigit ? order++ : order) * 90;
              return (
                <span key={i} className="gn-tile flex" aria-hidden>
                  <span
                    className={`gn-flip flex items-center justify-center rounded-lg font-gn leading-none ${isDigit ? "bg-gn-pale text-gn-deep" : "text-gn-pale"}`}
                    style={{
                      animationDelay: `${delay}ms`,
                      width: isDigit ? tile : ch === "–" ? 20 : 12,
                      height: isDigit ? Math.round(tile * 1.45) : 20,
                      fontSize: isDigit ? Math.round(tile * 1.1) : 30,
                    }}
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
      </span>
      {revealed && <span className="sr-only">{`${answer.approx ? "Circa " : ""}${answer.number} ${answer.unit}`}</span>}
      <span className="min-h-[26px] text-center text-xl font-extrabold">{revealed ? answer.unit : ""}</span>
    </section>
  );
}

function GnScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gn-teal font-gn-ui text-gn-pale">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 px-4 pt-3 pb-5">{children}</div>
    </div>
  );
}
