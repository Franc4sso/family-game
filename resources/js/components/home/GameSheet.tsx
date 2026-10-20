import React, { useEffect, useRef, useState } from "react";
import type { GameMode } from "@/types/game.types";
import type { GameId, GameInfo } from "./games";

/** Voce tipografica del titolo, la stessa della copertina. */
const TITLE_CLASS: Record<GameId, string> = {
  ff: "font-['Big_Shoulders_Display'] font-black uppercase text-5xl",
  rubo: "font-['Bowlby_One'] uppercase text-[44px]",
  mystery: "font-['Abril_Fatface'] text-[34px]",
  "higher-lower": "font-['Bungee'] uppercase text-[28px]",
  "guess-number": "font-['Anton'] uppercase text-[40px]",
  top100: "font-['Unbounded'] font-black text-[44px] tracking-[-0.04em]",
  asta: "font-['Bricolage_Grotesque'] font-extrabold text-[44px]",
  qdcp: "font-['Anybody'] font-extrabold uppercase text-[30px] [font-stretch:130%]",
  francottina: "font-['Big_Shoulders_Display'] font-black uppercase text-5xl",
};

interface GameSheetProps {
  game: GameInfo;
  onClose: () => void;
  onPlay: (mode: GameMode) => void;
}

export function GameSheet({ game, onClose, onPlay }: GameSheetProps) {
  const [modeIndex, setModeIndex] = useState(0);
  const dialogRef = useRef<HTMLElement>(null);
  const { sheet } = game;

  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Chiudi"
        onClick={onClose}
        className="home-scrim absolute inset-0 cursor-default bg-[rgba(8,8,12,0.62)]"
      />
      <section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={game.name}
        className="home-sheet relative outline-none w-full max-w-lg overflow-hidden rounded-t-[26px] bg-[#1E1D24] md:mb-6 md:rounded-[26px]"
      >
        <div className="flex flex-col gap-3.5 px-5 pt-3 pb-[22px]" style={{ background: sheet.bg }}>
          <span className="h-[5px] w-10 self-center rounded-full opacity-45" style={{ background: sheet.ink }} aria-hidden="true" />
          <h2 className={`m-0 leading-[0.95] ${TITLE_CLASS[game.id]}`} style={{ color: sheet.ink }}>
            {game.name}
          </h2>
        </div>

        <div className="flex flex-col gap-3.5 px-5 pt-[18px] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
          <p className="m-0 text-[15px] leading-normal text-[#D6D2DE]">{game.description}</p>

          {game.modes.length > 1 && (
            <div role="group" aria-label="Modalità" className="grid grid-cols-2 gap-1 rounded-[14px] bg-[#131217] p-1">
              {game.modes.map((m, i) => (
                <button
                  key={m.mode}
                  type="button"
                  aria-pressed={i === modeIndex}
                  onClick={() => setModeIndex(i)}
                  className={`home-press h-12 rounded-[10px] text-[15px] font-extrabold transition-colors ${
                    i === modeIndex ? "bg-[#F4F1EA] text-[#131217]" : "text-[#B4B0BD]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {game.chips.map((c) => (
              <span key={c} className="rounded-full border border-[#3A3944] px-[11px] py-[5px] text-[13px] font-bold text-[#E6E2EE]">
                {c}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onPlay(game.modes[modeIndex].mode)}
            className="home-press mt-0.5 flex h-[58px] items-center justify-center gap-2.5 rounded-2xl text-lg font-extrabold"
            style={{ background: sheet.accent, color: sheet.accentInk }}
          >
            Gioca
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="7 4 20 12 7 20 7 4" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
