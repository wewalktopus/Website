'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import type { EmailTemplate } from '@/types';

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<EmailTemplate> | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchTemplates = async () => {
    const res = await fetch('/api/admin/email/templates');
    const data = await res.json();
    setTemplates(data.templates ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchTemplates(); }, []);

  const handleSave = async () => {
    if (!editing?.name || !editing?.subject || !editing?.body) return;
    setSaving(true);

    const isNew = !editing.id;
    const url = isNew ? '/api/admin/email/templates' : `/api/admin/email/templates/${editing.id}`;
    const method = isNew ? 'POST' : 'PATCH';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editing.name, subject: editing.subject, body: editing.body }),
    });

    await fetchTemplates();
    setEditing(null);
    setSaving(false);
  };

  const deleteTemplate = async (id: string) => {
    if (!confirm('Delete this template?')) return;
    await fetch(`/api/admin/email/templates/${id}`, { method: 'DELETE' });
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">{templates.length} template{templates.length !== 1 ? 's' : ''}</p>
        <button
          onClick={() => setEditing({ name: '', subject: '', body: '' })}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Plus size={15} /> New Template
        </button>
      </div>

      {/* Editor */}
      {editing && (
        <div className="bg-[#1a1a1a] border border-orange-500/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">{editing.id ? 'Edit Template' : 'New Template'}</h3>
            <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Template Name</label>
              <input
                value={editing.name ?? ''}
                onChange={e => setEditing(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Welcome Email, Follow-up"
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject Line</label>
              <input
                value={editing.subject ?? ''}
                onChange={e => setEditing(p => ({ ...p, subject: e.target.value }))}
                placeholder="Email subject…"
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Body (HTML supported)</label>
              <textarea
                value={editing.body ?? ''}
                onChange={e => setEditing(p => ({ ...p, body: e.target.value }))}
                placeholder="Email body HTML…"
                rows={10}
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y font-mono transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? 'Saving…' : 'Save Template'}
            </button>
            <button onClick={() => setEditing(null)} className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 text-sm rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Template list */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-7 h-7 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        </div>
      ) : templates.length === 0 ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-12 text-center text-gray-500 text-sm">
          No templates yet. Create your first one above.
        </div>
      ) : (
        <div className="grid gap-3">
          {templates.map(t => (
            <div key={t.id} className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">Subject: {t.subject}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-IN') : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setEditing(t)}
                  className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => deleteTemplate(t.id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
