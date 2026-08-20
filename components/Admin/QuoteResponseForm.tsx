"use client";

import { useState } from "react";

export default function QuoteResponseForm({ quoteId, existingResponse }: { quoteId: string; existingResponse?: string }) {
  const [response, setResponse] = useState(existingResponse || "");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`/api/quotes/${quoteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      });
      if (!res.ok) throw new Error();
      alert("Response saved");
    } catch {
      alert("Failed to send response");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block text-cream-dim text-xs mb-1">Internal Note / Response</label>
      <textarea value={response} onChange={(e) => setResponse(e.target.value)} className="w-full p-2 rounded border bg-ink text-cream text-sm" style={{ borderColor: "var(--border-strong)" }} rows={3} placeholder="Log what you told the customer, or notes for the team" />
      <button type="submit" disabled={sending} className="mt-2 btn-gold text-xs disabled:opacity-60">{sending ? "Saving..." : "Save Response"}</button>
    </form>
  );
}