import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  TreePine,
} from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const quick = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/atelier", label: "Atelier" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md border border-line-strong text-gold">
              <TreePine size={16} />
            </span>
            <span className="font-display text-2xl text-cream">
              Wood Craft <span className="italic text-gold">&amp; Design</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-dim">
            We carve functional art. Traditional mortise-and-tenon joinery using
            certified sustainable American hardwoods. Crafted individually, made
            for lifetimes.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-cream-dim transition-colors hover:border-gold hover:text-gold"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="eyebrow">Quick Links</p>
          <ul className="mt-5 space-y-2.5">
            {quick.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream-dim transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <p className="eyebrow">Contact Info</p>
          <ul className="mt-5 space-y-3 text-sm text-cream-dim">
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-gold" /> +234 (806) 250-4545
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-gold" />{" "}
              studio@woodcraftdesign.com
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-0.5 text-gold" />
              34 Crescent, 3rd Avenue, Gwarinpa, Abuja
            </li>
          </ul>
          <p className="eyebrow mt-8">Stay Updated</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[11px] uppercase tracking-[0.16em] text-cream-dim/70 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} Wood Craft &amp; Design. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms of Service
            </Link>
            <Link
              href="/philosophy"
              className="transition-colors hover:text-gold"
            >
              Timber Sourcing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
