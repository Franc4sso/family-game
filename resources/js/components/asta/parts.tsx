import React, { useState } from "react";
import { paddleNumber } from "@/services/astaService";
import type { AstaTeam } from "@/types/game.types";

// ─── Icone (stroke, ereditano il colore) ───

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconHammer = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.2} {...stroke}>
    <path d="M14 4l6 6M11 7l6 6M4 20l7-7M9.5 5.5l9 9" />
  </svg>
);
export const IconBack = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth={2.4} {...stroke}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const IconClose = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.6} {...stroke}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconExpand = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth={2.2} {...stroke}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);
export const IconCamera = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth={2.2} {...stroke}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);
export const IconLock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth={2.2} {...stroke}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const IconTrash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth={2} {...stroke}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);
export const IconUndo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth={2} {...stroke}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </svg>
);

// ─── Layout ───

export function AstaScreen({ children, padded = true }: { children: React.ReactNode; padded?: boolean }) {
  return (
    <div className="min-h-screen bg-asta-bg font-asta text-asta-cream">
      <div className={`mx-auto flex min-h-screen max-w-md flex-col ${padded ? "gap-3.5 px-3.5 pb-4 pt-3.5" : ""}`}>{children}</div>
    </div>
  );
}

export function MonoLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-asta-mono text-[11px] font-bold tracking-[0.1em] text-asta-muted ${className}`}>{children}</span>;
}

export function BackPill({ onClick, label = "Indietro" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 items-center gap-1.5 self-start rounded-full border border-asta-line bg-asta-surface pl-2.5 pr-3.5 text-sm font-bold active:scale-95"
    >
      <IconBack />
      {label}
    </button>
  );
}

/** La paletta d'asta di una squadra: cerchio colorato col numero, manico sotto. */
export function Paddle({
  team,
  index,
  size = 44,
  handle = false,
  ring = false,
}: {
  team: AstaTeam;
  index: number;
  size?: number;
  handle?: boolean;
  ring?: boolean;
}) {
  return (
    <span className="flex shrink-0 flex-col items-center">
      <span
        className="flex items-center justify-center rounded-full font-asta-mono font-bold text-asta-bg"
        style={{
          width: size,
          height: size,
          background: team.color,
          fontSize: Math.round(size * 0.32),
          boxShadow: ring ? "0 0 0 3px #E8411F" : undefined,
        }}
        aria-hidden
      >
        {paddleNumber(index)}
      </span>
      {handle && <span className="h-3.5 w-2 rounded-b-[3px] bg-[#6B5848]" aria-hidden />}
    </span>
  );
}

/**
 * Foto del lotto a tutta larghezza, sempre intera (mai tagliata): le bande
 * scure riempiono lo spazio se l'immagine è più stretta o più alta.
 */
export function LotPhoto({
  src,
  alt,
  height = "h-[min(46vh,340px)]",
  onExpand,
  children,
}: {
  src: string;
  alt: string;
  height?: string;
  onExpand?: () => void;
  children?: React.ReactNode;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <div className={`relative w-full bg-asta-photo ${height}`}>
      {broken ? (
        <div className="flex h-full w-full items-center justify-center font-asta-mono text-xs text-asta-muted">FOTO NON DISPONIBILE</div>
      ) : (
        <img src={src} alt={alt} onError={() => setBroken(true)} className="h-full w-full object-contain" draggable={false} />
      )}
      {onExpand && !broken && (
        <button
          type="button"
          onClick={onExpand}
          aria-label="Mostra la foto a schermo intero"
          className="absolute bottom-3 right-3 flex h-11 items-center gap-1.5 rounded-full bg-asta-bg/90 px-3.5 text-[13px] font-bold active:scale-95"
        >
          <IconExpand />
          Schermo intero
        </button>
      )}
      {children}
    </div>
  );
}

/** Selettore Tabellone / Banco con menu opzioni. */
export function BancoTabs({
  active,
  onBoard,
  onBanco,
  menu,
}: {
  active: "board" | "banco";
  onBoard: () => void;
  onBanco: () => void;
  menu: { label: string; onClick: () => void; danger?: boolean; disabled?: boolean }[];
}) {
  const [open, setOpen] = useState(false);
  const tab = (isActive: boolean) =>
    `rounded-full text-sm ${isActive ? "bg-asta-cream font-extrabold text-asta-ink" : "font-bold text-asta-muted"}`;
  return (
    <div className="relative flex items-center gap-2">
      <div className="grid h-12 flex-1 grid-cols-2 gap-1 rounded-full border border-asta-line bg-asta-surface p-1">
        <button type="button" aria-pressed={active === "board"} onClick={onBoard} className={tab(active === "board")}>
          Tabellone
        </button>
        <button type="button" aria-pressed={active === "banco"} onClick={onBanco} className={tab(active === "banco")}>
          Banco
        </button>
      </div>
      <button
        type="button"
        aria-label="Altre opzioni"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-asta-line bg-asta-surface active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="12" cy="5" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="12" cy="19" r="1.8" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-14 z-30 w-56 rounded-2xl border border-asta-line bg-asta-surface p-1.5 shadow-2xl">
          {menu.map((m) => (
            <button
              key={m.label}
              type="button"
              disabled={m.disabled}
              onClick={() => {
                setOpen(false);
                m.onClick();
              }}
              className={`h-11 w-full rounded-xl px-3 text-left text-sm font-bold active:bg-asta-line disabled:opacity-40 ${
                m.danger ? "text-[#FF9A86]" : ""
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const btnRed =
  "flex items-center justify-center gap-2.5 rounded-full bg-asta-red font-extrabold text-asta-red-ink active:scale-[0.98] disabled:opacity-40";
export const btnCream =
  "flex items-center justify-center gap-2 rounded-full bg-asta-cream font-extrabold text-asta-ink active:scale-[0.98] disabled:opacity-40";
export const btnGhost =
  "flex items-center justify-center gap-2 rounded-full border border-asta-line bg-asta-surface font-bold active:scale-[0.98] disabled:opacity-40";
