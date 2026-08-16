"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, itemCount, clearCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="mx-auto max-w-5xl px-5 py-24 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-cream">Your Crate</h1>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs uppercase tracking-[0.16em] text-cream-dim hover:text-blush transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="mt-16 flex flex-col items-center text-center">
          <ShoppingBag className="h-16 w-16 text-cream-dim opacity-30" />
          <p className="mt-6 font-display text-2xl text-cream">
            Your crate is empty
          </p>
          <p className="mt-2 text-sm text-cream-dim">
            Explore our collection and add pieces that speak to your space.
          </p>
          <Link href="/collection" className="btn-gold mt-8">
            Browse Collection
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="hairline flex gap-4 rounded-xl bg-panel p-4"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-ink">
                  <Image
                    src={item.piece.image}
                    alt={item.piece.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/collection/${item.piece.slug}`}
                        className="font-display text-lg text-cream hover:text-gold transition-colors"
                      >
                        {item.piece.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-cream-dim hover:text-blush transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    {(item.selectedWood || item.selectedSize) && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cream-dim">
                        {item.selectedWood && item.selectedWood}
                        {item.selectedWood && item.selectedSize && " · "}
                        {item.selectedSize && item.selectedSize}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="grid h-7 w-7 place-items-center rounded border text-cream hover:bg-gold/10 transition-colors"
                        style={{ borderColor: "var(--border-strong)" }}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-sm text-cream">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="grid h-7 w-7 place-items-center rounded border text-cream hover:bg-gold/10 transition-colors"
                        style={{ borderColor: "var(--border-strong)" }}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-mono text-sm font-semibold text-gold">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="hairline rounded-xl bg-panel p-6">
              <h2 className="font-display text-xl text-cream">Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-cream-dim">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex justify-between text-cream-dim">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatCurrency(subtotal)}</span>
                </div>
                <div
                  className="border-t pt-2 flex justify-between font-medium text-cream"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span>Total</span>
                  <span className="font-mono text-gold">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              <Link href="/quote" className="btn-gold mt-6 w-full">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[11px] text-cream-dim">
                Shipping calculated after inquiry
              </p>
            </div>

            <div className="rounded-xl bg-panel-2 p-5">
              <p className="text-xs leading-relaxed text-cream-dim">
                Every piece is made to order. Lead times range from 4–16 weeks
                depending on wood selection and complexity. We will confirm
                timing after reviewing your request.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
