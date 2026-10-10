import React from "react";
import type { Top100Team } from "@/types/game.types";

/**
 * TOP 100 ha il suo mondo: la hit parade. Blu notte, oro per la vetta,
 * numeri in Unbounded e barre che crescono come in una classifica.
 */

export function TopScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-top-night font-top-ui text-top-text">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3.5 px-4 pt-3 pb-5">{children}</div>
    </div>
  );
}

/** Inchiostro scuro leggibile sopra ciascun colore squadra. */
const TEAM_INK: Record<string, string> = {
  "#4C8DFF": "#08142E",
  "#FF7A45": "#2A0E02",
  "#2BB673": "#04210F",
  "#B79CFF": "#1A0B45",
  "#F472B6": "#3A0620",
  "#22D3EE": "#032A30",
};
export const teamInk = (team: Top100Team) => TEAM_INK[team.color] ?? "#0A0F24";

export function TopRoundButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="top-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-top-line bg-top-panel disabled:opacity-35"
    >
      {children}
    </button>
  );
}

/** Il "100" della copertina, piccolo, da intestazione. */
export const TopMark = () => <span className="font-top text-[22px] font-black tracking-[-0.03em] text-top-gold">100</span>;

export function TopLabel({ left, right }: { left: string; right?: string }) {
  return (
    <span className="flex justify-between text-[13px] font-extrabold text-top-muted">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </span>
  );
}

/** Punteggi come barre di classifica: la più lunga è di chi è in testa. */
export function TopStandings({ teams, deltas }: { teams: Top100Team[]; deltas?: Map<string, number> }) {
  const sorted = [...teams].sort((a, b) => b.score - a.score);
  const max = Math.max(1, sorted[0]?.score ?? 0);
  return (
    <ol className="m-0 flex list-none flex-col gap-1.5 p-0" aria-label="Punteggi">
      {sorted.map((team, i) => {
        const delta = deltas?.get(team.name);
        const width = team.score <= 0 ? 0 : Math.max(8, (team.score / max) * 100);
        return (
          <li key={team.name} className="grid grid-cols-[22px_minmax(0,1fr)_auto] items-center gap-2.5">
            <span className={`font-top text-[13px] font-extrabold ${i === 0 && team.score > 0 ? "text-top-gold" : "text-top-muted"}`}>{i + 1}</span>
            <span className="relative h-[34px] overflow-hidden rounded-[10px] bg-top-panel">
              <span className="top-bar absolute inset-y-0 left-0" style={{ width: `${width}%`, background: team.color }} />
              <span
                className="absolute inset-y-0 left-2.5 right-2.5 flex items-center truncate text-sm font-extrabold"
                style={{ color: width > 45 ? teamInk(team) : "var(--color-top-text)" }}
              >
                {team.name}
              </span>
            </span>
            <span className="flex min-w-12 items-baseline justify-end gap-1.5">
              {delta ? (
                <span className="text-xs font-extrabold" style={{ color: team.color }}>
                  +{delta}
                </span>
              ) : null}
              <span className="font-top text-lg font-extrabold">{team.score}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Quanti giri fa ogni squadra: −, numero, +. */
export function RoundsStepper({
  value,
  min,
  max,
  onChange,
  title,
  note,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (rounds: number) => void;
  title: string;
  note: string;
}) {
  return (
    <div className="flex h-14 items-center justify-between gap-3 rounded-2xl bg-top-panel pr-2 pl-4">
      <span className="flex min-w-0 flex-col">
        <span className="text-[15px] font-extrabold">{title}</span>
        <span className="truncate text-xs font-semibold text-top-muted">{note}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label="Un giro in meno"
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="top-press h-11 w-11 rounded-xl border-[1.5px] border-top-line bg-top-night text-xl font-extrabold disabled:opacity-35"
        >
          −
        </button>
        <span className="w-[30px] text-center font-top text-xl font-extrabold" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          aria-label="Un giro in più"
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className="top-press h-11 w-11 rounded-xl border-[1.5px] border-top-line bg-top-night text-xl font-extrabold disabled:opacity-35"
        >
          +
        </button>
      </span>
    </div>
  );
}

export const roundsNote = (rounds: number) => `Ogni squadra risponde ${rounds} ${rounds === 1 ? "volta" : "volte"}`;

/** Scheda di conferma dal basso, al posto di window.confirm. */
export function TopConfirm({
  title,
  text,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  text: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-top-night/75 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="top-confirm"
        className="top-up flex w-full max-w-md flex-col gap-3 rounded-t-[26px] border-t-[1.5px] border-top-line bg-top-panel px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:rounded-[26px]"
      >
        <h2 id="top-confirm" className="m-0 font-top text-2xl leading-tight font-extrabold">
          {title}
        </h2>
        <p className="m-0 text-sm font-semibold text-top-muted">{text}</p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button type="button" onClick={onCancel} className="top-press h-[52px] rounded-2xl border-[1.5px] border-top-line text-[15px] font-bold">
            Resta
          </button>
          <button type="button" onClick={onConfirm} className="top-press h-[52px] rounded-2xl bg-top-gold text-[15px] font-extrabold text-top-gold-ink">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

const svg = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconBack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.4" {...svg}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
export const IconClose = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2.8" {...svg}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconUndo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.4" {...svg}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
  </svg>
);
export const IconArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.6" {...svg}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2.8" {...svg}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);
export const IconSliders = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.4" {...svg}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </svg>
);
export const IconDice = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.2" {...svg}>
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <circle cx="9" cy="9" r="1.2" fill="currentColor" />
    <circle cx="15" cy="15" r="1.2" fill="currentColor" />
    <circle cx="15" cy="9" r="1.2" fill="currentColor" />
    <circle cx="9" cy="15" r="1.2" fill="currentColor" />
  </svg>
);
