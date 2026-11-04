import type { ReactNode } from "react";
import { RICK_BLANK } from "@/services/rickService";

/**
 * Non lo so Rick ha il suo mondo: prugna notte, fucsia neon da Las Vegas,
 * carte color crema e il timbro "sembra falso". Titoli in Shrikhand.
 */

export type RickTone = "plum" | "pink";

export function RickShell({ children, tone = "plum" }: { children: ReactNode; tone?: RickTone }) {
  const look = tone === "pink" ? "bg-rick-pink text-rick-plum" : "bg-rick-plum text-rick-cream";
  return (
    <div className={`min-h-dvh font-rick-ui ${look}`}>
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-4 px-4 pt-3 pb-5">{children}</div>
    </div>
  );
}

/** Il logo: nome in Shrikhand e timbrino "FALSO?". */
export function RickLogo({ onPink = false }: { onPink?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`font-rick text-[22px] leading-none ${onPink ? "text-rick-plum" : "text-rick-pink"}`}>Non lo so Rick</span>
      <span
        className={`-rotate-8 rounded-md border-2 px-1.5 py-px text-[10px] font-extrabold tracking-[0.08em] ${
          onPink ? "border-rick-plum text-rick-plum" : "border-rick-lime text-rick-lime"
        }`}
        aria-hidden
      >
        FALSO?
      </span>
    </span>
  );
}

/** Il timbro grande, calato sulla carta quando una risposta si scopre falsa. */
export function FakeStamp({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rick-stamp rounded-[10px] border-4 border-rick-pink bg-rick-plum px-3 py-1.5 text-lg font-extrabold tracking-[0.06em] whitespace-nowrap text-rick-pink ${className}`}
    >
      SEMBRA FALSO
    </span>
  );
}

/**
 * Testo del fatto con lo spazio vuoto: vuoto è una riga fucsia,
 * con `fill` mostra dentro la risposta (quella scritta o la verità).
 */
export function FactText({ text, fill, className = "" }: { text: string; fill?: string; className?: string }) {
  const [before, after = ""] = text.split(RICK_BLANK);
  return (
    <p className={`m-0 font-bold ${className}`}>
      {before}
      {fill ? (
        <span className="rounded-lg bg-rick-pink px-2 text-rick-plum [box-decoration-break:clone]">{fill}</span>
      ) : (
        <span className="inline-block w-[5.5em] border-b-4 border-rick-pink align-baseline" aria-label="spazio vuoto">
          &nbsp;
        </span>
      )}
      {after}
    </p>
  );
}

/** Carta crema leggermente storta, come un oggetto posato sul banco. */
export function FactCard({ children, tilt = "left", className = "" }: { children: ReactNode; tilt?: "left" | "right"; className?: string }) {
  return (
    <div
      className={`rounded-[22px] bg-rick-cream px-5 py-5 text-rick-plum ${tilt === "left" ? "-rotate-[1.2deg]" : "rotate-[1.2deg]"} ${className}`}
    >
      {children}
    </div>
  );
}

/** Etichetta maiuscola piccola delle sezioni. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-xs font-extrabold tracking-[0.1em] uppercase ${className}`}>{children}</span>;
}

/** Bottone principale fucsia, sempre in fondo allo schermo. */
export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
  dark = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  dark?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rick-press h-[60px] w-full shrink-0 rounded-[18px] px-4 text-[18px] font-extrabold disabled:opacity-40 ${
        dark ? "bg-rick-plum text-rick-cream" : "bg-rick-pink text-rick-plum"
      }`}
    >
      {children}
    </button>
  );
}

/** Pallino col colore del giocatore e l'iniziale. */
export function PlayerDot({ name, color, size = 30 }: { name: string; color: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-extrabold text-rick-plum"
      style={{ width: size, height: size, background: color, fontSize: size * 0.45 }}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * Schermata di passaggio: tutta fucsia, nome gigante. Copre ciò che c'è sotto
 * finché la persona giusta non ha il telefono in mano.
 */
export function Handoff({
  kicker,
  name,
  hint,
  confirmLabel,
  onConfirm,
  progress,
}: {
  kicker: string;
  name: string;
  hint: string;
  confirmLabel: string;
  onConfirm: () => void;
  progress?: { done: number; total: number };
}) {
  return (
    <RickShell tone="pink">
      <div className="flex h-11 items-center justify-between">
        <RickLogo onPink />
        {progress && (
          <span className="flex gap-1.5" aria-label={`Risposte scritte: ${progress.done} di ${progress.total}`}>
            {Array.from({ length: progress.total }, (_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full ${i === progress.done ? "w-[22px] bg-rick-plum" : i < progress.done ? "w-2 bg-rick-plum" : "w-2 bg-rick-pink-deep"}`}
              />
            ))}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <Kicker className="text-sm tracking-[0.14em]">{kicker}</Kicker>
        <h1 className="m-0 font-rick text-[clamp(48px,18vw,84px)] leading-none font-normal break-words text-rick-cream [overflow-wrap:anywhere]">
          {name}
        </h1>
        <span className="-rotate-6 rounded-[10px] border-[3px] border-rick-plum px-3 py-1.5 text-[13px] font-extrabold tracking-[0.1em]">
          NON SBIRCIARE
        </span>
        <p className="m-0 max-w-[280px] text-base leading-snug font-medium">{hint}</p>
      </div>
      <PrimaryButton dark onClick={onConfirm}>
        {confirmLabel}
      </PrimaryButton>
    </RickShell>
  );
}

/** Scheda di conferma dal basso, al posto di window.confirm. */
export function RickConfirm({
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-rick-deep/80 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rick-confirm"
        className="rick-up flex w-full max-w-md flex-col gap-3 rounded-t-[26px] bg-rick-panel px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] font-rick-ui text-rick-cream sm:rounded-[26px]"
      >
        <h2 id="rick-confirm" className="m-0 text-2xl leading-tight font-extrabold">
          {title}
        </h2>
        <p className="m-0 text-[15px] font-medium text-rick-muted">{text}</p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button type="button" onClick={onCancel} className="rick-press h-[52px] rounded-2xl border-[1.5px] border-rick-line text-[15px] font-bold">
            Resta
          </button>
          <button type="button" onClick={onConfirm} className="rick-press h-[52px] rounded-2xl bg-rick-pink text-[15px] font-extrabold text-rick-plum">
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
export const IconUndo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.2" {...svg}>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </svg>
);
export const IconShuffle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" strokeWidth="2.2" {...svg}>
    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);
export const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="3" {...svg}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);
