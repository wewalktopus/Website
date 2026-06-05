'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  FileText,
  Forward,
  Inbox,
  Mail,
  Paperclip,
  RefreshCw,
  Reply,
  Save,
  Send,
  Trash2,
  Users,
  X,
  XCircle,
} from 'lucide-react';
import type { EmailTemplate, Lead, NewsletterSubscriber } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type RecipientMode = 'custom' | 'leads' | 'subscribers' | 'converted';
type MailboxFolder = 'compose' | 'inbox' | 'sent' | 'draft';
type ComposerMode = 'reply' | 'forward' | null;

interface InboxListItem {
  id: string;
  folder: 'inbox';
  subject: string;
  from: string;
  to: string[];
  toLine: string;
  preview: string;
  createdAt: string | null;
}

interface Attachment {
  id: string;
  filename: string;
  content_type: string;
}

interface InboxDetail {
  id: string;
  subject: string;
  from: string | null;
  to: string[];
  cc: string[];
  createdAt: string | null;
  text: string;
  html: string;
  attachments: Attachment[];
}

interface MailboxMessage {
  id: string;
  folder: 'sent' | 'draft';
  subject?: string;
  body?: string;
  preview?: string;
  from?: string;
  to?: string[];
  toLine?: string;
  toCount?: number;
  sent?: number;
  failed?: number;
  createdAt?: string | null;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function fmt(dt: string | null | undefined): string {
  if (!dt) return '—';
  const d = new Date(dt);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) {
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EmailsPage() {
  const [activeView, setActiveView] = useState<MailboxFolder>('compose');

  // Compose
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientMode, setRecipientMode] = useState<RecipientMode>('custom');
  const [customEmails, setCustomEmails] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);

  // Data
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [inboxMessages, setInboxMessages] = useState<InboxListItem[]>([]);
  const [sentMessages, setSentMessages] = useState<MailboxMessage[]>([]);
  const [draftMessages, setDraftMessages] = useState<MailboxMessage[]>([]);

  // Inbox detail
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<InboxDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  // Reply / forward
  const [composerMode, setComposerMode] = useState<ComposerMode>(null);
  const [composerBody, setComposerBody] = useState('');
  const [forwardTo, setForwardTo] = useState('');
  const [composerSending, setComposerSending] = useState(false);

