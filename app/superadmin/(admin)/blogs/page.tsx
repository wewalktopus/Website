'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff, Globe, FileText, ImagePlus } from 'lucide-react';
import type { BlogPost } from '@/types';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [preview, setPreview] = useState(false);
  const [filter, setFilter] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    const params = filter ? `?status=${filter}` : '';
    const res = await fetch(`/api/admin/blogs${params}`);
    const data = await res.json();
    setBlogs(data.blogs ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, [filter]);

  const handleSave = async (publish = false) => {
    if (!editing?.title || !editing?.content) return;
    setSaving(true);

    const payload = {
      title: editing.title,
      excerpt: editing.excerpt ?? '',
      content: editing.content,
      imageUrl: editing.imageUrl ?? '',
      status: publish ? 'published' : (editing.status ?? 'draft'),
    };

    const isNew = !editing.id;
    const url = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${editing.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    await fetchBlogs();
    if (isNew) {
      const data = await res.json();
      setEditing(null);
    } else {
      setEditing(null);
    }
    setSaving(false);
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const toggleStatus = async (blog: BlogPost) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    await fetch(`/api/admin/blogs/${blog.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, status: newStatus } : b));
  };

  const editBlog = async (id: string) => {
    const res = await fetch(`/api/admin/blogs/${id}`);
    const data = await res.json();
    setEditing(data.blog);
  };

  const uploadImage = async (file: File) => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.set('file', file);

    try {
      const res = await fetch('/api/admin/blogs/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      setEditing((prev) => ({ ...prev, imageUrl: data.imageUrl }));
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const publishedCount = blogs.filter(b => b.status === 'published').length;
  const draftCount = blogs.filter(b => b.status === 'draft').length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      {!editing && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Posts', value: blogs.length },
            { label: 'Published', value: publishedCount },
            { label: 'Drafts', value: draftCount },
          ].map(s => (
            <div key={s.label} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      {!editing && (
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-orange-500/50"
          >
            <option value="">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
          <div className="flex-1" />
          <button
            onClick={() => setEditing({ title: '', excerpt: '', content: '', status: 'draft', imageUrl: '' })}
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus size={15} /> New Post
          </button>
        </div>
      )}

      {/* Editor */}
      {editing && (
        <div className="bg-[#1a1a1a] border border-orange-500/20 rounded-xl overflow-hidden">
          {/* Editor header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">{editing.id ? 'Edit Post' : 'New Blog Post'}</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreview(p => !p)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-400 text-xs rounded-lg transition-colors"
              >
                {preview ? <EyeOff size={13} /> : <Eye size={13} />}
                {preview ? 'Edit' : 'Preview'}
              </button>
              <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Title *</label>
              <input
                value={editing.title ?? ''}
                onChange={e => setEditing(p => ({ ...p, title: e.target.value }))}
                placeholder="Post title…"
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors text-base font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Excerpt (for blog listing)</label>
              <textarea
                value={editing.excerpt ?? ''}
                onChange={e => setEditing(p => ({ ...p, excerpt: e.target.value }))}
                placeholder="Short description shown in blog listing…"
                rows={2}
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Image Link (optional)</label>
              <div className="grid sm:grid-cols-[1fr_auto] gap-2">
                <input
                  value={editing.imageUrl ?? ''}
                  onChange={e => setEditing(p => ({ ...p, imageUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                />
                <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-gray-300 cursor-pointer transition-colors">
                  <ImagePlus size={13} />
                  {uploadingImage ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingImage}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        void uploadImage(file);
                      }
                    }}
                  />
                </label>
              </div>
              {editing.imageUrl ? (
                <img src={editing.imageUrl} alt="Blog" className="mt-2 h-28 w-auto rounded-lg border border-white/10 object-cover" />
              ) : null}
              <p className="mt-1 text-[11px] text-gray-600">Upload uses the same ImgBB API integration as logos.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Content * (HTML supported)</label>
              {preview ? (
                <div
                  className="min-h-96 p-6 bg-white rounded-lg text-gray-900 text-sm leading-relaxed overflow-auto prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: editing.content ?? '' }}
                />
              ) : (
                <textarea
                  value={editing.content ?? ''}
                  onChange={e => setEditing(p => ({ ...p, content: e.target.value }))}
                  placeholder="Write your blog post in HTML or plain text…"
                  rows={20}
                  className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y font-mono transition-colors"
                />
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                <Save size={14} />
                {saving ? 'Saving…' : 'Save Draft'}
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
              >
                <Globe size={14} />
                {saving ? 'Publishing…' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog list */}
      {!editing && (
        <>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-12 text-center text-gray-500 text-sm">
              No blog posts yet. Create your first one!
            </div>
          ) : (
            <div className="grid gap-3">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                        blog.status === 'published'
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : 'bg-gray-500/10 text-gray-500 border-gray-500/30'
                      }`}>
                        {blog.status}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">{blog.title}</p>
                    {blog.excerpt && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{blog.excerpt}</p>}
                    <p className="text-xs text-gray-600 mt-1">
                      By {blog.authorName} · {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-IN') : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleStatus(blog)}
                      className={`p-2 rounded-lg transition-colors ${
                        blog.status === 'published'
                          ? 'text-green-400 hover:bg-green-500/10'
                          : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                      }`}
                      title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    >
                      {blog.status === 'published' ? <Globe size={15} /> : <FileText size={15} />}
                    </button>
                    <button
                      onClick={() => editBlog(blog.id)}
                      className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
