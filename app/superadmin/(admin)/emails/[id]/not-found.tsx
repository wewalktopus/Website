import Link from 'next/link';

export default function EmailDetailNotFound() {
  return (
    <div className="max-w-3xl mx-auto min-h-80 rounded-2xl border border-white/10 bg-[#151515] flex flex-col items-center justify-center gap-4 text-center px-6">
      <h1 className="text-xl font-semibold text-white">Email not found</h1>
      <p className="text-sm text-gray-400">This inbox item may have been deleted or is no longer available.</p>
      <Link href="/superadmin/emails" className="inline-flex items-center px-4 py-2 rounded-xl border border-white/10 bg-[#1a1a1a] text-gray-300 hover:text-white hover:border-white/20 transition-colors">
        Back to inbox
      </Link>
    </div>
  );
}
