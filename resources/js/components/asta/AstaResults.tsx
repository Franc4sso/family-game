import React, { useState } from "react";
import { AstaScreen, BackPill, IconUndo, LotPhoto, MonoLabel, Paddle, btnCream, btnGhost, btnRed } from "./parts";
import { categoryLabel, lotLabel } from "./AstaBoard";
import {
  ASTA_LOTS_PER_TEAM,
  astaAffare,
  astaAuctionOver,
  astaBidone,
  astaEuroPerCredit,
  astaResults,
  astaTeamSales,
  formatCredits,
  formatEuro,
} from "@/services/astaService";
import type { AstaState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Props {
  state: AstaState;
  dispatch: React.Dispatch<GameAction>;
}

const signed = (euro: number) => `${euro >= 0 ? "+" : "−"}${formatEuro(Math.abs(euro))}`;

// ─── Aggiudicato ───

export function AstaSold({ state, dispatch, onUndo }: Props & { onUndo: () => void }) {
  const sale = state.sales[state.sales.length - 1];
  const lot = state.lots[sale.lot];
  const team = state.teams[sale.team];
  const owned = astaTeamSales(state, sale.team).length;
  // Simula il passo successivo per sapere se l'asta è finita
  const over = astaAuctionOver({ ...state, current: state.current + 1 });

  return (
    <AstaScreen padded={false}>
      <div className="flex h-[60px] items-center justify-between px-3.5">
        <span className="text-[22px] font-extrabold tracking-[-0.02em] text-asta-red">ASTA FOLLE</span>
        <MonoLabel className="text-xs">{lotLabel(state, sale.lot)}</MonoLabel>
      </div>

      <LotPhoto src={lot.image} alt={lot.name}>
        <div
          className="absolute left-1/2 top-1/2 flex h-[88px] w-[300px] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] flex-col items-center justify-center rounded-[10px] border-[5px] border-asta-red bg-asta-cream/85 text-asta-red animate-fade-in"
          aria-hidden
        >
          <span className="text-[40px] font-extrabold leading-none tracking-[0.02em]">AGGIUDICATO</span>
          <span className="font-asta-mono text-xs font-bold">LOTTO {String(sale.lot + 1).padStart(2, "0")}</span>
        </div>
      </LotPhoto>

      <div className="flex flex-col gap-1.5 px-4 pt-5">
        <h1 className="text-[22px] font-extrabold leading-tight">{lot.name}</h1>
        <p className="text-[15px] font-semibold text-asta-muted">Batte il martello. Il lotto va a</p>
      </div>

      <div className="mx-3 mt-3.5 flex h-[84px] items-center gap-3.5 rounded-full bg-asta-cream pl-3 pr-6 text-asta-ink">
        <Paddle team={team} index={sale.team} size={60} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[22px] font-extrabold">{team.name}</span>
          <span className="font-asta-mono text-[11px] font-bold text-asta-ink-muted">
            RESTANO {team.credits} CR · {owned}/{ASTA_LOTS_PER_TEAM} LOTTI
          </span>
        </span>
        <span className="text-[40px] font-extrabold tracking-[-0.03em] text-asta-red">
          {sale.price}
          <span className="font-asta-mono text-[13px] font-bold">CR</span>
        </span>
      </div>

      <p className="mx-4 mt-3.5 font-asta-mono text-xs text-asta-muted">Quanto vale davvero? Si scopre alla fine.</p>

      <div className="mt-auto flex flex-col gap-2 px-3.5 pb-4 pt-4">
        <button type="button" onClick={() => dispatch({ type: "ASTA_NEXT" })} className={`${btnRed} h-[60px] text-lg`}>
          {over ? "Chiudi l'asta e svela i valori" : "Prossimo lotto"}
        </button>
        <button type="button" onClick={onUndo} className={`${btnGhost} h-[46px] text-sm`}>
          <IconUndo />
          Annulla aggiudicazione
        </button>
      </div>
    </AstaScreen>
  );
}

// ─── Il momento della verità ───

export function AstaReveal({ state, dispatch }: Props) {
  const sale = state.sales[state.revealIndex];
  if (!sale) {
    return (
      <AstaScreen>
        <p className="pt-10 text-center font-semibold text-asta-muted">Nessun lotto venduto.</p>
        <button type="button" onClick={() => dispatch({ type: "ASTA_REVEAL_NEXT" })} className={`${btnRed} h-14`}>
          Vai alla classifica
        </button>
      </AstaScreen>
    );
  }

  const lot = state.lots[sale.lot];
  const team = state.teams[sale.team];
  const perCredit = astaEuroPerCredit(state, sale);
  const last = state.revealIndex >= state.sales.length - 1;

  return (
    <AstaScreen padded={false}>
      <div className="flex flex-col gap-2 px-3.5 pb-2.5 pt-3.5">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-extrabold tracking-[-0.02em]">Il momento della verità</h1>
          <MonoLabel className="text-xs">
            {String(state.revealIndex + 1).padStart(2, "0")}/{String(state.sales.length).padStart(2, "0")}
          </MonoLabel>
        </div>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${state.sales.length}, minmax(0, 1fr))` }} aria-hidden>
          {state.sales.map((_, i) => (
            <span key={i} className={`h-[5px] rounded-full ${i <= state.revealIndex ? "bg-asta-mustard" : "bg-asta-line"}`} />
          ))}
        </div>
      </div>

      <LotPhoto src={lot.image} alt={lot.name} height="h-[min(32vh,250px)]" />

      <div className="flex items-center justify-between gap-2.5 px-4 pt-4">
        <h2 className="text-[19px] font-extrabold leading-tight">{lot.name}</h2>
        <Paddle team={team} index={sale.team} size={40} />
      </div>

      <div key={state.revealIndex} className="flex flex-col items-center gap-3 px-4 pt-4">
        <div className="flex items-center gap-2.5 self-start rounded-l-md rounded-r-[18px] border border-asta-line bg-asta-surface py-2 pl-3 pr-4">
          <span className="h-2.5 w-2.5 rounded-full bg-asta-bg ring-2 ring-asta-line-strong" aria-hidden />
          <span className="flex flex-col">
            <span className="font-asta-mono text-[10px] font-bold text-asta-muted">PAGATO DA {team.name.toUpperCase()}</span>
            <span className="text-[22px] font-extrabold">{formatCredits(sale.price)}</span>
          </span>
        </div>

        <div className="flex w-full max-w-[320px] -rotate-3 items-center gap-4 rounded-l-lg rounded-r-[30px] bg-asta-cream py-4 pl-[18px] pr-5 text-asta-ink animate-fade-in">
          <span className="h-[18px] w-[18px] shrink-0 rounded-full bg-asta-bg" aria-hidden />
          <span className="flex flex-col">
            <span className="font-asta-mono text-xs font-bold tracking-[0.12em] text-asta-brown">VALE DAVVERO</span>
            <span className="text-[44px] font-extrabold leading-none tracking-[-0.03em]">{formatEuro(lot.value)}</span>
          </span>
        </div>

        <span className="mt-1.5 flex h-10 items-center rounded-full border-2 border-asta-mustard px-[18px] text-base font-extrabold text-asta-mustard">
          {formatEuro(perCredit)} per ogni credito speso
        </span>
      </div>

      <div className="mt-auto px-3.5 pb-4 pt-4">
        <button type="button" onClick={() => dispatch({ type: "ASTA_REVEAL_NEXT" })} className={`${btnRed} h-[60px] w-full text-lg`}>
          {last ? "Vai alla classifica" : "Svela il prossimo lotto"}
        </button>
      </div>
    </AstaScreen>
  );
}

// ─── Classifica finale ───

export function AstaFinal({ state, dispatch }: Props) {
  const [catalog, setCatalog] = useState(false);
  if (catalog) return <AstaCatalog state={state} onBack={() => setCatalog(false)} />;

  const results = astaResults(state);
  const affare = astaAffare(state);
  const bidone = astaBidone(state);
  const winner = results[0];
  const tie = results.length > 1 && results[1].total === winner.total;
  const podium = [results[1], results[0], results[2]].filter(Boolean);
  const heights: Record<number, string> = { 0: "h-[136px]", 1: "h-[100px]", 2: "h-[76px]" };

  return (
    <AstaScreen>
      <div className="flex flex-col gap-0.5">
        <MonoLabel>ASTA CHIUSA · {state.sales.length} LOTTI VENDUTI</MonoLabel>
        <h1 className="text-[40px] font-extrabold leading-[0.95] tracking-[-0.03em] text-asta-mustard break-words">
          {tie ? "Pareggio!" : `Vince ${state.teams[winner.team].name}`}
        </h1>
      </div>

      <div className="grid items-end gap-2" style={{ gridTemplateColumns: `repeat(${podium.length}, minmax(0, 1fr))` }}>
        {podium.map((r) => {
          const place = results.indexOf(r);
          const team = state.teams[r.team];
          return (
            <div key={r.team} className="flex flex-col items-center gap-1.5">
              <Paddle team={team} index={r.team} size={place === 0 ? 56 : 46} />
              <span className="max-w-full truncate text-sm font-extrabold">{team.name}</span>
              <div
                className={`flex w-full flex-col items-center justify-center gap-0.5 rounded-b rounded-t-[14px] ${heights[place]} ${
                  place === 0 ? "bg-asta-cream text-asta-ink" : "border border-asta-line bg-asta-surface"
                }`}
              >
                <span className={`font-extrabold ${place === 0 ? "text-4xl" : "text-[26px]"}`}>{place + 1}</span>
                <span className={`font-asta-mono text-xs font-bold ${place === 0 ? "text-asta-brown" : "text-asta-mustard"}`}>
                  {formatEuro(r.total)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {results.slice(3).map((r, i) => (
        <div key={r.team} className="flex h-[50px] items-center gap-2.5 rounded-full border border-asta-line bg-asta-surface pl-1.5 pr-4">
          <Paddle team={state.teams[r.team]} index={r.team} size={38} />
          <span className="flex-1 truncate text-[15px] font-extrabold">
            {i + 4}° {state.teams[r.team].name}
          </span>
          <span className="font-asta-mono text-[13px] font-bold text-asta-mustard">{formatEuro(r.total)}</span>
        </div>
      ))}

      {(affare || bidone) && (
        <div className="grid grid-cols-2 gap-2.5 px-0.5 pt-1">
          {affare && (
            <div className="flex -rotate-2 flex-col gap-1 rounded-2xl bg-asta-green p-3 text-asta-green-ink">
              <span className="font-asta-mono text-[10px] font-bold">AFFARE DEL SECOLO</span>
              <span className="text-[17px] font-extrabold leading-tight">
                {state.teams[affare.team].name} {signed(affare.amount)}
              </span>
              <span className="text-xs font-semibold leading-snug">
                {state.lots[affare.sale.lot].name}: {formatCredits(affare.sale.price)}, vale{" "}
                {formatEuro(state.lots[affare.sale.lot].value)}
              </span>
            </div>
          )}
          {bidone && (
            <div className="flex rotate-2 flex-col gap-1 rounded-2xl bg-asta-red p-3 text-asta-red-ink">
              <span className="font-asta-mono text-[10px] font-bold">IL BIDONE</span>
              <span className="text-[17px] font-extrabold leading-tight">
                {state.teams[bidone.team].name} {signed(bidone.amount)}
              </span>
              <span className="text-xs font-semibold leading-snug">
                {state.lots[bidone.sale.lot].name}: {formatCredits(bidone.sale.price)}, vale{" "}
                {formatEuro(state.lots[bidone.sale.lot].value)}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button type="button" onClick={() => setCatalog(true)} className={`${btnCream} h-[58px] text-lg`}>
          Sfoglia il catalogo venduto
        </button>
        <button type="button" onClick={() => dispatch({ type: "ASTA_RESET" })} className={`${btnRed} h-[50px] text-base`}>
          Nuova asta
        </button>
      </div>
    </AstaScreen>
  );
}

// ─── Catalogo venduto ───

function AstaCatalog({ state, onBack }: { state: AstaState; onBack: () => void }) {
  const results = astaResults(state);
  const [team, setTeam] = useState(results[0].team);
  const result = results.find((r) => r.team === team)!;
  const place = results.indexOf(result) + 1;
  const sales = astaTeamSales(state, team);
  const t = state.teams[team];

  return (
    <AstaScreen>
      <div className="flex items-center gap-2.5">
        <BackPill onClick={onBack} label="Classifica" />
      </div>
      <div className="flex flex-col">
        <MonoLabel>CATALOGO VENDUTO</MonoLabel>
        <h1 className="text-[26px] font-extrabold leading-tight">Chi ha comprato cosa</h1>
      </div>

      <div className="-mx-3.5 flex gap-1.5 overflow-x-auto px-3.5 pb-1 [scrollbar-width:none]" role="group" aria-label="Squadra">
        {state.teams.map((tm, i) => (
          <button
            key={tm.name}
            type="button"
            aria-pressed={team === i}
            onClick={() => setTeam(i)}
            className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] ${
              team === i ? "bg-asta-cream font-extrabold text-asta-ink" : "border border-asta-line bg-asta-surface font-bold text-asta-muted"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: tm.color }} />
            {tm.name}
          </button>
        ))}
      </div>

      <div className="flex h-[60px] items-center gap-3 rounded-full bg-asta-cream pl-2 pr-[18px] text-asta-ink">
        <Paddle team={t} index={team} size={44} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[17px] font-extrabold">
            {t.name} · {place}° posto
          </span>
          <span className="font-asta-mono text-[11px] font-bold text-asta-ink-muted">
            SPESI {result.spent} CR · RESTANO {t.credits}
            {result.bonus !== 0 ? ` · BONUS ${signed(result.bonus)}` : ""}
          </span>
        </span>
        <span className="text-xl font-extrabold">{formatEuro(result.total)}</span>
      </div>

      <ul className="flex flex-col gap-2">
        {sales.map((sale) => {
          const lot = state.lots[sale.lot];
          return (
            <li key={sale.lot} className="flex gap-2.5 rounded-[18px] border border-asta-line bg-asta-surface p-2">
              <img src={lot.image} alt="" className="h-[78px] w-[78px] shrink-0 rounded-xl bg-asta-photo object-contain" />
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <MonoLabel className="text-[10px]">
                  LOTTO {String(sale.lot + 1).padStart(2, "0")} · {categoryLabel(lot.category).toUpperCase()}
                </MonoLabel>
                <span className="text-[15px] font-extrabold leading-tight">{lot.name}</span>
                <span className="flex justify-between font-asta-mono text-xs text-asta-muted">
                  <span>pagato</span>
                  <span>{formatCredits(sale.price)}</span>
                </span>
                <span className="flex justify-between font-asta-mono text-xs font-bold">
                  <span>vale</span>
                  <span className="text-asta-mustard">{formatEuro(lot.value)}</span>
                </span>
              </span>
            </li>
          );
        })}
        {sales.length === 0 && <li className="text-center text-sm font-semibold text-asta-muted">Nessun lotto comprato.</li>}
      </ul>

      {state.unsold.length > 0 && (
        <div className="flex flex-col gap-1.5 border-t border-dashed border-asta-line pt-2.5">
          <MonoLabel>RIMASTI INVENDUTI</MonoLabel>
          {state.unsold.map((i) => (
            <span key={i} className="flex justify-between gap-3 text-sm font-bold">
              <span className="min-w-0 truncate">{state.lots[i].name}</span>
              <span className="shrink-0 font-asta-mono text-asta-mustard">{formatEuro(state.lots[i].value)}</span>
            </span>
          ))}
        </div>
      )}
    </AstaScreen>
  );
}
