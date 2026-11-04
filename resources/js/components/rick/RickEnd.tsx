import React from "react";
import { Kicker, PrimaryButton, RickShell } from "./RickParts";
import type { RickState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickEndProps {
  state: RickState;
  dispatch: React.Dispatch<GameAction>;
}

/** Fine partita: chi ha ingannato meglio e chi ha fiutato più verità. */
export function RickEnd({ state, dispatch }: RickEndProps) {
  const ranking = state.players.map((p, i) => ({ ...p, i })).sort((a, b) => b.score - a.score);
  const leader = ranking[0];
  const tie = ranking.length > 1 && ranking[1].score === leader.score;
  const played = state.round + 1;

  return (
    <RickShell>
      <span className="flex h-11 items-center text-[13px] font-bold text-rick-muted">
        Fine partita · {played} {played === 1 ? "giro giocato" : "giri giocati"}
      </span>

      <section className="flex flex-col gap-1">
        <Kicker className="text-rick-pink-soft">{tie ? "Finisce" : "Vince"}</Kicker>
        <h1 className="m-0 font-rick text-[clamp(40px,14vw,60px)] leading-none font-normal break-words text-rick-lime [overflow-wrap:anywhere]">
          {tie ? "Pari!" : leader.name}
        </h1>
        <span className="mt-2 w-fit -rotate-3 rounded-[10px] border-[3px] border-rick-pink px-3 py-1 text-sm font-extrabold tracking-[0.06em] text-rick-pink">
          {tie ? "SEMBRA FALSO" : "NON SEMBRA FALSO"}
        </span>
      </section>

      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        {ranking.map((p, pos) => {
          const first = pos === 0;
          return (
            <li
              key={p.i}
              className={`flex items-center gap-3 px-4 ${first ? "h-[68px] rounded-[20px] bg-rick-pink text-rick-plum" : "h-14 rounded-[16px] bg-rick-panel"}`}
            >
              <span className={`w-6 font-extrabold ${first ? "text-xl" : "text-base text-rick-muted"}`}>{pos + 1}</span>
              <span
                className={`shrink-0 rounded-full ${first ? "h-3 w-3" : "h-2.5 w-2.5"}`}
                style={{ background: p.color, boxShadow: first ? "0 0 0 1.5px var(--color-rick-plum)" : undefined }}
                aria-hidden
              />
              <span className={`min-w-0 flex-1 truncate font-bold ${first ? "text-lg" : "text-base"}`}>{p.name}</span>
              <span className={`font-rick ${first ? "text-[32px]" : "text-2xl"}`}>{p.score}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto flex flex-col gap-2 pt-1">
        <PrimaryButton onClick={() => dispatch({ type: "RICK_RESTART" })}>Nuova partita</PrimaryButton>
        <button
          type="button"
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="rick-press h-12 rounded-2xl border-[1.5px] border-rick-line text-[15px] font-bold"
        >
          Torna ai giochi
        </button>
      </div>
    </RickShell>
  );
}
