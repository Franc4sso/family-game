import type { ReactNode } from "react";
import type { Top100Team } from "@/types/game.types";

/**
 * Quando, Dove, Come, Perché ha il suo mondo: verde bosco, lime e le quattro
 * parole in Anybody largo, a scalini come sulla copertina.
 */

export type QdTone = "green" | "deep" | "lime";

export function QdcpShell({ children, tone = "green" }: { children: ReactNode; tone?: QdTone }) {
  const look = tone === "lime" ? "bg-qd-lime text-qd-green" : tone === "deep" ? "bg-qd-deep text-white" : "bg-qd-green text-white";
  return (
    <div className={`min-h-dvh font-qd-ui ${look}`}>
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3.5 px-4 pt-3 pb-5">{children}</div>
    </div>
  );
}

/** Avanzamento della partita: "Carta 4 di 15" con una barra sottile. */
export function DeckProgress({ current, total, className = "" }: { current: number; total: number; className?: string }) {
  return (
    <span className={`flex min-w-0 flex-1 flex-col gap-1.5 ${className}`}>
      <span className="text-[13px] font-extrabold text-qd-muted">
        Carta {current} di {total}
      </span>
      <span className="flex h-1 overflow-hidden rounded-full bg-qd-panel" aria-hidden>
        <span className="rounded-full bg-qd-lime transition-[width] duration-300" style={{ width: `${(current / total) * 100}%` }} />
      </span>
    </span>
  );
}

/** Punteggi compatti: una pillola per squadra. */
export function TeamStrip({
  teams,
  deltas,
  onLime = false,
}: {
  teams: Top100Team[];
  deltas?: Map<number, number>;
  onLime?: boolean;
}) {
  // Fino a 4 squadre in 2 colonne (nomi leggibili), da 5 in su in 3
  const cols = teams.length === 3 || teams.length > 4 ? 3 : 2;
  return (
    <ul className="m-0 grid list-none gap-1.5 p-0" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} aria-label="Punteggi">
      {teams.map((team, i) => {
        const delta = deltas?.get(i);
        const lit = !!delta;
        const look = onLime ? (lit ? "bg-qd-green text-white" : "bg-qd-green/12 text-qd-green") : "bg-qd-panel";
        return (
          <li
            key={team.name}
            className={`flex h-10 min-w-0 items-center gap-2 rounded-full pr-3.5 pl-3 ${look}`}
            style={lit ? { boxShadow: `0 0 0 2px ${team.color}` } : undefined}
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: team.color, boxShadow: onLime && !lit ? "0 0 0 1.5px var(--color-qd-green)" : undefined }}
              aria-hidden
            />
            <span className="min-w-0 flex-1 truncate text-sm font-extrabold">{team.name}</span>
            {delta ? (
              <span className="text-xs font-extrabold" style={{ color: team.color }}>
                +{delta}
              </span>
            ) : null}
            <span className="qd-wide text-base">{team.score}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Scheda di conferma dal basso, al posto di window.confirm. */
export function QdConfirm({
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-qd-deep/75 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qd-confirm"
        className="qd-up flex w-full max-w-md flex-col gap-3 rounded-t-[26px] bg-qd-panel px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] font-qd-ui text-white sm:rounded-[26px]"
      >
        <h2 id="qd-confirm" className="m-0 text-2xl leading-tight font-extrabold">
          {title}
        </h2>
        <p className="m-0 text-[15px] font-semibold text-qd-muted">{text}</p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button type="button" onClick={onCancel} className="qd-press h-[52px] rounded-2xl border-[1.5px] border-qd-line text-[15px] font-bold">
            Resta
          </button>
          <button type="button" onClick={onConfirm} className="qd-press h-[52px] rounded-2xl bg-qd-lime text-[15px] font-extrabold text-qd-green">
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
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2.6" {...svg}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" {...svg}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);
export const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2.6" {...svg}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconUndo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.2" {...svg}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </svg>
);
export const IconSliders = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.4" {...svg}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </svg>
);

export const pointsLabel = (p: number) => `${p} ${p === 1 ? "punto" : "punti"}`;
