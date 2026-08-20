// components/AddToCartButton.tsx
"use client";

import { ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import type { Piece } from "@/lib/data";

interface AddToCartButtonProps {
  piece: Piece;
  selectedWood?: string;
  selectedSize?: string;
  variant?: "gold" | "ghost" | "icon";
  className?: string;
}

export default function AddToCartButton({
  piece,
  selectedWood,
  selectedSize,
  variant = "gold",
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    addItem(piece, selectedWood, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const baseClasses =
    variant === "icon"
      ? "grid h-8 w-8 place-items-center rounded-full border transition-colors"
      : variant === "ghost"
        ? "btn-ghost"
        : "btn-gold";

  return (
    <button
      onClick={handleClick}
      disabled={justAdded}
      className={`${baseClasses} ${className}`}
      style={
        variant === "icon"
          ? {
              borderColor: "var(--border-strong)",
              color: "var(--text-main)",
            }
          : undefined
      }
      aria-label={`Add ${piece.name} to cart`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {justAdded ? (
          <motion.span
            key="check"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className={variant === "icon" ? "w-4 h-4" : "w-4 h-4"} />
          </motion.span>
        ) : (
          <motion.span
            key="bag"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <ShoppingBag
              className={variant === "icon" ? "w-4 h-4" : "w-4 h-4"}
            />
            {variant !== "icon" && "Add to Crate"}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
