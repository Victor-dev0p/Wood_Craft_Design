"use client";

import { useState } from "react";
import { ChevronDown, Heart, Leaf, Spline } from "lucide-react";
import { philosophy } from "@/lib/data";

const icons = {
  leaf: Leaf,
  joinery: Spline,
  heart: Heart,
} as const;

export default function PhilosophyAccordion() {
  const [open, setOpen] = useState(philosophy[0].id);

  return (
    <div className="space-y-3">
      {philosophy.map((item) => {
        const Icon = icons[item.icon as keyof typeof icons];
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border bg-panel"
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? "" : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/10 text-gold">
                  <Icon size={15} />
                </span>
                <span className="text-sm font-medium text-cream">
                  {item.title}
                </span>
              </span>
              <ChevronDown
                size={16}
                className={`text-cream-dim transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <p
                className="border-t px-5 py-4 text-sm leading-relaxed text-cream-dim"
                style={{ borderColor: "var(--border)" }}
              >
                {item.body}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
