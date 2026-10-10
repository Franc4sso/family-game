import React, { useState } from "react";
import { paddleNumber } from "@/services/astaService";
import type { AstaTeam } from "@/types/game.types";

/**
 * Asta Folle ha due ambienti. La sala (tone "paper") è quello che si mostra
 * a tutti: pagine di un catalogo d'asta stampato, crema e inchiostro. Il banco
 * (tone "dark") è il dietro le quinte del banditore.
 */

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
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth={2.4} {...stroke}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
export const IconChevron = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth={2.4} {...stroke}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);
export const IconClose = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={2.6} {...stroke}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const IconExpand = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth={2.2} {...stroke}>
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
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth={2.2} {...stroke}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </svg>
);
export const IconDots = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <circle cx="5" cy="12" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="19" cy="12" r="1.8" />
  </svg>
);

// ─── Layout ───

export type AstaTone = "dark" | "paper";

export function AstaScreen({
  children,
  padded = true,
  tone = "dark",
}: {
  children: React.ReactNode;
  padded?: boolean;
  tone?: AstaTone;
}) {
  const look = tone === "paper" ? "bg-asta-paper text-asta-ink" : "bg-asta-bg text-asta-cream";
  return (
    <div className={`min-h-dvh font-asta ${look}`}>
      <div className={`mx-auto flex min-h-dvh max-w-md flex-col ${padded ? "gap-3.5 px-4 pt-3 pb-5" : ""}`}>{children}</div>
    </div>
  );
}

export function MonoLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-asta-mono text-[11px] font-bold tracking-[0.06em] text-asta-muted ${className}`}>{children}</span>;
}

/** Il nome del gioco, come intestazione delle pagine della sala. */
export const AstaWordmark = () => <span className="text-2xl font-extrabold tracking-[-0.03em] text-asta-red">Asta Folle</span>;

export function BackPill({ onClick, label = "Indietro" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="asta-press flex h-11 items-center gap-1.5 self-start rounded-full border-[1.5px] border-asta-line bg-asta-surface pr-4 pl-2.5 text-sm font-extrabold"
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
  className = "",
}: {
  team: AstaTeam;
  index: number;
  size?: number;
  handle?: boolean;
  ring?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex shrink-0 flex-col items-center ${className}`} aria-hidden>
      <span
        className="flex items-center justify-center rounded-full font-asta-mono font-bold text-asta-bg"
        style={{
          width: size,
          height: size,
          background: team.color,
          fontSize: Math.round(size * 0.32),
          boxShadow: ring ? "0 0 0 3px var(--color-asta-red)" : undefined,
        }}
      >
        {paddleNumber(index)}
      </span>
      {handle && (
        <span className="rounded-b-[3px] bg-asta-ink-muted" style={{ width: Math.round(size * 0.18), height: Math.round(size * 0.3) }} />
      )}
    </span>
  );
}

/**
 * Foto del lotto, sempre intera (mai tagliata): le bande scure riempiono lo
 * spazio se l'immagine è più stretta o più alta.
 */
export function LotPhoto({
  src,
  alt,
  height = "h-[min(44dvh,360px)]",
  className = "",
  dim = false,
  onExpand,
  children,
}: {
  src: string;
  alt: string;
  height?: string;
  className?: string;
  dim?: boolean;
  onExpand?: () => void;
  children?: React.ReactNode;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className={`relative m-0 w-full overflow-hidden bg-asta-photo ${height} ${className}`}>
      {broken ? (
        <div className="flex h-full w-full items-center justify-center font-asta-mono text-xs text-asta-muted">FOTO NON DISPONIBILE</div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setBroken(true)}
          className={`h-full w-full object-contain ${dim ? "opacity-75" : ""}`}
          draggable={false}
        />
      )}
      {onExpand && !broken && (
        <button
          type="button"
          onClick={onExpand}
          aria-label="Mostra la foto a schermo intero"
          className="asta-press absolute right-2.5 bottom-2.5 flex h-11 items-center gap-1.5 rounded-full bg-asta-bg/90 px-3.5 text-[13px] font-bold text-asta-cream"
        >
          <IconExpand />
          Schermo intero
        </button>
      )}
      {children}
    </figure>
  );
}

/** Scheda di conferma dal basso, al posto di window.confirm. */
export function AstaConfirm({
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-asta-photo/70 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="asta-confirm"
        className="asta-up flex w-full max-w-md flex-col gap-3 rounded-t-[26px] bg-asta-surface px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] font-asta text-asta-cream sm:rounded-[26px]"
      >
        <h2 id="asta-confirm" className="m-0 text-2xl leading-tight font-extrabold tracking-[-0.02em]">
          {title}
        </h2>
        <p className="m-0 text-[15px] font-semibold text-asta-muted">{text}</p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button type="button" onClick={onCancel} className={`${btnGhost} h-[52px] text-[15px]`}>
            Resta
          </button>
          <button type="button" onClick={onConfirm} className={`${btnRed} h-[52px] text-[15px]`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export const btnRed =
  "asta-press flex items-center justify-center gap-2.5 rounded-full bg-asta-red font-extrabold text-asta-red-ink disabled:opacity-40";
export const btnCream =
  "asta-press flex items-center justify-center gap-2 rounded-full bg-asta-cream font-extrabold text-asta-ink disabled:opacity-40";
export const btnInk =
  "asta-press flex items-center justify-center gap-2 rounded-full bg-asta-ink font-extrabold text-asta-cream disabled:opacity-40";
export const btnGhost =
  "asta-press flex items-center justify-center gap-2 rounded-full border-[1.5px] border-asta-line bg-asta-surface font-bold disabled:opacity-40";
/** Bottone secondario sulle pagine della sala. */
export const btnOutline =
  "asta-press flex items-center justify-center gap-2 rounded-full border-2 border-asta-ink font-bold text-asta-ink disabled:opacity-40";
