import React, { useMemo, useState } from "react";
import { IconBack, IconCheck, IconDice, RoundsStepper, TopRoundButton, TopScreen, roundsNote } from "./parts";
import { TOP100_CATEGORIES, TOP100_GROUP_LABELS } from "@/data/top100";
import type { Top100Group } from "@/data/top100";
import { TOP100_MAX_ROUNDS, TOP100_MIN_ROUNDS, normalizeTop100 } from "@/services/top100Service";
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
  // Si parte dai giri scelti all'inizio, ma ogni classifica può averne di più o di meno
  const [rounds, setRounds] = useState(state.roundsPerCategory);

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
  const leader = [...state.teams].sort((a, b) => b.score - a.score)[0];
  const playedCount = state.playedCategoryIds.length;

  return (
    <TopScreen>
      <div className="flex h-11 items-center gap-3">
        <TopRoundButton label="Indietro" onClick={onBack} disabled={!canGoBack}>
          <IconBack />
        </TopRoundButton>
        <span className="truncate text-[13px] font-extrabold text-top-muted">
          Classifica {playedCount + 1}
          {playedCount > 0 && leader ? ` · ${leader.name} in testa con ${leader.score}` : ""}
        </span>
      </div>

      <h1 className="m-0 font-top text-[28px] leading-[1.05] font-extrabold tracking-[-0.02em]">Scegli la classifica</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selected) dispatch({ type: "TOP100_START_CATEGORY", payload: { categoryId: selected.id, rounds } });
        }}
        className="flex flex-1 flex-col gap-3"
      >
        <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-2.5 bg-top-night px-4 pt-1 pb-2">
          <div className="flex gap-2">
            <label htmlFor="top100-search" className="sr-only">
              Cerca una classifica
            </label>
            <input
              id="top100-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca una classifica"
              autoComplete="off"
              className="h-12 min-w-0 flex-1 rounded-[14px] border-[1.5px] border-top-line bg-top-panel px-3.5 text-base font-semibold text-top-text placeholder:text-top-muted focus:border-top-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={pickRandom}
              className="top-press flex h-12 shrink-0 items-center gap-1.5 rounded-[14px] border-[1.5px] border-top-gold px-3.5 text-sm font-extrabold text-top-gold"
            >
              <IconDice />A caso
            </button>
          </div>
          <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none]" role="group" aria-label="Filtra per tema">
            {chips.map((chip) => {
              const active = chip.id === groupId;
              return (
                <button
                  key={chip.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setGroupId(chip.id)}
                  className={`top-press flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-extrabold ${
                    active ? "bg-top-text text-top-night" : "border-[1.5px] border-top-line text-top-muted"
                  }`}
                >
                  {chip.label}
                  <span className={active ? "text-top-night/60" : "text-top-muted/70"}>{chip.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {visibleGroups.map((group) => (
            <section key={group.id} aria-labelledby={`t100-group-${group.id}`} className="flex flex-col gap-1.5">
              <h2
                id={`t100-group-${group.id}`}
                className="m-0 flex items-center justify-between text-xs font-extrabold tracking-[0.12em] text-top-gold uppercase"
              >
                <span>{group.label}</span>
                <span className="text-top-muted">{group.categories.length}</span>
              </h2>
              <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
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
                        className={`top-press flex min-h-[58px] w-full items-center gap-3 rounded-[14px] px-3.5 py-2 text-left ${
                          isSelected
                            ? "bg-top-gold text-top-gold-ink"
                            : isPlayed
                              ? "border-[1.5px] border-dashed border-top-line text-top-muted"
                              : "bg-top-panel text-top-text"
                        }`}
                      >
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className={`text-[15px] leading-snug ${isSelected ? "font-extrabold" : "font-bold"}`}>{cat.name}</span>
                          <span className={`text-xs ${isSelected ? "font-bold text-top-gold-soft" : "font-semibold text-top-muted"}`}>
                            Dati {cat.updatedAt}
                            {short}
                          </span>
                        </span>
                        {isSelected && <IconCheck />}
                        {isPlayed && !isSelected && (
                          <span className="shrink-0 text-[11px] font-extrabold tracking-[0.08em] uppercase">Già giocata</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
          {visibleGroups.length === 0 && (
            <p className="m-0 rounded-[14px] border-[1.5px] border-dashed border-top-line px-4 py-6 text-center text-sm font-semibold text-top-muted">
              Nessuna classifica contiene “{query}”
            </p>
          )}
        </div>

        <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-top-night pt-2 pb-1">
          <RoundsStepper
            title="Giri di questa classifica"
            note={roundsNote(rounds)}
            value={rounds}
            min={TOP100_MIN_ROUNDS}
            max={TOP100_MAX_ROUNDS}
            onChange={setRounds}
          />
          <button
            type="submit"
            disabled={!selected}
            className="top-press h-[60px] w-full rounded-[18px] bg-top-gold px-4 text-[17px] font-extrabold text-top-gold-ink disabled:bg-top-panel disabled:text-top-muted"
          >
            {selected ? "Inizia la classifica" : "Scegli una classifica"}
          </button>
        </div>
      </form>
    </TopScreen>
  );
}
