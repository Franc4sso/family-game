import React, { useCallback, useState } from "react";
import type { Dispatch } from "react";
import type { GameAction } from "@/types/actions.types";
import type { GameMode } from "@/types/game.types";
import { GAMES, type GameId } from "./home/games";
import { GameCover } from "./home/GameCover";
import { GameSheet } from "./home/GameSheet";

interface HomeScreenProps {
  dispatch: Dispatch<GameAction>;
}

/** Dimensioni di ogni copertina: su telefono griglia a 2 colonne, da tablet in su scaffale a celle. */
const COVER_LAYOUT: Record<GameId, string> = {
  ff: "col-span-2 h-[188px] md:h-auto md:row-span-2",
  rubo: "h-[218px] md:h-auto",
  mystery: "h-[218px] md:h-auto",
  top100: "h-[218px] md:h-auto",
  asta: "h-[218px] md:h-auto",
  "higher-lower": "h-[218px] md:h-auto",
  "guess-number": "h-[218px] md:h-auto",
  qdcp: "col-span-2 h-[150px] md:h-auto",
};

const ORDER: GameId[] = ["ff", "rubo", "mystery", "top100", "asta", "higher-lower", "guess-number", "qdcp"];

export function HomeScreen({ dispatch }: HomeScreenProps) {
  const [openId, setOpenId] = useState<GameId | null>(null);
  const openGame = GAMES.find((g) => g.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);
  const play = (mode: GameMode) => {
    dispatch({ type: "SET_GAME_MODE", payload: { mode } });
  };

  return (
    <div className="min-h-dvh bg-[#131217] font-['Figtree'] text-[#F4F1EA] selection:bg-[#F4F1EA] selection:text-[#131217]">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-4 px-4 pt-4 pb-8 md:gap-6 md:px-6 md:pt-8">
        <header className="flex min-h-11 items-center">
          <h1 className="m-0 text-[28px] font-extrabold tracking-[-0.02em] md:text-[40px]">Scegli il gioco</h1>
        </header>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] md:auto-rows-[240px] md:gap-4 md:[grid-auto-flow:dense]">
          {ORDER.map((id) => {
            const game = GAMES.find((g) => g.id === id)!;
            return (
              <button
                key={id}
                type="button"
                aria-label={game.name}
                onClick={() => setOpenId(id)}
                className={`home-cover block rounded-[18px] p-0 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#F4F1EA] ${COVER_LAYOUT[id]}`}
              >
                <GameCover id={id} />
              </button>
            );
          })}
        </div>
      </div>

      {openGame && <GameSheet key={openGame.id} game={openGame} onClose={close} onPlay={play} />}
    </div>
  );
}
