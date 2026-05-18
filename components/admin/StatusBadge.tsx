import type { LeadStatus } from '@/types';

const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
  contacted: { label: 'Contacted', className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
  converted: { label: 'Converted', className: 'bg-green-500/15 text-green-400 border-green-500/30' },
  closed: { label: 'Closed', className: 'bg-gray-500/15 text-gray-400 border-gray-500/30' },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${config.className}`}>
      {config.label}
    </span>
  );
}
