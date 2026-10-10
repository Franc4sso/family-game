import React from "react";
import { IconUndo, TopMark, TopScreen, TopStandings, teamInk } from "./parts";
import type { Top100Category } from "@/data/top100";
import { TOP100_MAX_ROUNDS, top100CurrentTeam, top100TotalTurns } from "@/services/top100Service";
import type { Top100State } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100ResultProps {
  state: Top100State;
  category: Top100Category;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

/** Il momento della verità: posizione in classifica o fuori dalla top. */
export function Top100Result({ state, category, dispatch, onUndo, canUndo }: Top100ResultProps) {
  const last = state.answers[state.answers.length - 1];
  if (!last) return null;

  const team = state.teams[last.team];
  const item = last.rank !== null ? category.items.find((i) => i.rank === last.rank) : undefined;
  const finished = state.answers.length >= top100TotalTurns(state);
  const nextTeam = state.teams[top100CurrentTeam(state)];
  const size = category.items.length;

  // Venti tacche, ognuna copre un tratto di classifica: si accende quella della risposta
  const step = size / 20;
  const ticks = Array.from({ length: 20 }, (_, i) => {
    const from = Math.floor(i * step) + 1;
    const to = Math.floor((i + 1) * step);
    return { i, hit: !!item && item.rank >= from && item.rank <= to, above: !!item && to < item.rank };
  });

  return (
    <TopScreen>
      <header className="flex h-11 items-center justify-between gap-3">
        <TopMark />
        <span className="truncate text-[13px] font-bold text-top-muted">{category.name}</span>
      </header>

      <section className="flex flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-extrabold text-top-muted">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: team.color }} />
          {last.skipped ? `${team.name} salta il turno` : `La risposta di ${team.name}`}
        </span>
        <h1 className="m-0 font-top text-[30px] leading-[1.05] font-extrabold tracking-[-0.02em] break-words">
          {item ? item.value : last.said || "…"}
        </h1>
      </section>

      {item ? (
        <>
          <div className="top-rise flex h-[300px] items-stretch gap-4">
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="text-[13px] font-extrabold tracking-[0.14em] text-top-gold uppercase">In classifica al posto</span>
              <span
                className={`font-top leading-[0.9] font-black tracking-[-0.06em] text-top-gold ${item.rank >= 100 ? "text-[100px]" : "text-[128px]"}`}
              >
                {item.rank}
              </span>
              {item.detail && <span className="text-sm font-semibold text-top-muted">{item.detail}</span>}
            </div>
            <ol aria-hidden className="m-0 flex w-[54px] list-none flex-col gap-[3px] p-0">
              {ticks.map((t) => (
                <li
                  key={t.i}
                  className={`flex flex-1 items-center justify-center rounded text-[10px] font-extrabold text-top-gold-ink ${
                    t.hit ? "bg-top-gold" : t.above ? "bg-top-spent" : "bg-top-panel-2"
                  }`}
                >
                  {t.hit ? `#${item.rank}` : ""}
                </li>
              ))}
            </ol>
          </div>
          <span
            className="top-rise self-start rounded-[14px] px-4 py-2.5 font-top text-[26px] font-extrabold"
            style={{ background: team.color, color: teamInk(team) }}
          >
            +{last.points} {last.points === 1 ? "punto" : "punti"}
          </span>
        </>
      ) : (
        <>
          <div className="top-rise flex h-[300px] flex-col justify-center gap-1.5">
            <span className="text-[13px] font-extrabold tracking-[0.14em] text-top-red-soft uppercase">
              {last.skipped ? "Turno saltato" : `Non è nella top ${size}`}
            </span>
            <span className="font-top text-[84px] leading-[0.9] font-black tracking-[-0.05em] text-top-red">
              {last.skipped ? "PASSO" : "FUORI"}
            </span>
            <span className="text-[15px] font-semibold text-top-muted">Nessun punto questa volta.</span>
          </div>
          <span className="self-start rounded-[14px] border-[1.5px] border-top-line px-4 py-2.5 font-top text-[26px] font-extrabold text-top-muted">
            0 punti
          </span>
        </>
      )}

      <TopStandings teams={state.teams} deltas={last.points ? new Map([[team.name, last.points]]) : undefined} />

      <div className="mt-auto flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={() => dispatch({ type: "TOP100_NEXT" })}
          className="top-press h-[58px] truncate rounded-[18px] bg-top-gold px-4 text-base font-extrabold text-top-gold-ink"
        >
          {finished ? "Vedi com’è finita" : `Avanti · tocca a ${nextTeam.name}`}
        </button>
        {finished && state.rounds < TOP100_MAX_ROUNDS && (
          <button
            type="button"
            onClick={() => dispatch({ type: "TOP100_SET_ROUNDS", payload: { rounds: state.rounds + 1 } })}
            className="top-press h-[46px] rounded-[14px] border-[1.5px] border-top-gold text-sm font-extrabold text-top-gold"
          >
            Ancora un giro su questa classifica
          </button>
        )}
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className="top-press flex h-[46px] items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-top-line bg-top-panel text-sm font-bold disabled:opacity-35"
        >
          <IconUndo />
          Annulla, ho sbagliato risposta
        </button>
      </div>
    </TopScreen>
  );
}
