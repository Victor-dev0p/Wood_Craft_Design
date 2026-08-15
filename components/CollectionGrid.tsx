"use client";

import { useMemo, useState } from "react";
import { categories, pieces, type Category } from "@/lib/data";
import PieceCard from "./PieceCard";
import { cn } from "@/lib/utils";

export default function CollectionGrid({
  initial = "all",
  featuredOnly = false,
}: {
  initial?: Category | "all";
  featuredOnly?: boolean;
}) {
  const [active, setActive] = useState<Category | "all">(initial);

  const list = useMemo(() => {
    const base = featuredOnly ? pieces.filter((p) => p.featured) : pieces;
    if (active === "all") return base;
    return base.filter((p) => p.category === active);
  }, [active, featuredOnly]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[12px] tracking-wide transition-colors",
              active === cat.id
                ? "bg-gold text-[#2a1c10]"
                : "bg-panel text-cream-dim hover:text-cream border border-line-strong",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((piece) => (
          <PieceCard key={piece.slug} piece={piece} />
        ))}
      </div>
    </div>
  );
}
