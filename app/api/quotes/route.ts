import { NextResponse } from "next/server";
import { ensureSchema, getDb } from "@/lib/db";
import { quotes } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      category?: string;
      wood?: string;
      dimensions?: string;
      budget?: string;
      notes?: string;
    };

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const category = body.category?.trim() ?? "";
    const wood = body.wood?.trim() ?? "";

    if (!name || !email || !category || !wood) {
      return NextResponse.json({ error: "Name, email, category, and wood are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    await ensureSchema();
    const db = getDb();
    await db.insert(quotes).values({
      name,
      email,
      phone: body.phone?.trim() || null,
      category,
      wood,
      dimensions: body.dimensions?.trim() || null,
      budget: body.budget?.trim() || null,
      notes: body.notes?.trim() || null,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "The atelier could not receive this request." }, { status: 500 });
  }
}
