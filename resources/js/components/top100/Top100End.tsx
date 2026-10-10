import React, { useState } from "react";
import { TopLabel, TopScreen } from "./parts";
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
        hits: mine.filter((a) => a.rank !== null).length,
        tries: mine.length,
      };
    })
    .sort((a, b) => b.team.score - a.team.score);

  const leader = ranking[0];
  const tie = ranking.length > 1 && ranking[1].team.score === leader.team.score;
  const max = Math.max(1, leader.team.score);
  const saidBy = new Map(state.answers.filter((a) => a.rank !== null).map((a) => [a.rank, state.teams[a.team]]));

  return (
    <TopScreen>
      <span className="flex h-11 items-center truncate text-[13px] font-extrabold text-top-muted">Fine classifica · {category.name}</span>

      <section className="flex flex-col gap-1">
        <span className="text-[15px] font-bold text-top-muted">{tie ? "Testa a testa" : "In testa"}</span>
        <h1
          className="m-0 font-top text-[40px] leading-none font-black tracking-[-0.03em] break-words"
          style={{ color: tie ? "var(--color-top-gold)" : leader.team.color }}
        >
          {tie ? "Pareggio!" : leader.team.name}
        </h1>
      </section>

      <ol className="m-0 flex list-none flex-col gap-2.5 p-0">
        {ranking.map((r, i) => (
          <li key={r.team.name} className="flex flex-col gap-[5px]">
            <span className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 truncate text-[15px] font-extrabold">
                {i + 1}. {r.team.name}{" "}
                <span className="text-xs font-semibold text-top-muted">
                  · {r.hits} su {r.tries} dentro
                </span>
              </span>
              <span className="font-top text-[22px] font-extrabold">{r.team.score}</span>
            </span>
            <span className="flex h-3.5 overflow-hidden rounded-full bg-top-panel">
              <span className="top-bar" style={{ width: `${r.team.score <= 0 ? 0 : (r.team.score / max) * 100}%`, background: r.team.color }} />
            </span>
          </li>
        ))}
      </ol>

      {missed.length > 0 && !showAll && (
        <section className="flex flex-col gap-1.5">
          <TopLabel left="Le più alte che nessuno ha detto" />
          {missed.map((item) => (
            <div key={item.rank} className="flex h-11 items-center gap-3 rounded-xl bg-top-panel pr-3 pl-1.5">
              <span className="flex h-8 min-w-11 items-center justify-center rounded-lg bg-top-gold px-1 font-top text-[13px] font-extrabold text-top-gold-ink">
                #{item.rank}
              </span>
              <span className="min-w-0 flex-1 truncate text-[15px] font-bold">{item.value}</span>
            </div>
          ))}
        </section>
      )}

      {showAll && (
        <section className="flex flex-col gap-1.5">
          <TopLabel left={`Classifica completa · ${category.items.length}`} />
          <ol className="m-0 flex list-none flex-col gap-1 p-0">
            {category.items.map((item) => {
              const by = saidBy.get(item.rank);
              return (
                <li key={item.rank} className={`flex min-h-10 items-center gap-2.5 rounded-xl py-1 pr-3 pl-1.5 ${by ? "bg-top-panel-2" : "bg-top-panel"}`}>
                  <span className="w-11 text-center font-top text-[13px] font-extrabold text-top-gold">#{item.rank}</span>
                  <span className="min-w-0 flex-1 text-sm leading-tight font-bold">{item.value}</span>
                  {by && <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: by.color }} aria-label={`Detta da ${by.name}`} />}
                </li>
              );
            })}
          </ol>
          <p className="m-0 text-[11px] font-semibold text-top-muted">
            Fonte: {category.source} · dati {category.updatedAt}
          </p>
        </section>
      )}

      <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-top-night pt-2 pb-1">
        <button
          type="button"
          onClick={() => dispatch({ type: "TOP100_NEXT_CATEGORY" })}
          className="top-press h-[58px] rounded-[18px] bg-top-gold text-[17px] font-extrabold text-top-gold-ink"
        >
          Prossima classifica
        </button>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="top-press h-[46px] rounded-[14px] border-[1.5px] border-top-line bg-top-panel text-sm font-bold"
        >
          {showAll ? "Nascondi la classifica" : `Vedi tutta la top ${category.items.length}`}
        </button>
      </div>
    </TopScreen>
  );
}
