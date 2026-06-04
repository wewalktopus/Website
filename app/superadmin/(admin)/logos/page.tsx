'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUp, ImagePlus, RefreshCw, Save, Trash2 } from 'lucide-react';
import type { CompanyLogo } from '@/types';

interface EditState {
  alt: string;
  href: string;
  file: File | null;
}

function moveItem(logos: CompanyLogo[], index: number, direction: 'up' | 'down'): CompanyLogo[] {
  const next = [...logos];
  const targetIndex = direction === 'up' ? index - 1 : index + 1;

  if (targetIndex < 0 || targetIndex >= logos.length) {
    return logos;
  }

  [next[index], next[targetIndex]] = [next[targetIndex], next[index]];

  return next.map((logo, order) => ({ ...logo, order }));
}

export default function AdminLogosPage() {
  const [logos, setLogos] = useState<CompanyLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadHref, setUploadHref] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const [editState, setEditState] = useState<Record<string, EditState>>({});

  const loadLogos = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/logos');
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to load logos');
        return;
      }

      const nextLogos: CompanyLogo[] = Array.isArray(data.logos) ? data.logos : [];
      setLogos(nextLogos);

      const nextEdit: Record<string, EditState> = {};
      for (const logo of nextLogos) {
        nextEdit[logo.id] = {
          alt: logo.alt,
          href: logo.href ?? '',
          file: null,
        };
      }
      setEditState(nextEdit);
    } catch (err) {
      console.error(err);
      setError('Failed to load logos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogos();
  }, []);

  const onUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    setError('');

    if (!uploadFile) {
      setError('Please choose a logo file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('alt', uploadAlt);
    formData.append('href', uploadHref);

    setUploading(true);

    try {
      const res = await fetch('/api/admin/logos', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to upload logo');
        return;
      }

      setStatus('Logo uploaded successfully.');
      setUploadAlt('');
      setUploadHref('');
      setUploadFile(null);
      await loadLogos();
    } catch (err) {
      console.error(err);
      setError('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const onReorder = async (nextLogos: CompanyLogo[]) => {
    setSavingOrder(true);
    setError('');
    setStatus('');

    try {
      const res = await fetch('/api/admin/logos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: nextLogos.map((logo) => logo.id) }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to update order');
        return;
      }

      const updated: CompanyLogo[] = Array.isArray(data.logos) ? data.logos : nextLogos;
      setLogos(updated);
      setStatus('Logo order updated.');
    } catch (err) {
      console.error(err);
      setError('Failed to update order');
    } finally {
      setSavingOrder(false);
    }
  };

  const onMove = async (index: number, direction: 'up' | 'down') => {
    const next = moveItem(logos, index, direction);
    setLogos(next);
    await onReorder(next);
  };

  const updateEditState = (id: string, patch: Partial<EditState>) => {
    setEditState((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] ?? { alt: '', href: '', file: null }),
        ...patch,
      },
    }));
  };

  const onSaveLogo = async (id: string) => {
    setError('');
    setStatus('');

    const current = editState[id];
    if (!current) return;

    const formData = new FormData();
    formData.append('alt', current.alt);
    formData.append('href', current.href);
    if (current.file) {
      formData.append('file', current.file);
    }

    try {
      const res = await fetch(`/api/admin/logos/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to update logo');
        return;
      }

      const updated: CompanyLogo[] = Array.isArray(data.logos) ? data.logos : logos;
      setLogos(updated);
      setStatus('Logo updated.');

      setEditState((prev) => ({
        ...prev,
        [id]: {
          ...(prev[id] ?? { alt: '', href: '', file: null }),
          file: null,
        },
      }));
    } catch (err) {
      console.error(err);
      setError('Failed to update logo');
    }
  };

  const onDeleteLogo = async (id: string) => {
    const confirmed = window.confirm('Delete this logo permanently?');
    if (!confirmed) return;

    setError('');
    setStatus('');

    try {
      const res = await fetch(`/api/admin/logos/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to delete logo');
        return;
      }

      const updated: CompanyLogo[] = Array.isArray(data.logos) ? data.logos : [];
      setLogos(updated);
      setStatus('Logo deleted.');
      setEditState((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (err) {
      console.error(err);
      setError('Failed to delete logo');
    }
  };

  const onReplaceFile = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    updateEditState(id, { file });
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
        <h2 className="text-white text-sm font-semibold">Company Logo Marquee</h2>
        <p className="text-xs text-gray-500 mt-1">
          Upload logos shown on the homepage trust strip. Files are stored in public/company-logos.
        </p>

        <form onSubmit={onUpload} className="mt-4 grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-400 mb-1">Logo file</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
              className="w-full text-xs text-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-orange-400"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Alt text</label>
            <input
              value={uploadAlt}
              onChange={(e) => setUploadAlt(e.target.value)}
              placeholder="Company name"
              className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Website URL (optional)</label>
            <input
              value={uploadHref}
              onChange={(e) => setUploadHref(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <ImagePlus size={14} />
              {uploading ? 'Uploading...' : 'Upload Logo'}
            </button>

            <button
              type="button"
              onClick={loadLogos}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>

            {savingOrder ? <span className="text-xs text-gray-500">Saving order...</span> : null}
          </div>
        </form>

        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
        {status ? <p className="mt-3 text-sm text-green-400">{status}</p> : null}
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
        <h3 className="text-sm text-white font-semibold">Uploaded Logos ({logos.length})</h3>

        {loading ? (
          <div className="py-10 text-center text-gray-500 text-sm">Loading logos...</div>
        ) : logos.length === 0 ? (
          <div className="py-10 text-center text-gray-500 text-sm">No logos uploaded yet.</div>
        ) : (
          <div className="mt-4 space-y-3">
            {logos.map((logo, index) => {
              const edit = editState[logo.id] ?? { alt: logo.alt, href: logo.href ?? '', file: null };

              return (
                <div key={logo.id} className="border border-white/10 rounded-xl bg-[#111111] p-4">
                  <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                    <div className="rounded-lg bg-[#0d0d0d] border border-white/10 p-3 flex items-center justify-center min-h-30">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={180}
                        height={90}
                        className="max-h-20 w-auto object-contain"
                        unoptimized
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Alt text</label>
                          <input
                            value={edit.alt}
                            onChange={(e) => updateEditState(logo.id, { alt: e.target.value })}
                            className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Website URL</label>
                          <input
                            value={edit.href}
                            onChange={(e) => updateEditState(logo.id, { href: e.target.value })}
                            placeholder="https://example.com"
                            className="w-full px-3 py-2 bg-[#0d0d0d] border border-white/10 rounded-lg text-sm text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Replace logo image (optional)</label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          onChange={(e) => onReplaceFile(logo.id, e)}
                          className="w-full text-xs text-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-white/20"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onMove(index, 'up')}
                          disabled={index === 0 || savingOrder}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-gray-200"
                        >
                          <ArrowUp size={13} />
                          Move Up
                        </button>

                        <button
                          type="button"
                          onClick={() => onMove(index, 'down')}
                          disabled={index === logos.length - 1 || savingOrder}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-gray-200"
                        >
                          <ArrowDown size={13} />
                          Move Down
                        </button>

                        <button
                          type="button"
                          onClick={() => onSaveLogo(logo.id)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-orange-500 hover:bg-orange-400 text-white"
                        >
                          <Save size={13} />
                          Save
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteLogo(logo.id)}
                          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/25"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
