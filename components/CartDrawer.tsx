// components/CartDrawer.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";
import { formatCurrency } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQuantity, itemCount } =
    useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l shadow-2xl bg-panel text-cream"
            style={{ borderColor: "var(--border)" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b p-5"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold stroke-[1.5]" />
                <h2 className="font-display text-lg font-medium tracking-tight">
                  Your Crate
                </h2>
                <span className="rounded-full px-2 py-0.5 text-xs font-mono bg-gold/15 text-gold">
                  {itemCount}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-gold/10"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-60 flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-12 w-12 text-cream-dim opacity-40 stroke-[1.25]" />
                  <p className="mt-4 font-display text-base text-cream">
                    Your crate is empty.
                  </p>
                  <p className="mt-1 text-xs text-cream-dim">
                    Explore our handcrafted solid wood pieces to begin.
                  </p>
                  <button onClick={closeCart} className="mt-6 btn-ghost">
                    Browse Collection
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 rounded-xl border p-3 bg-panel-2"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-ink">
                        <Image
                          src={item.piece.image}
                          alt={item.piece.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-sans text-xs font-semibold leading-snug text-cream">
                              {item.piece.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-cream-dim hover:text-red-400 transition-colors"
                              aria-label={`Remove ${item.piece.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5 stroke-[1.5]" />
                            </button>
                          </div>
                          {(item.selectedWood || item.selectedSize) && (
                            <p className="font-mono text-[9px] text-cream-dim uppercase mt-0.5">
                              {item.selectedWood && item.selectedWood}
                              {item.selectedWood && item.selectedSize && " · "}
                              {item.selectedSize && item.selectedSize}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div
                            className="flex items-center rounded border overflow-hidden"
                            style={{ borderColor: "var(--border-strong)" }}
                          >
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 py-1 text-xs font-mono hover:bg-gold/10 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span
                              className="px-3 py-1 text-xs font-mono border-x"
                              style={{ borderColor: "var(--border-strong)" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 py-1 text-xs font-mono hover:bg-gold/10 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-mono text-xs font-semibold text-gold">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div
                className="border-t p-5 space-y-4 bg-panel-2"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-cream-dim">
                    <span>Subtotal</span>
                    <span className="font-mono">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div
                    className="border-t pt-2 mt-2 flex justify-between font-medium text-sm text-cream"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span>Total</span>
                    <span className="font-mono text-gold text-base font-semibold">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="btn-gold w-full"
                >
                  View Full Cart
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
