import React from "react";

/**
 * Rubo ha il suo mondo: il tavolo rosso, due carte (una crema, una nera)
 * e il Bowlby One della sua copertina. La squadra A gioca con la carta
 * crema, la squadra B con quella nera.
 */

export type RuboTone = "red" | "ink";

export function RuboTable({ tone = "red", children }: { tone?: RuboTone; children: React.ReactNode }) {
  const look = tone === "ink" ? "bg-rubo-ink text-rubo-cream" : "bg-rubo-red text-rubo-ink";
  return (
    <div className={`min-h-dvh font-rubo-ui ${look}`}>
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3 px-4 pt-3 pb-5">{children}</div>
    </div>
  );
}

/** Le due carte della copertina, una nera dietro e una crema col punto di domanda. */
export function RuboCards() {
  return (
    <div className="relative h-[92px] w-[104px] shrink-0" aria-hidden>
      <div className="absolute top-2 left-1 h-[76px] w-[54px] -rotate-12 rounded-lg border-[3px] border-rubo-cream bg-rubo-ink" />
      <div className="absolute top-0.5 left-10 flex h-[76px] w-[54px] rotate-[9deg] items-center justify-center rounded-lg border-[3px] border-rubo-ink bg-rubo-cream font-rubo text-[34px] text-rubo-red">
        ?
      </div>
    </div>
  );
}

export function RuboRoundButton({
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
      className="rubo-press flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-current disabled:opacity-30"
    >
      {children}
    </button>
  );
}

export const IconBack = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconUndo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
  </svg>
);
