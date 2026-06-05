'use client';

export default function EmailDetailError({ reset }: { reset: () => void }) {
  return (
    <div className="max-w-3xl mx-auto min-h-80 rounded-2xl border border-red-500/20 bg-red-500/5 flex flex-col items-center justify-center gap-4 text-center px-6">
      <h1 className="text-xl font-semibold text-white">Failed to load email</h1>
      <p className="text-sm text-red-200">The inbox detail view hit an unexpected error.</p>
      <button onClick={reset} className="inline-flex items-center px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-200 hover:bg-red-500/20 transition-colors">
        Try again
      </button>
    </div>
  );
}
