import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to the Portland atelier of Wood Craft & Design.",
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Contact"
        accent="Us"
        copy="Have a question about a piece, want to discuss a custom commission, or just want to say hello? We’d love to hear from you."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div className="space-y-5">
          {[
            { icon: Phone, label: "Studio", value: "+1 (503) 555-0147" },
            { icon: Mail, label: "Email", value: "studio@woodcraftdesign.com" },
            { icon: MapPin, label: "Atelier", value: "104 Woodsmith Lane, Portland, OR 97201" },
          ].map((item) => (
            <div key={item.label} className="hairline flex gap-4 rounded-2xl bg-panel p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold">
                <item.icon size={16} />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-cream-dim">{item.label}</p>
                <p className="mt-1 text-cream">{item.value}</p>
              </div>
            </div>
          ))}
          <p className="text-sm leading-relaxed text-cream-dim">
            The shop is open Tuesday through Friday, 10–4, by appointment. Saturday visits are
            reserved for collectors reviewing timber.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
