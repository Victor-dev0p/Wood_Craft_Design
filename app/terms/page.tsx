import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 pt-32 pb-24 md:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-5xl">Terms of Service</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-cream-dim">
        <p>
          Every piece is made to order. A fifty-percent deposit reserves timber and bench time;
          the balance is due before delivery. Lead times on this site are estimates and will be
          confirmed in writing.
        </p>
        <p>
          Solid wood moves. Seasonal checking under a quarter-inch is considered the nature of
          the material, not a defect. We will repair structural failure for the life of the
          original owner.
        </p>
        <p>
          Commissions are not cancellable once milling has begun. Deposits on unstarted work may
          be refunded less the cost of reserved timber.
        </p>
      </div>
    </article>
  );
}
