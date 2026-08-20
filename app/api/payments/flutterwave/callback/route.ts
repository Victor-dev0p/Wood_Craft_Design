import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { verifyFlutterwaveTransaction } from "@/lib/flutterwave";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status");
  const txRef = req.nextUrl.searchParams.get("tx_ref");
  const transactionId = req.nextUrl.searchParams.get("transaction_id");
  const origin = req.nextUrl.origin;

  if (status !== "successful" || !transactionId || !txRef) {
    return NextResponse.redirect(`${origin}/cart?payment=failed`);
  }

  const verification = await verifyFlutterwaveTransaction(transactionId);
  const isVerified =
    verification?.data?.status === "successful" && verification?.data?.tx_ref === txRef;

  if (!isVerified) return NextResponse.redirect(`${origin}/cart?payment=failed`);

  await dbConnect();
  await Order.findByIdAndUpdate(txRef, { status: "paid", paymentReference: transactionId });

  return NextResponse.redirect(`${origin}/order-confirmed?order=${txRef}`);
}