  // Status
  const [loadingData, setLoadingData] = useState(true);
  const [sending, setSending] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; skippedUnsubscribed?: number } | null>(null);
  const [error, setError] = useState('');

  // ─── Derived ───────────────────────────────────────────────────────────────

  const campaignSubs = useMemo(
    () => subscribers.filter((s) => s.emailPreferences?.campaigns ?? s.active),
    [subscribers],
  );

  const recipients = useMemo((): string[] => {
    switch (recipientMode) {
      case 'custom':
        return customEmails.split(/[\n,;]/).map((e) => e.trim().toLowerCase()).filter((e) => e.includes('@'));
      case 'leads':
        return leads.map((l) => l.email);
      case 'converted':
        return leads.filter((l) => l.status === 'converted').map((l) => l.email);
      case 'subscribers':
        return campaignSubs.map((s) => s.email);
      default:
        return [];
    }
  }, [recipientMode, customEmails, leads, campaignSubs]);

  // ─── Data Fetching ─────────────────────────────────────────────────────────

  const fetchMailbox = async (folder: 'inbox' | 'sent' | 'draft') => {
    const url = folder === 'inbox' ? '/api/admin/email/inbox' : `/api/admin/email/mailboxes?folder=${folder}&limit=100`;
    const resp = await fetch(url);
    const data = (await resp.json()) as { messages?: unknown[] };
    const msgs = data.messages ?? [];
    if (folder === 'inbox') setInboxMessages(msgs as InboxListItem[]);
    if (folder === 'sent') setSentMessages(msgs as MailboxMessage[]);
    if (folder === 'draft') setDraftMessages(msgs as MailboxMessage[]);
  };

  const refreshAll = async () => {
    setLoadingData(true);
    try {
      const [tRes, lRes, sRes] = await Promise.all([
        fetch('/api/admin/email/templates'),
        fetch('/api/admin/leads?limit=300'),
        fetch('/api/admin/subscribers?limit=600'),
      ]);
      const [tData, lData, sData] = await Promise.all([
        tRes.json() as Promise<{ templates?: EmailTemplate[] }>,
        lRes.json() as Promise<{ leads?: Lead[] }>,
        sRes.json() as Promise<{ subscribers?: NewsletterSubscriber[] }>,
      ]);
      setTemplates(tData.templates ?? []);
      setLeads(lData.leads ?? []);
      setSubscribers(sData.subscribers ?? []);
      await Promise.all([fetchMailbox('inbox'), fetchMailbox('sent'), fetchMailbox('draft')]);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => { void refreshAll(); }, []);

  // ─── Inbox ─────────────────────────────────────────────────────────────────

  const openDetail = async (id: string) => {
    setSelectedId(id);
    setSelectedDetail(null);
    setDetailError('');
    setComposerMode(null);
    setDetailLoading(true);
    try {
      const resp = await fetch(`/api/admin/email/inbox/${id}`);
      const data = (await resp.json()) as { message?: InboxDetail; error?: string };
      if (!resp.ok) { setDetailError(data.error ?? 'Failed to load email'); return; }
      setSelectedDetail(data.message ?? null);
    } catch {
      setDetailError('Network error loading email');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Move this email to trash?')) return;
    const resp = await fetch(`/api/admin/email/inbox/${id}`, { method: 'DELETE' });
    if (resp.ok) {
      setInboxMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedId === id) { setSelectedId(null); setSelectedDetail(null); }
    }
  };

  const sendComposer = async () => {
    if (!composerBody.trim() || !selectedId) return;
    if (composerMode === 'forward' && !forwardTo.trim()) { alert('Enter a forward-to email address'); return; }
    setComposerSending(true);
    try {
      const resp = await fetch(`/api/admin/email/inbox/${selectedId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: composerMode, message: composerBody, forwardTo: composerMode === 'forward' ? forwardTo : undefined }),
      });
      const data = (await resp.json()) as { error?: string };
      if (!resp.ok) throw new Error(data.error ?? 'Send failed');
      setComposerMode(null); setComposerBody(''); setForwardTo('');
      await fetchMailbox('sent');
      alert(composerMode === 'forward' ? 'Forwarded successfully.' : 'Reply sent successfully.');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setComposerSending(false);
    }
  };

  // ─── Compose helpers ───────────────────────────────────────────────────────

  const applyTemplate = (t: EmailTemplate) => { setSubject(t.subject); setBody(t.body); setActiveView('compose'); };

  const loadDraft = (draft: MailboxMessage) => {
    setSubject(draft.subject ?? ''); setBody(draft.body ?? '');
    setCustomEmails(Array.isArray(draft.to) ? draft.to.join(', ') : '');
    setRecipientMode('custom'); setEditingDraftId(draft.id); setActiveView('compose');
  };

  const saveDraft = async () => {
    setSavingDraft(true); setError('');
    try {
      const resp = await fetch('/api/admin/email/mailboxes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingDraftId, subject, body, to: recipients }),
      });
      const data = (await resp.json()) as { id?: string; error?: string };
      if (!resp.ok) throw new Error(data.error ?? 'Failed to save draft');
      setEditingDraftId(data.id ?? editingDraftId);
      await fetchMailbox('draft'); setActiveView('draft');
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to save draft'); }
    finally { setSavingDraft(false); }
  };

  const deleteDraft = async (id: string) => {
    if (!confirm('Delete this draft?')) return;
    await fetch(`/api/admin/email/mailboxes/${id}`, { method: 'DELETE' });
    if (editingDraftId === id) setEditingDraftId(null);
    await fetchMailbox('draft');
  };

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) { setError('Subject and body are required.'); return; }
    if (recipients.length === 0) { setError('No valid recipients.'); return; }
    if (!confirm(`Send to ${recipients.length} recipient(s)?`)) return;
    setSending(true); setError(''); setResult(null);
    try {
      const fd = new FormData();
      fd.set('to', JSON.stringify(recipients)); fd.set('subject', subject); fd.set('body', body);
      for (const f of attachments) fd.append('attachments', f);
      const resp = await fetch('/api/admin/email/send', { method: 'POST', body: fd });
      const data = (await resp.json()) as { sent?: number; failed?: number; skippedUnsubscribed?: number; error?: string };
      if (!resp.ok) throw new Error(data.error ?? 'Send failed');
      setResult({ sent: data.sent ?? 0, failed: data.failed ?? 0, skippedUnsubscribed: data.skippedUnsubscribed });
      setEditingDraftId(null); await fetchMailbox('sent'); setActiveView('sent');
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to send'); }
    finally { setSending(false); }
  };

  // ─── Sub-components ────────────────────────────────────────────────────────

  const clearInboxSelection = () => { setSelectedId(null); setSelectedDetail(null); setComposerMode(null); };

  return (
    <div className="space-y-5 max-w-7xl">
      {/* Tab bar */}
      <div className="flex items-center flex-wrap gap-2">
        {(
          [
            { id: 'compose' as MailboxFolder, label: 'Compose', icon: Mail, count: undefined as number | undefined },
            { id: 'inbox' as MailboxFolder, label: 'Inbox', icon: Inbox, count: inboxMessages.length },
            { id: 'sent' as MailboxFolder, label: 'Sent', icon: Send, count: sentMessages.length },
            { id: 'draft' as MailboxFolder, label: 'Drafts', icon: Save, count: draftMessages.length },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveView(tab.id); clearInboxSelection(); }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              activeView === tab.id
                ? 'bg-orange-500/15 border-orange-500/30 text-orange-300'
                : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
            {typeof tab.count === 'number' && tab.count > 0 && (
              <span className="bg-white/10 text-gray-400 text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
        <button
          onClick={refreshAll}
          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
        >
          <RefreshCw size={14} className={loadingData ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* ─── Compose ──────────────────────────────────────────────────────── */}
      {activeView === 'compose' && (
        <>
          {templates.length > 0 && (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 mb-2">Apply Template</p>
              <div className="flex flex-wrap gap-2">
                {templates.map((t) => (
                  <button key={t.id} onClick={() => applyTemplate(t)} className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 rounded-lg text-xs font-medium transition-colors">
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Recipients */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-3">
              <p className="text-sm font-semibold text-white">Recipients</p>
              {(
                [
                  { mode: 'leads' as RecipientMode, label: 'All Leads', icon: Users, count: leads.length },
                  { mode: 'converted' as RecipientMode, label: 'Converted Leads', icon: CheckCircle, count: leads.filter((l) => l.status === 'converted').length },
                  { mode: 'subscribers' as RecipientMode, label: 'Campaign Subscribers', icon: Bell, count: campaignSubs.length },
                  { mode: 'custom' as RecipientMode, label: 'Custom Emails', icon: FileText, count: null as number | null },
                ] as const
              ).map((opt) => (
                <button key={opt.mode} onClick={() => setRecipientMode(opt.mode)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm border transition-colors ${recipientMode === opt.mode ? 'bg-orange-500/15 border-orange-500/30 text-orange-400' : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'}`}>
                  <opt.icon size={15} className="shrink-0" />
                  <span className="flex-1 text-left">{opt.label}</span>
                  {typeof opt.count === 'number' && <span className="text-xs opacity-60">{opt.count}</span>}
                </button>
              ))}
              {recipientMode === 'custom' && (
                <textarea value={customEmails} onChange={(e) => setCustomEmails(e.target.value)} placeholder="Enter emails (comma/newline separated)" rows={4} className="w-full mt-1 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-none" />
              )}
              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-gray-500"><span className="text-white font-semibold">{recipients.length}</span> recipients</p>
              </div>
            </div>

            {/* Editor */}
            <div className="lg:col-span-2 bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Compose Email</p>
                {editingDraftId && <span className="text-xs text-orange-300">Editing draft</span>}
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5">
                <Image src="/logo.png" alt="Walktopus" width={28} height={28} className="h-7 w-7 rounded-full object-contain bg-white p-0.5" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">From</p>
                  <p className="text-sm font-semibold text-white">Walktopus</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email subject line…" className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-400">Body (HTML supported)</label>
                  <button onClick={() => setPreview((p) => !p)} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">{preview ? 'Edit' : 'Preview'}</button>
                </div>
                {preview ? (
                  <div className="min-h-64 p-4 bg-white rounded-lg text-gray-900 text-sm overflow-auto" dangerouslySetInnerHTML={{ __html: body }} />
                ) : (
                  <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your email content here. HTML is supported." rows={10} className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y font-mono" />
                )}
              </div>

              <label className="flex items-center gap-2 px-3 py-2.5 bg-[#111111] border border-dashed border-white/20 rounded-lg text-xs text-gray-400 hover:border-orange-500/40 cursor-pointer transition-colors">
                <Paperclip size={14} />
                <span>Attach files (max 5, 10 MB each)</span>
                <input type="file" multiple onChange={(e) => setAttachments(Array.from(e.target.files ?? []).slice(0, 5))} className="hidden" />
              </label>
              {attachments.length > 0 && <p className="text-xs text-gray-500">{attachments.length} file(s): {attachments.map((f) => f.name).join(', ')}</p>}

              {error && <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"><XCircle size={15} /> {error}</div>}
              {result && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                  <CheckCircle size={15} /> Sent to <strong>{result.sent}</strong>
                  {result.failed > 0 && <span className="text-red-400 ml-1">({result.failed} failed)</span>}
                  {(result.skippedUnsubscribed ?? 0) > 0 && <span className="text-yellow-400 ml-1">({result.skippedUnsubscribed} unsubscribed skipped)</span>}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <button onClick={saveDraft} disabled={savingDraft || loadingData} className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/15 disabled:bg-white/5 disabled:text-gray-600 text-white font-semibold rounded-xl text-sm transition-colors">
                  {savingDraft ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />} Save Draft
                </button>
                <button onClick={handleSend} disabled={sending || recipients.length === 0 || loadingData} className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 text-white font-semibold rounded-xl text-sm transition-colors">
                  {sending ? <RefreshCw size={15} className="animate-spin" /> : <Send size={15} />}
                  {sending ? 'Sending…' : `Send to ${recipients.length}`}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Inbox two-pane ───────────────────────────────────────────────── */}
      {activeView === 'inbox' && (
        <div className="grid lg:grid-cols-[380px_1fr] gap-4 min-h-[72vh]">
          {/* List */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
              <span className="text-sm font-semibold text-white">Inbox</span>
              <button onClick={() => fetchMailbox('inbox')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {inboxMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 gap-2 text-gray-500 text-sm">
                  <Inbox size={32} className="opacity-20" />
                  No received emails yet
                </div>
              ) : (
                inboxMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => openDetail(msg.id)}
                    className={`w-full text-left px-4 py-3.5 transition-colors hover:bg-white/5 ${selectedId === msg.id ? 'bg-orange-500/10 border-l-2 border-l-orange-500' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{msg.from || 'Unknown'}</p>
                        <p className="text-xs text-gray-300 truncate mt-0.5">{msg.subject}</p>
                        {msg.preview && <p className="text-xs text-gray-500 truncate mt-0.5">{msg.preview}</p>}
                        {msg.toLine && <p className="text-[11px] text-gray-600 truncate mt-0.5">To: {msg.toLine}</p>}
                      </div>
                      <span className="text-[11px] text-gray-500 shrink-0 mt-0.5">{fmt(msg.createdAt)}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden flex flex-col">
            {!selectedId ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
                <Mail size={40} className="opacity-20" />
                <p className="text-sm">Select an email to read</p>
              </div>
            ) : detailLoading ? (
              <div className="flex items-center justify-center h-full text-gray-500 gap-2">
                <RefreshCw size={18} className="animate-spin" /> Loading…
              </div>
            ) : detailError ? (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <XCircle size={32} className="text-red-500 opacity-60" />
                <p className="text-sm text-red-400">{detailError}</p>
              </div>
            ) : selectedDetail ? (
              <>
                {/* Toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 shrink-0 flex-wrap">
                  <button onClick={clearInboxSelection} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mr-2">
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button onClick={() => { setComposerMode('reply'); setComposerBody(''); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 rounded-lg text-xs font-medium transition-colors">
                    <Reply size={13} /> Reply
                  </button>
                  <button onClick={() => { setComposerMode('forward'); setComposerBody(''); setForwardTo(''); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-medium transition-colors">
                    <Forward size={13} /> Forward
                  </button>
                  <button onClick={() => handleDelete(selectedDetail.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-medium transition-colors">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>

                {/* Header */}
                <div className="px-5 py-4 border-b border-white/10 shrink-0">
                  <h2 className="text-base font-bold text-white mb-3">{selectedDetail.subject}</h2>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div className="flex gap-2"><span className="text-gray-600 w-8 shrink-0">From</span><span className="text-white font-medium">{selectedDetail.from ?? 'Unknown'}</span></div>
                    <div className="flex gap-2"><span className="text-gray-600 w-8 shrink-0">To</span><span>{selectedDetail.to.join(', ') || '—'}</span></div>
                    {selectedDetail.cc.length > 0 && <div className="flex gap-2"><span className="text-gray-600 w-8 shrink-0">CC</span><span>{selectedDetail.cc.join(', ')}</span></div>}
                    <div className="flex gap-2"><span className="text-gray-600 w-8 shrink-0">Date</span><span>{selectedDetail.createdAt ? new Date(selectedDetail.createdAt).toLocaleString('en-IN') : '—'}</span></div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {selectedDetail.html ? (
                    <div className="prose prose-invert max-w-none text-sm text-gray-200" dangerouslySetInnerHTML={{ __html: selectedDetail.html }} />
                  ) : (
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{selectedDetail.text || 'No content'}</pre>
                  )}

                  {selectedDetail.attachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-semibold text-gray-400 mb-2"><Paperclip size={12} className="inline mr-1" />{selectedDetail.attachments.length} Attachment(s)</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDetail.attachments.map((att) => (
                          <div key={att.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
                            <Paperclip size={11} className="text-gray-500" /> {att.filename}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reply / Forward composer */}
                {composerMode && (
                  <div className="border-t border-white/10 px-5 py-4 bg-[#0f0f0f] shrink-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide flex items-center gap-1.5">
                        {composerMode === 'reply' ? <Reply size={12} /> : <Forward size={12} />}
                        {composerMode === 'reply' ? `Reply to ${selectedDetail.from ?? ''}` : 'Forward email'}
                      </p>
                      <button onClick={() => setComposerMode(null)} className="text-gray-500 hover:text-white transition-colors"><X size={14} /></button>
                    </div>
                    {composerMode === 'forward' && (
                      <input value={forwardTo} onChange={(e) => setForwardTo(e.target.value)} placeholder="Forward to email address…" className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50" />
                    )}
                    <textarea value={composerBody} onChange={(e) => setComposerBody(e.target.value)} placeholder={composerMode === 'reply' ? 'Write your reply…' : 'Write a note to include when forwarding…'} rows={5} className="w-full px-3 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y" />
                    <div className="flex justify-end">
                      <button onClick={sendComposer} disabled={composerSending || !composerBody.trim()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 text-white rounded-xl text-sm font-semibold transition-colors">
                        {composerSending ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                        {composerMode === 'reply' ? 'Send Reply' : 'Forward'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* ─── Sent ─────────────────────────────────────────────────────────── */}
      {activeView === 'sent' && (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Sentbox</span>
            <button onClick={() => fetchMailbox('sent')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
          </div>
          {sentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-500 text-sm"><Mail size={28} className="opacity-30" />No sent messages</div>
          ) : (
            <div className="divide-y divide-white/5">
              {sentMessages.map((msg) => (
                <div key={msg.id} className="px-4 py-3.5 hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{msg.subject || '(No subject)'}</p>
                      {msg.toLine ? <p className="text-xs text-gray-400 mt-0.5 truncate">To: {msg.toLine}</p> : null}
                      {typeof msg.toCount === 'number' && msg.toCount > 1 ? <p className="text-xs text-gray-500">To {msg.toCount} recipients</p> : null}
                      {typeof msg.sent === 'number' ? (
                        <p className="text-xs text-gray-500 mt-0.5">
                          <CheckCircle size={10} className="inline text-green-400 mr-1" />{msg.sent} sent
                          {(msg.failed ?? 0) > 0 && <span className="text-red-400 ml-1">· {msg.failed} failed</span>}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-[11px] text-gray-500 shrink-0 mt-0.5">{fmt(msg.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Drafts ───────────────────────────────────────────────────────── */}
      {activeView === 'draft' && (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Drafts</span>
            <button onClick={() => fetchMailbox('draft')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
          </div>
          {draftMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-500 text-sm"><Save size={28} className="opacity-30" />No drafts</div>
          ) : (
            <div className="divide-y divide-white/5">
              {draftMessages.map((msg) => (
                <div key={msg.id} className="px-4 py-3.5 hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{msg.subject || '(No subject)'}</p>
                      {msg.toLine && <p className="text-xs text-gray-400 mt-0.5 truncate">To: {msg.toLine}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[11px] text-gray-500">{fmt(msg.createdAt)}</span>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => loadDraft(msg)} className="px-2.5 py-1 rounded-lg text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-colors">Edit</button>
                        <button onClick={() => deleteDraft(msg.id)} className="px-2.5 py-1 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
