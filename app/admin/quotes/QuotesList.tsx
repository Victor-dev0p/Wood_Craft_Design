"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Mail, Calendar } from "lucide-react";
import QuoteResponseForm from "@/components/Admin/QuoteResponseForm";

const TYPE_LABELS: Record<string, string> = { commission: "New Commission", upgrade: "Upgrade Request", cart: "Cart Quote" };

export default function QuotesList({ quotes }: { quotes: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const formatDate = (d: string) => {
    if (!d) return "Date not available";
    try {
      return new Date(d).toLocaleString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return "Invalid date";
    }
  };

  if (!quotes.length) {
    return (
      <div className="text-center py-12 bg-panel-2 rounded-lg">
        <Mail className="mx-auto h-12 w-12 text-cream-dim opacity-40 mb-4" />
        <h3 className="text-lg font-medium text-cream mb-2">No requests yet</h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote, i) => (
        <div key={quote._id} className="bg-panel-2 border rounded-lg overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gold/5 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-cream">{quote.name}</h3>
                <span className="px-2 py-0.5 bg-gold/15 text-gold text-xs rounded-full">{TYPE_LABELS[quote.type] || quote.type}</span>
                {quote.status === "responded" && <span className="px-2 py-0.5 bg-green-900/30 text-green-400 text-xs rounded-full">Responded</span>}
              </div>
              <div className="flex items-center gap-4 text-xs text-cream-dim">
                <span className="flex items-center gap-1"><Mail size={12} />{quote.email}</span>
                <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(quote.createdAt)}</span>
              </div>
            </div>
            {openIndex === i ? <ChevronUp className="h-5 w-5 text-cream-dim" /> : <ChevronDown className="h-5 w-5 text-cream-dim" />}
          </button>

          {openIndex === i && (
            <div className="border-t px-6 py-4 space-y-3 text-sm" style={{ borderColor: "var(--border)" }}>
              {quote.archetype && <p><strong>Archetype:</strong> {quote.archetype}</p>}
              {quote.material && <p><strong>Material:</strong> {quote.material}</p>}
              {quote.pieceOwned && <p><strong>Piece Owned:</strong> {quote.pieceOwned}</p>}
              {quote.orderReference && <p><strong>Order Reference:</strong> {quote.orderReference}</p>}
              {quote.items?.length > 0 && (
                <div>
                  <strong>Cart Items:</strong>
                  <ul className="list-disc pl-5 text-cream-dim">
                    {quote.items.map((it: any, idx: number) => <li key={idx}>{it.name} — {it.selectedWood}, {it.selectedSize} × {it.quantity}</li>)}
                  </ul>
                </div>
              )}
              {quote.photoData && <img src={quote.photoData} alt="Submitted piece" className="w-40 rounded border" style={{ borderColor: "var(--border)" }} />}
              {quote.message && <div><strong>Message:</strong><p className="text-cream-dim bg-ink p-3 rounded border mt-1" style={{ borderColor: "var(--border-strong)" }}>{quote.message}</p></div>}
              {quote.response && <div><strong>Your Response:</strong><p className="text-cream-dim bg-ink p-3 rounded border mt-1" style={{ borderColor: "var(--border-strong)" }}>{quote.response}</p></div>}

              <div className="flex gap-3 pt-2">
                <a href={`mailto:${quote.email}?subject=Re: Your Wood Craft & Design Request`} className="inline-flex items-center gap-2 px-4 py-2 btn-gold text-xs">
                  <Mail size={14} /> Reply via Email
                </a>
              </div>

              <QuoteResponseForm quoteId={quote._id} existingResponse={quote.response} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}