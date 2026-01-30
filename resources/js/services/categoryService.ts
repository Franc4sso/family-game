import { CATEGORIES, Category } from "@/data/categories";
import type { Answer } from "@/types/game.types";

export function getAllCategories(): Category[] {
  return CATEGORIES;
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
