// app/cart/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, CheckCircle, FileText, CreditCard } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { formatCurrency } from "@/lib/utils";

type Tab = "quote" | "payment";
type CartLineItem = {
  slug: string;
  name: string;
  selectedWood?: string;
  selectedSize?: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const { cart, removeItem, updateQuantity, clearCart } = useCart();
  const [tab, setTab] = useState<Tab>("quote");
  const [justCompleted, setJustCompleted] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartPayload: CartLineItem[] = cart.map((item) => ({
    slug: item.piece.slug,
    name: item.piece.name,
    selectedWood: item.selectedWood,
    selectedSize: item.selectedSize,
    price: item.price,
    quantity: item.quantity,
  }));

  // Cart clearing on success is expected — but don't let it collapse the page
  // before the success message underneath gets a chance to render.
  const handleSuccess = () => {
    setJustCompleted(true);
    clearCart();
  };

  const showEmptyState = cart.length === 0 && !justCompleted;

  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 py-16">
      <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-cream mb-8">
        Your Crate
      </h1>

      {showEmptyState ? (
        <p className="text-cream-dim text-sm">Your crate is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 flex flex-col gap-4">
            {cart.length === 0 ? (
              <p className="text-cream-dim text-sm">
                Your items have been submitted — see confirmation on the right.
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border p-4 bg-panel-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-ink">
                    <Image src={item.piece.image} alt={item.piece.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-sans text-sm font-semibold text-cream">{item.piece.name}</h4>
                        {(item.selectedWood || item.selectedSize) && (
                          <p className="font-mono text-[10px] text-cream-dim uppercase mt-0.5">
                            {item.selectedWood}
                            {item.selectedWood && item.selectedSize && " · "}
                            {item.selectedSize}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-cream-dim hover:text-red-400 transition-colors"
                        aria-label={`Remove ${item.piece.name}`}
                      >
                        <Trash2 className="h-4 w-4 stroke-[1.5]" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center rounded border overflow-hidden" style={{ borderColor: "var(--border-strong)" }}>
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-xs font-mono hover:bg-gold/10 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-xs font-mono border-x" style={{ borderColor: "var(--border-strong)" }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-xs font-mono hover:bg-gold/10 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-semibold text-gold">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border p-6 bg-panel-2 sticky top-24" style={{ borderColor: "var(--border)" }}>
              {!justCompleted && (
                <>
                  <div className="flex justify-between text-sm text-cream-dim mb-1">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatCurrency(subtotal)}</span>
                  </div>
                  <p className="text-[11px] text-cream-dim mb-6">
                    Final pricing depends on your selected wood, size, and any adjustments.
                  </p>

                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setTab("quote")}
                      className={`flex-1 py-2.5 rounded-md font-mono text-[10px] uppercase tracking-wider border transition-all ${tab === "quote" ? "bg-gold text-ink border-gold" : "text-cream-dim"}`}
                      style={{ borderColor: tab === "quote" ? undefined : "var(--border-strong)" }}
                    >
                      Request a Quote
                    </button>
                    <button
                      onClick={() => setTab("payment")}
                      className={`flex-1 py-2.5 rounded-md font-mono text-[10px] uppercase tracking-wider border transition-all ${tab === "payment" ? "bg-gold text-ink border-gold" : "text-cream-dim"}`}
                      style={{ borderColor: tab === "payment" ? undefined : "var(--border-strong)" }}
                    >
                      Proceed to Payment
                    </button>
                  </div>
                </>
              )}

              <AnimatePresence mode="wait">
                {tab === "quote" ? (
                  <QuoteCheckoutForm key="quote" items={cartPayload} onSuccess={handleSuccess} />
                ) : (
                  <PaymentCheckoutForm key="payment" items={cartPayload} subtotal={subtotal} onSuccess={handleSuccess} />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function QuoteCheckoutForm({ items, onSuccess }: { items: CartLineItem[]; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "cart", name, email, message, items }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center py-6">
        <CheckCircle className="w-10 h-10 text-gold mb-3" />
        <p className="text-sm text-cream font-medium">Quote request sent</p>
        <p className="text-xs text-cream-dim mt-1">We'll follow up by email to talk through adjustments.</p>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-3 text-xs">
      <input type="text" required placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)}
        className="w-full p-2.5 rounded border bg-ink text-cream outline-none" style={{ borderColor: "var(--border-strong)" }} />
      <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2.5 rounded border bg-ink text-cream outline-none" style={{ borderColor: "var(--border-strong)" }} />
      <textarea rows={3} placeholder="What would you like adjusted? (wood, size, finish...)" value={message} onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2.5 rounded border bg-ink text-cream outline-none resize-none" style={{ borderColor: "var(--border-strong)" }} />
      {error && <p className="text-red-400 text-[10px]">{error}</p>}
      <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
        <FileText className="h-4 w-4" />
        {loading ? "Sending..." : "Request Quote"}
      </button>
    </motion.form>
  );
}

function PaymentCheckoutForm({ items, subtotal, onSuccess }: { items: CartLineItem[]; subtotal: number; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, shippingAddress: address, items, subtotal, status: "pending_payment" }),
      });
      if (!res.ok) throw new Error("Failed");
      const order = await res.json();

      const payRes = await fetch(`/api/orders/${order._id}/pay`, { method: "POST" });
      if (payRes.ok) {
        const { link } = await payRes.json();
        window.location.href = link; // cart stays intact until payment is actually confirmed
        return;
      }

      // Payment couldn't be initiated — order is saved, but don't touch the cart
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center py-6">
        <CheckCircle className="w-10 h-10 text-gold mb-3" />
        <p className="text-sm text-cream font-medium">Order saved</p>
        <p className="text-xs text-cream-dim mt-1">
          We couldn't reach the payment gateway just now. Your items are still in your crate — feel free to retry, or our team will follow up by email.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-3 text-xs">
      <input type="text" required placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)}
        className="w-full p-2.5 rounded border bg-ink text-cream outline-none" style={{ borderColor: "var(--border-strong)" }} />
      <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2.5 rounded border bg-ink text-cream outline-none" style={{ borderColor: "var(--border-strong)" }} />
      <textarea rows={2} required placeholder="Shipping address" value={address} onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2.5 rounded border bg-ink text-cream outline-none resize-none" style={{ borderColor: "var(--border-strong)" }} />
      {error && <p className="text-red-400 text-[10px]">{error}</p>}
      <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
        <CreditCard className="h-4 w-4" />
        {loading ? "Redirecting to payment..." : "Proceed to Payment"}
      </button>
    </motion.form>
  );
}