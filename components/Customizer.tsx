"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Ruler, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import { pieces, woods } from "@/lib/data";
import { useCart } from "./CartContext";
import { formatCurrency } from "@/lib/utils";

const sizeOptions = [
  { id: "standard", label: "Standard", dimensions: "As listed", modifier: 0 },
  {
    id: "large",
    label: "Large",
    dimensions: "+20% overall scale",
    modifier: 0.2,
  },
  {
    id: "grand",
    label: "Grand",
    dimensions: "+35% overall scale",
    modifier: 0.35,
  },
];

const woodModifiers: Record<string, number> = {
  "Dark Walnut": 400,
  "White Oak": 0,
  "Black Cherry": 200,
  "Pacific Maple": -100,
};

const woodColors: Record<string, string> = {
  "Dark Walnut": "#2C2520",
  "White Oak": "#D8C3A5",
  "Black Cherry": "#3a1f1f",
  "Pacific Maple": "#E9E2D8",
};

export default function Customizer() {
  const [selectedPiece, setSelectedPiece] = useState(pieces[0]);
  const [selectedWood, setSelectedWood] = useState(woods[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const price = useMemo(() => {
    const woodMod = woodModifiers[selectedWood.name] ?? 0;
    const sizeMod = Math.round(selectedPiece.price * selectedSize.modifier);
    return selectedPiece.price + woodMod + sizeMod;
  }, [selectedPiece, selectedWood, selectedSize]);

  const handleAdd = () => {
    addItem(selectedPiece, selectedWood.name, selectedSize.label);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section
      id="customizer-section"
      className="border-t bg-ink py-24 px-4 md:px-8"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Bespoke Atelier</p>
          <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">
            Configure Your Masterpiece
          </h2>
          <div className="gold-rule mt-4" />
          <p className="mt-5 text-sm leading-relaxed text-cream-dim">
            Select your premium timber and dimensional scale. Pricing adjusts in
            real time to match our artisanal standards.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Preview */}
          <div className="lg:col-span-7">
            <div className="hairline relative aspect-16/10 overflow-hidden rounded-xl bg-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPiece.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedPiece.image}
                    alt={selectedPiece.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </motion.div>
              </AnimatePresence>

              <div
                className="absolute bottom-4 left-4 right-4 rounded-lg border bg-panel/90 p-4 backdrop-blur-sm"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-cream">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      {selectedPiece.name}
                    </div>
                    <div className="mt-1 font-mono text-[10px] text-cream-dim">
                      {selectedWood.name} · {selectedSize.dimensions}
                    </div>
                  </div>
                  <div className="font-mono text-lg font-semibold text-gold">
                    {formatCurrency(price)}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {pieces.slice(0, 6).map((p) => {
                const isActive = selectedPiece.slug === p.slug;
                return (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedPiece(p)}
                    className="rounded-lg border p-3 text-left transition-all"
                    style={{
                      borderColor: isActive ? "var(--gold)" : "var(--border)",
                      background: isActive
                        ? "color-mix(in oklab, var(--gold) 6%, var(--panel))"
                        : "var(--panel)",
                      boxShadow: isActive ? "0 0 0 1px var(--gold)" : "none",
                    }}
                  >
                    <div className="truncate text-xs font-medium text-cream">
                      {p.name}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] text-cream-dim">
                      {formatCurrency(p.price)} base
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="lg:col-span-5 space-y-8">
            {/* Wood */}
            <div>
              <p className="eyebrow">1. Select Timber</p>
              <div className="mt-4 space-y-3">
                {woods.map((wood) => {
                  const isActive = selectedWood.name === wood.name;
                  const mod = woodModifiers[wood.name] ?? 0;
                  const modLabel =
                    mod > 0
                      ? `+$${mod}`
                      : mod < 0
                        ? `-$${Math.abs(mod)}`
                        : "Included";

                  return (
                    <button
                      key={wood.name}
                      onClick={() => setSelectedWood(wood)}
                      className="flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-all hover:opacity-90"
                      style={{
                        borderColor: isActive ? "var(--gold)" : "var(--border)",
                        background: isActive
                          ? "color-mix(in oklab, var(--gold) 6%, var(--panel))"
                          : "var(--panel)",
                        boxShadow: isActive ? "0 0 0 1px var(--gold)" : "none",
                      }}
                    >
                      <div
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full border shadow-inner"
                        style={{
                          backgroundColor: woodColors[wood.name] ?? "#ccc",
                          borderColor: "rgba(0,0,0,0.1)",
                        }}
                      >
                        {isActive && (
                          <Check className="h-4 w-4 text-white mix-blend-difference" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-semibold text-cream">
                            {wood.name}
                          </span>
                          <span className="font-mono text-[10px] font-medium text-gold">
                            {modLabel}
                          </span>
                        </div>
                        <p className="truncate text-[10px] text-cream-dim">
                          {wood.tone}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="eyebrow">2. Select Scale</p>
              <div className="mt-4 space-y-3">
                {sizeOptions.map((size) => {
                  const isActive = selectedSize.id === size.id;
                  const modLabel =
                    size.modifier > 0
                      ? `+${Math.round(size.modifier * 100)}%`
                      : "Included";

                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all hover:opacity-90"
                      style={{
                        borderColor: isActive ? "var(--gold)" : "var(--border)",
                        background: isActive
                          ? "color-mix(in oklab, var(--gold) 6%, var(--panel))"
                          : "var(--panel)",
                        boxShadow: isActive ? "0 0 0 1px var(--gold)" : "none",
                      }}
                    >
                      <Ruler className="h-5 w-5 shrink-0 text-cream-dim" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-semibold text-cream">
                            {size.label}
                          </span>
                          <span className="font-mono text-[10px] font-medium text-gold">
                            {modLabel}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-cream-dim">
                          {size.dimensions}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div
              className="border-t pt-6"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-xs font-medium text-cream">
                  Estimated Cost
                </span>
                <span className="font-mono text-2xl font-semibold text-gold">
                  {formatCurrency(price)}
                </span>
              </div>

              <button
                onClick={handleAdd}
                disabled={justAdded}
                className="btn-gold w-full disabled:opacity-70"
              >
                {justAdded ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Crate
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" /> Add to Crate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
