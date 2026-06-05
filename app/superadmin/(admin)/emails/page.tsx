'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bell, CheckCircle, FileText, Inbox, Mail, Paperclip, RefreshCw, Save, Send, Users, XCircle } from 'lucide-react';
import type { EmailTemplate, Lead, NewsletterSubscriber } from '@/types';

type RecipientMode = 'custom' | 'leads' | 'subscribers' | 'converted';
type SenderProfile = 'professional' | 'premium' | 'feedback' | 'contact' | 'custom';
type MailboxFolder = 'compose' | 'inbox' | 'sent' | 'draft';

interface MailboxMessage {
  id: string;
  folder: 'inbox' | 'sent' | 'draft';
  subject?: string;
  body?: string;
  preview?: string;
  from?: string;
  toCount?: number;
  sent?: number;
  failed?: number;
  createdAt?: string | null;
  senderProfile?: SenderProfile;
  senderLocalPart?: string;
  to?: string[];
}

export default function EmailsPage() {
  const [activeView, setActiveView] = useState<MailboxFolder>('compose');

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientMode, setRecipientMode] = useState<RecipientMode>('custom');
  const [senderProfile, setSenderProfile] = useState<SenderProfile>('professional');
  const [senderLocalPart, setSenderLocalPart] = useState('hello');
  const [customEmails, setCustomEmails] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [inboxMessages, setInboxMessages] = useState<MailboxMessage[]>([]);
  const [sentMessages, setSentMessages] = useState<MailboxMessage[]>([]);
  const [draftMessages, setDraftMessages] = useState<MailboxMessage[]>([]);

  const [sending, setSending] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [preview, setPreview] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; skippedUnsubscribed?: number } | null>(null);
  const [error, setError] = useState('');

  const campaignEligibleSubscribers = useMemo(
    () => subscribers.filter((subscriber) => subscriber.emailPreferences?.campaigns ?? subscriber.active),
    [subscribers],
  );

  const getRecipients = (): string[] => {
    switch (recipientMode) {
      case 'custom':
        return customEmails
          .split(/[\n,;]/)
          .map((email) => email.trim().toLowerCase())
          .filter((email) => email.includes('@'));
      case 'leads':
        return leads.map((lead) => lead.email);
      case 'converted':
        return leads.filter((lead) => lead.status === 'converted').map((lead) => lead.email);
      case 'subscribers':
        return campaignEligibleSubscribers.map((subscriber) => subscriber.email);
      default:
        return [];
    }
  };

  const recipients = getRecipients();

  const fetchMailbox = async (folder: 'inbox' | 'sent' | 'draft') => {
    const response = await fetch(`/api/admin/email/mailboxes?folder=${folder}&limit=100`);
    const data = await response.json();
    const messages = (data.messages ?? []) as MailboxMessage[];

    if (folder === 'inbox') setInboxMessages(messages);
    if (folder === 'sent') setSentMessages(messages);
    if (folder === 'draft') setDraftMessages(messages);
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
        templateRes.json(),
        leadRes.json(),
        subscriberRes.json(),
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

  const loadDraftIntoCompose = (draft: MailboxMessage) => {
    setSubject(draft.subject ?? '');
    setBody(draft.body ?? '');
    setSenderProfile((draft.senderProfile ?? 'professional') as SenderProfile);
    setSenderLocalPart(draft.senderLocalPart ?? 'hello');
    setCustomEmails(Array.isArray(draft.to) ? draft.to.join(', ') : '');
    setRecipientMode('custom');
    setEditingDraftId(draft.id);
    setActiveView('compose');
  };

  const saveDraft = async () => {
    setSavingDraft(true);
    setError('');

    try {
      const to = recipients;
      const response = await fetch('/api/admin/email/mailboxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingDraftId,
          subject,
          body,
          to,
          senderProfile,
          senderLocalPart,
        }),
      });
      const data = await response.json();
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
      setError('No valid recipients selected.');
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
      formData.set('senderProfile', senderProfile);
      formData.set('senderLocalPart', senderLocalPart.trim().toLowerCase());
      for (const file of attachments) {
        formData.append('attachments', file);
      }

      const response = await fetch('/api/admin/email/send', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Send failed');

      setResult({ sent: data.sent, failed: data.failed, skippedUnsubscribed: data.skippedUnsubscribed });
      setEditingDraftId(null);
      await fetchMailbox('sent');
      setActiveView('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  const renderMailboxList = (title: string, messages: MailboxMessage[], folder: 'inbox' | 'sent' | 'draft') => (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-white">{title}</p>
        <button
          onClick={() => fetchMailbox(folder)}
          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {messages.length === 0 ? (
        <p className="text-sm text-gray-500">No messages yet.</p>
      ) : (
        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className="rounded-xl border border-white/10 bg-[#111111] p-4 hover:border-orange-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{message.subject || 'No Subject'}</p>
                  {message.from ? <p className="text-xs text-gray-500 mt-0.5">From: {message.from}</p> : null}
                  {message.preview ? <p className="text-xs text-gray-400 mt-1 line-clamp-2">{message.preview}</p> : null}
                  {typeof message.toCount === 'number' ? (
                    <p className="text-xs text-gray-500 mt-1">Recipients: {message.toCount}</p>
                  ) : null}
                  {typeof message.sent === 'number' ? (
                    <p className="text-xs text-gray-500 mt-1">Sent: {message.sent} • Failed: {message.failed ?? 0}</p>
                  ) : null}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-[11px] text-gray-500">
                    {message.createdAt ? new Date(message.createdAt).toLocaleString('en-IN') : '—'}
                  </span>
                  {folder === 'draft' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadDraftIntoCompose(message)}
                        className="px-2.5 py-1.5 rounded-lg text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDraft(message.id)}
                        className="px-2.5 py-1.5 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center flex-wrap gap-2">
        {[
          { id: 'compose' as MailboxFolder, label: 'Compose', icon: Mail },
          { id: 'inbox' as MailboxFolder, label: 'Inbox', icon: Inbox },
          { id: 'sent' as MailboxFolder, label: 'Sent', icon: Send },
          { id: 'draft' as MailboxFolder, label: 'Drafts', icon: Save },
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
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
        <button
          onClick={refreshAll}
          className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {activeView === 'compose' ? (
        <>
          {templates.length > 0 && (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
              <p className="text-sm font-medium text-gray-300 mb-3">Apply Template</p>
              <div className="flex flex-wrap gap-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 rounded-lg text-xs font-medium transition-colors"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-3">
                <p className="text-sm font-semibold text-white">Recipients</p>

                {[
                  { mode: 'leads' as RecipientMode, label: 'All Leads', icon: Users, count: leads.length },
                  {
                    mode: 'converted' as RecipientMode,
                    label: 'Converted Leads',
                    icon: CheckCircle,
                    count: leads.filter((lead) => lead.status === 'converted').length,
                  },
                  {
                    mode: 'subscribers' as RecipientMode,
                    label: 'Campaign Subscribers',
                    icon: Bell,
                    count: campaignEligibleSubscribers.length,
                  },
                  { mode: 'custom' as RecipientMode, label: 'Custom Emails', icon: FileText, count: null },
                ].map((option) => (
                  <button
                    key={option.mode}
                    onClick={() => setRecipientMode(option.mode)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      recipientMode === option.mode
                        ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400'
                        : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    <option.icon size={15} className="shrink-0" />
                    <span className="flex-1 text-left">{option.label}</span>
                    {typeof option.count === 'number' ? <span className="text-xs opacity-70">{option.count}</span> : null}
                  </button>
                ))}

                {recipientMode === 'custom' ? (
                  <textarea
                    value={customEmails}
                    onChange={(event) => setCustomEmails(event.target.value)}
                    placeholder="Enter emails (comma, semicolon, or newline separated)"
                    rows={4}
                    className="w-full mt-2 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-none transition-colors"
                  />
                ) : null}

                <div className="pt-1 border-t border-white/10">
                  <p className="text-xs text-gray-500">
                    <span className="text-white font-semibold">{recipients.length}</span> recipients selected
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Compose Email</p>
                  {editingDraftId ? <p className="text-xs text-orange-300">Editing draft</p> : null}
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Sender Profile</label>
                    <select
                      value={senderProfile}
                      onChange={(event) => setSenderProfile(event.target.value as SenderProfile)}
                      className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-orange-500/50"
                    >
                      <option value="professional">Professional</option>
                      <option value="premium">Premium</option>
                      <option value="feedback">Feedback</option>
                      <option value="contact">Contact</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">From Local-Part</label>
                    <div className="flex rounded-lg overflow-hidden border border-white/10 focus-within:border-orange-500/50 transition-colors">
                      <input
                        value={senderLocalPart}
                        onChange={(event) =>
                          setSenderLocalPart(event.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))
                        }
                        placeholder="hello"
                        className="flex-1 px-3 py-2.5 bg-[#111111] text-sm text-white placeholder-gray-600 focus:outline-none"
                      />
                      <span className="px-3 py-2.5 bg-[#161616] text-xs text-gray-400 border-l border-white/10">@walktopus.in</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
                  <input
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="Email subject line…"
                    className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-gray-400">Body (HTML supported)</label>
                    <button
                      onClick={() => setPreview((current) => !current)}
                      className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      {preview ? 'Edit' : 'Preview'}
                    </button>
                  </div>

                  {preview ? (
                    <div
                      className="min-h-64 p-4 bg-white rounded-lg text-gray-900 text-sm overflow-auto"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  ) : (
                    <textarea
                      value={body}
                      onChange={(event) => setBody(event.target.value)}
                      placeholder="Write your email content here. HTML is supported."
                      rows={12}
                      className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y font-mono transition-colors"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Attachments (images, PDF, docs)</label>
                  <label className="flex items-center gap-2 px-3 py-2.5 bg-[#111111] border border-dashed border-white/20 rounded-lg text-xs text-gray-400 hover:border-orange-500/40 hover:text-gray-300 cursor-pointer transition-colors">
                    <Paperclip size={14} />
                    <span>Attach files (max 5 files, 10MB each)</span>
                    <input
                      type="file"
                      multiple
                      onChange={(event) => setAttachments(Array.from(event.target.files ?? []).slice(0, 5))}
                      className="hidden"
                    />
                  </label>
                  {attachments.length > 0 ? (
                    <p className="mt-2 text-xs text-gray-500">
                      {attachments.length} file(s): {attachments.map((file) => file.name).join(', ')}
                    </p>
                  ) : null}
                </div>

                <p className="text-xs text-gray-500">
                  Campaign subscribers count now follows preference-based opt-in. Unsubscribe links are included automatically.
                </p>

                {error ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    <XCircle size={15} /> {error}
                  </div>
                ) : null}

                {result ? (
                  <div className="flex items-center gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                    <CheckCircle size={15} />
                    Sent to <strong>{result.sent}</strong> recipients
                    {result.failed > 0 ? <span className="text-red-400 ml-1">({result.failed} failed)</span> : null}
                    {(result.skippedUnsubscribed ?? 0) > 0 ? (
                      <span className="text-yellow-400 ml-1">({result.skippedUnsubscribed} unsubscribed skipped)</span>
                    ) : null}
                  </div>
                ) : null}

                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={saveDraft}
                    disabled={savingDraft || loadingData}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/15 disabled:bg-white/5 disabled:text-gray-600 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    {savingDraft ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
                    Save Draft
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={sending || recipients.length === 0 || loadingData}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    {sending ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send to {recipients.length}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {activeView === 'inbox' ? renderMailboxList('Inbox', inboxMessages, 'inbox') : null}
      {activeView === 'sent' ? renderMailboxList('Sentbox', sentMessages, 'sent') : null}
      {activeView === 'draft' ? renderMailboxList('Drafts', draftMessages, 'draft') : null}
    </div>
  );
}
