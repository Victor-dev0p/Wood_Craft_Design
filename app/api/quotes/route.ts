import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";
import nodemailer from "nodemailer";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (transporter) return transporter;
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) return null;
  transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
  return transporter;
}

async function sendNotifications(inquiry: any) {
  const t = getTransporter();
  if (!t) return;

  const typeLabel = inquiry.type === "commission" ? "New Commission" : inquiry.type === "upgrade" ? "Upgrade Request" : "Cart Quote Request";

  t.sendMail({
    from: `"Wood Craft & Design" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `${typeLabel} — ${inquiry.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>${typeLabel}</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        ${inquiry.archetype ? `<p><strong>Archetype:</strong> ${inquiry.archetype}</p>` : ""}
        ${inquiry.material ? `<p><strong>Material:</strong> ${inquiry.material}</p>` : ""}
        ${inquiry.pieceOwned ? `<p><strong>Piece Owned:</strong> ${inquiry.pieceOwned}</p>` : ""}
        ${inquiry.orderReference ? `<p><strong>Order Reference:</strong> ${inquiry.orderReference}</p>` : ""}
        ${inquiry.items?.length ? `<p><strong>Items:</strong> ${inquiry.items.map((i: any) => `${i.name} × ${i.quantity}`).join(", ")}</p>` : ""}
        ${inquiry.message ? `<p><strong>Message:</strong><br/>${inquiry.message}</p>` : ""}
      </div>
    `,
  }).catch((err) => console.error("Admin notification failed:", err));

  t.sendMail({
    from: `"Wood Craft & Design" <${process.env.EMAIL_USER}>`,
    to: inquiry.email,
    subject: "We received your request — Wood Craft & Design",
    html: `<div style="font-family: Arial, sans-serif;"><h2>Thank you, ${inquiry.name}!</h2><p>We've received your request and will follow up within 24–48 hours.</p></div>`,
  }).catch((err) => console.error("Client confirmation failed:", err));
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email } = body;
    if (!name || !email) return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: "Invalid email format." }, { status: 400 });

    const inquiry = await Inquiry.create(body);
    sendNotifications(inquiry);

    return NextResponse.json(inquiry, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  return NextResponse.json(inquiries);
}