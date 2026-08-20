import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { title, author, excerpt, content, imageUrl } = await req.json();
    if (!title || !author || !content) {
      return NextResponse.json({ error: "Title, author, and content are required." }, { status: 400 });
    }
    const blog = await Blog.create({ title, author, excerpt, content, imageUrl });
    return NextResponse.json(blog, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create blog." }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json(blogs);
}