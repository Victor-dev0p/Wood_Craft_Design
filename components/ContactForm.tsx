"use client";

import { FormEvent, useState } from "react";
import { Mail, Send, Type, User } from "lucide-react";

const fields = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Rowan Sterling", icon: User, auto: "name" },
  { name: "email", label: "Email Address", type: "email", placeholder: "rowan@example.com", icon: Mail, auto: "email" },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Unable to send");
      setStatus("ok");
      setMessage("Message received. We will write back within two business days.");
      form.reset();
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="hairline rounded-2xl bg-panel/70 p-5 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">
              {field.label}
            </span>
            <span className="relative block">
              <field.icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/80" />
              <input
                name={field.name}
                type={field.type}
                required
                autoComplete={field.auto}
                placeholder={field.placeholder}
                className="input-field"
              />
            </span>
          </label>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">Subject</span>
        <span className="relative block">
          <Type size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/80" />
          <input name="subject" required placeholder="Custom dining table inquiry" className="input-field" />
        </span>
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.18em] text-cream-dim">Message</span>
        <span className="relative block">
          <Mail size={14} className="absolute left-3 top-4 text-gold/80" />
          <textarea
            name="message"
            required
            placeholder="Tell us about your project, preferred wood type, dimensions, or any questions you have…"
            className="input-field"
          />
        </span>
      </label>

      <button type="submit" disabled={status === "loading"} className="btn-gold mt-6">
        <Send size={13} />
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {message && (
        <p className={`mt-4 text-sm ${status === "ok" ? "text-gold" : "text-blush"}`}>{message}</p>
      )}
    </form>
  );
}
