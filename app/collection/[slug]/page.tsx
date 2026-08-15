import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPiece, pieces, relatedPieces } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import PieceCard from "@/components/PieceCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pieces.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) return { title: "Piece" };
  return { title: piece.name, description: piece.tagline };
}

export default async function PiecePage({ params }: Props) {
  const { slug } = await params;
  const piece = getPiece(slug);
  if (!piece) notFound();
  const related = relatedPieces(piece.slug);

  return (
    <article className="pt-28 pb-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={piece.gallery[0]} alt={piece.name} fill priority className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {piece.gallery.slice(1, 4).map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{piece.wood}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight">{piece.name}</h1>
          <p className="mt-4 text-sm leading-relaxed text-cream-dim">{piece.description}</p>
          <p className="mt-6 font-display text-4xl text-gold">{formatCurrency(piece.price)}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream-dim">
            Made to order · {piece.leadWeeks}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            {[
              ["Dimensions", piece.dimensions],
              ["Weight", piece.weight],
              ["Finish", piece.finish],
              ["Origin", piece.origin],
            ].map(([k, v]) => (
              <div key={k} className="hairline rounded-xl bg-panel p-4">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-cream-dim">{k}</dt>
                <dd className="mt-1 text-cream">{v}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-2 text-sm text-cream-dim">
            {piece.details.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/quote?piece=${piece.slug}`} className="btn-gold">
              Commission this piece
            </Link>
            <Link href="/contact" className="btn-ghost">
              Ask a question
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <h2 className="font-display text-3xl">You may also consider</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <PieceCard key={p.slug} piece={p} />
          ))}
        </div>
      </div>
    </article>
  );
}
