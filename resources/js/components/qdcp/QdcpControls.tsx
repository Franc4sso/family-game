import React, { useState } from "react";
import { IconBack, IconCheck, IconClose, IconUndo, QdConfirm, QdcpShell, pointsLabel } from "./QdcpParts";
import { QDCP_CLUE_LABELS, QDCP_MAX_CLUES, qdcpPoints } from "@/services/qdcpService";
import type { QdcpState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface QdcpControlsProps {
  state: QdcpState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
  onShowBoard: () => void;
}

type Tab = "teams" | "clues";

/**
 * Vista del master: la risposta sempre in alto, poi due schede. In Squadre
 * assegna la carta a chi indovina, in Indizi li legge tutti e svela il prossimo.
 */
export function QdcpControls({ state, dispatch, onUndo, canUndo, onShowBoard }: QdcpControlsProps) {
  const [tab, setTab] = useState<Tab>("teams");
  const [confirmExit, setConfirmExit] = useState(false);
  const card = state.deck[state.current];
  const shown = state.cluesShown;
  const points = qdcpPoints(shown);

  const tabs: { id: Tab; label: string; badge: string }[] = [
    { id: "teams", label: "Squadre", badge: String(state.teams.length) },
    { id: "clues", label: "Indizi", badge: `${shown} di ${QDCP_MAX_CLUES}` },
  ];

  return (
    <QdcpShell tone="deep">
      <header className="flex h-11 items-center justify-between gap-2">
        <button
          type="button"
          onClick={onShowBoard}
          className="qd-press flex h-11 items-center gap-1.5 rounded-full border-[1.5px] border-qd-line bg-qd-panel pr-4 pl-2.5 text-sm font-extrabold"
        >
          <IconBack />
          Tabellone
        </button>
        <span className="text-xs font-extrabold tracking-[0.1em] text-qd-lime uppercase">Solo per il master</span>
        <button
          type="button"
          aria-label="Esci dal gioco"
          onClick={() => setConfirmExit(true)}
          className="qd-press flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-qd-line bg-qd-panel"
        >
          <IconClose />
        </button>
      </header>

      <section className="flex flex-col gap-1 rounded-[20px] bg-qd-lime px-[18px] pt-3.5 pb-4 text-qd-green">
        <span className="flex justify-between gap-3 text-xs font-extrabold tracking-[0.08em] text-qd-lime-ink uppercase">
          <span>La risposta · {card.category}</span>
          <span className="shrink-0">
            Carta {state.current + 1} di {state.deck.length}
          </span>
        </span>
        <span className="qd-wide text-[30px] leading-[1.05] break-words">{card.answer}</span>
        {card.detail && <span className="text-sm font-bold text-qd-lime-ink">{card.detail}</span>}
      </section>

      <div role="tablist" aria-label="Pannello del master" className="grid grid-cols-2 gap-1 rounded-full bg-qd-panel p-1">
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`qd-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`qd-pane-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`qd-press flex h-11 items-center justify-center gap-1.5 rounded-full text-[15px] font-extrabold transition-colors ${
                on ? "bg-qd-lime text-qd-green" : "text-qd-muted"
              }`}
            >
              {t.label}
              <span className="text-xs opacity-70">{t.badge}</span>
            </button>
          );
        })}
      </div>

      {tab === "teams" && (
        <section key="teams" id="qd-pane-teams" role="tabpanel" aria-labelledby="qd-tab-teams" className="qd-pane flex flex-col gap-1.5">
          <span className="flex items-baseline justify-between">
            <span className="text-[17px] font-extrabold">Chi ha indovinato?</span>
            <span className="text-sm font-extrabold text-qd-lime">vale {pointsLabel(points)}</span>
          </span>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {state.teams.map((team, i) => (
              <li key={team.name} className="flex h-14 items-center gap-2.5 rounded-[18px] bg-qd-panel pr-1.5 pl-3.5">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: team.color }} aria-hidden />
                <span className="min-w-0 flex-1 truncate text-base font-extrabold">{team.name}</span>
                <button
                  type="button"
                  aria-label={`${team.name}: risposta giusta, più ${points}`}
                  onClick={() => dispatch({ type: "QDCP_CORRECT", payload: { team: i } })}
                  className="qd-press flex h-11 items-center gap-1.5 rounded-[14px] bg-qd-lime px-4 text-base font-extrabold text-qd-green"
                >
                  <IconCheck />+{points}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === "clues" && (
        <section key="clues" id="qd-pane-clues" role="tabpanel" aria-labelledby="qd-tab-clues" className="qd-pane flex flex-col gap-1.5">
          {QDCP_CLUE_LABELS.map((label, i) => {
            const word = label.charAt(0) + label.slice(1).toLowerCase();
            if (i < shown) {
              return (
                <div key={label} className="flex flex-col gap-[3px] rounded-2xl bg-qd-panel px-3.5 py-2.5">
                  <span className="flex justify-between">
                    <span className="qd-wide text-[13px] text-qd-lime">{word}</span>
                    <span className="text-xs font-bold text-qd-muted">in sala</span>
                  </span>
                  <span className="text-sm leading-snug font-semibold text-qd-muted">{card.clues[i]}</span>
                </div>
              );
            }
            if (i === shown) {
              return (
                <div key={label} className="flex flex-col gap-2 rounded-2xl border-[1.5px] border-dashed border-qd-lime px-3.5 py-3">
                  <span className="qd-wide text-[13px]">{word}</span>
                  <span className="text-[15px] leading-snug font-bold">{card.clues[i]}</span>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({ type: "QDCP_REVEAL_CLUE" });
                      onShowBoard();
                    }}
                    className="qd-press h-11 rounded-[14px] bg-qd-lime text-[15px] font-extrabold text-qd-green"
                  >
                    Svela {label} · scende a {pointsLabel(qdcpPoints(i + 1))}
                  </button>
                </div>
              );
            }
            return (
              <div key={label} className="flex flex-col gap-[3px] rounded-2xl border-[1.5px] border-qd-line px-3.5 py-2.5">
                <span className="qd-wide text-[13px]">{word}</span>
                <span className="text-sm leading-snug font-semibold text-qd-pale">{card.clues[i]}</span>
              </div>
            );
          })}
        </section>
      )}

      <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className="qd-press flex h-[46px] items-center justify-center gap-1.5 rounded-2xl border-[1.5px] border-qd-line bg-qd-panel text-sm font-bold disabled:opacity-35"
        >
          <IconUndo />
          Annulla
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "QDCP_GIVE_UP" })}
          className="qd-press h-[46px] rounded-2xl border-[1.5px] border-qd-line bg-qd-panel text-sm font-bold"
        >
          Nessuno · soluzione
        </button>
      </div>

      {confirmExit && (
        <QdConfirm
          title="Uscire dal gioco?"
          text="I punteggi di questa partita andranno persi."
          confirmLabel="Esci"
          onCancel={() => setConfirmExit(false)}
          onConfirm={() => dispatch({ type: "CLEAR_MODE" })}
        />
      )}
    </QdcpShell>
  );
}
