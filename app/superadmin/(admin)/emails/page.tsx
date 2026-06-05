'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Bell, CheckCircle, ExternalLink, FileText, Inbox, Mail, Paperclip, RefreshCw, Save, Send, Users, XCircle } from 'lucide-react';
import type { EmailTemplate, Lead, NewsletterSubscriber } from '@/types';

type RecipientMode = 'custom' | 'leads' | 'subscribers' | 'converted';
type MailboxFolder = 'compose' | 'inbox' | 'sent' | 'draft';

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

function fmt(dt: string | null | undefined): string {
  if (!dt) return '—';
  const d = new Date(dt);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) {
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
}

export default function EmailsPage() {
  const [activeView, setActiveView] = useState<MailboxFolder>('compose');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientMode, setRecipientMode] = useState<RecipientMode>('custom');
  const [customEmails, setCustomEmails] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [inboxMessages, setInboxMessages] = useState<InboxListItem[]>([]);
  const [sentMessages, setSentMessages] = useState<MailboxMessage[]>([]);
  const [draftMessages, setDraftMessages] = useState<MailboxMessage[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [sending, setSending] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; skippedUnsubscribed?: number } | null>(null);
  const [error, setError] = useState('');

  const campaignSubs = useMemo(
    () => subscribers.filter((subscriber) => subscriber.emailPreferences?.campaigns ?? subscriber.active),
    [subscribers],
  );

  const recipients = useMemo((): string[] => {
    switch (recipientMode) {
      case 'custom':
        return customEmails.split(/[\n,;]/).map((email) => email.trim().toLowerCase()).filter((email) => email.includes('@'));
      case 'leads':
        return leads.map((lead) => lead.email);
      case 'converted':
        return leads.filter((lead) => lead.status === 'converted').map((lead) => lead.email);
      case 'subscribers':
        return campaignSubs.map((subscriber) => subscriber.email);
      default:
        return [];
    }
  }, [recipientMode, customEmails, leads, campaignSubs]);

  const fetchMailbox = async (folder: 'inbox' | 'sent' | 'draft') => {
    const url = folder === 'inbox' ? '/api/admin/email/inbox' : `/api/admin/email/mailboxes?folder=${folder}&limit=100`;
    const response = await fetch(url);
    const data = (await response.json()) as { messages?: unknown[] };
    const messages = data.messages ?? [];
    if (folder === 'inbox') setInboxMessages(messages as InboxListItem[]);
    if (folder === 'sent') setSentMessages(messages as MailboxMessage[]);
    if (folder === 'draft') setDraftMessages(messages as MailboxMessage[]);
  };

  const refreshAll = async () => {
    setLoadingData(true);
    try {
      const [templateRes, leadRes, subscriberRes] = await Promise.all([
        fetch('/api/admin/email/templates'),
        fetch('/api/admin/leads?limit=300'),
        fetch('/api/admin/subscribers?limit=600'),
      ]);
      const [templateData, leadData, subscriberData] = await Promise.all([
        templateRes.json() as Promise<{ templates?: EmailTemplate[] }>,
        leadRes.json() as Promise<{ leads?: Lead[] }>,
        subscriberRes.json() as Promise<{ subscribers?: NewsletterSubscriber[] }>,
      ]);
      setTemplates(templateData.templates ?? []);
      setLeads(leadData.leads ?? []);
      setSubscribers(subscriberData.subscribers ?? []);
      await Promise.all([fetchMailbox('inbox'), fetchMailbox('sent'), fetchMailbox('draft')]);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    void refreshAll();
  }, []);

  const applyTemplate = (template: EmailTemplate) => {
    setSubject(template.subject);
    setBody(template.body);
    setActiveView('compose');
  };

  const openInboxMessage = (messageId: string) => {
    window.open(`/superadmin/emails/${messageId}`, '_blank', 'noopener,noreferrer');
  };

  const loadDraft = (draft: MailboxMessage) => {
    setSubject(draft.subject ?? '');
    setBody(draft.body ?? '');
    setCustomEmails(Array.isArray(draft.to) ? draft.to.join(', ') : '');
    setRecipientMode('custom');
    setEditingDraftId(draft.id);
    setActiveView('compose');
  };

  const saveDraft = async () => {
    setSavingDraft(true);
    setError('');
    try {
      const response = await fetch('/api/admin/email/mailboxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingDraftId, subject, body, to: recipients }),
      });
      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok) throw new Error(data.error ?? 'Failed to save draft');
      setEditingDraftId(data.id ?? editingDraftId);
      await fetchMailbox('draft');
      setActiveView('draft');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const deleteDraft = async (id: string) => {
    if (!confirm('Delete this draft?')) return;
    await fetch(`/api/admin/email/mailboxes/${id}`, { method: 'DELETE' });
    if (editingDraftId === id) setEditingDraftId(null);
    await fetchMailbox('draft');
  };

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) {
      setError('Subject and body are required.');
      return;
    }
    if (recipients.length === 0) {
      setError('No valid recipients.');
      return;
    }
    if (!confirm(`Send to ${recipients.length} recipient(s)?`)) return;

    setSending(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.set('to', JSON.stringify(recipients));
      formData.set('subject', subject);
      formData.set('body', body);
      for (const file of attachments) formData.append('attachments', file);
      const response = await fetch('/api/admin/email/send', { method: 'POST', body: formData });
      const data = (await response.json()) as { sent?: number; failed?: number; skippedUnsubscribed?: number; error?: string };
      if (!response.ok) throw new Error(data.error ?? 'Send failed');
      setResult({ sent: data.sent ?? 0, failed: data.failed ?? 0, skippedUnsubscribed: data.skippedUnsubscribed });
      setEditingDraftId(null);
      await fetchMailbox('sent');
      setActiveView('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-5 max-w-7xl">
      <div className="flex items-center flex-wrap gap-2">
        {[
          { id: 'compose' as MailboxFolder, label: 'Compose', icon: Mail, count: undefined as number | undefined },
          { id: 'inbox' as MailboxFolder, label: 'Inbox', icon: Inbox, count: inboxMessages.length },
          { id: 'sent' as MailboxFolder, label: 'Sent', icon: Send, count: sentMessages.length },
          { id: 'draft' as MailboxFolder, label: 'Drafts', icon: Save, count: draftMessages.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${
              activeView === tab.id
                ? 'bg-orange-500/15 border-orange-500/30 text-orange-300'
                : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
            {typeof tab.count === 'number' && tab.count > 0 ? (
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

      {activeView === 'compose' ? (
        <>
          {templates.length > 0 ? (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-400 mb-2">Apply Template</p>
              <div className="flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button key={template.id} onClick={() => applyTemplate(template)} className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 rounded-lg text-xs font-medium transition-colors">
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid lg:grid-cols-3 gap-5">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-3">
              <p className="text-sm font-semibold text-white">Recipients</p>
              {[
                { mode: 'leads' as RecipientMode, label: 'All Leads', icon: Users, count: leads.length },
                { mode: 'converted' as RecipientMode, label: 'Converted Leads', icon: CheckCircle, count: leads.filter((lead) => lead.status === 'converted').length },
                { mode: 'subscribers' as RecipientMode, label: 'Campaign Subscribers', icon: Bell, count: campaignSubs.length },
                { mode: 'custom' as RecipientMode, label: 'Custom Emails', icon: FileText, count: null as number | null },
              ].map((option) => (
                <button key={option.mode} onClick={() => setRecipientMode(option.mode)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm border transition-colors ${recipientMode === option.mode ? 'bg-orange-500/15 border-orange-500/30 text-orange-400' : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'}`}>
                  <option.icon size={15} className="shrink-0" />
                  <span className="flex-1 text-left">{option.label}</span>
                  {typeof option.count === 'number' ? <span className="text-xs opacity-60">{option.count}</span> : null}
                </button>
              ))}
              {recipientMode === 'custom' ? (
                <textarea value={customEmails} onChange={(event) => setCustomEmails(event.target.value)} placeholder="Enter emails (comma/newline separated)" rows={4} className="w-full mt-1 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-none" />
              ) : null}
              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-gray-500"><span className="text-white font-semibold">{recipients.length}</span> recipients</p>
              </div>
            </div>

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
                <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Email subject line…" className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-400">Body (HTML supported)</label>
                  <button onClick={() => setPreview((current) => !current)} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">{preview ? 'Edit' : 'Preview'}</button>
                </div>
                {preview ? (
                  <div className="min-h-64 p-4 bg-white rounded-lg text-gray-900 text-sm overflow-auto" dangerouslySetInnerHTML={{ __html: body }} />
                ) : (
                  <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write your email content here. HTML is supported." rows={10} className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y font-mono" />
                )}
              </div>

              <label className="flex items-center gap-2 px-3 py-2.5 bg-[#111111] border border-dashed border-white/20 rounded-lg text-xs text-gray-400 hover:border-orange-500/40 cursor-pointer transition-colors">
                <Paperclip size={14} />
                <span>Attach files (max 5, 10 MB each)</span>
                <input type="file" multiple onChange={(event) => setAttachments(Array.from(event.target.files ?? []).slice(0, 5))} className="hidden" />
              </label>
              {attachments.length > 0 ? <p className="text-xs text-gray-500">{attachments.length} file(s): {attachments.map((file) => file.name).join(', ')}</p> : null}

              {error ? <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"><XCircle size={15} /> {error}</div> : null}
              {result ? (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                  <CheckCircle size={15} /> Sent to <strong>{result.sent}</strong>
                  {result.failed > 0 ? <span className="text-red-400 ml-1">({result.failed} failed)</span> : null}
                  {(result.skippedUnsubscribed ?? 0) > 0 ? <span className="text-yellow-400 ml-1">({result.skippedUnsubscribed} unsubscribed skipped)</span> : null}
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

      {activeView === 'inbox' ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Inbox</span>
            <span className="text-xs text-gray-500">Click a mail to open it in a new tab with reply, forward, and delete.</span>
          </div>
          <div className="divide-y divide-white/5">
            {inboxMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-2 text-gray-500 text-sm">
                <Inbox size={32} className="opacity-20" />
                No received emails yet
              </div>
            ) : (
              inboxMessages.map((message) => (
                <button key={message.id} onClick={() => openInboxMessage(message.id)} className="w-full text-left px-4 py-3.5 transition-colors hover:bg-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white truncate">{message.subject || '(No subject)'}</p>
                        <ExternalLink size={12} className="text-gray-500 shrink-0" />
                      </div>
                      <p className="text-xs text-gray-400 mt-1 truncate">From: {message.from || 'Unknown'}</p>
                      {message.toLine ? <p className="text-xs text-gray-500 mt-0.5 truncate">To: {message.toLine}</p> : null}
                      {message.preview ? <p className="text-xs text-gray-500 mt-1 truncate">{message.preview}</p> : null}
                    </div>
                    <span className="text-[11px] text-gray-500 shrink-0 mt-0.5">{fmt(message.createdAt)}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}

      {activeView === 'sent' ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Sentbox</span>
            <button onClick={() => fetchMailbox('sent')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
          </div>
          {sentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-500 text-sm"><Mail size={28} className="opacity-30" />No sent messages</div>
          ) : (
            <div className="divide-y divide-white/5">
              {sentMessages.map((message) => (
                <div key={message.id} className="px-4 py-3.5 hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{message.subject || '(No subject)'}</p>
                      {message.toLine ? <p className="text-xs text-gray-400 mt-0.5 truncate">To: {message.toLine}</p> : null}
                      {typeof message.toCount === 'number' && message.toCount > 1 ? <p className="text-xs text-gray-500">To {message.toCount} recipients</p> : null}
                      {typeof message.sent === 'number' ? (
                        <p className="text-xs text-gray-500 mt-0.5">
                          <CheckCircle size={10} className="inline text-green-400 mr-1" />{message.sent} sent
                          {(message.failed ?? 0) > 0 ? <span className="text-red-400 ml-1">· {message.failed} failed</span> : null}
                        </p>
                      ) : null}
                    </div>
                    <span className="text-[11px] text-gray-500 shrink-0 mt-0.5">{fmt(message.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {activeView === 'draft' ? (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Drafts</span>
            <button onClick={() => fetchMailbox('draft')} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"><RefreshCw size={13} /></button>
          </div>
          {draftMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-500 text-sm"><Save size={28} className="opacity-30" />No drafts</div>
          ) : (
            <div className="divide-y divide-white/5">
              {draftMessages.map((message) => (
                <div key={message.id} className="px-4 py-3.5 hover:bg-white/5 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white truncate">{message.subject || '(No subject)'}</p>
                      {message.toLine ? <p className="text-xs text-gray-400 mt-0.5 truncate">To: {message.toLine}</p> : null}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[11px] text-gray-500">{fmt(message.createdAt)}</span>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => loadDraft(message)} className="px-2.5 py-1 rounded-lg text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-colors">Edit</button>
                        <button onClick={() => deleteDraft(message.id)} className="px-2.5 py-1 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-colors">Delete</button>
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
