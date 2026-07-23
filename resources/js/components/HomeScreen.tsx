import React from "react";
import type { Dispatch } from "react";
import type { GameAction } from "@/types/actions.types";
import type { GameMode } from "@/types/game.types";

interface HomeScreenProps {
  dispatch: Dispatch<GameAction>;
}

export function HomeScreen({ dispatch }: HomeScreenProps) {
  const handleModeSelect = (mode: GameMode) => {
    dispatch({ type: "SET_GAME_MODE", payload: { mode } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-800 mb-2 sm:mb-4">
            Family Feud
          </h1>
          <p className="text-base sm:text-xl text-gray-600">
            Scegli la modalità di gioco
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8">
          {/* Modalità con Master */}
          <button
            onClick={() => handleModeSelect("master")}
            className="group relative bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transform active:scale-[0.98] md:hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-left flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Con Master</h2>
                <p className="text-blue-100 text-sm md:text-base">
                  Un conduttore gestisce il gioco dal drawer laterale, rivela le risposte e segna gli errori.
                </p>
              </div>
              <div className="text-4xl sm:text-5xl shrink-0">🎮</div>
            </div>
          </button>

          {/* Modalità senza Master */}
          <button
            onClick={() => handleModeSelect("no-master")}
            className="group relative bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transform active:scale-[0.98] md:hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-left flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Senza Master</h2>
                <p className="text-green-100 text-sm md:text-base">
                  Due giocatori si sfidano sullo stesso telefono. Le risposte vengono scritte e il matching è automatico.
                </p>
              </div>
              <div className="text-4xl sm:text-5xl shrink-0">⚡</div>
            </div>
          </button>

          {/* Modalità Rubo */}
          <button
            onClick={() => handleModeSelect("rubo")}
            className="group relative bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transform active:scale-[0.98] md:hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-left flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Rubo</h2>
                <p className="text-slate-300 text-sm md:text-base">
                  Quiz a bluff condotto da te: rispondi o ruba la risposta all'avversario. Corretta +1, rubo riuscito +2, rubo fallito −1.
                </p>
              </div>
              <div className="text-4xl sm:text-5xl shrink-0">🃏</div>
            </div>
          </button>

          {/* Modalità Personaggio Misterioso */}
          <button
            onClick={() => handleModeSelect("mystery")}
            className="group relative bg-gradient-to-r from-indigo-500 to-violet-700 hover:from-indigo-600 hover:to-violet-800 text-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transform active:scale-[0.98] md:hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-left flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Personaggio Misterioso</h2>
                <p className="text-indigo-100 text-sm md:text-base">
                  Tu dai gli indizi, dal più difficile al più facile. Chi indovina prima vince più punti: 10 con un solo indizio, 1 con dieci.
                </p>
              </div>
              <div className="text-4xl sm:text-5xl shrink-0">🕵️</div>
            </div>
          </button>
          {/* Modalità Più alto o più basso */}
          <button
            onClick={() => handleModeSelect("higher-lower")}
            className="group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transform active:scale-[0.98] md:hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-left flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                  Più alto o più basso
                </h2>
                <p className="text-amber-100 text-sm md:text-base">
                  Due squadre, una sola catena. A turno indovinate quale numero è più
                  grande: chi sbaglia la spezza e regala il punto.
                </p>
              </div>
              <div className="text-4xl sm:text-5xl shrink-0">📈</div>
            </div>
          </button>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-gray-500 text-xs sm:text-sm">
          Scegli la modalità che preferisci per iniziare il gioco!
        </div>
      </div>
    </div>
  );
}
