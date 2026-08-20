// app/api/orders/[id]/pay/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { initiateFlutterwavePayment } from "@/lib/flutterwave";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const order = await Order.findById(id);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const link = await initiateFlutterwavePayment({
      orderId: order._id.toString(),
      amount: order.subtotal,
      email: order.email,
      name: order.name,
      redirectUrl: `${req.nextUrl.origin}/api/payments/flutterwave/callback`,
    });

    order.paymentProvider = "flutterwave";
    await order.save();

    return NextResponse.json({ link });
  } catch (err) {
    console.error("Flutterwave initiation failed:", err);
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}