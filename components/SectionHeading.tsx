export default function SectionHeading({
  eyebrow,
  title,
  accent,
  copy,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  copy?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
        {title} {accent && <span className="italic text-gold">{accent}</span>}
      </h2>
      <div className="gold-rule mt-4" />
      {copy && <p className="mt-5 text-sm leading-relaxed text-cream-dim md:text-[15px]">{copy}</p>}
    </div>
  );
}
