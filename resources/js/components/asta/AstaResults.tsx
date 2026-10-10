import React, { useState } from "react";
import { AstaScreen, AstaWordmark, IconBack, IconUndo, LotPhoto, MonoLabel, Paddle, btnInk, btnOutline, btnRed } from "./parts";
import { categoryLabel, lotLabel, lotNumber } from "./AstaBoard";
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

// ─── Aggiudicato (sala) ───

export function AstaSold({ state, dispatch, onUndo }: Props & { onUndo: () => void }) {
  const sale = state.sales[state.sales.length - 1];
  const lot = state.lots[sale.lot];
  const team = state.teams[sale.team];
  const owned = astaTeamSales(state, sale.team).length;
  // Simula il passo successivo per sapere se l'asta è finita
  const over = astaAuctionOver({ ...state, current: state.current + 1 });

  return (
    <AstaScreen tone="paper">
      <header className="flex h-11 items-center justify-between">
        <AstaWordmark />
        <span className="font-asta-mono text-xs font-bold text-asta-ink-muted">{lotLabel(state, sale.lot)}</span>
      </header>

      <LotPhoto src={lot.image} alt={lot.name} height="h-[min(34dvh,270px)]" className="rounded-2xl" dim>
        <span
          className="asta-slam absolute top-1/2 left-1/2 flex h-[88px] w-[290px] flex-col items-center justify-center rounded-[10px] border-[5px] border-asta-red bg-asta-paper/90 text-asta-red"
          style={{ transform: "translate(-50%, -50%) rotate(-10deg)" }}
          aria-hidden
        >
          <span className="text-[42px] leading-[0.95] font-extrabold tracking-[0.01em]">AGGIUDICATO</span>
          <span className="font-asta-mono text-xs font-bold">LOTTO {lotNumber(sale.lot)}</span>
        </span>
      </LotPhoto>

      <section className="flex flex-col gap-1">
        <h1 className="m-0 text-2xl leading-[1.08] font-extrabold tracking-[-0.02em]">{lot.name}</h1>
        <p className="m-0 text-base font-semibold text-asta-ink-muted">Batte il martello. Il lotto va a</p>
      </section>

      <div className="flex h-[88px] items-center gap-3.5 rounded-full bg-asta-ink pr-[22px] pl-2.5 text-asta-cream">
        <Paddle team={team} index={sale.team} size={64} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[22px] font-extrabold">{team.name}</span>
          <span className="font-asta-mono text-[11px] font-bold text-asta-muted">
            RESTANO {team.credits} CR · {owned}/{ASTA_LOTS_PER_TEAM} LOTTI
          </span>
        </span>
        <span className="flex items-baseline gap-[3px] text-asta-mustard">
          <span className="text-[44px] leading-none font-extrabold tracking-[-0.04em]">{sale.price}</span>
          <span className="font-asta-mono text-xs font-bold">CR</span>
        </span>
      </div>

      <p className="m-0 text-[15px] font-semibold text-asta-ink-muted">Quanto vale davvero? Si scopre alla fine.</p>

      <div className="mt-auto flex flex-col gap-2">
        <button type="button" onClick={() => dispatch({ type: "ASTA_NEXT" })} className={`${btnRed} h-[60px] text-lg`}>
          {over ? "Chiudi l’asta e svela i valori" : "Prossimo lotto"}
        </button>
        <button type="button" onClick={onUndo} className={`${btnOutline} h-12 text-[15px]`}>
          <IconUndo />
          Annulla l’aggiudicazione
        </button>
      </div>
    </AstaScreen>
  );
}

// ─── Il momento della verità (banco, si mostra a tutti) ───

