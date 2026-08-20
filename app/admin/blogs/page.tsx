"use client";

import { useEffect, useState } from "react";
import BlogForm from "@/components/Admin/BlogForm";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Blog { _id: string; title: string; author: string; excerpt?: string; content: string; imageUrl?: string; }

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      setBlogs(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cream">Manage Blogs</h1>
        <button onClick={() => { setSelectedBlog(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2 btn-gold">
          <Plus className="w-5 h-5" /> New Blog
        </button>
      </div>

      {showForm ? (
        <BlogForm blog={selectedBlog} />
      ) : loading ? (
        <p className="text-cream-dim">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-cream-dim">No blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-panel-2 border p-4 rounded-lg flex flex-col" style={{ borderColor: "var(--border)" }}>
              {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-full h-40 object-cover rounded mb-3" />}
              <h2 className="font-semibold text-lg text-cream">{blog.title}</h2>
              <p className="text-sm text-cream-dim line-clamp-3">{blog.excerpt || blog.content.replace(/<[^>]*>/g, "").slice(0, 120)}...</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => { setSelectedBlog(blog); setShowForm(true); }} className="p-2 bg-green-600 text-white rounded hover:bg-green-700"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-600 text-white rounded hover:bg-red-700"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}