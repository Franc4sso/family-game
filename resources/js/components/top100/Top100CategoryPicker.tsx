import React, { useMemo, useState } from "react";
import { BackButton, IconArrowRight, MasterScreen } from "../master/parts";
import { TOP100_CATEGORIES, TOP100_GROUP_LABELS } from "@/data/top100";
import type { Top100Group } from "@/data/top100";
import { normalizeTop100 } from "@/services/top100Service";
import type { Top100State } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100CategoryPickerProps {
  state: Top100State;
  dispatch: React.Dispatch<GameAction>;
  onBack: () => void;
  canGoBack: boolean;
}

const ALL = "tutte";

export function Top100CategoryPicker({ state, dispatch, onBack, canGoBack }: Top100CategoryPickerProps) {
  const [selectedId, setSelectedId] = useState("");
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState<string>(ALL);

  const played = useMemo(() => new Set(state.playedCategoryIds), [state.playedCategoryIds]);

  // Gruppi nell'ordine delle etichette, solo quelli che hanno classifiche
  const groups = useMemo(
    () =>
      (Object.keys(TOP100_GROUP_LABELS) as Top100Group[])
        .map((id) => ({ id, label: TOP100_GROUP_LABELS[id], categories: TOP100_CATEGORIES.filter((c) => c.group === id) }))
        .filter((g) => g.categories.length > 0),
    []
  );

  const scopeGroups = useMemo(() => (groupId === ALL ? groups : groups.filter((g) => g.id === groupId)), [groups, groupId]);
  const visibleGroups = useMemo(() => {
    const q = normalizeTop100(query);
    return scopeGroups
      .map((g) => ({ ...g, categories: q ? g.categories.filter((c) => normalizeTop100(c.name).includes(q)) : g.categories }))
      .filter((g) => g.categories.length > 0);
  }, [scopeGroups, query]);

  const selected = TOP100_CATEGORIES.find((c) => c.id === selectedId);

  const pickRandom = () => {
    const scope = scopeGroups.flatMap((g) => g.categories);
    const fresh = scope.filter((c) => !played.has(c.id));
    const pool = fresh.length > 0 ? fresh : scope;
    setQuery("");
    setSelectedId(pool[Math.floor(Math.random() * pool.length)].id);
  };

  const chips = [{ id: ALL, label: "Tutte", count: TOP100_CATEGORIES.length }, ...groups.map((g) => ({ id: g.id, label: g.label, count: g.categories.length }))];
  const standings = [...state.teams].sort((a, b) => b.score - a.score);

  return (
    <MasterScreen>
      <BackButton onClick={onBack} disabled={!canGoBack} />

      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-muted">
          Classifica {state.playedCategoryIds.length + 1} · TOP 100
        </span>
        <h1 className="font-display text-[28px] leading-tight">Scegli la classifica</h1>
      </div>

      {state.playedCategoryIds.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Punteggi">
          {standings.map((team) => (
            <span key={team.name} className="flex h-8 items-center gap-2 rounded-full border border-ff-line-soft bg-ff-surface pl-2.5 pr-3 text-[13px] font-bold">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: team.color }} />
              {team.name}
              <span className="font-display text-sm">{team.score}</span>
            </span>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selected) dispatch({ type: "TOP100_START_CATEGORY", payload: { categoryId: selected.id } });
        }}
        className="flex flex-1 flex-col gap-3"
      >
        <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-2.5 bg-ff-bg px-4 pb-2 pt-1">
          <div className="flex gap-2">
            <label htmlFor="top100-search" className="sr-only">Cerca classifica</label>
            <input
              id="top100-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca una classifica"
              autoComplete="off"
              className="h-12 min-w-0 flex-1 rounded-[14px] border border-ff-line bg-ff-surface px-4 text-[15px] font-semibold text-ff-text placeholder:text-ff-muted focus:border-ff-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={pickRandom}
              className="h-12 shrink-0 rounded-[14px] border border-ff-gold px-4 text-sm font-extrabold text-ff-gold active:scale-95"
            >
              A caso
            </button>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]" role="group" aria-label="Filtra per tema">
            {chips.map((chip) => {
              const active = chip.id === groupId;
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGroupId(chip.id)}
                  className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-extrabold active:scale-95 ${
                    active ? "bg-ff-text text-ff-bg" : "border border-ff-line bg-ff-surface text-ff-muted"
                  }`}
                >
                  {chip.label}
                  <span className={active ? "text-ff-bg/60" : "text-ff-muted/70"}>{chip.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {visibleGroups.map((group) => (
            <section key={group.id} aria-labelledby={`t100-group-${group.id}`} className="flex flex-col gap-1.5">
              <h2 id={`t100-group-${group.id}`} className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-gold">
                <span>{group.label}</span>
                <span className="text-ff-muted">{group.categories.length}</span>
              </h2>
              <ul className="flex flex-col gap-1.5">
                {group.categories.map((cat) => {
                  const isSelected = cat.id === selectedId;
                  const isPlayed = played.has(cat.id);
                  const short = cat.items.length < 100 ? ` · solo ${cat.items.length} voci` : "";
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedId(cat.id)}
                        className={`flex min-h-[58px] w-full flex-col justify-center gap-0.5 rounded-[14px] px-4 py-2 text-left active:scale-[0.98] ${
                          isSelected
                            ? "bg-ff-gold text-ff-gold-ink"
                            : isPlayed
                              ? "border border-ff-line-soft bg-ff-bg text-ff-muted"
                              : "border border-ff-line-soft bg-ff-surface text-ff-text"
                        }`}
                      >
                        <span className="flex w-full items-center gap-2">
                          <span className="flex-1 text-[15px] font-bold leading-snug">{cat.name}</span>
                          {isPlayed && !isSelected && (
                            <span className="shrink-0 text-[11px] font-extrabold uppercase tracking-[0.08em]">Già giocata</span>
                          )}
                        </span>
                        <span className={`text-[11px] font-semibold ${isSelected ? "text-ff-gold-ink-soft" : "text-ff-muted"}`}>
                          Dati {cat.updatedAt}{short}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          {visibleGroups.length === 0 && (
            <p className="rounded-[14px] border border-dashed border-ff-line px-4 py-6 text-center text-sm font-semibold text-ff-muted">
              Nessuna classifica contiene “{query}”
            </p>
          )}
        </div>

        <div className="sticky bottom-0 mt-auto bg-ff-bg pb-1 pt-2">
          <button
            type="submit"
            disabled={!selected}
            className="flex h-[60px] w-full items-center justify-center gap-2.5 rounded-[18px] bg-ff-gold px-4 text-[17px] font-extrabold text-ff-gold-ink active:scale-[0.98] disabled:bg-ff-surface disabled:text-ff-muted"
          >
            {selected ? "Inizia la classifica" : "Seleziona una classifica"}
            {selected && <IconArrowRight />}
          </button>
        </div>
      </form>
    </MasterScreen>
  );
}
