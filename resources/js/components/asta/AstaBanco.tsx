import React, { useState } from "react";
import { AstaConfirm, AstaScreen, IconBack, IconDots, IconHammer, Paddle, btnRed } from "./parts";
import { categoryLabel, lotNumber } from "./AstaBoard";
import { ASTA_MIN_BID, astaCanPass, astaMaxBid, formatEuro } from "@/services/astaService";
import type { AstaState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface AstaBancoProps {
  state: AstaState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
  onShowBoard: () => void;
}

/**
 * Banco del banditore: l'asta si fa a voce, qui ci sono gli indizi da dare
 * e si registra chi si è aggiudicato il lotto e a quanto.
 */
export function AstaBanco({ state, dispatch, onUndo, canUndo, onShowBoard }: AstaBancoProps) {
  const [team, setTeam] = useState<number | null>(null);
  const [digits, setDigits] = useState("");
  const [showValue, setShowValue] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirm, setConfirm] = useState<"pass" | "exit" | null>(null);

  const lot = state.lots[state.current];
  const price = Number(digits || 0);
  const max = team === null ? 0 : astaMaxBid(state, team);
  const tooHigh = team !== null && price > max;
  const valid = team !== null && price >= ASTA_MIN_BID && !tooHigh;
  const canPass = astaCanPass(state);

  const range =
    team === null
      ? "PRIMA LA SQUADRA"
      : tooHigh
        ? `MASSIMO ${max} PER ${state.teams[team].name.toUpperCase()}`
        : `DA ${ASTA_MIN_BID} A ${max} ${max === 1 ? "CREDITO" : "CREDITI"}`;

  return (
    <AstaScreen>
      <header className="relative flex h-11 items-center justify-between">
        <button
          type="button"
          onClick={onShowBoard}
          className="asta-press flex h-11 items-center gap-1.5 rounded-full border-[1.5px] border-asta-line bg-asta-surface pr-4 pl-2.5 text-sm font-extrabold"
        >
          <IconBack />
          Sala
        </button>
        <span className="font-asta-mono text-[11px] font-bold text-asta-mustard">BANCO · SOLO TU</span>
        <button
          type="button"
          aria-label="Altre opzioni"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="asta-press flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-asta-line bg-asta-surface"
        >
          <IconDots />
        </button>
        {menuOpen && (
          <div className="absolute top-12 right-0 z-30 w-56 rounded-2xl border-[1.5px] border-asta-line bg-asta-surface p-1.5 shadow-2xl">
            <button
              type="button"
              disabled={!canUndo}
              onClick={() => {
                setMenuOpen(false);
                onUndo();
              }}
              className="h-11 w-full rounded-xl px-3 text-left text-sm font-bold active:bg-asta-line disabled:opacity-40"
            >
              Annulla l’ultima mossa
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setConfirm("exit");
              }}
              className="h-11 w-full rounded-xl px-3 text-left text-sm font-bold text-[#FF9A86] active:bg-asta-line"
            >
              Esci dall’asta
            </button>
          </div>
        )}
      </header>

      <div className="flex items-center gap-2.5 rounded-[18px] bg-asta-surface p-2">
        <img src={lot.image} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-asta-photo object-contain" />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-asta-mono text-[11px] font-bold text-asta-muted">
            LOTTO {lotNumber(state.current)} · {categoryLabel(lot.category).toUpperCase()}
          </span>
          <span className="truncate text-[15px] leading-tight font-extrabold">{lot.name}</span>
        </span>
        <button
          type="button"
          onClick={() => setShowValue((v) => !v)}
          aria-label={showValue ? "Nascondi il valore segreto" : "Mostra il valore segreto"}
          aria-pressed={showValue}
          className={`asta-press flex h-11 min-w-[92px] shrink-0 flex-col items-start justify-center rounded-l-xl rounded-r-[22px] px-3 leading-[1.05] text-asta-ink transition-colors ${
            showValue ? "bg-asta-mustard" : "bg-asta-cream"
          }`}
        >
          <span className="font-asta-mono text-[9px] font-bold text-asta-brown">VALORE</span>
          <span className="text-[15px] font-extrabold">{showValue ? formatEuro(lot.value) : "Tocca"}</span>
        </button>
      </div>

      {lot.clues.length > 0 && (
        <section className="flex flex-col gap-1.5 rounded-2xl px-3.5 pt-2.5 pb-3 shadow-[inset_0_0_0_1.5px_var(--color-asta-line)]">
          <span className="font-asta-mono text-[11px] font-bold text-asta-mustard">INDIZI DA DARE A VOCE</span>
          <ol className="m-0 flex list-none flex-col gap-1 p-0">
            {lot.clues.map((clue, i) => (
              <li key={i} className="flex gap-2.5 text-[15px] leading-snug font-bold">
                <span className="shrink-0 font-asta-mono text-asta-mustard">{lotNumber(i)}</span>
                {clue}
              </li>
            ))}
          </ol>
        </section>
      )}

      <h2 className="m-0 mt-0.5 text-lg font-extrabold">Chi se l’è aggiudicato?</h2>
      <div className="grid grid-cols-2 gap-2">
        {state.teams.map((t, i) => {
          const teamMax = astaMaxBid(state, i);
          const selected = team === i;
          return (
            <button
              key={t.name}
              type="button"
              disabled={teamMax === 0}
              aria-pressed={selected}
              onClick={() => setTeam(i)}
              className={`asta-press flex h-16 items-center gap-2.5 rounded-full pr-3 pl-2 text-left transition-colors disabled:opacity-35 ${
                selected ? "bg-asta-cream text-asta-ink" : "bg-asta-surface"
              }`}
            >
              <Paddle team={t} index={i} size={48} ring={selected} className={`asta-lift ${selected ? "-translate-y-1" : ""}`} />
              <span className="flex min-w-0 flex-col gap-px">
                <span className="truncate text-base font-extrabold">{t.name}</span>
                <span className={`font-asta-mono text-[11px] font-bold ${selected ? "text-asta-brown" : "text-asta-muted"}`}>
                  {teamMax === 0 ? "COMPLETA" : `MAX ${teamMax}`}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <label htmlFor="asta-price" className="mt-0.5 flex items-baseline justify-between gap-3">
        <span className="text-lg font-extrabold">A quanto?</span>
        <span className={`truncate font-asta-mono text-[11px] font-bold ${tooHigh ? "text-asta-danger" : "text-asta-muted"}`}>{range}</span>
      </label>
      <span
        className={`flex h-[60px] items-center gap-2.5 rounded-2xl px-[18px] transition-colors ${
          tooHigh ? "bg-asta-danger-bg text-asta-danger ring-2 ring-[#FF8A70]" : "bg-asta-cream text-asta-ink focus-within:ring-[3px] focus-within:ring-asta-mustard"
        }`}
      >
        <input
          id="asta-price"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          enterKeyHint="done"
          autoComplete="off"
          placeholder="0"
          value={digits}
          onChange={(e) => setDigits(e.target.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 2))}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          aria-invalid={tooHigh}
          className="min-w-0 flex-1 bg-transparent p-0 text-[32px] font-extrabold tracking-[-0.03em] placeholder:text-current placeholder:opacity-30 focus:outline-none"
        />
        <span className="font-asta-mono text-xs font-bold">{price === 1 ? "CREDITO" : "CREDITI"}</span>
      </span>

      <div className="mt-auto flex flex-col gap-1.5 pt-1">
        <button
          type="button"
          disabled={!valid}
          onClick={() => {
            if (team === null) return;
            dispatch({ type: "ASTA_SELL", payload: { team, price } });
          }}
          className={`${btnRed} h-16`}
        >
          <IconHammer size={26} />
          <span className="flex flex-col items-start leading-[1.1]">
            <span className="text-[19px] font-extrabold">Batti il martello</span>
            <span className="font-asta-mono text-[11px] font-bold text-asta-red-soft">
              {valid && team !== null ? `LOTTO A ${state.teams[team].name.toUpperCase()} PER ${price}` : "SCEGLI SQUADRA E PREZZO"}
            </span>
          </span>
        </button>
        <button
          type="button"
          disabled={!canPass}
          onClick={() => setConfirm("pass")}
          className="asta-press h-11 rounded-full text-sm font-bold text-asta-muted disabled:opacity-60"
        >
          {canPass ? "Nessuno lo vuole · passa al prossimo" : "Ogni lotto rimasto va venduto"}
        </button>
      </div>

      {confirm === "pass" && (
        <AstaConfirm
          title="Nessuno lo vuole?"
          text="Il lotto resta invenduto e si passa al prossimo."
          confirmLabel="Passa"
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            setConfirm(null);
            dispatch({ type: "ASTA_PASS" });
          }}
        />
      )}
      {confirm === "exit" && (
        <AstaConfirm
          title="Uscire dall’asta?"
          text="L’asta in corso andrà persa."
          confirmLabel="Esci"
          onCancel={() => setConfirm(null)}
          onConfirm={() => dispatch({ type: "CLEAR_MODE" })}
        />
      )}
    </AstaScreen>
  );
}
