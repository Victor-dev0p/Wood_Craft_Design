import type { Metadata } from "next";
import CollectionGrid from "@/components/CollectionGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Collection",
  description: "Browse the full Wood Craft & Design collection of dining, seating, storage, and tables.",
};

export default function CollectionPage() {
  return (
    <section className="pt-32 pb-24">
      <SectionHeading
        eyebrow="The Atelier Catalog"
        title="The"
        accent="Collection"
        copy="Every piece is made to order in Portland. Lead times are honest, woods are named, and prices include delivery west of the Rockies."
      />
      <div className="mx-auto mt-14 max-w-7xl px-5 md:px-8">
        <CollectionGrid />
      </div>
    </section>
  );
}
