import React, { useState } from "react";
import { BackButton, IconArrowRight, IconX, MasterScreen, SectionLabel } from "../master/parts";
import { TOP100_MAX_TEAMS, TOP100_MIN_TEAMS, TOP100_TEAM_COLORS } from "@/services/top100Service";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { Top100Scoring } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100SetupProps {
  dispatch: React.Dispatch<GameAction>;
}

const MIN_ROUNDS = 1;
const MAX_ROUNDS = 5;

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
    <MasterScreen>
      <BackButton onClick={() => dispatch({ type: "CLEAR_MODE" })} />

      <div className="flex flex-col gap-1">
        <h1 className="font-display text-[44px] leading-[0.95] text-ff-gold">TOP 100</h1>
        <p className="text-sm font-semibold text-ff-muted">Indovina chi è in classifica: più in alto, più punti.</p>
      </div>

      <form onSubmit={start} className="flex flex-1 flex-col gap-3.5">
        <SectionLabel left="Squadre" right={`${names.length} di ${TOP100_MAX_TEAMS}`} />

        <ul className="flex flex-col gap-1.5">
          {names.map((name, i) => (
            <li key={i} className="flex h-[52px] items-center gap-2.5 rounded-[14px] border border-ff-line-soft bg-ff-surface pl-2 pr-1.5">
              <span
                className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] font-display text-[15px] text-ff-bg"
                style={{ background: TOP100_TEAM_COLORS[i] }}
              >
                {(finalNames[i][0] ?? "?").toUpperCase()}
              </span>
              <label htmlFor={`top100-team-${i}`} className="sr-only">Nome squadra {i + 1}</label>
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
                className="min-w-0 flex-1 bg-transparent text-base font-extrabold text-ff-text placeholder:font-semibold placeholder:text-ff-muted/70 focus:outline-none"
              />
              {names.length > TOP100_MIN_TEAMS && (
                <button
                  type="button"
                  aria-label={`Rimuovi ${finalNames[i]}`}
                  onClick={() => setNames((ns) => ns.filter((_, j) => j !== i))}
                  className="flex h-10 w-10 items-center justify-center rounded-[11px] text-ff-muted active:scale-95"
                >
                  <IconX size={18} strokeWidth={2.4} />
                </button>
              )}
            </li>
          ))}
        </ul>
        {names.length < TOP100_MAX_TEAMS && (
          <button
            type="button"
            onClick={() => setNames((ns) => [...ns, ""])}
            className="flex h-12 items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-dashed border-[#3A4370] text-sm font-extrabold text-ff-gold active:scale-[0.98]"
          >
            + Aggiungi squadra
          </button>
        )}

        <div className="pt-0.5">
          <SectionLabel left="Come si contano i punti" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ScoringOption
            active={scoring === "classic"}
            onClick={() => setScoring("classic")}
            title="Classico"
            text="La n. 1 vale 100 punti, la n. 100 vale 1"
          />
          <ScoringOption
            active={scoring === "expert"}
            onClick={() => setScoring("expert")}
            title="Esperti"
            text="La n. 100 vale 100: premia le risposte meno ovvie"
          />
        </div>

        <div className="flex h-14 items-center justify-between rounded-2xl border border-ff-line-soft bg-ff-surface pl-4 pr-2">
          <span className="flex flex-col">
            <span className="text-sm font-extrabold">Giri per classifica</span>
            <span className="text-xs font-semibold text-ff-muted">
              Ogni squadra risponde {rounds} {rounds === 1 ? "volta" : "volte"}
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Un giro in meno"
              disabled={rounds <= MIN_ROUNDS}
              onClick={() => setRounds((r) => r - 1)}
              className="h-10 w-10 rounded-[11px] border border-ff-line bg-ff-bg text-lg font-extrabold disabled:opacity-40"
            >
              −
            </button>
            <span className="w-7 text-center font-display text-xl">{rounds}</span>
            <button
              type="button"
              aria-label="Un giro in più"
              disabled={rounds >= MAX_ROUNDS}
              onClick={() => setRounds((r) => r + 1)}
              className="h-10 w-10 rounded-[11px] border border-ff-line bg-ff-bg text-lg font-extrabold disabled:opacity-40"
            >
              +
            </button>
          </span>
        </div>

        {error && (
          <p role="alert" className="rounded-[14px] border border-ff-red-line bg-ff-red-bg px-4 py-3 text-center text-sm font-bold text-[#FFB0B2]">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-auto flex h-[60px] items-center justify-center gap-2.5 rounded-[18px] bg-ff-gold text-[17px] font-extrabold text-ff-gold-ink active:scale-[0.98]"
        >
          Scegli la classifica
          <IconArrowRight />
        </button>
      </form>
    </MasterScreen>
  );
}

function ScoringOption({ active, onClick, title, text }: { active: boolean; onClick: () => void; title: string; text: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex flex-col gap-1 rounded-2xl p-3 text-left active:scale-[0.98] ${
        active ? "border-2 border-ff-gold bg-[#2A2310]" : "border border-ff-line bg-ff-surface"
      }`}
    >
      <span className={`text-sm font-extrabold ${active ? "text-ff-gold" : ""}`}>{title}</span>
      <span className={`text-xs font-semibold leading-snug ${active ? "text-[#E6D9B8]" : "text-ff-muted"}`}>{text}</span>
    </button>
  );
}
