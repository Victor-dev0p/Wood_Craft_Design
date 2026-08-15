import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { Piece } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function PieceCard({ piece }: { piece: Piece }) {
  return (
    <article className="group hairline overflow-hidden rounded-xl bg-panel">
      <Link href={`/collection/${piece.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={piece.image}
            alt={piece.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <p className="text-[10px] uppercase tracking-[0.22em] text-gold/80">{piece.wood}</p>
          <h3 className="mt-2 font-display text-2xl text-cream">{piece.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cream-dim">{piece.tagline}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-gold">{formatCurrency(piece.price)}</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-cream-dim">
              <Eye size={13} /> View
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
