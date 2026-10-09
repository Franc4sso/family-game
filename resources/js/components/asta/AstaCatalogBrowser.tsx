import React, { useEffect, useMemo, useState } from "react";
import { AstaScreen, BackPill, LotPhoto, MonoLabel } from "./parts";
import { AstaFullPhoto } from "./AstaFullPhoto";
import { ASTA_CATALOG, ASTA_CATEGORY_LABELS } from "@/data/asta";
import type { AstaCategory, AstaItem } from "@/data/asta";
import { listCustomItems } from "@/services/astaCustomItems";
import { formatEuro } from "@/services/astaService";

const ALL = "tutte";

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Tutti i lotti disponibili ora: catalogo pronto più quelli del master. */
export function AstaCatalogBrowser({ onClose }: { onClose: () => void }) {
  const [mine, setMine] = useState<AstaItem[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [showValues, setShowValues] = useState(false);
  const [open, setOpen] = useState<AstaItem | null>(null);

  useEffect(() => {
    listCustomItems().then(setMine);
  }, []);

  const mineIds = useMemo(() => new Set(mine.map((i) => i.id)), [mine]);
  const all = useMemo(() => [...mine, ...ASTA_CATALOG], [mine]);
  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return all.filter(
      (i) => (category === ALL || i.category === category) && (!q || normalize(i.name).includes(q))
    );
  }, [all, category, query]);

  if (open) {
    return <LotDetail item={open} mine={mineIds.has(open.id)} showValue={showValues} onBack={() => setOpen(null)} />;
  }

  const categories = Object.keys(ASTA_CATEGORY_LABELS) as AstaCategory[];
  const chips = [
    { id: ALL, label: "Tutti", count: all.length },
    ...categories.map((c) => ({ id: c, label: ASTA_CATEGORY_LABELS[c], count: all.filter((i) => i.category === c).length })),
  ].filter((c) => c.count > 0);

  return (
    <AstaScreen>
      <div className="flex items-center justify-between">
        <BackPill onClick={onClose} label="Torna all'asta" />
        <button
          type="button"
          aria-pressed={showValues}
          onClick={() => setShowValues((v) => !v)}
          className={`h-11 rounded-full px-4 font-asta-mono text-[11px] font-bold ${
            showValues ? "bg-asta-mustard text-asta-ink" : "border border-dashed border-asta-mustard text-asta-mustard"
          }`}
        >
          {showValues ? "NASCONDI VALORI" : "MOSTRA I VALORI"}
        </button>
      </div>

      <div className="flex flex-col gap-0.5">
        <MonoLabel>CATALOGO DELLA CASA D'ASTE</MonoLabel>
        <h1 className="text-[28px] font-extrabold leading-tight">
          {all.length} lotti disponibili
        </h1>
        <p className="text-sm font-semibold text-asta-muted">
          {ASTA_CATALOG.length} dal catalogo pronto · {mine.length} tuoi
        </p>
      </div>

      <div className="sticky top-0 z-10 -mx-3.5 flex flex-col gap-2.5 bg-asta-bg px-3.5 pb-2 pt-1">
        <label htmlFor="asta-catalog-search" className="sr-only">Cerca un lotto</label>
        <input
          id="asta-catalog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cerca un lotto"
          autoComplete="off"
          className="h-12 rounded-full border border-asta-line bg-asta-surface px-5 text-[15px] font-semibold text-asta-cream placeholder:text-asta-muted focus:border-asta-mustard focus:outline-none"
        />
        <div className="-mx-3.5 flex gap-1.5 overflow-x-auto px-3.5 pb-1 [scrollbar-width:none]" role="group" aria-label="Categoria">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
              className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] ${
                category === c.id ? "bg-asta-cream font-extrabold text-asta-ink" : "border border-asta-line bg-asta-surface font-bold text-asta-muted"
              }`}
            >
              {c.label}
              <span className="opacity-60">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2.5">
        {visible.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="flex w-full flex-col overflow-hidden rounded-[18px] border border-asta-line bg-asta-surface text-left active:scale-[0.98]"
            >
              <span className="relative block aspect-square w-full bg-asta-photo">
                <img src={item.image} alt="" loading="lazy" className="h-full w-full object-contain" />
                {mineIds.has(item.id) && (
                  <span className="absolute left-2 top-2 rounded-full bg-asta-red px-2 py-0.5 font-asta-mono text-[10px] font-bold text-asta-red-ink">
                    TUO
                  </span>
                )}
              </span>
              <span className="flex flex-col gap-0.5 p-2.5">
                <MonoLabel className="text-[10px]">{(ASTA_CATEGORY_LABELS[item.category] ?? item.category).toUpperCase()}</MonoLabel>
                <span className="line-clamp-2 text-sm font-extrabold leading-tight">{item.name}</span>
                <span className="font-asta-mono text-xs font-bold text-asta-mustard">
                  {showValues ? formatEuro(item.value) : "€ ••••"}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="rounded-2xl border border-dashed border-asta-line px-4 py-6 text-center text-sm font-semibold text-asta-muted">
          Nessun lotto trovato.
        </p>
      )}
    </AstaScreen>
  );
}

function LotDetail({ item, mine, showValue, onBack }: { item: AstaItem; mine: boolean; showValue: boolean; onBack: () => void }) {
  const [full, setFull] = useState(false);
  const [reveal, setReveal] = useState(showValue);

  return (
    <AstaScreen padded={false}>
      <div className="flex h-16 items-center px-3.5">
        <BackPill onClick={onBack} label="Catalogo" />
      </div>
      <LotPhoto src={item.image} alt={item.name} onExpand={() => setFull(true)} />

      <div className="mx-3 mt-3 flex flex-col gap-2 rounded-b-[20px] rounded-t-md bg-asta-cream px-4 pb-4 pt-3.5 text-asta-ink">
        <span className="font-asta-mono text-[11px] font-bold tracking-[0.1em] text-asta-brown">
          {(ASTA_CATEGORY_LABELS[item.category] ?? item.category).toUpperCase()}
          {mine ? " · LOTTO TUO" : ""}
        </span>
        <h1 className="text-[23px] font-extrabold leading-[1.05]">{item.name}</h1>
        {item.description && <p className="text-[13px] font-semibold leading-snug text-asta-ink-soft">{item.description}</p>}
        {item.clues.length > 0 && (
          <ul className="flex flex-col gap-1.5 border-t border-dashed border-[#C9B9A4] pt-2">
            {item.clues.map((clue, i) => (
              <li key={i} className="flex gap-2 text-sm font-bold">
                <span className="font-asta-mono text-asta-red">{String(i + 1).padStart(2, "0")}</span>
                {clue}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={() => setReveal((v) => !v)}
        className="mx-3 mt-3 flex items-center gap-4 rounded-l-lg rounded-r-[30px] bg-asta-surface py-3 pl-4 pr-5 text-left"
      >
        <span className="h-4 w-4 shrink-0 rounded-full bg-asta-bg ring-2 ring-asta-line-strong" aria-hidden />
        <span className="flex flex-col">
          <span className="font-asta-mono text-[11px] font-bold tracking-[0.1em] text-asta-muted">VALORE REALE · TOCCA PER {reveal ? "NASCONDERE" : "VEDERE"}</span>
          <span className="text-[30px] font-extrabold text-asta-mustard">{reveal ? formatEuro(item.value) : "€ ••••"}</span>
        </span>
      </button>

      {(item.valueNote || item.credit) && (
        <div className="mx-4 mb-4 mt-3 flex flex-col gap-1 font-asta-mono text-[11px] leading-relaxed text-asta-muted">
          {reveal && item.valueNote && <span>Valore: {item.valueNote}</span>}
          {item.credit && <span>Foto: {item.credit}</span>}
        </div>
      )}

      {full && <AstaFullPhoto src={item.image} title={item.name} lotLabel="CATALOGO" onClose={() => setFull(false)} />}
    </AstaScreen>
  );
}
