export default function AuthorMeta({ author, date }: { author: string; date: string | Date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <p className="text-sm text-cream-dim mt-2">
      <span className="font-semibold text-gold">{author}</span>{" — Published "}{formattedDate}
    </p>
  );
}