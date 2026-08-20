import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  await dbConnect();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-medium text-cream mb-10 text-center">The Journal</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-cream-dim">No posts yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <div key={blog._id.toString()} className="bg-panel-2 border rounded-lg overflow-hidden flex flex-col" style={{ borderColor: "var(--border)" }}>
              {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="h-48 w-full object-cover" />}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-xl font-semibold text-cream mb-2">{blog.title}</h2>
                {blog.excerpt && <p className="text-cream-dim mb-4 line-clamp-3 text-sm">{blog.excerpt}</p>}
                <div className="text-xs text-cream-dim mb-4">
                  {blog.author && <span>By {blog.author}</span>}
                  {blog.createdAt && <span className="ml-2">• {new Date(blog.createdAt).toLocaleDateString()}</span>}
                </div>
                <div className="mt-auto">
                  <Link href={`/blogs/${blog._id}`} className="inline-block px-4 py-2 btn-gold text-xs">Continue Reading</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}