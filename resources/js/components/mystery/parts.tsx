import React from "react";

/**
 * Personaggio Misterioso ha il suo mondo: viola notte, lilla, Abril Fatface
 * e la sagoma col punto interrogativo della sua copertina.
 */

export type MystTone = "night" | "violet";

export function MystScreen({ tone = "night", children }: { tone?: MystTone; children: React.ReactNode }) {
  const bg = tone === "violet" ? "bg-myst-violet" : "bg-myst-night";
  return (
    <div className={`min-h-dvh font-myst-ui text-myst-text ${bg}`}>
      <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-3 px-4 pt-3 pb-5">{children}</div>
    </div>
  );
}

/** La sagoma della copertina: testa e spalle, con un segno sopra. */
export function MystSilhouette({
  size,
  body,
  mark,
  markColor,
}: {
  size: number;
  body: string;
  mark?: string;
  markColor?: string;
}) {
  return (
    <svg width={size} height={(size * 96) / 104} viewBox="0 0 104 96" aria-hidden className="shrink-0">
      <circle cx="52" cy="36" r="26" fill={body} />
      <path d="M8 96c0-26 20-40 44-40s44 14 44 40z" fill={body} />
      {mark && (
        <text x="52" y="50" textAnchor="middle" fontFamily="Abril Fatface, serif" fontSize="40" fill={markColor}>
          {mark}
        </text>
      )}
    </svg>
  );
}
