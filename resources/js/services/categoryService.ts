import { CATEGORIES, Category } from "@/data/categories";
import { CATEGORY_GROUPS } from "@/data/categoryGroups";
import type { Answer } from "@/types/game.types";

export interface ResolvedCategoryGroup {
  id: string;
  label: string;
  categories: Category[];
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

/**
 * Categorie divise per tema. Quelle senza gruppo (es. appena aggiunte)
 * finiscono in "Altre", così nessuna sparisce dalla scelta.
 */
export function getCategoryGroups(): ResolvedCategoryGroup[] {
  const byId = new Map(CATEGORIES.map((c) => [c.id, c]));
  const assigned = new Set<string>();

  const groups = CATEGORY_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    categories: group.categoryIds.flatMap((id) => {
      const category = byId.get(id);
      if (!category || assigned.has(id)) return [];
      assigned.add(id);
      return [category];
    }),
  })).filter((group) => group.categories.length > 0);

  const others = CATEGORIES.filter((c) => !assigned.has(c.id));
  if (others.length > 0) groups.push({ id: "altre", label: "Altre", categories: others });

  return groups;
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function categoryToAnswers(category: Category): Answer[] {
  return category.answers.map((ans) => ({
    rank: ans.rank,
    value: ans.value,
    revealed: false,
    burned: false,
  }));
}
