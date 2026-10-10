import React, { useState } from "react";
import { IconBack, IconClose, RoundsStepper, TopLabel, TopRoundButton, TopScreen, roundsNote, teamInk } from "./parts";
import { TOP100_MAX_ROUNDS, TOP100_MAX_TEAMS, TOP100_MIN_ROUNDS, TOP100_MIN_TEAMS, TOP100_TEAM_COLORS } from "@/services/top100Service";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { Top100Scoring } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100SetupProps {
  dispatch: React.Dispatch<GameAction>;
}

export function Top100Setup({ dispatch }: Top100SetupProps) {
  const [names, setNames] = useState<string[]>(["", ""]);
  const [scoring, setScoring] = useState<Top100Scoring>("classic");
  const [rounds, setRounds] = useState(3);
  const [error, setError] = useState<string | null>(null);

  // Un nome lasciato vuoto diventa "Squadra N"
  const finalNames = names.map((n, i) => n.trim() || `Squadra ${i + 1}`);

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    const lower = finalNames.map((n) => n.toLowerCase());
    if (new Set(lower).size !== lower.length) {
      setError("Le squadre devono avere nomi diversi");
      return;
    }
    dispatch({ type: "TOP100_SETUP", payload: { teamNames: finalNames, scoring, roundsPerCategory: rounds } });
  };

  return (
    <TopScreen>
      <div className="flex h-11 items-center">
        <TopRoundButton label="Indietro" onClick={() => dispatch({ type: "CLEAR_MODE" })}>
          <IconBack />
        </TopRoundButton>
      </div>

      <section className="flex items-end justify-between gap-3.5">
        <h1 className="m-0 flex flex-col">
          <span className="font-top text-lg font-extrabold tracking-[0.3em]">TOP</span>
          <span className="font-top text-[92px] leading-[0.86] font-black tracking-[-0.05em] text-top-gold">100</span>
        </h1>
        <div className="flex flex-1 flex-col gap-1.5 pb-2" aria-hidden>
          <span className="h-2.5 w-full rounded-full bg-top-gold" />
          <span className="h-2.5 w-[74%] rounded-full bg-top-line" />
          <span className="h-2.5 w-[52%] rounded-full bg-top-line" />
        </div>
      </section>
      <p className="m-0 -mt-1 text-base leading-snug font-semibold text-top-muted">
        Dai una classifica: le squadre nominano chi c’è dentro. Più è in alto, più punti.
      </p>

      <form onSubmit={start} className="flex flex-1 flex-col gap-3.5">
        <section className="flex flex-col gap-1.5">
          <TopLabel left="Squadre" right={`${names.length} di ${TOP100_MAX_TEAMS}`} />
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {names.map((name, i) => (
              <li key={i} className="flex h-[50px] items-center gap-2.5 rounded-[14px] bg-top-panel pr-1.5 pl-2 focus-within:ring-2 focus-within:ring-top-gold">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] font-top text-sm font-extrabold"
                  style={{ background: TOP100_TEAM_COLORS[i], color: teamInk({ name, score: 0, color: TOP100_TEAM_COLORS[i] }) }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <label htmlFor={`top100-team-${i}`} className="sr-only">
                  Nome della squadra {i + 1}
                </label>
                <input
                  id={`top100-team-${i}`}
                  value={name}
                  maxLength={MAX_TEAM_NAME_LENGTH}
                  placeholder={`Squadra ${i + 1}`}
                  autoComplete="off"
                  onChange={(e) => {
                    setError(null);
                    setNames((ns) => ns.map((n, j) => (j === i ? e.target.value : n)));
                  }}
                  className="min-w-0 flex-1 bg-transparent text-[17px] font-extrabold text-top-text placeholder:font-semibold placeholder:text-top-muted/70 focus:outline-none"
                />
                {names.length > TOP100_MIN_TEAMS && (
                  <button
                    type="button"
                    aria-label={`Togli la squadra ${i + 1}`}
                    onClick={() => setNames((ns) => ns.filter((_, j) => j !== i))}
                    className="top-press flex h-10 w-10 items-center justify-center text-top-muted"
                  >
                    <IconClose size={16} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {names.length < TOP100_MAX_TEAMS && (
            <button
              type="button"
              onClick={() => setNames((ns) => [...ns, ""])}
              className="top-press h-11 rounded-[14px] border-[1.5px] border-dashed border-top-line text-[15px] font-extrabold text-top-gold"
            >
              + Aggiungi una squadra
            </button>
          )}
        </section>

        <section className="flex flex-col gap-1.5">
          <TopLabel left="Quanto vale una risposta" />
          <div className="grid grid-cols-2 gap-2">
            <ScoringOption active={scoring === "classic"} onClick={() => setScoring("classic")} title="Classico" rank="#1" note="Premia chi va sul sicuro" />
            <ScoringOption active={scoring === "expert"} onClick={() => setScoring("expert")} title="Esperti" rank="#100" note="Premia le meno ovvie" />
          </div>
        </section>

        <RoundsStepper
          title="Giri per classifica"
          note={roundsNote(rounds)}
          value={rounds}
          min={TOP100_MIN_ROUNDS}
          max={TOP100_MAX_ROUNDS}
          onChange={setRounds}
        />
        <p className="m-0 -mt-2 px-1 text-xs font-semibold text-top-muted">Puoi cambiarli per ogni classifica, anche mentre si gioca.</p>

        {error && (
          <p role="alert" className="m-0 rounded-[14px] bg-top-panel px-4 py-3 text-center text-sm font-bold text-top-red-soft">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="top-press mt-auto h-[60px] rounded-[18px] bg-top-gold text-[17px] font-extrabold text-top-gold-ink"
        >
          Scegli la classifica
        </button>
      </form>
    </TopScreen>
  );
}

function ScoringOption({
  active,
  onClick,
  title,
  rank,
  note,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  rank: string;
  note: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`top-press flex flex-col gap-1 rounded-2xl p-3 text-left ${
        active ? "border-2 border-top-gold bg-top-gold-bg" : "border-[1.5px] border-top-line bg-top-panel"
      }`}
    >
      <span className={`text-[15px] font-extrabold ${active ? "text-top-gold" : ""}`}>{title}</span>
      <span className={`flex items-baseline gap-1.5 ${active ? "text-top-gold-text" : "text-top-muted"}`}>
        <span className="font-top text-[13px] font-extrabold">{rank}</span>
        <span className="text-[13px] font-bold">vale 100</span>
      </span>
      <span className={`text-xs font-semibold ${active ? "text-top-gold-text/80" : "text-top-muted"}`}>{note}</span>
    </button>
  );
}
