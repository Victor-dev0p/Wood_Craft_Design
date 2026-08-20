import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import AuthorMeta from "@/components/Admin/AuthorMeta";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();

  let blog;
  try {
    blog = await Blog.findById(id).lean();
  } catch {
    notFound();
  }
  if (!blog) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-medium text-cream mb-2">{blog.title}</h1>
      <AuthorMeta author={blog.author || "Unknown Author"} date={blog.createdAt || new Date()} />
      {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto object-cover rounded my-6" />}
      {blog.excerpt && <p className="text-xl italic text-cream-dim mb-6">{blog.excerpt}</p>}
      <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  try {
    const blog = await Blog.findById(id).select("title excerpt").lean();
    if (!blog) return { title: "Blog Post Not Found" };
    return { title: blog.title, description: blog.excerpt || "Read this post on Wood Craft & Design" };
  } catch {
    return { title: "Blog Post — Wood Craft & Design" };
  }
}