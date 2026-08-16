"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Unable to subscribe");
      setStatus("ok");
      setMessage("Welcome to the atelier list.");
      setEmail("");
    } catch (err) {
      setStatus("err");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex max-w-md gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="h-10 flex-1 rounded-md border  dark:bg-[#8b674e] px-3 text-sm text-cream outline-none placeholder:text-cream-dim focus:border-gold"
      />
      <button type="submit" disabled={status === "loading"} className="btn-gold h-10 px-4">
        {status === "loading" ? "…" : "Subscribe"}
      </button>
      {message && (
        <span className="sr-only" role="status">
          {message}
        </span>
      )}
    </form>
  );
}
