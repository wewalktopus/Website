'use client';

import { useEffect, useState } from 'react';
import { Send, Users, Bell, FileText, CheckCircle, XCircle, RefreshCw, Paperclip } from 'lucide-react';
import type { Lead, NewsletterSubscriber, EmailTemplate } from '@/types';

type RecipientMode = 'custom' | 'leads' | 'subscribers' | 'converted';
type SenderProfile = 'professional' | 'premium' | 'feedback' | 'contact' | 'custom';

export default function EmailsPage() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipientMode, setRecipientMode] = useState<RecipientMode>('custom');
  const [senderProfile, setSenderProfile] = useState<SenderProfile>('professional');
  const [senderLocalPart, setSenderLocalPart] = useState('hello');
  const [customEmails, setCustomEmails] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number; skippedUnsubscribed?: number } | null>(null);
  const [error, setError] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/email/templates').then(r => r.json()),
      fetch('/api/admin/leads?limit=200').then(r => r.json()),
      fetch('/api/admin/subscribers?active=true&limit=500').then(r => r.json()),
    ]).then(([tData, lData, sData]) => {
      setTemplates(tData.templates ?? []);
      setLeads(lData.leads ?? []);
      setSubscribers(sData.subscribers ?? []);
    }).finally(() => setLoadingData(false));
  }, []);

  const getRecipients = (): string[] => {
    switch (recipientMode) {
      case 'custom':
        return customEmails.split(/[\n,;]/).map(e => e.trim()).filter(e => e.includes('@'));
      case 'leads':
        return leads.map(l => l.email);
      case 'converted':
        return leads.filter(l => l.status === 'converted').map(l => l.email);
      case 'subscribers':
        return subscribers.map(s => s.email);
      default:
        return [];
    }
  };

  const recipients = getRecipients();

  const applyTemplate = (t: EmailTemplate) => {
    setSubject(t.subject);
    setBody(t.body);
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

      const res = await fetch('/api/admin/email/send', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Send failed');
      setResult({ sent: data.sent, failed: data.failed, skippedUnsubscribed: data.skippedUnsubscribed });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Templates */}
      {templates.length > 0 && (
        <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5">
          <p className="text-sm font-medium text-gray-300 mb-3">Apply Template</p>
          <div className="flex flex-wrap gap-2">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t)}
                className="px-3 py-1.5 bg-white/5 hover:bg-orange-500/15 border border-white/10 hover:border-orange-500/30 text-gray-400 hover:text-orange-400 rounded-lg text-xs font-medium transition-colors"
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recipients */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-3">
            <p className="text-sm font-semibold text-white">Recipients</p>

            {[
              { mode: 'leads' as RecipientMode, label: 'All Leads', icon: Users, count: leads.length },
              { mode: 'converted' as RecipientMode, label: 'Converted Leads', icon: CheckCircle, count: leads.filter(l => l.status === 'converted').length },
              { mode: 'subscribers' as RecipientMode, label: 'Newsletter Subscribers', icon: Bell, count: subscribers.length },
              { mode: 'custom' as RecipientMode, label: 'Custom Emails', icon: FileText, count: null },
            ].map(opt => (
              <button
                key={opt.mode}
                onClick={() => setRecipientMode(opt.mode)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  recipientMode === opt.mode
                    ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400'
                    : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/8'
                }`}
              >
                <opt.icon size={15} className="shrink-0" />
                <span className="flex-1 text-left">{opt.label}</span>
                {opt.count !== null && (
                  <span className="text-xs opacity-60">{opt.count}</span>
                )}
              </button>
            ))}

            {recipientMode === 'custom' && (
              <textarea
                value={customEmails}
                onChange={e => setCustomEmails(e.target.value)}
                placeholder="Enter emails (comma, semicolon, or newline separated)"
                rows={4}
                className="w-full mt-2 px-3 py-2 bg-[#111111] border border-white/10 rounded-lg text-xs text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-none transition-colors"
              />
            )}

            <div className="pt-1 border-t border-white/10">
              <p className="text-xs text-gray-500">
                <span className="text-white font-semibold">{recipients.length}</span> recipients selected
              </p>
            </div>
          </div>
        </div>

        {/* Compose */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 space-y-4">
            <p className="text-sm font-semibold text-white">Compose Email</p>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Sender Profile</label>
                <select
                  value={senderProfile}
                  onChange={(e) => setSenderProfile(e.target.value as SenderProfile)}
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
                    onChange={(e) => setSenderLocalPart(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
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
                onChange={e => setSubject(e.target.value)}
                placeholder="Email subject line…"
                className="w-full px-3 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-gray-400">Body (HTML supported)</label>
                <button
                  onClick={() => setPreview(p => !p)}
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
                  onChange={e => setBody(e.target.value)}
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
                  onChange={(e) => setAttachments(Array.from(e.target.files ?? []).slice(0, 5))}
                  className="hidden"
                />
              </label>
              {attachments.length > 0 ? (
                <p className="mt-2 text-xs text-gray-500">
                  {attachments.length} file(s): {attachments.map((file) => file.name).join(', ')}
                </p>
              ) : null}
            </div>

            <p className="text-xs text-gray-500">All outgoing promotional emails include an unsubscribe link automatically. Daily sending cap: 100 recipients.</p>

            {/* Feedback */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                <XCircle size={15} /> {error}
              </div>
            )}
            {result && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                <CheckCircle size={15} />
                Sent to <strong>{result.sent}</strong> recipients
                {result.failed > 0 && <span className="text-red-400 ml-1">({result.failed} failed)</span>}
                {(result.skippedUnsubscribed ?? 0) > 0 && (
                  <span className="text-yellow-400 ml-1">({result.skippedUnsubscribed} unsubscribed skipped)</span>
                )}
              </div>
            )}

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={sending || recipients.length === 0}
              className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/40 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {sending ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  Sending to {recipients.length} recipients…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send to {recipients.length} Recipient{recipients.length !== 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
