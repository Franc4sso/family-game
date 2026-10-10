import React from "react";
import { QdcpShell } from "./QdcpParts";
import { QDCP_MAX_CLUES } from "@/services/qdcpService";
import type { QdcpState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface QdcpEndProps {
  state: QdcpState;
  dispatch: React.Dispatch<GameAction>;
}

/** Ogni posto in classifica scende di un gradino, come sulla copertina. */
const INDENT = ["ml-0", "ml-3.5", "ml-7", "ml-[42px]", "ml-[56px]", "ml-[70px]"];

/** Fine partita: classifica a scalini e tre numeri della serata. */
export function QdcpEnd({ state, dispatch }: QdcpEndProps) {
  const ranking = state.teams
    .map((team, index) => ({
      team,
      solved: state.results.filter((r) => r.solvedBy === index).length,
    }))
    .sort((a, b) => b.team.score - a.team.score);

  const leader = ranking[0];
  const tie = ranking.length > 1 && ranking[1].team.score === leader.team.score;

  const stats = [
    { label: "al primo indizio", value: state.results.filter((r) => r.solvedBy !== null && r.clue === 1).length },
    { label: "all’ultimo indizio", value: state.results.filter((r) => r.solvedBy !== null && r.clue === QDCP_MAX_CLUES).length },
    { label: "nessuno ci è arrivato", value: state.results.filter((r) => r.solvedBy === null).length },
  ];

  return (
    <QdcpShell>
      <span className="flex h-11 items-center text-[13px] font-extrabold text-qd-muted">
        Fine partita · {state.deck.length} {state.deck.length === 1 ? "carta giocata" : "carte giocate"}
      </span>

      <section className="flex flex-col gap-1">
        <span className="text-lg font-bold text-qd-muted">{tie ? "Finisce" : "Vince"}</span>
        <h1 className="qd-wide m-0 text-[40px] leading-none break-words text-qd-lime">{tie ? "Pari!" : leader.team.name}</h1>
      </section>

      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        {ranking.map((r, i) => {
          const first = i === 0;
          return (
            <li
              key={r.team.name}
              className={`flex items-center gap-3 pr-[18px] pl-3.5 ${INDENT[i]} ${
                first ? "h-[72px] rounded-[22px] bg-qd-lime text-qd-green" : "h-14 rounded-[18px] bg-qd-panel"
              }`}
            >
              <span className={`qd-wide w-[26px] ${first ? "text-[22px]" : "text-[17px] text-qd-muted"}`}>{i + 1}</span>
              <span
                className={`shrink-0 rounded-full ${first ? "h-3 w-3" : "h-2.5 w-2.5"}`}
                style={{ background: r.team.color, boxShadow: first ? "0 0 0 1.5px var(--color-qd-green)" : undefined }}
                aria-hidden
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className={`truncate font-extrabold ${first ? "text-lg" : "text-base"}`}>{r.team.name}</span>
                <span className={`text-xs font-bold ${first ? "text-qd-lime-ink" : "font-semibold text-qd-muted"}`}>
                  {r.solved} {r.solved === 1 ? "carta indovinata" : "carte indovinate"}
                </span>
              </span>
              <span className={`qd-wide ${first ? "text-[30px]" : "text-xl"}`}>{r.team.score}</span>
            </li>
          );
        })}
      </ol>

      <dl className="m-0 grid grid-cols-3 gap-1.5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse justify-end gap-1 rounded-2xl border-[1.5px] border-qd-line p-3">
            <dt className="text-xs leading-tight font-bold text-qd-muted">{s.label}</dt>
            <dd className="qd-wide m-0 text-[26px] text-qd-lime">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-auto flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={() => dispatch({ type: "QDCP_RESTART" })}
          className="qd-press h-[58px] rounded-[18px] bg-qd-lime text-[17px] font-extrabold text-qd-green"
        >
          Nuova partita
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="qd-press h-12 rounded-2xl border-[1.5px] border-qd-line text-[15px] font-bold"
        >
          Torna ai giochi
        </button>
      </div>
    </QdcpShell>
  );
}
