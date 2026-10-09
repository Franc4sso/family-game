import React, { useState } from "react";
import { IconArrowRight, MasterScreen, SectionLabel } from "../master/parts";
import type { Top100Category } from "@/data/top100";
import type { Top100State } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100EndProps {
  state: Top100State;
  category: Top100Category;
  dispatch: React.Dispatch<GameAction>;
}

/** Fine classifica: punteggi, voci alte mancate e classifica completa. */
export function Top100End({ state, category, dispatch }: Top100EndProps) {
  const [showAll, setShowAll] = useState(false);

  const saidRanks = new Set(state.answers.filter((a) => a.rank !== null).map((a) => a.rank));
  const missed = category.items.filter((i) => !saidRanks.has(i.rank)).slice(0, 4);

  const ranking = state.teams
    .map((team, index) => {
      const mine = state.answers.filter((a) => a.team === index);
      return {
        team,
        gained: mine.reduce((sum, a) => sum + a.points, 0),
        hits: mine.filter((a) => a.rank !== null).length,
        tries: mine.length,
      };
    })
    .sort((a, b) => b.team.score - a.team.score);

  const leader = ranking[0];
  const tie = ranking.length > 1 && ranking[1].team.score === leader.team.score;
  const saidBy = new Map(state.answers.filter((a) => a.rank !== null).map((a) => [a.rank, state.teams[a.team]]));

  return (
    <MasterScreen>
      <div className="flex flex-col items-center gap-2 pt-4 text-center">
        <span className="flex h-[26px] items-center rounded-full bg-ff-surface-2 px-3 text-[11px] font-extrabold tracking-[0.12em] text-[#C9CFEA]">
          FINE CLASSIFICA · {state.roundsPerCategory} {state.roundsPerCategory === 1 ? "GIRO" : "GIRI"}
        </span>
        <h2 className="font-display text-[34px] uppercase leading-[1.02] text-ff-gold break-words">
          {tie ? "Pareggio in testa" : `${leader.team.name} in testa`}
        </h2>
        <span className="text-[13px] font-bold text-[#C9CFEA]">{category.name}</span>
      </div>

      <ol className="flex flex-col gap-1.5">
        {ranking.map((r, i) => (
          <li
            key={r.team.name}
            className={`flex items-center gap-3 rounded-2xl pl-2.5 pr-4 ${
              i === 0 ? "h-16 bg-ff-team-a ring-2 ring-ff-gold" : "h-[52px] border border-ff-line-soft bg-ff-surface"
            }`}
          >
            {i === 0 ? (
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ff-gold font-display text-lg text-ff-gold-ink">1</span>
            ) : (
              <span className="w-8 text-center text-sm font-extrabold text-ff-muted">{i + 1}°</span>
            )}
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: r.team.color }} />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className={`truncate font-extrabold ${i === 0 ? "text-[17px]" : "text-[15px]"}`}>{r.team.name}</span>
              <span className="text-[11px] font-bold text-ff-muted">
                {r.hits} su {r.tries} in classifica · +{r.gained} punti
              </span>
            </span>
            <span className={`font-display ${i === 0 ? "text-[26px]" : "text-xl"}`}>{r.team.score}</span>
          </li>
        ))}
      </ol>

      {missed.length > 0 && !showAll && (
        <div className="flex flex-col gap-1.5">
          <SectionLabel left="Le più alte che nessuno ha detto" />
          {missed.map((item) => (
            <div key={item.rank} className="flex h-[42px] items-center gap-2.5 rounded-xl border border-dashed border-[#3A4370] bg-ff-surface pl-1.5 pr-3">
              <span className="flex h-[30px] min-w-10 items-center justify-center rounded-[9px] bg-ff-surface-2 px-1 font-display text-[13px] text-ff-gold">
                #{item.rank}
              </span>
              <span className="min-w-0 flex-1 truncate text-[15px] font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {showAll && (
        <div className="flex flex-col gap-1.5">
          <SectionLabel left={`Classifica completa · ${category.items.length}`} />
          <ol className="flex flex-col gap-1">
            {category.items.map((item) => {
              const by = saidBy.get(item.rank);
              return (
                <li
                  key={item.rank}
                  className={`flex min-h-10 items-center gap-2.5 rounded-xl py-1 pl-1.5 pr-3 ${by ? "bg-ff-surface-2" : "bg-ff-surface"}`}
                >
                  <span className="w-10 text-center font-display text-[13px] text-ff-gold">#{item.rank}</span>
                  <span className="min-w-0 flex-1 text-sm font-bold leading-tight">{item.value}</span>
                  {by && <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: by.color }} aria-label={`Detta da ${by.name}`} />}
                </li>
              );
            })}
          </ol>
          <p className="text-[11px] font-semibold text-ff-muted">Fonte: {category.source} · dati {category.updatedAt}</p>
        </div>
      )}

      <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-ff-bg pb-1 pt-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "TOP100_NEXT_CATEGORY" })}
          className="flex h-[58px] items-center justify-center gap-2.5 rounded-[18px] bg-ff-gold text-[17px] font-extrabold text-ff-gold-ink active:scale-[0.98]"
        >
          Prossima classifica
          <IconArrowRight />
        </button>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="h-[46px] rounded-[14px] border border-ff-line bg-ff-surface text-sm font-bold active:scale-95"
        >
          {showAll ? "Nascondi la classifica" : `Vedi tutta la top ${category.items.length}`}
        </button>
      </div>
    </MasterScreen>
  );
}
