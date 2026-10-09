import React, { useMemo, useState } from "react";
import { BackButton, MasterScreen, IconArrowRight } from "../master/parts";
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
    <MasterScreen>
      <BackButton onClick={onBack} disabled={!canGoBack} />
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-muted">
          Round {playedCategories.length + 1}
        </span>
        <h1 className="font-display text-[28px] leading-tight">Scegli la categoria</h1>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <MiniScore team={teamA} className="bg-ff-team-a ring-[#2A3D78]" nameColor="text-ff-team-a-text" />
        <MiniScore team={teamB} className="bg-ff-team-b ring-[#4A2C22]" nameColor="text-ff-team-b-text" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3">
        {/* Ricerca e filtri restano a portata mentre scorri la lista */}
        <div className="sticky top-0 z-10 -mx-4 flex flex-col gap-2.5 bg-ff-bg px-4 pb-2 pt-1">
          <div className="flex gap-2">
            <label htmlFor="category-search" className="sr-only">Cerca categoria</label>
            <input
              id="category-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca una categoria"
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
            <section key={group.id} aria-labelledby={`group-${group.id}`} className="flex flex-col gap-1.5">
              <h2
                id={`group-${group.id}`}
                className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-gold"
              >
                <span>{group.label}</span>
                <span className="text-ff-muted">{group.categories.length}</span>
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
                        className={`flex min-h-[52px] w-full items-center gap-3 rounded-[14px] px-4 py-2 text-left text-[15px] font-bold active:scale-[0.98] ${
                          isSelected
                            ? "bg-ff-gold text-ff-gold-ink"
                            : isPlayed
                              ? "border border-ff-line-soft bg-ff-bg text-ff-muted"
                              : "border border-ff-line-soft bg-ff-surface text-ff-text"
                        }`}
                      >
                        <span className="flex-1 leading-snug">{cat.name}</span>
                        {isPlayed && !isSelected && (
                          <span className="shrink-0 text-[11px] font-extrabold uppercase tracking-[0.08em]">Già giocata</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          {visibleGroups.length === 0 && (
            <p className="rounded-[14px] border border-dashed border-ff-line px-4 py-6 text-center text-sm font-semibold text-ff-muted">
              Nessuna categoria contiene “{query}”
              {groupId !== ALL && (
                <>
                  {" "}in questo tema.{" "}
                  <button type="button" onClick={() => setGroupId(ALL)} className="font-extrabold text-ff-gold underline">
                    Cerca in tutte
                  </button>
                </>
              )}
            </p>
          )}
        </div>

        <div className="sticky bottom-0 mt-auto bg-ff-bg pb-1 pt-2">
          <button
            type="submit"
            disabled={!selected}
            className="flex h-[60px] w-full items-center justify-center gap-2.5 rounded-[18px] bg-ff-gold px-4 text-[17px] font-extrabold text-ff-gold-ink active:scale-[0.98] disabled:bg-ff-surface disabled:text-ff-muted"
          >
            <span className="truncate">{selected ? "Inizia il round" : "Seleziona una categoria"}</span>
            {selected && <IconArrowRight />}
          </button>
        </div>
      </form>
    </MasterScreen>
  );
}

function MiniScore({ team, className, nameColor }: { team: Team; className: string; nameColor: string }) {
  return (
    <div className={`flex items-center justify-between gap-2 rounded-[16px] px-3.5 py-2.5 ring-1 ${className}`}>
      <span className={`truncate text-sm font-extrabold ${nameColor}`}>{team.name}</span>
      <span className="font-display text-2xl leading-none">{team.score}</span>
    </div>
  );
}
