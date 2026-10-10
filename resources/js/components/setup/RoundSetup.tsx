import React, { useMemo, useState } from "react";
import { IconCheck } from "../master/parts";
import { FeudBack, FeudPlayIcon, FeudScreen } from "../feud/parts";
import { getAllCategories, getCategoryGroups, categoryToAnswers } from "@/services/categoryService";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface RoundSetupProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
  /** Categorie dei round già giocati in questa partita. */
  playedCategories?: string[];
  onBack: () => void;
  canGoBack: boolean;
}

const ALL = "tutte";

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function RoundSetup({ teamA, teamB, dispatch, playedCategories = [], onBack, canGoBack }: RoundSetupProps) {
  const [categoryId, setCategoryId] = useState("");
  const [query, setQuery] = useState("");
  const [groupId, setGroupId] = useState(ALL);

  const categories = getAllCategories();
  const groups = useMemo(() => getCategoryGroups(), []);
  const played = useMemo(() => new Set(playedCategories), [playedCategories]);

  // Gruppi del filtro scelto; la ricerca restringe dentro quei gruppi
  const scopeGroups = useMemo(
    () => (groupId === ALL ? groups : groups.filter((g) => g.id === groupId)),
    [groups, groupId]
  );
  const visibleGroups = useMemo(() => {
    const q = normalize(query.trim());
    return scopeGroups
      .map((g) => ({ ...g, categories: q ? g.categories.filter((c) => normalize(c.name).includes(q)) : g.categories }))
      .filter((g) => g.categories.length > 0);
  }, [scopeGroups, query]);

  const selected = categories.find((c) => c.id === categoryId);

  const pickRandom = () => {
    // Pesca nel gruppo scelto, prima tra le categorie non ancora giocate
    const scope = scopeGroups.flatMap((g) => g.categories);
    const fresh = scope.filter((c) => !played.has(c.name));
    const pool = fresh.length > 0 ? fresh : scope;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setQuery("");
    setCategoryId(pick.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;

    dispatch({
      type: "START_ROUND",
      payload: { category: selected.name, answers: categoryToAnswers(selected) },
    });
  };

  const chips = [{ id: ALL, label: "Tutte", count: categories.length }, ...groups.map((g) => ({ id: g.id, label: g.label, count: g.categories.length }))];

  return (
    <FeudScreen>
      <div className="flex h-11 items-center gap-3">
        <FeudBack onClick={onBack} disabled={!canGoBack} />
        <span className="min-w-0 truncate text-sm font-extrabold text-feud-muted">
          Round {playedCategories.length + 1} · {teamA.name} {teamA.score} – {teamB.score} {teamB.name}
        </span>
      </div>

      <h1 className="m-0 font-feud text-[52px] leading-[0.9] font-black uppercase">
        Di cosa
        <br />
        parliamo?
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3">
        {/* Ricerca e filtri restano a portata mentre scorri la lista */}
        <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-2.5 bg-feud-blue px-4 pt-1 pb-2">
          <div className="flex gap-2">
            <label htmlFor="category-search" className="sr-only">
              Cerca categoria
            </label>
            <input
              id="category-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca una categoria"
              autoComplete="off"
              className="h-[50px] min-w-0 flex-1 rounded-[14px] bg-feud-navy px-4 text-base font-semibold text-white placeholder:text-feud-muted-2 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              type="button"
              onClick={pickRandom}
              className="feud-press h-[50px] shrink-0 rounded-[14px] bg-feud-yellow px-4 text-sm font-extrabold text-feud-ink"
            >
              A caso
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
                  className={`feud-press flex h-9 shrink-0 items-center gap-1.5 rounded-full border-2 px-3.5 text-sm font-extrabold ${
                    active ? "border-white bg-white text-feud-ink" : "border-white/25 text-white"
                  }`}
                >
                  {chip.label}
                  <span className={active ? "text-feud-ink/50" : "text-feud-muted-2"}>{chip.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {visibleGroups.map((group) => (
            <section key={group.id} aria-labelledby={`group-${group.id}`} className="flex flex-col gap-1.5">
              <h2 id={`group-${group.id}`} className="m-0 flex items-center justify-between text-[13px] font-extrabold text-feud-yellow">
                <span>{group.label}</span>
                <span className="text-feud-muted-2">{group.categories.length}</span>
              </h2>
              <ul className="flex flex-col gap-1.5">
                {group.categories.map((cat) => {
                  const isSelected = cat.id === categoryId;
                  const isPlayed = played.has(cat.name);
                  return (
                    <li key={cat.id}>
                      <button
                        type="button"
                        onClick={() => setCategoryId(cat.id)}
                        aria-pressed={isSelected}
                        className={`feud-press flex min-h-[60px] w-full items-center gap-3 rounded-[14px] px-3.5 py-2.5 text-left ${
                          isSelected
                            ? "bg-feud-yellow text-feud-ink"
                            : isPlayed
                              ? "border-2 border-dashed border-white/25 text-feud-muted-2"
                              : "bg-feud-navy text-white"
                        }`}
                      >
                        <span className="flex-1 font-feud text-[23px] leading-none font-extrabold uppercase">{cat.name}</span>
                        {isSelected && (
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-feud-ink text-feud-yellow">
                            <IconCheck size={16} />
                          </span>
                        )}
                        {isPlayed && !isSelected && <span className="shrink-0 text-xs font-extrabold">Già giocata</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          {visibleGroups.length === 0 && (
            <p className="rounded-[14px] border-2 border-dashed border-white/25 px-4 py-6 text-center text-sm font-semibold text-feud-muted">
              Nessuna categoria contiene “{query}”
              {groupId !== ALL && (
                <>
                  {" "}in questo tema.{" "}
                  <button type="button" onClick={() => setGroupId(ALL)} className="font-extrabold text-feud-yellow underline">
                    Cerca in tutte
                  </button>
                </>
              )}
            </p>
          )}
        </div>

        <div className="sticky bottom-0 -mx-4 mt-auto border-t border-white/15 bg-feud-blue px-4 pt-3 pb-1">
          <button
            type="submit"
            disabled={!selected}
            className="feud-press flex h-[60px] w-full items-center justify-center gap-2.5 rounded-[18px] bg-white px-4 text-lg font-extrabold text-feud-ink disabled:bg-feud-navy disabled:text-feud-muted-2"
          >
            <span className="truncate">{selected ? "Inizia il round" : "Scegli una categoria"}</span>
            {selected && <FeudPlayIcon />}
          </button>
        </div>
      </form>
    </FeudScreen>
  );
}