export function AstaReveal({ state, dispatch }: Props) {
  // Il cartellino si gira a mano, uno per lotto: prima si vede il prezzo, poi il valore
  const [flippedAt, setFlippedAt] = useState<number | null>(null);
  const sale = state.sales[state.revealIndex];
  if (!sale) {
    return (
      <AstaScreen>
        <p className="m-0 pt-10 text-center font-semibold text-asta-muted">Nessun lotto venduto.</p>
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
  const shown = flippedAt === state.revealIndex;
  const flip = () => setFlippedAt(state.revealIndex);

  return (
    <AstaScreen>
      <header className="flex flex-col gap-2">
        <span className="flex items-baseline justify-between gap-3">
          <h1 className="m-0 text-2xl font-extrabold tracking-[-0.02em]">Il momento della verità</h1>
          <MonoLabel className="text-xs">
            {lotNumber(state.revealIndex)}/{String(state.sales.length).padStart(2, "0")}
          </MonoLabel>
        </span>
        <span className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${state.sales.length}, minmax(0, 1fr))` }} aria-hidden>
          {state.sales.map((_, i) => (
            <span key={i} className={`h-[5px] rounded-full ${i < state.revealIndex || (i === state.revealIndex && shown) ? "bg-asta-mustard" : "bg-asta-line"}`} />
          ))}
        </span>
      </header>

      <LotPhoto src={lot.image} alt={lot.name} height="h-[min(26dvh,200px)]" className="rounded-2xl" />

      <div className="flex items-center gap-3">
        <h2 className="m-0 flex-1 text-xl leading-[1.12] font-extrabold">{lot.name}</h2>
        <Paddle team={team} index={sale.team} size={40} handle />
      </div>

      <div className="flex items-center gap-2.5 self-start rounded-l-md rounded-r-[20px] bg-asta-surface py-2 pr-[18px] pl-3 shadow-[inset_0_0_0_1.5px_var(--color-asta-line)]">
        <span className="h-2.5 w-2.5 rounded-full bg-asta-bg ring-2 ring-asta-line-strong" aria-hidden />
        <span className="flex flex-col">
          <span className="font-asta-mono text-[10px] font-bold text-asta-muted">PAGATO DA {team.name.toUpperCase()}</span>
          <span className="text-[22px] font-extrabold">{formatCredits(sale.price)}</span>
        </span>
      </div>

      <button
        type="button"
        onClick={flip}
        disabled={shown}
        aria-label={shown ? `Vale davvero ${formatEuro(lot.value)}` : "Gira il cartellino e svela il valore"}
        className="asta-tag asta-press block h-[104px] w-full max-w-[330px] -rotate-3 text-left"
      >
        <span className="asta-tag-inner block" data-flipped={shown} aria-live="polite">
          <span className="asta-tag-face flex items-center gap-4 rounded-l-lg rounded-r-[34px] bg-asta-red pr-[22px] pl-[18px] text-asta-red-ink" aria-hidden={shown}>
            <span className="h-[18px] w-[18px] shrink-0 rounded-full bg-asta-bg" />
            <span className="flex flex-col">
              <span className="font-asta-mono text-[11px] font-bold text-asta-red-soft">VALE DAVVERO…</span>
              <span className="text-[26px] font-extrabold">Gira il cartellino</span>
            </span>
          </span>
          <span className="asta-tag-face asta-tag-back flex items-center gap-4 rounded-l-lg rounded-r-[34px] bg-asta-cream pr-[22px] pl-[18px] text-asta-ink" aria-hidden={!shown}>
            <span className="h-[18px] w-[18px] shrink-0 rounded-full bg-asta-bg" />
            <span className="flex flex-col">
              <span className="font-asta-mono text-[11px] font-bold text-asta-brown">VALE DAVVERO</span>
              <span className="text-[44px] leading-none font-extrabold tracking-[-0.04em]">{formatEuro(lot.value)}</span>
            </span>
          </span>
        </span>
      </button>

      {shown && (
        <span key={state.revealIndex} className="asta-pop flex h-10 items-center self-start rounded-full border-2 border-asta-mustard px-4 text-base font-extrabold text-asta-mustard">
          {formatEuro(perCredit)} per ogni credito speso
        </span>
      )}

      <div className="mt-auto pt-1">
        {shown ? (
          <button type="button" onClick={() => dispatch({ type: "ASTA_REVEAL_NEXT" })} className={`${btnRed} h-[60px] w-full text-lg`}>
            {last ? "Vai alla classifica" : "Svela il prossimo lotto"}
          </button>
        ) : (
          <button type="button" onClick={flip} className="asta-press h-[60px] w-full rounded-full bg-asta-cream text-lg font-extrabold text-asta-ink">
            Gira il cartellino
          </button>
        )}
      </div>
    </AstaScreen>
  );
}

// ─── Classifica finale (sala) ───

export function AstaFinal({ state, dispatch }: Props) {
  const [catalog, setCatalog] = useState(false);
  if (catalog) return <AstaCatalog state={state} onBack={() => setCatalog(false)} />;

  const results = astaResults(state);
  const affare = astaAffare(state);
  const bidone = astaBidone(state);
  const winner = results[0];
  const tie = results.length > 1 && results[1].total === winner.total;
  // Podio: secondo, primo, terzo
  const podium = [results[1], results[0], results[2]].filter(Boolean);
  const stand: Record<number, string> = { 0: "h-[136px] bg-asta-ink text-asta-cream", 1: "h-24 bg-asta-paper-track", 2: "h-[72px] bg-asta-paper-track" };

  return (
    <AstaScreen tone="paper">
      <section className="flex flex-col gap-1">
        <span className="font-asta-mono text-xs font-bold text-asta-brown">
          ASTA CHIUSA · {state.sales.length} {state.sales.length === 1 ? "LOTTO VENDUTO" : "LOTTI VENDUTI"}
        </span>
        <h1 className="m-0 text-5xl leading-[0.92] font-extrabold tracking-[-0.04em] break-words text-asta-red">
          {tie ? (
            "Pareggio!"
          ) : (
            <>
              Vince
              <br />
              {state.teams[winner.team].name}
            </>
          )}
        </h1>
      </section>

      <div className="grid items-end gap-2 pt-1" style={{ gridTemplateColumns: `repeat(${podium.length}, minmax(0, 1fr))` }}>
        {podium.map((r) => {
          const place = results.indexOf(r);
          const team = state.teams[r.team];
          const first = place === 0;
          return (
            <div key={r.team} className="flex min-w-0 flex-col items-center gap-1">
              <Paddle team={team} index={r.team} size={first ? 58 : 46} handle ring={first} />
              <span className="max-w-full truncate text-sm font-extrabold">{team.name}</span>
              <span className={`flex w-full flex-col items-center justify-center gap-0.5 rounded-t-[14px] rounded-b ${stand[place]}`}>
                <span className={`leading-none font-extrabold ${first ? "text-[40px]" : place === 1 ? "text-[28px]" : "text-2xl"}`}>{place + 1}</span>
                <span className={`font-asta-mono font-bold ${first ? "text-[13px] text-asta-mustard" : "text-xs text-asta-ink-soft"}`}>{formatEuro(r.total)}</span>
              </span>
            </div>
          );
        })}
      </div>

      {results.slice(3).map((r, i) => (
        <div key={r.team} className="flex h-[50px] items-center gap-3 rounded-full bg-asta-paper-2 pr-4 pl-1.5 shadow-[inset_0_0_0_1.5px_var(--color-asta-paper-line)]">
          <Paddle team={state.teams[r.team]} index={r.team} size={38} />
          <span className="flex-1 truncate text-[15px] font-extrabold">
            {i + 4}° {state.teams[r.team].name}
          </span>
          <span className="font-asta-mono text-[13px] font-bold text-asta-ink-soft">{formatEuro(r.total)}</span>
        </div>
      ))}

      {(affare || bidone) && (
        <div className="grid grid-cols-2 gap-2.5 px-0.5 pt-1">
          {affare && (
            <div className="flex -rotate-2 flex-col gap-[3px] rounded-2xl bg-asta-green p-3 text-asta-green-ink">
              <span className="font-asta-mono text-[10px] font-bold">AFFARE DEL SECOLO</span>
              <span className="truncate text-base leading-tight font-extrabold">{state.teams[affare.team].name}</span>
              <span className="text-[22px] leading-none font-extrabold whitespace-nowrap">{signed(affare.amount)}</span>
              <span className="text-xs leading-snug font-semibold">
                {state.lots[affare.sale.lot].name}: {formatCredits(affare.sale.price)}, vale {formatEuro(state.lots[affare.sale.lot].value)}
              </span>
            </div>
          )}
          {bidone && (
            <div className="col-start-2 flex rotate-2 flex-col gap-[3px] rounded-2xl bg-asta-red p-3 text-asta-red-ink">
              <span className="font-asta-mono text-[10px] font-bold">IL BIDONE</span>
              <span className="truncate text-base leading-tight font-extrabold">{state.teams[bidone.team].name}</span>
              <span className="text-[22px] leading-none font-extrabold whitespace-nowrap">{signed(bidone.amount)}</span>
              <span className="text-xs leading-snug font-semibold">
                {state.lots[bidone.sale.lot].name}: {formatCredits(bidone.sale.price)}, vale {formatEuro(state.lots[bidone.sale.lot].value)}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <button type="button" onClick={() => setCatalog(true)} className={`${btnInk} h-[58px] text-[17px]`}>
          Chi ha comprato cosa
        </button>
        <button type="button" onClick={() => dispatch({ type: "ASTA_RESET" })} className={`${btnRed} h-[52px] text-base`}>
          Nuova asta
        </button>
      </div>
    </AstaScreen>
  );
}

// ─── Catalogo venduto (sala) ───

function AstaCatalog({ state, onBack }: { state: AstaState; onBack: () => void }) {
  const results = astaResults(state);
  const [team, setTeam] = useState(results[0].team);
  const result = results.find((r) => r.team === team)!;
  const place = results.indexOf(result) + 1;
  const sales = astaTeamSales(state, team);
  const t = state.teams[team];

  return (
    <AstaScreen tone="paper">
      <button
        type="button"
        onClick={onBack}
        className="asta-press flex h-11 items-center gap-1.5 self-start rounded-full border-2 border-asta-ink pr-4 pl-2.5 text-sm font-extrabold"
      >
        <IconBack />
        Classifica
      </button>
      <section className="flex flex-col gap-0.5">
        <span className="font-asta-mono text-[11px] font-bold text-asta-brown">CATALOGO VENDUTO</span>
        <h1 className="m-0 text-[28px] leading-tight font-extrabold tracking-[-0.02em]">Chi ha comprato cosa</h1>
      </section>

      <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]" role="group" aria-label="Squadra">
        {state.teams.map((tm, i) => (
          <button
            key={tm.name}
            type="button"
            aria-pressed={team === i}
            onClick={() => setTeam(i)}
            className={`asta-press flex h-10 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm transition-colors ${
              team === i ? "bg-asta-ink font-extrabold text-asta-cream" : "font-bold text-asta-ink-soft shadow-[inset_0_0_0_1.5px_var(--color-asta-paper-line)]"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: tm.color }} aria-hidden />
            {tm.name}
          </button>
        ))}
      </div>

      <div className="flex h-16 items-center gap-3 rounded-full bg-asta-ink pr-5 pl-2 text-asta-cream">
        <Paddle team={t} index={team} size={46} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[17px] font-extrabold">
            {t.name} · {place}° posto
          </span>
          <span className="font-asta-mono text-[11px] font-bold text-asta-muted">
            SPESI {result.spent} CR · RESTANO {t.credits}
            {result.bonus !== 0 ? ` · BONUS ${signed(result.bonus)}` : ""}
          </span>
        </span>
        <span className="text-xl font-extrabold text-asta-mustard">{formatEuro(result.total)}</span>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {sales.map((sale) => {
          const lot = state.lots[sale.lot];
          return (
            <li key={sale.lot} className="flex gap-3 rounded-[18px] bg-asta-paper-2 p-2 shadow-[inset_0_0_0_1.5px_var(--color-asta-paper-line)]">
              <img src={lot.image} alt="" className="h-[78px] w-[78px] shrink-0 rounded-xl bg-asta-photo object-contain" />
              <span className="flex min-w-0 flex-1 flex-col gap-1 pr-1">
                <span className="font-asta-mono text-[10px] font-bold text-asta-brown">
                  LOTTO {lotNumber(sale.lot)} · {categoryLabel(lot.category).toUpperCase()}
                </span>
                <span className="text-[15px] leading-tight font-extrabold">{lot.name}</span>
                <span className="flex justify-between font-asta-mono text-xs text-asta-ink-muted">
                  <span>pagato</span>
                  <span>{formatCredits(sale.price)}</span>
                </span>
                <span className="flex justify-between font-asta-mono text-xs font-bold">
                  <span>vale</span>
                  <span className="text-asta-red">{formatEuro(lot.value)}</span>
                </span>
              </span>
            </li>
          );
        })}
        {sales.length === 0 && <li className="text-center text-sm font-semibold text-asta-ink-muted">Nessun lotto comprato.</li>}
      </ul>

      {state.unsold.length > 0 && (
        <section className="flex flex-col gap-1.5 border-t-[1.5px] border-dashed border-asta-paper-dash pt-2.5">
          <span className="font-asta-mono text-[11px] font-bold text-asta-brown">RIMASTI INVENDUTI</span>
          {state.unsold.map((i) => (
            <span key={i} className="flex justify-between gap-3 text-sm font-bold">
              <span className="min-w-0 truncate">{state.lots[i].name}</span>
              <span className="shrink-0 font-asta-mono">{formatEuro(state.lots[i].value)}</span>
            </span>
          ))}
        </section>
      )}
    </AstaScreen>
  );
}
