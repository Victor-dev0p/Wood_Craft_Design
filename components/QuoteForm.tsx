"use client";

import { FormEvent, useState } from "react";

const woods = ["Dark Walnut", "White Oak", "Black Cherry", "Pacific Maple", "Not sure yet"];
const categories = ["Dining", "Seating", "Consoles & Coffee", "Storage", "Custom commission"];
const budgets = ["Under $3,000", "$3,000–$6,000", "$6,000–$10,000", "$10,000+"];

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Unable to send");
      setStatus("ok");
      setMessage("Quote request received. A maker will be in touch within two business days.");
      form.reset();
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="hairline rounded-2xl bg-panel/70 p-5 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full Name" name="name" required placeholder="Your name" />
        <Field label="Email" name="email" type="email" required placeholder="you@studio.com" />
        <Field label="Phone" name="phone" placeholder="Optional" />
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">Category</span>
          <select name="category" required className="input-field pl-3!">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">Preferred Wood</span>
          <select name="wood" required className="input-field pl-3!">
            {woods.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">Budget</span>
          <select name="budget" className="input-field pl-3!">
            {budgets.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <Field label="Dimensions" name="dimensions" placeholder="e.g. 96&quot; × 40&quot; dining table, seats 10" />
      <label className="mt-4 block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">Notes</span>
        <textarea
          name="notes"
          placeholder="Tell us about the room, the wood you love, and how the piece should live."
          className="input-field pl-3!"
        />
      </label>
      <button type="submit" disabled={status === "loading"} className="btn-gold mt-6">
        {status === "loading" ? "Sending…" : "Request a Quote"}
      </button>
      {message && (
        <p className={`mt-4 text-sm ${status === "ok" ? "text-gold" : "text-blush"}`}>{message}</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="mt-4 block first:mt-0">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="input-field pl-3!" />
    </label>
  );
}
