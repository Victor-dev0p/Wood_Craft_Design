import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Atelier",
  description: "Visit the Portland atelier of Wood Craft & Design.",
};

const timeline = [
  { year: "2013", title: "A rented bay in Sellwood", copy: "Two benches, a bandsaw, and a first commission — a cherry dining table that is still in daily use." },
  { year: "2016", title: "The Woodsmith Lane shop", copy: "We moved into a timber-framed warehouse on the east bank and hired our first two apprentices." },
  { year: "2019", title: "FSC chain of custody", copy: "Every board that enters the shop is now documented from forest to finish." },
  { year: "2024", title: "Three hundred and forty pieces", copy: "Tables, chairs, beds, and consoles living in homes from Portland to the Palisades." },
];

export default function AtelierPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <SectionHeading
          eyebrow="The Shop"
          title="A Portland"
          accent="Atelier"
          copy="We work in a timber-framed warehouse on Woodsmith Lane. Visitors are welcome by appointment — the smell of walnut and tung oil is part of the tour."
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 md:grid-cols-3 md:px-8">
        {["/images/workshop.jpg", "/images/joinery.jpg", "/images/maker.jpg"].map((src) => (
          <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={src} alt="Inside the Wood Craft atelier" fill className="object-cover" />
          </div>
        ))}
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-4xl">How a piece is made</h2>
          <ol className="mt-10 space-y-8">
            {[
              ["Conversation", "We start with the room, not the catalog. Dimensions, light, how you gather."],
              ["Timber", "Boards are selected together when possible. We photograph the stack before milling."],
              ["Joinery", "Every joint is cut by the maker who will sign the underside of the piece."],
              ["Finish", "Six to eight coats of oil, a week of curing, then a final hand-rub."],
              ["Delivery", "We deliver and place the piece ourselves west of the Rockies. Further afield, we crate and insure."],
            ].map(([title, copy], i) => (
              <li key={title} className="grid grid-cols-[auto_1fr] gap-5">
                <span className="font-display text-3xl text-gold">0{i + 1}</span>
                <div>
                  <p className="text-lg text-cream">{title}</p>
                  <p className="mt-1 text-sm text-cream-dim">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-4xl">A short history</h2>
          <div className="mt-10 space-y-8">
            {timeline.map((item) => (
              <div key={item.year} className="grid grid-cols-[5rem_1fr] gap-6">
                <p className="font-display text-2xl text-gold">{item.year}</p>
                <div>
                  <p className="text-cream">{item.title}</p>
                  <p className="mt-1 text-sm text-cream-dim">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/quote" className="btn-gold mt-12">
            Commission a visit
          </Link>
        </div>
      </section>
    </>
  );
}
