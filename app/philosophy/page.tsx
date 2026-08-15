import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { woods } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Philosophy",
  description: "How Wood Craft & Design sources timber, cuts joinery, and finishes every piece.",
};

const pillars = [
  {
    title: "Source with patience",
    copy: "We buy only from FSC-certified mills and small family forests in the Pacific Northwest and the Midwest. Trees are selected after they have completed their natural life — never from clear-cut stands.",
    image: "/images/forest.jpg",
  },
  {
    title: "Join by hand",
    copy: "Mortise-and-tenon, dovetail, and wedged through-tenons are cut at the bench. Glue is hide or fish, reversible. Hardware appears only where it extends the life of a moving part.",
    image: "/images/joinery.jpg",
  },
  {
    title: "Finish for decades",
    copy: "Plant oils and hardwaxes soak into the fiber rather than sitting on it. A scratch can be sanded out and oiled in an afternoon. We send a tin of the original finish with every delivery.",
    image: "/images/oil-finish.jpg",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20">
        <Image src="/images/workshop.jpg" alt="" fill className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 to-ink" />
        <div className="relative">
          <SectionHeading
            eyebrow="An Absolute Standard"
            title="Our Architectural"
            accent="Wood Philosophy"
            copy="Wood has a memory. It contracts and expands with climate, seasons, and the breath of a room. We treat it not as dead timber, but as a responsive medium."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-20 px-5 pb-24 md:px-8">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={pillar.image} alt={pillar.title} fill className="object-cover" />
            </div>
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="mt-3 font-display text-4xl">{pillar.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-cream-dim">{pillar.copy}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="border-t border-line py-20">
        <SectionHeading
          title="The"
          accent="Woods"
          copy="Four species, chosen for character rather than fashion. Each board is numbered in the shop so a table and its chairs can be grain-matched years later."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-4 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {woods.map((wood) => (
            <div key={wood.name} className="hairline rounded-2xl bg-panel p-6">
              <p className="font-display text-2xl text-gold">{wood.name}</p>
              <p className="mt-3 text-sm text-cream-dim">{wood.tone}</p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-cream-dim">{wood.origin}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-cream-dim">{wood.hardness}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/collection" className="btn-gold">
            See the woods in the collection
          </Link>
        </div>
      </section>
    </>
  );
}
