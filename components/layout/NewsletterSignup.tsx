'use client';

import { useState } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Enter your email to subscribe.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot: '' }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Subscription failed');
      }

      setStatus('success');
      setMessage(data.message ?? 'Subscribed successfully.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 rounded-none border border-white/15 bg-white/5 px-3 py-2 text-sm text-(--color-bg) placeholder:text-(--color-bg-secondary) focus:border-(--color-accent) focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="border border-(--color-accent) bg-(--color-accent) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-text-dark) disabled:opacity-70"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {message ? (
        <p className={`text-xs ${status === 'success' ? 'text-green-300' : 'text-(--color-bg-secondary)'}`}>
          {message}
        </p>
      ) : (
        <p className="text-xs text-(--color-bg-secondary)">Get practical updates on SEO, content, and growth.</p>
      )}
    </form>
  );
}