import React, { useEffect, useState } from "react";

/**
 * Family Feud ha un mondo suo (blu cobalto, squadra A gialla, squadra B corallo):
 * questi pezzi non toccano le altre modalità che usano master/parts.
 */

export type FeudTone = "blue" | "deep" | "coral" | "yellow";

const TONE: Record<FeudTone, string> = {
  blue: "bg-feud-blue text-white",
  deep: "bg-feud-deep text-white",
  coral: "bg-feud-coral text-feud-coral-ink",
  yellow: "bg-feud-yellow text-feud-ink",
};

export function FeudScreen({ tone = "blue", children }: { tone?: FeudTone; children: React.ReactNode }) {
  return (
    <div className={`min-h-dvh font-feud-ui ${TONE[tone]}`}>
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3.5 px-4 pt-3 pb-5">{children}</div>
    </div>
  );
}

export type Side = "A" | "B";

/** Colori di squadra: pieni quando la squadra è protagonista, a contorno quando no. */
export const TEAM = {
  A: {
    solid: "bg-feud-yellow text-feud-ink",
    soft: "text-feud-ink-soft",
    outlineText: "text-white",
    outlineScore: "text-feud-yellow",
  },
  B: {
    solid: "bg-feud-coral text-feud-coral-ink",
    soft: "text-feud-coral-ink-soft",
    outlineText: "text-feud-coral-pale",
    outlineScore: "text-feud-coral-soft",
  },
} as const;

/** Numero della risposta nel suo ovale, come sul tabellone televisivo. */
export function RankOval({ rank, className = "" }: { rank: number; className?: string }) {
  return (
    <span
      className={`flex h-[30px] w-[38px] shrink-0 items-center justify-center rounded-full font-feud text-xl font-black ${className}`}
    >
      {rank <= 8 ? rank : "•"}
    </span>
  );
}

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const FeudX = ({ size = 28, strokeWidth = 3.4 }: { size?: number; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={strokeWidth} {...iconProps}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const FeudBackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth={2.4} {...iconProps}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const FeudPlayIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 4l13 8-13 8z" />
  </svg>
);

/** Pulsante tondo per tornare indietro. */
export function FeudBack({ onClick, disabled = false, tone = "blue" }: { onClick: () => void; disabled?: boolean; tone?: FeudTone }) {
  const bg = tone === "deep" ? "border-2 border-feud-line" : "bg-feud-navy/60";
  return (
    <button
      type="button"
      aria-label="Indietro"
      onClick={onClick}
      disabled={disabled}
      className={`feud-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${bg} disabled:opacity-40`}
    >
      <FeudBackIcon />
    </button>
  );
}

/**
 * Ricorda cosa il tabellone ha già mostrato, così risposte ed errori si animano
 * solo la prima volta che compaiono, anche se il master cambia vista.
 * Il confronto avviene al primo render (sicuro anche con StrictMode).
 */
const seen = new Map<string, number>();

export function useFirstShow(key: string, value: number): boolean {
  const [fresh] = useState(() => value > (seen.get(key) ?? 0));
  useEffect(() => {
    seen.set(key, value);
  }, [key, value]);
  return fresh;
}

/** Come useFirstShow, ma torna false dopo `duration` ms: per un effetto a tutto schermo. */
export function useGrowthFlash(key: string, value: number, duration = 900): boolean {
  const fresh = useFirstShow(key, value);
  const [flash, setFlash] = useState(fresh);
  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(false), duration);
    return () => clearTimeout(t);
  }, [flash, duration]);
  return flash;
}
