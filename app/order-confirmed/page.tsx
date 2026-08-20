// app/order-confirmed/page.tsx
import dbConnect from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import ClearCartOnConfirm from "@/components/ClearCartOnConfirm";

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  await dbConnect();

  let order = null;
  if (orderId) {
    try {
      order = await Order.findById(orderId).lean();
    } catch {
      order = null;
    }
  }

  const isPaid = order?.status === "paid";

  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      {isPaid && <ClearCartOnConfirm />}
      <CheckCircle className="w-14 h-14 text-gold mx-auto mb-6" />
      <h1 className="font-display text-3xl md:text-4xl font-medium text-cream mb-4">
        {isPaid ? "Payment Confirmed" : order ? "Order Received" : "Order Not Found"}
      </h1>
      <p className="text-cream-dim text-sm max-w-md mx-auto">
        {isPaid
          ? "Thank you — your payment went through. Our atelier will begin preparing your piece and will follow up by email with next steps."
          : order
          ? "We're still confirming this order. If you completed payment, check your email for a receipt from Flutterwave — this page should reflect it shortly."
          : "We couldn't find this order. If you completed a payment, check your email for confirmation, or contact us directly."}
      </p>
      {order && (
        <div className="mt-8 text-left inline-block bg-panel-2 border rounded-lg p-6" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs text-cream-dim mb-1">Order Reference</p>
          <p className="font-mono text-sm text-cream mb-4">{order._id.toString()}</p>
          <p className="text-xs text-cream-dim mb-1">Amount</p>
          <p className="font-mono text-sm text-gold">{formatCurrency(order.subtotal)}</p>
        </div>
      )}
    </main>
  );
}