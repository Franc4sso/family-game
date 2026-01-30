import React from "react";

interface CategoryDisplayProps {
  category: string;
}

export function CategoryDisplay({ category }: CategoryDisplayProps) {
  return (
    <div className="text-center py-4 px-4">
      <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 rounded-2xl shadow-2xl border-2 border-amber-400">
        <h1 className="text-2xl md:text-3xl text-white font-black leading-tight uppercase tracking-wide drop-shadow-lg">
          {category}
        </h1>
      </div>
    </div>
  );
}
