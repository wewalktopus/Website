'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, Forward, Mail, Paperclip, RefreshCw, Reply, Send, Trash2, X, XCircle } from 'lucide-react';

interface Attachment {
  id: string;
  filename?: string;
  content_type?: string;
  content_disposition?: string;
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

type ComposerMode = 'reply' | 'forward' | null;

export default function EmailDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const messageId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [message, setMessage] = useState<InboxDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [composerMode, setComposerMode] = useState<ComposerMode>(null);
  const [composerBody, setComposerBody] = useState('');
  const [forwardTo, setForwardTo] = useState('');
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const sentToLine = useMemo(() => (message?.to ?? []).join(', '), [message]);

  const loadMessage = async () => {
    if (!messageId) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/email/inbox/${messageId}`);
      const data = (await response.json()) as { message?: InboxDetail; error?: string };
      if (!response.ok) throw new Error(data.error ?? 'Failed to load email');
      setMessage(data.message ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load email');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMessage();
  }, [messageId]);

  const handleDelete = async () => {
    if (!messageId) return;
    if (!confirm('Delete this email?')) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/admin/email/inbox/${messageId}`, { method: 'DELETE' });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? 'Failed to delete email');
      if (window.opener) {
        window.close();
        return;
      }
      router.push('/superadmin/emails');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete email');
    } finally {
      setDeleting(false);
    }
  };

  const handleSend = async () => {
    if (!messageId || !composerMode || !composerBody.trim()) return;
    if (composerMode === 'forward' && !forwardTo.trim()) {
      alert('Enter the forward email address.');
      return;
    }
    setSending(true);
    try {
      const response = await fetch(`/api/admin/email/inbox/${messageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: composerMode,
          message: composerBody,
          forwardTo: composerMode === 'forward' ? forwardTo : undefined,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? 'Failed to send');
      alert(composerMode === 'reply' ? 'Reply sent successfully.' : 'Forwarded successfully.');
      setComposerBody('');
      setForwardTo('');
      setComposerMode(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => router.push('/superadmin/emails')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#1a1a1a] text-gray-300 hover:text-white hover:border-white/20 transition-colors"
        >
          <ArrowLeft size={14} /> Back To Inbox
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => void loadMessage()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#1a1a1a] text-gray-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button
            onClick={() => {
              setComposerMode('reply');
              setComposerBody('');
            }}
            disabled={!message}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 disabled:opacity-50 transition-colors"
          >
            <Reply size={14} /> Reply
          </button>
          <button
            onClick={() => {
              setComposerMode('forward');
              setComposerBody('');
              setForwardTo('');
            }}
            disabled={!message}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#1a1a1a] text-gray-300 hover:text-white hover:border-white/20 disabled:opacity-50 transition-colors"
          >
            <Forward size={14} /> Forward
          </button>
          <button
            onClick={handleDelete}
            disabled={!message || deleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
          >
            <Trash2 size={14} /> {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="min-h-105 rounded-2xl border border-white/10 bg-[#151515] flex items-center justify-center text-gray-400 gap-2">
          <RefreshCw size={18} className="animate-spin" /> Loading email...
        </div>
      ) : error ? (
        <div className="min-h-80 rounded-2xl border border-red-500/20 bg-red-500/5 flex flex-col items-center justify-center text-red-300 gap-3">
          <XCircle size={28} />
          <p>{error}</p>
        </div>
      ) : !message ? (
        <div className="min-h-80 rounded-2xl border border-white/10 bg-[#151515] flex flex-col items-center justify-center text-gray-500 gap-3">
          <Mail size={28} className="opacity-40" />
          <p>Email not found.</p>
        </div>
      ) : (
        <>
          <section className="rounded-2xl border border-white/10 bg-[#151515] overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-xl font-semibold text-white">{message.subject || '(No subject)'}</h1>
                  <p className="text-xs text-gray-500 mt-2">
                    Reply will be sent from: <span className="text-orange-300">{message.replyFrom ?? 'Walktopus default mailbox'}</span>
                  </p>
                </div>
                <span className="text-xs text-gray-500">{message.createdAt ? new Date(message.createdAt).toLocaleString('en-IN') : '—'}</span>
              </div>
            </div>

            <div className="px-6 py-5 border-b border-white/10 grid gap-2 text-sm">
              <div className="flex gap-3 flex-wrap">
                <span className="w-12 text-gray-500">From</span>
                <span className="text-white break-all">{message.from ?? 'Unknown'}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <span className="w-12 text-gray-500">To</span>
                <span className="text-gray-300 break-all">{sentToLine || '—'}</span>
              </div>
              {message.cc.length > 0 ? (
                <div className="flex gap-3 flex-wrap">
                  <span className="w-12 text-gray-500">CC</span>
                  <span className="text-gray-300 break-all">{message.cc.join(', ')}</span>
                </div>
              ) : null}
              {message.messageId ? (
                <div className="flex gap-3 flex-wrap">
                  <span className="w-12 text-gray-500">Thread</span>
                  <span className="text-gray-400 break-all">{message.messageId}</span>
                </div>
              ) : null}
            </div>

            <div className="px-6 py-6 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#101010] p-5 overflow-auto max-h-[55vh]">
                {message.html ? (
                  <div className="prose prose-invert max-w-none text-sm text-gray-200" dangerouslySetInnerHTML={{ __html: message.html }} />
                ) : (
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">{message.text || 'No content'}</pre>
                )}
              </div>

              {message.attachments.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Attachments</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id} className="rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-gray-300 flex items-center gap-3">
                        <Paperclip size={14} className="text-gray-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="truncate">{attachment.filename ?? attachment.id}</p>
                          <p className="text-xs text-gray-500 truncate">{attachment.content_type ?? 'Attachment'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          {composerMode ? (
            <section className="rounded-2xl border border-white/10 bg-[#151515] overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{composerMode === 'reply' ? 'Reply' : 'Forward'}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {composerMode === 'reply'
                      ? `This reply will go to ${message.from ?? 'the sender'} from ${message.replyFrom ?? 'the receiving mailbox'}`
                      : `This forward will also be sent from ${message.replyFrom ?? 'the receiving mailbox'}`}
                  </p>
                </div>
                <button onClick={() => setComposerMode(null)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 py-5 space-y-4">
                {composerMode === 'forward' ? (
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Forward To</label>
                    <input
                      value={forwardTo}
                      onChange={(event) => setForwardTo(event.target.value)}
                      placeholder="recipient@example.com"
                      className="w-full px-3 py-2.5 bg-[#101010] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Message</label>
                  <textarea
                    value={composerBody}
                    onChange={(event) => setComposerBody(event.target.value)}
                    rows={8}
                    placeholder={composerMode === 'reply' ? 'Write your reply...' : 'Add a note before forwarding...'}
                    className="w-full px-3 py-3 bg-[#101010] border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 resize-y"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSend}
                    disabled={sending || !composerBody.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-400 disabled:bg-orange-500/40 transition-colors"
                  >
                    {sending ? <RefreshCw size={15} className="animate-spin" /> : composerMode === 'reply' ? <Reply size={15} /> : <Send size={15} />}
                    {composerMode === 'reply' ? 'Send Reply' : 'Forward Email'}
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          <div className="text-xs text-gray-500 flex items-center gap-2">
            <ExternalLink size={12} /> This email is opened in a dedicated admin detail tab.
          </div>
        </>
      )}
    </div>
  );
}
