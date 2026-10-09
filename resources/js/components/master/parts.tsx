import React, { useState } from "react";
import type { Answer } from "@/types/game.types";

// ─── Icone (stroke, ereditano il colore dal testo) ───

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconSliders = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...iconProps}>
    <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
    <circle cx="15" cy="7" r="2" />
    <circle cx="9" cy="17" r="2" />
  </svg>
);

export const IconX = ({ size = 22, strokeWidth = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...iconProps}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconCheck = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.6} {...iconProps}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export const IconEye = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.2} {...iconProps}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconFlame = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...iconProps}>
    <path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.8 1.2 2.7 2 3 0-3 0-6 1-8.5z" />
  </svg>
);

export const IconUndo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2} {...iconProps}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </svg>
);

export const IconArrowRight = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.5} {...iconProps}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth={2.5} {...iconProps}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

/** Torna alla schermata precedente (usa la cronologia dell'annulla). */
export function BackButton({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-11 shrink-0 items-center gap-1.5 self-start rounded-[14px] border border-ff-line bg-ff-surface pl-3 pr-4 text-sm font-bold text-ff-text active:scale-95 disabled:opacity-40"
    >
      <IconArrowLeft />
      Indietro
    </button>
  );
}

const IconDots = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="12" cy="5" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="12" cy="19" r="1.8" />
  </svg>
);

// ─── Layout ───

export function MasterScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ff-bg font-ui text-ff-text">
      <div className="mx-auto flex min-h-screen max-w-md flex-col gap-3.5 px-4 pb-5 pt-4">{children}</div>
    </div>
  );
}

export function SectionLabel({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-muted">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}

/** Numero della risposta; le risposte libere del face-off non hanno posizione. */
export function RankBadge({ rank, className = "" }: { rank: number; className?: string }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] font-display text-base ${className}`}
    >
      {rank <= 8 ? rank : "•"}
    </span>
  );
}

/** Barra in alto della vista Controlli: selettore di vista e menu opzioni. */
export function ControlsTopBar({
  onShowBoard,
  onResetGame,
}: {
  onShowBoard: () => void;
  onResetGame: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex h-11 items-center gap-2.5">
      <div className="grid flex-1 grid-cols-2 gap-1 rounded-[14px] border border-ff-line-soft bg-ff-surface p-1">
        <button
          type="button"
          onClick={onShowBoard}
          className="h-[34px] rounded-[10px] text-[13px] font-bold text-ff-muted active:scale-95"
        >
          Tabellone
        </button>
        <button
          type="button"
          aria-pressed="true"
          className="h-[34px] rounded-[10px] bg-ff-gold text-[13px] font-extrabold text-ff-gold-ink"
        >
          Controlli
        </button>
      </div>
      <button
        type="button"
        aria-label="Altre opzioni"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-ff-line bg-ff-surface active:scale-95"
      >
        <IconDots />
      </button>
      {menuOpen && (
        <div className="absolute right-0 top-12 z-20 w-48 rounded-[14px] border border-ff-line bg-ff-surface p-1.5 shadow-2xl">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              if (confirm("Resettare completamente il gioco?")) onResetGame();
            }}
            className="h-11 w-full rounded-[10px] px-3 text-left text-sm font-bold text-[#FFB0B2] active:bg-ff-surface-2"
          >
            Reset gioco
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Helper sullo stato delle risposte ───

/** Indovinata durante il round (non svelata dal master durante lo steal). */
export const isGuessed = (a: Answer) => a.revealed && !a.revealedInSteal;
