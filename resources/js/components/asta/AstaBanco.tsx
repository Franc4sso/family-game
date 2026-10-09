import React, { useState } from "react";
import { AstaScreen, BancoTabs, IconHammer, MonoLabel, Paddle, btnGhost, btnRed } from "./parts";
import { categoryLabel, lotLabel } from "./AstaBoard";
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
 * Banco del banditore: l'asta si fa a voce, qui si registra solo chi si è
 * aggiudicato il lotto e a quanto.
 */
export function AstaBanco({ state, dispatch, onUndo, canUndo, onShowBoard }: AstaBancoProps) {
  const [team, setTeam] = useState<number | null>(null);
  const [digits, setDigits] = useState("");
  const [showValue, setShowValue] = useState(false);

  const lot = state.lots[state.current];
  const price = Number(digits || 0);
  const max = team === null ? 0 : astaMaxBid(state, team);
  const tooHigh = team !== null && price > max;
  const valid = team !== null && price >= ASTA_MIN_BID && !tooHigh;
  const canPass = astaCanPass(state);
  const moreClues = state.cluesShown < lot.clues.length;

  const press = (key: string) => {
    if (key === "C") return setDigits("");
    if (key === "⌫") return setDigits((d) => d.slice(0, -1));
    setDigits((d) => (d === "0" ? key : (d + key).slice(0, 2)));
  };
  const nudge = (delta: number) => setDigits(String(Math.max(0, price + delta)));

  return (
    <AstaScreen>
      <BancoTabs
        active="banco"
        onBoard={onShowBoard}
        onBanco={() => {}}
        menu={[
          { label: "Annulla ultima azione", onClick: onUndo, disabled: !canUndo },
          {
            label: "Esci dall'asta",
            danger: true,
            onClick: () => confirm("Uscire? L'asta in corso andrà persa.") && dispatch({ type: "CLEAR_MODE" }),
          },
        ]}
      />

      <div className="flex items-center gap-2.5 rounded-[18px] border border-asta-line bg-asta-surface p-2">
        <img src={lot.image} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-asta-photo object-contain" />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <MonoLabel>
            {lotLabel(state, state.current)} · {categoryLabel(lot.category).toUpperCase()}
          </MonoLabel>
          <span className="truncate text-[15px] font-extrabold leading-tight">{lot.name}</span>
          <button
            type="button"
            onClick={() => setShowValue((v) => !v)}
            className="self-start font-asta-mono text-[11px] font-bold text-asta-mustard underline decoration-dashed underline-offset-2"
          >
            {showValue ? `VALE ${formatEuro(lot.value)} · NASCONDI` : "VALORE SEGRETO: TOCCA PER VEDERE"}
          </button>
        </span>
      </div>

      {moreClues && (
        <button
          type="button"
          onClick={() => dispatch({ type: "ASTA_SHOW_CLUE" })}
          className="h-11 rounded-full border-[1.5px] border-dashed border-asta-mustard text-sm font-extrabold text-asta-mustard active:scale-[0.98]"
        >
          Svela la nota {String(state.cluesShown + 1).padStart(2, "0")}: “{lot.clues[state.cluesShown]}”
        </button>
      )}

      <h2 className="text-lg font-extrabold">Chi se l'è aggiudicato?</h2>
      <div className={`grid gap-2 ${state.teams.length > 4 ? "grid-cols-3" : "grid-cols-4"}`}>
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
              className={`flex flex-col items-center gap-1 rounded-[18px] px-1 py-2 active:scale-95 disabled:opacity-35 ${
                selected ? "bg-asta-cream text-asta-ink" : "border border-asta-line bg-asta-surface"
              }`}
            >
              <Paddle team={t} index={i} size={44} ring={selected} />
              <span className="max-w-full truncate text-[13px] font-extrabold">{t.name}</span>
              <span className={`font-asta-mono text-[10px] font-bold ${selected ? "text-asta-brown" : "text-asta-muted"}`}>
                {teamMax === 0 ? "COMPLETA" : `MAX ${teamMax}`}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold">A quanto?</h2>
        <MonoLabel>{team === null ? "PRIMA SCEGLI LA SQUADRA" : `DA ${ASTA_MIN_BID} A ${max} CREDITI`}</MonoLabel>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" aria-label="Un credito in meno" onClick={() => nudge(-1)} className={`${btnGhost} h-[72px] w-14 text-2xl`}>
          −1
        </button>
        <output
          aria-live="polite"
          className={`flex h-[72px] flex-1 items-center justify-center gap-2 rounded-[20px] ${tooHigh ? "bg-[#3A1810] text-[#FFB3A3]" : "bg-asta-cream text-asta-ink"}`}
        >
          <span className="text-[50px] font-extrabold tracking-[-0.03em]">{price}</span>
          <span className={`font-asta-mono text-xs font-bold ${tooHigh ? "" : "text-asta-brown"}`}>
            {price === 1 ? "CREDITO" : "CREDITI"}
          </span>
        </output>
        <button type="button" aria-label="Un credito in più" onClick={() => nudge(1)} className={`${btnGhost} h-[72px] w-14 text-2xl`}>
          +1
        </button>
      </div>
      {tooHigh && team !== null && (
        <p role="alert" className="-mt-1.5 text-center text-sm font-bold text-[#FFB3A3]">
          {state.teams[team].name} può arrivare al massimo a {max}: deve tenere 1 credito per ogni lotto che le manca.
        </p>
      )}

      <div className="grid grid-cols-3 gap-1.5">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            aria-label={k === "C" ? "Azzera" : k === "⌫" ? "Cancella una cifra" : k}
            className="h-12 rounded-[14px] border border-asta-line bg-asta-surface text-xl font-extrabold active:scale-95 active:bg-asta-line"
          >
            {k}
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-1">
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
          <span className="flex flex-col items-start">
            <span className="text-[19px] font-extrabold">Batti il martello</span>
            <span className="font-asta-mono text-[11px] font-bold text-asta-red-soft">
              {valid && team !== null ? `LOTTO A ${state.teams[team].name.toUpperCase()} PER ${price}` : "SCEGLI SQUADRA E PREZZO"}
            </span>
          </span>
        </button>
        <button
          type="button"
          disabled={!canPass}
          onClick={() => confirm("Nessuno lo vuole? Il lotto resta invenduto.") && dispatch({ type: "ASTA_PASS" })}
          className={`${btnGhost} h-11 text-sm`}
        >
          {canPass ? "Nessuno lo vuole · passa al prossimo" : "Ogni lotto rimasto va venduto"}
        </button>
      </div>
    </AstaScreen>
  );
}
