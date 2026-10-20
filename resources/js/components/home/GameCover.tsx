import React from "react";
import type { GameId } from "./games";

const BASE = "flex h-full w-full flex-col overflow-hidden rounded-[18px] p-4 text-left";
const META = "mt-1 text-xs font-extrabold";

/** Copertina di un gioco: ogni gioco ha colori, carattere e illustrazione propri. */
export function GameCover({ id }: { id: GameId }) {
  switch (id) {
    case "ff":
      return (
        <div className="flex h-full w-full gap-4 overflow-hidden rounded-[18px] bg-[#1D3BD1] p-[18px] text-left">
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <span className="font-['Big_Shoulders_Display'] text-[50px] leading-[0.86] font-black uppercase text-[#FFD23F] md:text-[72px]">
              Family
              <br />
              Feud
            </span>
            <span className="text-[13px] font-bold text-[#D6DCFF]">Il classico · 2 modalità</span>
          </div>
          <div className="flex flex-[0_0_46%] flex-col justify-center gap-[5px]" aria-hidden="true">
            <div className="flex h-7 items-center justify-between rounded-md bg-[#FFD23F] px-2 font-['Big_Shoulders_Display'] text-[17px] font-black text-[#14112E] md:h-12 md:px-3 md:text-[26px]">
              <span>PIZZA</span>
              <span>38</span>
            </div>
            {[2, 3, 4].map((n) => (
              <div key={n} className="flex h-7 items-center justify-center rounded-md bg-[#0E1A73] md:h-12">
                <span className="flex h-[18px] w-6 items-center justify-center rounded-full bg-[#FFD23F] font-['Big_Shoulders_Display'] text-[13px] font-black text-[#14112E]">
                  {n}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case "rubo":
      return (
        <div className={`${BASE} bg-[#E5322D]`}>
          <div className="flex flex-1 items-center justify-center" aria-hidden="true">
            <div className="relative h-[104px] w-28">
              <div className="absolute top-2.5 left-1.5 h-[86px] w-[62px] -rotate-12 rounded-lg border-[3px] border-[#FFF4E6] bg-[#120A08]" />
              <div className="absolute top-1 left-[42px] flex h-[86px] w-[62px] rotate-[9deg] items-center justify-center rounded-lg border-[3px] border-[#120A08] bg-[#FFF4E6] font-['Bowlby_One'] text-[40px] text-[#E5322D]">
                ?
              </div>
            </div>
          </div>
          <span className="font-['Bowlby_One'] text-4xl leading-none uppercase text-[#120A08]">Rubo</span>
          <span className={`${META} text-[#3A0805]`}>Bluff · 2 sfidanti</span>
        </div>
      );

    case "mystery":
      return (
        <div className={`${BASE} bg-[#3D1E8C]`}>
          <div className="mb-2.5 flex flex-1 items-end justify-center" aria-hidden="true">
            <svg width="104" height="96" viewBox="0 0 104 96">
              <circle cx="52" cy="36" r="26" fill="#25106A" />
              <path d="M8 96c0-26 20-40 44-40s44 14 44 40z" fill="#25106A" />
              <text x="52" y="50" textAnchor="middle" fontFamily="Abril Fatface, serif" fontSize="40" fill="#D9C6FF">
                ?
              </text>
            </svg>
          </div>
          <span className="font-['Abril_Fatface'] text-2xl leading-[1.02] text-[#F3E9FF]">Personaggio Misterioso</span>
          <span className={`${META} text-[#CDBBF5]`}>10 indizi</span>
        </div>
      );

    case "higher-lower":
      return (
        <div className={`${BASE} bg-[#FF7A1A]`}>
          <div className="flex flex-1 flex-col justify-center gap-1.5" aria-hidden="true">
            <div className="flex -rotate-3 items-center gap-1.5 self-start rounded-lg bg-[#2A1200] px-2.5 py-1.5 font-['Bungee'] text-[22px] text-[#FF7A1A]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V4M5 11l7-7 7 7" />
              </svg>
              1.204
            </div>
            <div className="flex rotate-2 items-center gap-1.5 self-end rounded-lg border-2 border-[#2A1200] px-2.5 py-1.5 font-['Bungee'] text-[22px] text-[#2A1200]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16M5 13l7 7 7-7" />
              </svg>
              980
            </div>
          </div>
          <span className="font-['Bungee'] text-[17px] leading-[1.08] uppercase text-[#2A1200]">Più alto o più basso</span>
          <span className={`${META} text-[#4A2200]`}>Catena · 2 squadre</span>
        </div>
      );

    case "guess-number":
      return (
        <div className={`${BASE} bg-[#0E7C74]`}>
          <div className="flex flex-1 items-center justify-center gap-[5px]" aria-hidden="true">
            {["8", "8"].map((d, i) => (
              <span key={i} className="flex h-[46px] w-[30px] items-center justify-center rounded-md bg-[#0A5953] font-['Anton'] text-[34px] text-[#E8FFFB]">
                {d}
              </span>
            ))}
            <span className="h-[46px] w-[30px] rounded-md bg-[#E8FFFB]" />
            <span className="h-[46px] w-[30px] rounded-md bg-[#E8FFFB]" />
          </div>
          <span className="font-['Anton'] text-[27px] leading-[1.02] uppercase text-[#E8FFFB]">Indovina il Numero</span>
          <span className={`${META} text-[#C2EFE9]`}>Risposte a voce</span>
        </div>
      );

    case "top100":
      return (
        <div className={`${BASE} bg-[#0A0F24]`}>
          <div className="flex flex-1 flex-col justify-center gap-[5px]" aria-hidden="true">
            {[
              { n: 1, w: "100%", c: "#F5B83D", t: "#F5B83D" },
              { n: 2, w: "74%", c: "#2A3366", t: "#AEB6DA" },
              { n: 3, w: "52%", c: "#2A3366", t: "#AEB6DA" },
            ].map((r) => (
              <div key={r.n} className="flex items-center gap-1.5">
                <span className="w-3.5 font-['Unbounded'] text-[11px] font-black" style={{ color: r.t }}>
                  {r.n}
                </span>
                <span className="h-2 rounded" style={{ width: r.w, background: r.c }} />
              </div>
            ))}
          </div>
          <span className="font-['Unbounded'] text-[46px] leading-[0.9] font-black tracking-[-0.04em] text-[#F5B83D]">100</span>
          <span className="mt-0.5 font-['Unbounded'] text-[13px] font-extrabold tracking-[3px] text-[#F3F4FA]">TOP</span>
          <span className={`${META} text-[#C9CFEA]`}>Classifiche · 2–6 squadre</span>
        </div>
      );

    case "asta":
      return (
        <div className={`${BASE} bg-[#15100D]`}>
          <div className="flex flex-1 items-center justify-center" aria-hidden="true">
            <div className="flex h-[66px] w-28 -rotate-[7deg] items-center gap-2.5 rounded-md bg-[#F4EBDD] px-3">
              <span className="size-2.5 shrink-0 rounded-full bg-[#15100D]" />
              <span className="flex flex-col font-['Bricolage_Grotesque'] leading-none font-extrabold text-[#1B1410]">
                <span className="text-[10px] tracking-[2px] text-[#6B5848]">LOTTO</span>
                <span className="text-[32px]">01</span>
              </span>
            </div>
          </div>
          <span className="font-['Bricolage_Grotesque'] text-[31px] leading-[0.95] font-extrabold text-[#E8411F]">Asta Folle</span>
          <span className={`${META} text-[#D9CCBD]`}>30 crediti · 2–6 squadre</span>
        </div>
      );

    case "qdcp":
      return (
        <div className="flex h-full w-full items-end justify-between gap-3 overflow-hidden rounded-[18px] bg-[#0B3D26] px-[18px] py-4 text-left">
          <div className="flex flex-col font-['Anybody'] text-[26px] leading-[0.95] font-extrabold uppercase [font-stretch:140%]">
            <span className="text-white">Quando</span>
            <span className="pl-5 text-[#B8F28B]">Dove</span>
            <span className="pl-10 text-white">Come</span>
            <span className="pl-[60px] text-[#B8F28B]">Perché</span>
          </div>
          <span className="text-right text-xs font-extrabold text-[#A7D9B9]">
            4 indizi
            <br />
            2–6 squadre
          </span>
        </div>
      );

    case "francottina":
      return (
        <div className="flex h-full w-full items-stretch justify-between gap-4 overflow-hidden rounded-[18px] bg-[#1A2450] px-[18px] py-4 text-left">
          <div className="flex min-w-0 flex-col justify-between">
            <span className="font-['Big_Shoulders_Display'] text-[34px] leading-[0.86] font-black uppercase text-[#F4EFE2] md:text-[48px]">
              Franc<span className="text-[#E4B553]">ott</span>ina
            </span>
            <span className="text-xs font-extrabold text-[#AEB6DA]">3 parole · 2–6 squadre</span>
          </div>
          <div className="relative flex w-[34%] max-w-[160px] flex-none flex-col justify-end gap-[5px]" aria-hidden="true">
            {/* lama d'acciaio sopra le tessere */}
            <span className="absolute top-0 right-1 left-1 h-4 bg-gradient-to-b from-[#E8EDF7] to-[#7D89A6] [clip-path:polygon(0_0,100%_0,100%_45%,0_100%)]" />
            {["VOLO", "MANO"].map((w) => (
              <span key={w} className="flex h-6 items-center justify-center rounded bg-[#F4EFE2] font-['Big_Shoulders_Display'] text-[15px] font-black text-[#141936]">
                {w}
              </span>
            ))}
            <span className="h-6 rounded bg-[repeating-linear-gradient(135deg,#2A3566_0_6px,#1E2858_6px_12px)]" />
          </div>
        </div>
      );
  }
}
