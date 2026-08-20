"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogFormProps {
  blog?: { _id: string; title: string; author: string; excerpt?: string; content: string; imageUrl?: string } | null;
}

export default function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(blog?.title || "");
  const [author, setAuthor] = useState(blog?.author || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [content, setContent] = useState(blog?.content || "");
  const [imageUrl, setImageUrl] = useState(blog?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setImageUrl(data.url);
    } catch {
      setError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const method = blog?._id ? "PUT" : "POST";
      const url = blog?._id ? `/api/blogs/${blog._id}` : "/api/blogs";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, excerpt, content, imageUrl }),
      });
      if (!res.ok) throw new Error();
      router.push("/admin/blogs");
      router.refresh();
    } catch {
      setError("Error saving blog. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-panel-2 border p-6 rounded-lg" style={{ borderColor: "var(--border)" }}>
      <div>
        <label className="block font-semibold mb-1 text-sm text-cream">Title</label>
        <input type="text" className="w-full border rounded px-3 py-2 bg-ink text-cream" style={{ borderColor: "var(--border-strong)" }} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block font-semibold mb-1 text-sm text-cream">Author</label>
        <input type="text" className="w-full border rounded px-3 py-2 bg-ink text-cream" style={{ borderColor: "var(--border-strong)" }} value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div>
        <label className="block font-semibold mb-1 text-sm text-cream">Excerpt</label>
        <textarea className="w-full border rounded px-3 py-2 bg-ink text-cream" style={{ borderColor: "var(--border-strong)" }} rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>
      <div>
        <label className="block font-semibold mb-1 text-sm text-cream">Content (HTML allowed)</label>
        <textarea className="w-full border rounded px-3 py-2 bg-ink text-cream font-mono text-sm" style={{ borderColor: "var(--border-strong)" }} rows={10} value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label className="block font-semibold mb-1 text-sm text-cream">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {uploading && <p className="text-xs text-cream-dim mt-1">Uploading...</p>}
        {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded" />}
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button type="submit" disabled={loading || uploading} className="btn-gold disabled:opacity-60">
        {loading ? "Saving..." : blog?._id ? "Update Blog" : "Create Blog"}
      </button>
    </form>
  );
}