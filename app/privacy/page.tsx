import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 pt-32 pb-24 md:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-5xl">Privacy Policy</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-cream-dim">
        <p>
          Wood Craft &amp; Design collects only what is needed to answer an inquiry, fulfill a
          commission, or send the atelier letter. We do not sell names, and we do not share
          addresses with anyone outside the shop.
        </p>
        <p>
          Inquiry, quote, and newsletter records are stored in our workshop database. You may
          write to studio@woodcraftdesign.com at any time to review or delete what we hold.
        </p>
        <p>
          This site uses no advertising cookies. Essential session storage is used only to keep
          forms from being submitted twice.
        </p>
      </div>
    </article>
  );
}
