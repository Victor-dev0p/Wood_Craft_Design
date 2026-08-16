"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, TreePine, ShoppingBag } from "lucide-react";
import { useEffect, useState, startTransition } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "./CartContext";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/collection", label: "Collection" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/atelier", label: "Atelier" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Wrapped in startTransition to avoid synchronous setState in effect
  useEffect(() => {
    startTransition(() => {
      setOpen(false);
    });
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || open
          ? "bg-ink/90 backdrop-blur-xl border-b border-line"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-line-strong text-gold">
            <TreePine size={16} />
          </span>
          <span className="font-display text-[1.35rem] leading-none tracking-tight text-cream">
            Wood Craft <span className="italic text-gold">&amp; Design</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.78rem] tracking-[0.16em] uppercase transition-colors",
                pathname.startsWith(link.href)
                  ? "text-gold"
                  : "text-cream-dim hover:text-cream",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={openCart}
            className="relative grid h-9 w-9 place-items-center rounded-full border transition-colors hover:bg-gold/10"
            style={{ borderColor: "var(--border-strong)" }}
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4 text-cream" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4.5 w-4.5 place-items-center rounded-full bg-gold text-[9px] font-bold text-[#2a1c10]">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/quote"
            className="hidden md:inline-flex h-9 items-center rounded-full border border-line-strong px-4 text-[0.68rem] uppercase tracking-[0.18em] text-cream-dim hover:border-gold hover:text-gold transition-colors"
          >
            Get a Quote
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-cream md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-ink/95 px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-3xl text-cream"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/quote" className="btn-gold mt-2 w-fit">
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
