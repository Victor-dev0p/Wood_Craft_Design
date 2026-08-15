"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  return (
    <div>
      <div className="hairline mx-auto max-w-3xl rounded-2xl bg-panel p-6 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 md:mx-0">
            <Image src={t.image} alt={t.name} fill className="object-cover" />
          </div>
          <div>
            <div className="flex gap-1 text-gold">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="mt-3 font-display text-2xl leading-snug text-cream md:text-[1.7rem]">
              “{t.quote}”
            </p>
            <p className="mt-4 text-sm font-medium text-cream">{t.name}</p>
            <p className="text-xs text-cream-dim">
              {t.city} — {t.piece}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-cream-dim hover:text-gold"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-cream-dim/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-cream-dim hover:text-gold"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
