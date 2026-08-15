import { NextResponse } from "next/server";
import { ensureSchema, getDb } from "@/lib/db";
import { newsletter } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    await ensureSchema();
    const db = getDb();
    await db.insert(newsletter).values({
      email,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.toLowerCase().includes("unique")) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Unable to subscribe just now." }, { status: 500 });
  }
}
