import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CollectionGrid from "@/components/CollectionGrid";
import PhilosophyAccordion from "@/components/PhilosophyAccordion";
import SectionHeading from "@/components/SectionHeading";
import Testimonials from "@/components/Testimonials";
import { clientStats, stats } from "@/lib/data";
import CTASection from "@/components/CTASection";
import Customizer from "@/components/Customizer";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 grid-overlay" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 md:grid-cols-2 md:px-8 md:pb-28">
          <div>
            <p className="eyebrow">Sustainable Artistry</p>
            <h1 className="mt-4 font-display text-[3.4rem] leading-[0.95] tracking-tight md:text-[5.1rem]">
              The Soul of
              <br />
              Living Timber.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream-dim md:text-[15px]">
              Bespoke, hand-jointed solid wood tables, seating, and storage.
              Sculpted to preserve deep, natural grains, made with certified
              sustainable old-growth woods, designed to pass down generations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/collection" className="btn-gold">
                Browse Collection <ArrowRight size={14} />
              </Link>
              <Link href="/philosophy" className="btn-ghost">
                Our Philosophy
              </Link>
            </div>
          </div>
          <div className="hairline relative overflow-hidden rounded-2xl p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="/images/hero-dining.jpg"
                alt="Solid walnut dining table in a sunlit Portland dining room"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <SectionHeading
          title="About"
          accent="Wood Craft & Design"
          copy="At Wood Craft & Design, we blend traditional mortise-and-tenon joinery with contemporary aesthetics to create bespoke solid wood furniture that speaks to your space. From timber selection to final oil finish, our craft reflects heritage, comfort, and timeless artistry."
        />
        <div className="mt-8 flex justify-center">
          <Link href="/atelier" className="btn-gold">
            Learn More About Us
          </Link>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl text-gold md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-cream-dim">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <SectionHeading
          eyebrow="Curated Craftsmanship"
          title="Our"
          accent="Portfolio"
          copy="Explore our diverse range of handcrafted solid wood pieces spanning dining, seating, and storage — each made to order in our Portland atelier."
        />
        <h3 className="mt-14 text-center font-display text-3xl">
          Featured Collection
        </h3>
        <div className="mx-auto mt-8 max-w-7xl px-5 md:px-8">
          <CollectionGrid featuredOnly />
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <Image
          src="/images/wood-grain.jpg"
          alt=""
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#c9a57a]/70 via-[#b08a5c]/75 to-[#1a1410]" />
        <div className="relative mx-auto max-w-2xl px-5 text-center">
          <h2 className="font-display text-4xl md:text-5xl">
            Ready to Transform Your Space?
          </h2>
          <p className="mt-3 text-sm text-ink/80">
            Let’s create something beautiful together.
          </p>
          <Link
            href="/quote"
            className="mt-8 inline-flex rounded-md bg-cream px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-[#92755b]"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
      <Customizer />
      <section className="border-t border-line bg-[#1d1510] py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 md:grid-cols-2 md:px-8">
          <div>
            <p className="eyebrow ">An Absolute Standard</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl text-[#ffffff]">
              Our Architectural Wood
              <br />
              Philosophy
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#ffffff]">
              Wood has a memory. It contracts and expands with climate, seasons,
              and breaths of the room. We treat wood not as dead timber, but as
              a responsive medium.
            </p>
          </div>
          <PhilosophyAccordion />
        </div>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <SectionHeading
          title="What Our Clients"
          accent="Say"
          copy="Don’t take our word for it. Here’s what our collectors across the Pacific Northwest have to say about their bespoke pieces."
        />
        <div className="mt-12 px-5">
          <Testimonials />
        </div>
        <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-r from-[#c9a57a] to-[#e0c19a] px-4 py-8 text-[#2a1c10] md:px-8">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
            {clientStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] opacity-70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
