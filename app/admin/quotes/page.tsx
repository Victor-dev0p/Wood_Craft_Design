import dbConnect from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";
import QuotesList from "./QuotesList";

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  await dbConnect();
  const raw = await Inquiry.find().sort({ createdAt: -1 }).lean();
  const inquiries = raw.map((q: any) => ({ ...q, _id: q._id.toString(), createdAt: q.createdAt?.toISOString() || null }));

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cream">Quote Requests</h1>
        <div className="text-sm text-cream-dim">Total: {inquiries.length}</div>
      </div>
      <QuotesList quotes={inquiries} />
    </div>
  );
}