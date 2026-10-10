import React, { useState } from "react";
import { IconBack, IconClose, QdcpShell, pointsLabel } from "./QdcpParts";
import {
  QDCP_CATEGORIES,
  QDCP_CLUE_LABELS,
  QDCP_DECK_SIZES,
  QDCP_MAX_TEAMS,
  QDCP_MIN_TEAMS,
  QDCP_TEAM_COLORS,
  buildQdcpDeck,
  countQdcpCards,
  countQdcpCategory,
  qdcpPoints,
} from "@/services/qdcpService";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { QdcpCategory } from "@/data/qdcpCards";
import type { GameAction } from "@/types/actions.types";

interface QdcpSetupProps {
  dispatch: React.Dispatch<GameAction>;
}

type Tab = "teams" | "cards" | "points";

const INDENT = ["ml-0", "ml-3.5", "ml-7", "ml-[42px]"];

export function QdcpSetup({ dispatch }: QdcpSetupProps) {
  const [names, setNames] = useState<string[]>(["", ""]);
  const [categories, setCategories] = useState<QdcpCategory[]>(QDCP_CATEGORIES);
  const [deckSize, setDeckSize] = useState<number | null>(15);
  const [tab, setTab] = useState<Tab>("teams");
  const [error, setError] = useState<string | null>(null);

  // Un nome lasciato vuoto diventa "Squadra N"
  const finalNames = names.map((n, i) => n.trim() || `Squadra ${i + 1}`);

  const available = countQdcpCards(categories);
  // Se le categorie scelte hanno meno carte del previsto, si giocano tutte
  const cardsInGame = deckSize === null ? available : Math.min(deckSize, available);
  const allSelected = categories.length === QDCP_CATEGORIES.length;

  const toggleCategory = (c: QdcpCategory) => {
    setError(null);
    setCategories((cs) => (cs.includes(c) ? cs.filter((x) => x !== c) : [...cs, c]));
  };

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    const lower = finalNames.map((n) => n.toLowerCase());
    if (new Set(lower).size !== lower.length) {
      setTab("teams");
      setError("Le squadre devono avere nomi diversi");
      return;
    }
    if (available === 0) {
      setTab("cards");
      setError("Scegli almeno una categoria");
      return;
    }
    dispatch({ type: "QDCP_SETUP", payload: { teamNames: finalNames, deck: buildQdcpDeck(deckSize, categories) } });
  };

  const tabs: { id: Tab; label: string; badge?: string }[] = [
    { id: "teams", label: "Squadre", badge: String(names.length) },
    { id: "cards", label: "Carte", badge: String(cardsInGame) },
    { id: "points", label: "Punti" },
  ];

  return (
    <QdcpShell>
      <div className="flex h-11 items-center">
        <button
          type="button"
          aria-label="Indietro"
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="qd-press flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-qd-line bg-qd-panel"
        >
          <IconBack />
        </button>
      </div>

      <h1 className="qd-wide m-0 flex flex-col text-[34px] leading-[0.95]" aria-label="Quando, Dove, Come, Perché">
        <span>Quando</span>
        <span className="pl-[22px] text-qd-lime">Dove</span>
        <span className="pl-11">Come</span>
        <span className="pl-[66px] text-qd-lime">Perché</span>
      </h1>
      <p className="m-0 -mt-1 text-[15px] leading-snug font-semibold text-qd-muted">
        Film, canzoni, personaggi, luoghi… Quattro indizi per indovinare.
      </p>

      <form onSubmit={start} className="flex flex-1 flex-col gap-3.5">
        <div role="tablist" aria-label="Preparazione della partita" className="grid grid-cols-3 gap-1 rounded-full bg-qd-panel p-1">
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
                {t.badge && <span className="text-xs opacity-70">{t.badge}</span>}
              </button>
            );
          })}
        </div>

        {tab === "teams" && (
          <section key="teams" id="qd-pane-teams" role="tabpanel" aria-labelledby="qd-tab-teams" className="qd-pane flex flex-col gap-1.5">
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {names.map((name, i) => (
                <li key={i} className="flex h-[52px] items-center gap-2.5 rounded-2xl bg-qd-panel pr-1 pl-2 focus-within:ring-2 focus-within:ring-qd-lime">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] font-qd text-[15px] font-extrabold text-qd-green"
                    style={{ background: QDCP_TEAM_COLORS[i] }}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <label htmlFor={`qdcp-team-${i}`} className="sr-only">
                    Nome della squadra {i + 1}
                  </label>
                  <input
                    id={`qdcp-team-${i}`}
                    value={name}
                    maxLength={MAX_TEAM_NAME_LENGTH}
                    placeholder={`Squadra ${i + 1}`}
                    autoComplete="off"
                    onChange={(e) => {
                      setError(null);
                      setNames((ns) => ns.map((n, j) => (j === i ? e.target.value : n)));
                    }}
                    className="min-w-0 flex-1 bg-transparent text-[17px] font-extrabold text-white placeholder:font-semibold placeholder:text-qd-dim focus:outline-none"
                  />
                  {names.length > QDCP_MIN_TEAMS && (
                    <button
                      type="button"
                      aria-label={`Togli la squadra ${i + 1}`}
                      onClick={() => setNames((ns) => ns.filter((_, j) => j !== i))}
                      className="qd-press flex h-11 w-11 items-center justify-center rounded-full text-qd-muted"
                    >
                      <IconClose size={16} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {names.length < QDCP_MAX_TEAMS && (
              <button
                type="button"
                onClick={() => setNames((ns) => [...ns, ""])}
                className="qd-press h-12 rounded-2xl border-[1.5px] border-dashed border-qd-dash text-[15px] font-extrabold text-qd-lime"
              >
                + Aggiungi una squadra
              </button>
            )}
          </section>
        )}

        {tab === "cards" && (
          <section key="cards" id="qd-pane-cards" role="tabpanel" aria-labelledby="qd-tab-cards" className="qd-pane flex flex-col gap-2.5">
            <span className="flex items-center justify-between">
              <span className="text-[15px] font-extrabold">
                Categorie · {categories.length} di {QDCP_CATEGORIES.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setCategories(allSelected ? [] : QDCP_CATEGORIES);
                }}
                className="qd-press h-11 px-2.5 text-[13px] font-extrabold text-qd-lime"
              >
                {allSelected ? "Deseleziona tutte" : "Seleziona tutte"}
              </button>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QDCP_CATEGORIES.map((c) => {
                const active = categories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleCategory(c)}
                    className={`qd-press flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-extrabold transition-colors ${
                      active ? "bg-qd-lime text-qd-green" : "text-qd-muted shadow-[inset_0_0_0_1.5px_var(--color-qd-line)]"
                    }`}
                  >
                    {c}
                    <span className="text-xs opacity-60">{countQdcpCategory(c)}</span>
                  </button>
                );
              })}
            </div>
            <span className="mt-1 flex justify-between">
              <span className="text-[15px] font-extrabold">Quante carte?</span>
              <span className="text-[13px] font-bold text-qd-muted">{available} disponibili</span>
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {QDCP_DECK_SIZES.map((size) => {
                const tooMany = size !== null && size > available;
                // Se il numero scelto supera le carte disponibili si giocano tutte
                const active = size === deckSize || (size === null && deckSize !== null && deckSize > available);
                return (
                  <button
                    key={size ?? "all"}
                    type="button"
                    aria-pressed={active && !tooMany}
                    disabled={tooMany}
                    onClick={() => setDeckSize(size)}
                    className={`qd-press h-[46px] rounded-[14px] text-base font-extrabold transition-colors disabled:opacity-35 ${
                      active && !tooMany ? "bg-white text-qd-green" : "shadow-[inset_0_0_0_1.5px_var(--color-qd-line)]"
                    }`}
                  >
                    {size ?? "Tutte"}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {tab === "points" && (
          <section key="points" id="qd-pane-points" role="tabpanel" aria-labelledby="qd-tab-points" className="qd-pane flex flex-col gap-2">
            <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
              {QDCP_CLUE_LABELS.map((label, i) => (
                <li
                  key={label}
                  className={`flex h-12 items-center justify-between rounded-2xl px-4 ${INDENT[i]} ${i === 0 ? "bg-qd-lime text-qd-green" : "bg-qd-panel"}`}
                >
                  <span className={`qd-wide text-lg ${i === 0 ? "" : "text-qd-lime"}`}>{label}</span>
                  <span className="text-[15px] font-extrabold">{pointsLabel(qdcpPoints(i + 1))}</span>
                </li>
              ))}
            </ol>
            <p className="m-0 mt-1.5 text-[15px] leading-snug font-semibold text-qd-pale">
              Si risponde quando si vuole: chi indovina prima prende più punti. Ogni indizio svelato ne toglie uno.
            </p>
          </section>
        )}

        {error && (
          <p role="alert" className="m-0 rounded-2xl bg-[#3A1A16] px-4 py-3 text-center text-sm font-bold text-[#FFB3A6]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={available === 0}
          className="qd-press mt-auto h-[60px] shrink-0 rounded-[18px] bg-qd-lime text-[17px] font-extrabold text-qd-green disabled:opacity-40"
        >
          {available === 0 ? "Scegli almeno una categoria" : `Inizia · ${cardsInGame} ${cardsInGame === 1 ? "carta" : "carte"}`}
        </button>
      </form>
    </QdcpShell>
  );
}
