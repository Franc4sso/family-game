import React, { useState } from "react";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { getAllCategories, categoryToAnswers } from "@/services/categoryService";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface RoundSetupProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
}

export function RoundSetup({ teamA, teamB, dispatch }: RoundSetupProps) {
  const [categoryId, setCategoryId] = useState("");
  const categories = getAllCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const category = categories.find((c) => c.id === categoryId);
    if (!category) return;

    const answers = categoryToAnswers(category);

    dispatch({
      type: "START_ROUND",
      payload: { category: category.name, answers },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
            NUOVO ROUND
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-2 border-blue-500 rounded-xl p-4 text-center">
            <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">Squadra A</p>
            <p className="text-sm font-bold text-blue-400 truncate mb-2">{teamA.name}</p>
            <div className="bg-gray-800/50 rounded-lg py-2">
              <p className="text-2xl font-black text-white">{teamA.score}</p>
              <p className="text-[10px] text-gray-400 uppercase">{teamA.score === 1 ? 'punto' : 'punti'}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 border-2 border-red-500 rounded-xl p-4 text-center">
            <p className="text-xs text-red-300 uppercase tracking-wider mb-1">Squadra B</p>
            <p className="text-sm font-bold text-red-400 truncate mb-2">{teamB.name}</p>
            <div className="bg-gray-800/50 rounded-lg py-2">
              <p className="text-2xl font-black text-white">{teamB.score}</p>
              <p className="text-[10px] text-gray-400 uppercase">{teamB.score === 1 ? 'punto' : 'punti'}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Seleziona Categoria
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-600 rounded-xl text-white text-base focus:border-amber-400 focus:outline-none transition-all"
            >
              <option value="">-- Scegli una categoria --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            variant="success"
            size="lg"
            fullWidth
            disabled={!categoryId}
          >
            ▶️ Inizia Round
          </Button>
        </form>
      </Card>
    </div>
  );
}
