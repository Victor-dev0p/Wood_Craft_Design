import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl">This piece was never made.</h1>
      <p className="mt-4 max-w-md text-sm text-cream-dim">
        The page you are looking for does not live in the atelier. Return to the collection, or write to us.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/collection" className="btn-gold">
          Browse Collection
        </Link>
        <Link href="/" className="btn-ghost">
          Home
        </Link>
      </div>
    </section>
  );
}
