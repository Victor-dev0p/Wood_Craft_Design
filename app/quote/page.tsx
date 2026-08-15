import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Commission a made-to-order piece from Wood Craft & Design.",
};

export default function QuotePage() {
  return (
    <section className="pt-32 pb-24">
      <SectionHeading
        eyebrow="Commissions"
        title="Request a"
        accent="Quote"
        copy="Tell us about the room and the piece you imagine. A maker will reply with lead time, timber options, and a considered price — never a high-pressure follow-up."
      />
      <div className="mx-auto mt-12 max-w-3xl px-5 md:px-8">
        <QuoteForm />
      </div>
    </section>
  );
}
