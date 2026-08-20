import Link from "next/link";

export default function CTASection() {
  return (
    <section
      className="relative flex min-h-80 items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/design1.jpg')" }}
    >
      {/* Always use a dark overlay since the photo is dark — ensures readability in both themes */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl text-white md:text-4xl">
            Ready to Build with Us?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Have a question, custom order, or project in mind? We&apos;d love to
            hear from you.
          </p>
          <Link href="/contact" className="btn-gold mt-6 inline-flex">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
