'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

// ─── Types ───────────────────────────────────────────────────────────────────

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
  filename?: string;
  content_type?: string;
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
  messageId?: string | null;
  replyFrom?: string | null;
}

interface MailboxMessage {
  id: string;
  folder: 'sent' | 'draft';
  subject?: string;
  body?: string;
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
  const [activeView, setActiveView] = useState<MailboxFolder>('inbox');

  // Compose state
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientMode, setRecipientMode] = useState<RecipientMode>('custom');
  const [customEmails, setCustomEmails] = useState('');
  const [composeAttachments, setComposeAttachments] = useState<File[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [bodyPreview, setBodyPreview] = useState(false);

  // Data
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [inboxMessages, setInboxMessages] = useState<InboxListItem[]>([]);
  const [sentMessages, setSentMessages] = useState<MailboxMessage[]>([]);
  const [draftMessages, setDraftMessages] = useState<MailboxMessage[]>([]);

  // Inbox detail (Gmail-like inline panel)
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [openedDetail, setOpenedDetail] = useState<InboxDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const detailRef = useRef<HTMLDivElement>(null);

  // Reply / forward
  const [composerMode, setComposerMode] = useState<ComposerMode>(null);
  const [composerBody, setComposerBody] = useState('');
  const [forwardTo, setForwardTo] = useState('');
  const [composerSending, setComposerSending] = useState(false);
  const [composerError, setComposerError] = useState('');

  // Send status
  const [loadingData, setLoadingData] = useState(true);
  const [sending, setSending] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [sendResult, setSendResult] = useState<{ sent: number; failed: number; skippedUnsubscribed?: number } | null>(null);
  const [sendError, setSendError] = useState('');

  // ─── Derived ────────────────────────────────────────────────────────────────

  const campaignSubs = useMemo(
    () => subscribers.filter((s) => s.emailPreferences?.campaigns ?? s.active),
    [subscribers],
  );

  const recipients = useMemo((): string[] => {
    switch (recipientMode) {
      case 'custom':
        return customEmails.split(/[\n,;]/).map((e) => e.trim().toLowerCase()).filter((e) => e.includes('@'));
      case 'leads': return leads.map((l) => l.email);
      case 'converted': return leads.filter((l) => l.status === 'converted').map((l) => l.email);
      case 'subscribers': return campaignSubs.map((s) => s.email);
      default: return [];
    }
  }, [recipientMode, customEmails, leads, campaignSubs]);

  // ─── Data fetching ──────────────────────────────────────────────────────────

  const fetchMailbox = useCallback(async (folder: 'inbox' | 'sent' | 'draft') => {
    const url = folder === 'inbox' ? '/api/admin/email/inbox' : `/api/admin/email/mailboxes?folder=${folder}&limit=100`;
    const resp = await fetch(url);
    const data = (await resp.json()) as { messages?: unknown[] };
    const msgs = data.messages ?? [];
    if (folder === 'inbox') setInboxMessages(msgs as InboxListItem[]);
    if (folder === 'sent') setSentMessages(msgs as MailboxMessage[]);
    if (folder === 'draft') setDraftMessages(msgs as MailboxMessage[]);
  }, []);

  const refreshAll = useCallback(async () => {
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
  }, [fetchMailbox]);

  useEffect(() => { void refreshAll(); }, [refreshAll]);

  // ─── Inbox detail ────────────────────────────────────────────────────────────

  const openMail = async (id: string) => {
    setOpenedId(id);
    setOpenedDetail(null);
    setDetailError('');
    setComposerMode(null);
    setComposerBody('');
    setComposerError('');
    setDetailLoading(true);
    // Scroll panel to top
    setTimeout(() => detailRef.current?.scrollTo({ top: 0, behavior: 'instant' }), 0);
    try {
      const resp = await fetch(`/api/admin/email/inbox/${id}`);
      const data = (await resp.json()) as { message?: InboxDetail; error?: string };
      if (!resp.ok) throw new Error(data.error ?? 'Failed to load email');
      setOpenedDetail(data.message ?? null);
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'Failed to load email');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeMail = () => {
    setOpenedId(null);
    setOpenedDetail(null);
    setComposerMode(null);
    setComposerBody('');
    setComposerError('');
  };

  const handleDelete = async () => {
    if (!openedId || !confirm('Delete this email?')) return;
    const resp = await fetch(`/api/admin/email/inbox/${openedId}`, { method: 'DELETE' });
    if (resp.ok) {
      setInboxMessages((prev) => prev.filter((m) => m.id !== openedId));
      closeMail();
    }
  };

  const handleComposerSend = async () => {
    if (!openedId || !composerBody.trim()) return;
    if (composerMode === 'forward' && !forwardTo.trim()) {
      setComposerError('Enter a forward-to email address.');
      return;
    }
    setComposerSending(true);
    setComposerError('');
    try {
      const resp = await fetch(`/api/admin/email/inbox/${openedId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: composerMode,
          message: composerBody,
          forwardTo: composerMode === 'forward' ? forwardTo : undefined,
        }),
      });
      const data = (await resp.json()) as { error?: string };
      if (!resp.ok) throw new Error(data.error ?? 'Send failed');
      setComposerMode(null);
      setComposerBody('');
      setForwardTo('');
      await fetchMailbox('sent');
    } catch (err) {
      setComposerError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setComposerSending(false);
    }
  };

  // ─── Compose helpers ─────────────────────────────────────────────────────────

  const applyTemplate = (t: EmailTemplate) => { setSubject(t.subject); setBody(t.body); setActiveView('compose'); };

  const loadDraft = (draft: MailboxMessage) => {
    setSubject(draft.subject ?? '');
    setBody(draft.body ?? '');
    setCustomEmails(Array.isArray(draft.to) ? draft.to.join(', ') : '');
    setRecipientMode('custom');
    setEditingDraftId(draft.id);
    setActiveView('compose');
  };

  const saveDraft = async () => {
    setSavingDraft(true); setSendError('');
    try {
      const resp = await fetch('/api/admin/email/mailboxes', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingDraftId, subject, body, to: recipients }),
      });
      const data = (await resp.json()) as { id?: string; error?: string };
      if (!resp.ok) throw new Error(data.error ?? 'Failed to save draft');
      setEditingDraftId(data.id ?? editingDraftId);
      await fetchMailbox('draft');
      setActiveView('draft');
    } catch (err) { setSendError(err instanceof Error ? err.message : 'Failed to save draft'); }
    finally { setSavingDraft(false); }
  };

  const deleteDraft = async (id: string) => {
    if (!confirm('Delete this draft?')) return;
    await fetch(`/api/admin/email/mailboxes/${id}`, { method: 'DELETE' });
    if (editingDraftId === id) setEditingDraftId(null);
    await fetchMailbox('draft');
  };

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) { setSendError('Subject and body are required.'); return; }
    if (recipients.length === 0) { setSendError('No valid recipients.'); return; }
    if (!confirm(`Send to ${recipients.length} recipient(s)?`)) return;
    setSending(true); setSendError(''); setSendResult(null);
    try {
      const fd = new FormData();
      fd.set('to', JSON.stringify(recipients)); fd.set('subject', subject); fd.set('body', body);
      for (const f of composeAttachments) fd.append('attachments', f);
      const resp = await fetch('/api/admin/email/send', { method: 'POST', body: fd });
      const data = (await resp.json()) as { sent?: number; failed?: number; skippedUnsubscribed?: number; error?: string };
      if (!resp.ok) throw new Error(data.error ?? 'Send failed');
      setSendResult({ sent: data.sent ?? 0, failed: data.failed ?? 0, skippedUnsubscribed: data.skippedUnsubscribed });
      setEditingDraftId(null);
      await fetchMailbox('sent');
      setActiveView('sent');
    } catch (err) { setSendError(err instanceof Error ? err.message : 'Failed to send'); }
    finally { setSending(false); }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-5 max-w-7xl">

      {/* ── Tab bar ── */}
      <div className="flex items-center flex-wrap gap-2">
        {[
          { id: 'compose' as MailboxFolder, label: 'Compose', icon: Mail },
          { id: 'inbox' as MailboxFolder, label: 'Inbox', icon: Inbox, count: inboxMessages.length },
          { id: 'sent' as MailboxFolder, label: 'Sent', icon: Send, count: sentMessages.length },
          { id: 'draft' as MailboxFolder, label: 'Drafts', icon: Save, count: draftMessages.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveView(tab.id); closeMail(); }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              activeView === tab.id
                ? 'bg-orange-500/15 border-orange-500/30 text-orange-300'
                : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
            {'count' in tab && (tab.count ?? 0) > 0 ? (
              <span className="bg-white/10 text-gray-400 text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
            ) : null}
          </button>
        ))}
        <button
          onClick={refreshAll}
          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
        >
          <RefreshCw size={14} className={loadingData ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* ── Compose ── */}
      {activeView === 'compose' ? (
        <>
          {templates.length > 0 ? (
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
          ) : null}

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Recipients */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-3">
              <p className="text-sm font-semibold text-white">Recipients</p>
              {[
                { mode: 'leads' as RecipientMode, label: 'All Leads', icon: Users, count: leads.length },
                { mode: 'converted' as RecipientMode, label: 'Converted Leads', icon: CheckCircle, count: leads.filter((l) => l.status === 'converted').length },
                { mode: 'subscribers' as RecipientMode, label: 'Campaign Subscribers', icon: Bell, count: campaignSubs.length },
                { mode: 'custom' as RecipientMode, label: 'Custom Emails', icon: FileText, count: null as number | null },
              ].map((opt) => (
                <button key={opt.mode} onClick={() => setRecipientMode(opt.mode)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm border transition-colors ${recipientMode === opt.mode ? 'bg-orange-500/15 border-orange-500/30 text-orange-400' : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'}`}>
                  <opt.icon size={15} className="shrink-0" />
                  <span className="flex-1 text-left">{opt.label}</span>
                  {typeof opt.count === 'number' ? <span className="text-xs opacity-60">{opt.count}</span> : null}
                </button>
              ))}
              {recipientMode === 'custom' ? (
                <textarea value={customEmails} onChange={(e) => setCustomEmails(e.target.value)} placeholder="Enter emails (comma/newline separated)" rows={4} className="w-full mt-1 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-none" />
              ) : null}
              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-gray-500"><span className="text-white font-semibold">{recipients.length}</span> recipients</p>
              </div>
            </div>

            {/* Editor */}
            <div className="lg:col-span-2 bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Compose Email</p>
                {editingDraftId ? <span className="text-xs text-orange-300">Editing draft</span> : null}
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
                  <button onClick={() => setBodyPreview((p) => !p)} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">{bodyPreview ? 'Edit' : 'Preview'}</button>
                </div>
                {bodyPreview ? (
                  <div className="min-h-64 p-4 bg-white rounded-lg text-gray-900 text-sm overflow-auto" dangerouslySetInnerHTML={{ __html: body }} />
                ) : (
                  <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your email content here. HTML is supported." rows={10} className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y font-mono" />
                )}
              </div>
              <label className="flex items-center gap-2 px-3 py-2.5 bg-[#111111] border border-dashed border-white/20 rounded-lg text-xs text-gray-400 hover:border-orange-500/40 cursor-pointer transition-colors">
                <Paperclip size={14} />
                <span>Attach files (max 5, 10 MB each)</span>
                <input type="file" multiple onChange={(e) => setComposeAttachments(Array.from(e.target.files ?? []).slice(0, 5))} className="hidden" />
              </label>
              {composeAttachments.length > 0 ? <p className="text-xs text-gray-500">{composeAttachments.length} file(s): {composeAttachments.map((f) => f.name).join(', ')}</p> : null}
              {sendError ? <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"><XCircle size={15} /> {sendError}</div> : null}
              {sendResult ? (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                  <CheckCircle size={15} /> Sent to <strong>{sendResult.sent}</strong>
                  {sendResult.failed > 0 ? <span className="text-red-400 ml-1">({sendResult.failed} failed)</span> : null}
                  {(sendResult.skippedUnsubscribed ?? 0) > 0 ? <span className="text-yellow-400 ml-1">({sendResult.skippedUnsubscribed} unsubscribed skipped)</span> : null}
                </div>
              ) : null}
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
      ) : null}

      {/* ── Inbox (Gmail-style: list ↔ detail in same container) ── */}
      {activeView === 'inbox' ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden" style={{ minHeight: '72vh' }}>

          {/* ─ No mail open: show list ─ */}
          {!openedId ? (
            <>
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <span className="text-sm font-semibold text-white">Inbox</span>
                <button onClick={() => fetchMailbox('inbox')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
              </div>
              <div className="divide-y divide-white/5">
                {inboxMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-500 text-sm">
                    <Inbox size={36} className="opacity-20" />
                    No received emails yet
                  </div>
                ) : (
                  inboxMessages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={() => openMail(msg.id)}
                      className="w-full text-left px-5 py-4 hover:bg-white/4 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          {/* sender */}
                          <p className="text-sm font-bold text-white truncate group-hover:text-orange-300 transition-colors">{msg.from || 'Unknown sender'}</p>
                          {/* subject + preview on one line like Gmail */}
                          <p className="text-sm text-gray-300 mt-1 truncate">
                            <span className="font-medium">{msg.subject || '(No subject)'}</span>
                            {msg.preview ? <span className="text-gray-500"> – {msg.preview}</span> : null}
                          </p>
                          {msg.toLine ? <p className="text-xs text-gray-600 mt-1 truncate">To: {msg.toLine}</p> : null}
                        </div>
                        <span className="text-[11px] text-gray-500 shrink-0 pt-0.5">{fmt(msg.createdAt)}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          ) : (
            /* ─ Mail open: full-width detail panel ─ */
            <div className="flex flex-col" style={{ minHeight: '72vh' }}>

              {/* Toolbar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 flex-wrap shrink-0 bg-[#1a1a1a] sticky top-0 z-10">
                <button
                  onClick={closeMail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/8 transition-colors"
                >
                  <ArrowLeft size={14} /> <span className="hidden sm:inline">Inbox</span>
                </button>
                <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />
                <button
                  onClick={() => { setComposerMode('reply'); setComposerBody(''); setComposerError(''); }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${composerMode === 'reply' ? 'bg-orange-500/20 border-orange-500/40 text-orange-300' : 'border-orange-500/25 bg-orange-500/8 text-orange-400 hover:bg-orange-500/18'}`}
                >
                  <Reply size={13} /> Reply
                </button>
                <button
                  onClick={() => { setComposerMode('forward'); setComposerBody(''); setForwardTo(''); setComposerError(''); }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${composerMode === 'forward' ? 'bg-blue-500/20 border-blue-500/40 text-blue-300' : 'border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'}`}
                >
                  <Forward size={13} /> Forward
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-red-500/20 bg-red-500/8 text-red-400 hover:bg-red-500/18 transition-colors"
                >
                  <Trash2 size={13} /> Delete
                </button>
                <div className="flex-1" />
                <span className="text-xs text-gray-500 hidden md:block">
                  {openedDetail ? fmt(openedDetail.createdAt) : ''}
                </span>
              </div>

              {/* Body scroll area */}
              <div ref={detailRef} className="flex-1 overflow-y-auto">
                {detailLoading ? (
                  <div className="flex items-center justify-center h-64 text-gray-500 gap-2">
                    <RefreshCw size={18} className="animate-spin" /> Loading…
                  </div>
                ) : detailError ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-3">
                    <XCircle size={28} className="text-red-400 opacity-60" />
                    <p className="text-sm text-red-400">{detailError}</p>
                  </div>
                ) : openedDetail ? (
                  <div className="px-6 py-6 space-y-6 max-w-4xl">

                    {/* Subject */}
                    <h2 className="text-xl font-bold text-white leading-snug">{openedDetail.subject || '(No subject)'}</h2>

                    {/* Metadata */}
                    <div className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/2 px-5 py-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-bold flex items-center justify-center shrink-0 uppercase">
                        {(openedDetail.from ?? '?').charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0 space-y-1 text-sm">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-semibold text-white">{openedDetail.from ?? 'Unknown'}</span>
                          <span className="text-xs text-gray-500">{openedDetail.createdAt ? new Date(openedDetail.createdAt).toLocaleString('en-IN') : ''}</span>
                        </div>
                        <p className="text-xs text-gray-500">To: <span className="text-gray-400">{openedDetail.to.join(', ') || '—'}</span></p>
                        {openedDetail.cc.length > 0 ? <p className="text-xs text-gray-500">CC: <span className="text-gray-400">{openedDetail.cc.join(', ')}</span></p> : null}
                        {openedDetail.replyFrom ? (
                          <p className="text-xs text-gray-600">Reply will come from: <span className="text-orange-300">{openedDetail.replyFrom}</span></p>
                        ) : null}
                      </div>
                    </div>

                    {/* Email body */}
                    <div className="rounded-xl border border-white/8 bg-[#111111] p-5 overflow-x-auto">
                      {openedDetail.html ? (
                        <div className="text-sm text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: openedDetail.html }} />
                      ) : (
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{openedDetail.text || '(empty)'}</pre>
                      )}
                    </div>

                    {/* Attachments */}
                    {openedDetail.attachments.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          <Paperclip size={11} className="inline mr-1.5" />
                          {openedDetail.attachments.length} Attachment(s)
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {openedDetail.attachments.map((att) => (
                            <div key={att.id} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-gray-300">
                              <Paperclip size={11} className="text-gray-500 shrink-0" />
                              {att.filename ?? att.id}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Inline reply / forward composer */}
                    {composerMode ? (
                      <div className="rounded-xl border border-white/10 bg-[#111111] overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            {composerMode === 'reply' ? <Reply size={14} className="text-orange-400" /> : <Forward size={14} className="text-blue-400" />}
                            <p className="text-sm font-medium text-white">
                              {composerMode === 'reply' ? `Reply to ${openedDetail.from ?? 'sender'}` : 'Forward email'}
                            </p>
                          </div>
                          <button onClick={() => setComposerMode(null)} className="text-gray-500 hover:text-white transition-colors"><X size={14} /></button>
                        </div>

                        <div className="px-5 py-5 space-y-3">
                          {/* Sender badge */}
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-xs text-gray-400">
                            <Image src="/logo.png" alt="" width={18} height={18} className="h-4.5 w-4.5 rounded-full object-contain bg-white p-0.5" />
                            <span>From: <span className="text-white">{openedDetail.replyFrom ?? 'hello@walktopus.in'}</span></span>
                          </div>

                          {composerMode === 'forward' ? (
                            <input
                              value={forwardTo}
                              onChange={(e) => setForwardTo(e.target.value)}
                              placeholder="Forward to: recipient@example.com"
                              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
                            />
                          ) : null}

                          <textarea
                            value={composerBody}
                            onChange={(e) => setComposerBody(e.target.value)}
                            autoFocus
                            rows={6}
                            placeholder={composerMode === 'reply' ? 'Write your reply…' : 'Add a note before forwarding…'}
                            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y"
                          />

                          {composerError ? (
                            <p className="text-xs text-red-400">{composerError}</p>
                          ) : null}

                          <div className="flex items-center justify-between gap-3">
                            <button onClick={() => setComposerMode(null)} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Cancel</button>
                            <button
                              onClick={handleComposerSend}
                              disabled={composerSending || !composerBody.trim()}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 text-white text-sm font-semibold transition-colors"
                            >
                              {composerSending ? <RefreshCw size={14} className="animate-spin" /> : composerMode === 'reply' ? <Reply size={14} /> : <Send size={14} />}
                              {composerMode === 'reply' ? 'Send Reply' : 'Forward'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Quick-action strip when composer is closed */
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => { setComposerMode('reply'); setComposerBody(''); setComposerError(''); }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-orange-500/25 bg-orange-500/8 text-orange-300 hover:bg-orange-500/18 text-sm font-medium transition-colors"
                        >
                          <Reply size={14} /> Reply
                        </button>
                        <button
                          onClick={() => { setComposerMode('forward'); setComposerBody(''); setForwardTo(''); setComposerError(''); }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
                        >
                          <Forward size={14} /> Forward
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* ── Sent ── */}
      {activeView === 'sent' ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Sentbox</span>
            <button onClick={() => fetchMailbox('sent')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
          </div>
          {sentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-500 text-sm"><Mail size={28} className="opacity-30" />No sent messages</div>
          ) : (
            <div className="divide-y divide-white/5">
              {sentMessages.map((msg) => (
                <div key={msg.id} className="px-5 py-4 hover:bg-white/3 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{msg.subject || '(No subject)'}</p>
                      {msg.toLine ? <p className="text-xs text-gray-400 mt-0.5 truncate">To: {msg.toLine}</p> : null}
                      {typeof msg.toCount === 'number' && msg.toCount > 1 ? <p className="text-xs text-gray-500">To {msg.toCount} recipients</p> : null}
                      {typeof msg.sent === 'number' ? (
                        <p className="text-xs text-gray-500 mt-0.5">
                          <CheckCircle size={10} className="inline text-green-400 mr-1" />{msg.sent} sent
                          {(msg.failed ?? 0) > 0 ? <span className="text-red-400 ml-1">· {msg.failed} failed</span> : null}
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
      ) : null}

      {/* ── Drafts ── */}
      {activeView === 'draft' ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Drafts</span>
            <button onClick={() => fetchMailbox('draft')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
          </div>
          {draftMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-500 text-sm"><Save size={28} className="opacity-30" />No drafts</div>
          ) : (
            <div className="divide-y divide-white/5">
              {draftMessages.map((msg) => (
                <div key={msg.id} className="px-5 py-4 hover:bg-white/3 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{msg.subject || '(No subject)'}</p>
                      {msg.toLine ? <p className="text-xs text-gray-400 mt-0.5 truncate">To: {msg.toLine}</p> : null}
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
      ) : null}
    </div>
  );
}
