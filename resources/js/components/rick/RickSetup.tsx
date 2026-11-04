import React, { useState } from "react";
import { IconBack, IconClose, Kicker, PrimaryButton, RickShell } from "./RickParts";
import {
  RICK_MAX_PLAYERS,
  RICK_MIN_PLAYERS,
  RICK_PLAYER_COLORS,
  RICK_POINTS,
  RICK_TURNS_EACH,
  buildRickDeck,
  countRickFacts,
} from "@/services/rickService";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { GameAction } from "@/types/actions.types";

interface RickSetupProps {
  dispatch: React.Dispatch<GameAction>;
}

type Tab = "players" | "game";

const RULES: { points: string; text: string }[] = [
  { points: `+${RICK_POINTS.truth}`, text: "a chi vota la risposta vera" },
  { points: `+${RICK_POINTS.fooled}`, text: "per ogni amico che cade nella tua risposta falsa" },
  { points: `+${RICK_POINTS.rickBalance}`, text: "a Rick, se la verità la indovina qualcuno ma non tutti" },
  { points: `+${RICK_POINTS.rickAuthor}`, text: "a Rick, se indovina chi ha scritto una risposta falsa" },
];

export function RickSetup({ dispatch }: RickSetupProps) {
  const [names, setNames] = useState<string[]>(["", "", ""]);
  const [turnsEach, setTurnsEach] = useState<number>(1);
  const [spicy, setSpicy] = useState(false);
  const [tab, setTab] = useState<Tab>("players");
  const [error, setError] = useState<string | null>(null);

  // Un nome lasciato vuoto diventa "Giocatore N"
  const finalNames = names.map((n, i) => n.trim() || `Giocatore ${i + 1}`);
  const rounds = names.length * turnsEach;

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    const lower = finalNames.map((n) => n.toLowerCase());
    if (new Set(lower).size !== lower.length) {
      setTab("players");
      setError("I giocatori devono avere nomi diversi");
      return;
    }
    dispatch({ type: "RICK_SETUP", payload: { names: finalNames, deck: buildRickDeck(spicy), rounds } });
  };

  const tabs: { id: Tab; label: string; badge?: string }[] = [
    { id: "players", label: "Giocatori", badge: String(names.length) },
    { id: "game", label: "Partita", badge: `${rounds} giri` },
  ];

  return (
    <RickShell>
      <div className="flex h-11 items-center">
        <button
          type="button"
          aria-label="Indietro"
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="rick-press flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-rick-line bg-rick-panel"
        >
          <IconBack />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <h1 className="m-0 font-rick text-[44px] leading-[1.02] font-normal text-rick-pink">Non lo so Rick</h1>
        <p className="m-0 text-[15px] leading-snug font-medium text-rick-muted">
          Fatti veri ma folli. Inventa una risposta falsa credibile e scopri quella vera.
        </p>
      </div>

      <form onSubmit={start} className="flex flex-1 flex-col gap-3.5">
        <div role="tablist" aria-label="Preparazione della partita" className="grid grid-cols-2 gap-1 rounded-full bg-rick-panel p-1">
          {tabs.map((t) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`rick-tab-${t.id}`}
                aria-selected={on}
                aria-controls={`rick-pane-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`rick-press flex h-11 items-center justify-center gap-1.5 rounded-full text-[15px] font-extrabold transition-colors ${
                  on ? "bg-rick-pink text-rick-plum" : "text-rick-muted"
                }`}
              >
                {t.label}
                {t.badge && <span className="text-xs opacity-70">{t.badge}</span>}
              </button>
            );
          })}
        </div>

        {tab === "players" && (
          <section key="players" id="rick-pane-players" role="tabpanel" aria-labelledby="rick-tab-players" className="rick-pane flex flex-col gap-1.5">
            <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
              {names.map((name, i) => (
                <li key={i} className="flex h-[52px] items-center gap-2.5 rounded-2xl bg-rick-panel pr-1 pl-2 focus-within:ring-2 focus-within:ring-rick-pink">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold text-rick-plum"
                    style={{ background: RICK_PLAYER_COLORS[i] }}
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <label htmlFor={`rick-player-${i}`} className="sr-only">
                    Nome del giocatore {i + 1}
                  </label>
                  <input
                    id={`rick-player-${i}`}
                    value={name}
                    maxLength={MAX_TEAM_NAME_LENGTH}
                    placeholder={`Giocatore ${i + 1}`}
                    autoComplete="off"
                    onChange={(e) => {
                      setError(null);
                      setNames((ns) => ns.map((n, j) => (j === i ? e.target.value : n)));
                    }}
                    className="min-w-0 flex-1 bg-transparent text-[17px] font-bold text-rick-cream placeholder:font-medium placeholder:text-rick-dim focus:outline-none"
                  />
                  {names.length > RICK_MIN_PLAYERS && (
                    <button
                      type="button"
                      aria-label={`Togli il giocatore ${i + 1}`}
                      onClick={() => setNames((ns) => ns.filter((_, j) => j !== i))}
                      className="rick-press flex h-11 w-11 items-center justify-center rounded-full text-rick-muted"
                    >
                      <IconClose size={16} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {names.length < RICK_MAX_PLAYERS && (
              <button
                type="button"
                onClick={() => setNames((ns) => [...ns, ""])}
                className="rick-press h-12 rounded-2xl border-[1.5px] border-dashed border-rick-line text-[15px] font-extrabold text-rick-pink"
              >
                + Aggiungi un giocatore
              </button>
            )}
            <p className="m-0 mt-1 text-[13px] font-medium text-rick-muted">
              Da {RICK_MIN_PLAYERS} a {RICK_MAX_PLAYERS}, in ordine di posto: il telefono gira in quest'ordine.
            </p>
          </section>
        )}

        {tab === "game" && (
          <section key="game" id="rick-pane-game" role="tabpanel" aria-labelledby="rick-tab-game" className="rick-pane flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <span className="text-[15px] font-extrabold">Quante volte a testa fai Rick?</span>
              <div className="grid grid-cols-3 gap-1.5">
                {RICK_TURNS_EACH.map((k) => {
                  const on = k === turnsEach;
                  return (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setTurnsEach(k)}
                      className={`rick-press flex h-[52px] flex-col items-center justify-center rounded-[14px] transition-colors ${
                        on ? "bg-rick-cream text-rick-plum" : "shadow-[inset_0_0_0_1.5px_var(--color-rick-line)]"
                      }`}
                    >
                      <span className="text-base leading-tight font-extrabold">{k} {k === 1 ? "volta" : "volte"}</span>
                      <span className={`text-xs font-bold ${on ? "text-rick-pink-deep" : "text-rick-muted"}`}>{names.length * k} giri</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex min-h-[60px] cursor-pointer items-center gap-3 rounded-2xl bg-rick-panel px-4 py-2.5">
              <span className="flex flex-1 flex-col">
                <span className="text-[15px] font-extrabold">Anche fatti +18</span>
                <span className="text-[13px] font-medium text-rick-muted">
                  Sesso, droghe e scandali · {countRickFacts(spicy)} fatti in gioco
                </span>
              </span>
              <input type="checkbox" checked={spicy} onChange={(e) => setSpicy(e.target.checked)} className="peer sr-only" />
              <span
                className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-rick-cream ${
                  spicy ? "bg-rick-pink" : "bg-rick-line"
                }`}
                aria-hidden
              >
                <span
                  className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-rick-cream transition-transform duration-200 ${spicy ? "translate-x-5" : ""}`}
                />
              </span>
            </label>

            <div className="flex flex-col gap-1.5">
              <Kicker className="text-rick-pink-soft">Punti</Kicker>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                {RULES.map((r) => (
                  <li key={r.text} className="flex items-center gap-3 rounded-2xl bg-rick-panel px-3.5 py-2.5">
                    <span className="shrink-0 rounded-md bg-rick-lime px-1.5 py-0.5 text-xs font-extrabold text-rick-plum">{r.points}</span>
                    <span className="text-sm leading-snug font-medium text-rick-pale">{r.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {error && (
          <p role="alert" className="m-0 rounded-2xl bg-[#3A1426] px-4 py-3 text-center text-sm font-bold text-[#FFB3CF]">
            {error}
          </p>
        )}

        <div className="mt-auto">
          <PrimaryButton type="submit">Inizia · {rounds} giri</PrimaryButton>
        </div>
      </form>
    </RickShell>
  );
}
